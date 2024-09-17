// import { Address, beginCell, toNano } from '@ton/ton';
import { ContractDeployer } from './contract-deployer';

import { createDeployParams, waitForContractDeploy } from './utils';
// import { zeroAddress } from './utils';
// import {
//     buildJettonOnchainMetadata,
//     burn,
//     mintBody,
//     readJettonMetadata,
//     transfer,
//     updateMetadataBody
// } from './jetton-minter';
// import { changeAdminBody, JettonMetaDataKeys } from './jetton-minter';
// import { getClient } from './get-ton-client';
// import { makeGetCall } from './make-get-call';
// import { SendTransactionRequest, TonConnectUI } from '@tonconnect/ui-react';

import { JettonBalance, JettonInfo } from '@ton-api/client';
import { Address, toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';

import { tonApiClient } from 'src/shared';

export const JETTON_DEPLOY_GAS = toNano(0.25);

export enum JettonDeployState {
    NOT_STARTED,
    BALANCE_CHECK,
    UPLOAD_IMAGE,
    UPLOAD_METADATA,
    AWAITING_MINTER_DEPLOY,
    AWAITING_JWALLET_DEPLOY,
    VERIFY_MINT,
    ALREADY_DEPLOYED,
    DONE
}

export interface JettonDeployParams {
    onchainMetaData?: {
        name: string;
        symbol: string;
        description?: string;
        image?: string;
        decimals?: string;
    };
    offchainUri?: string;
    owner: Address;
    amountToMint: bigint;
}

export interface JettonData {
    minter: JettonInfo;
    jettonWallet: {
        balance: bigint;
        jWalletAddress: Address;
        jettonMasterAddress: Address;
    } | null;
}

export class JettonDeployController {
    async createJetton(params: JettonDeployParams, tonConnection: TonConnectUI): Promise<Address> {
        const contractDeployer = new ContractDeployer();
        // const balance = await tc.getBalance(params.owner);
        const balance = await tonApiClient.accounts.getAccount(params.owner).then(v => v.balance);

        if (balance < JETTON_DEPLOY_GAS) throw new Error('Not enough balance in deployer wallet');

        const deployParams = await createDeployParams(params, params.offchainUri);
        const contractAddr = contractDeployer.addressForContract(deployParams);

        const isDeployed = await tonApiClient.accounts
            .getAccount(contractAddr)
            .then(v => v.status === 'active');

        if (!isDeployed) {
            await contractDeployer.deployContract(deployParams, tonConnection);
            await waitForContractDeploy(contractAddr, tonApiClient);
        }

        const ownerJWalletAddr = await tonApiClient.accounts
            .getAccountJettonBalance(contractAddr, params.owner)
            .then(v => v.walletAddress.address);

        await waitForContractDeploy(ownerJWalletAddr, tonApiClient);

        return contractAddr;
    }

    // async burnAdmin(contractAddress: Address, tonConnection: TonConnectUI, walletAddress: string) {
    //     const waiter = await waitForSeqno(walletAddress);

    //     const tx: SendTransactionRequest = {
    //         validUntil: Date.now() + 5 * 60 * 1000,
    //         messages: [
    //             {
    //                 address: contractAddress.toString(),
    //                 amount: toNano(0.01).toString(),
    //                 stateInit: undefined,
    //                 payload: changeAdminBody(zeroAddress()).toBoc().toString('base64')
    //             }
    //         ]
    //     };

    //     await tonConnection.sendTransaction(tx);
    //     await waiter();
    // }

    // async mint(
    //     tonConnection: TonConnectUI,
    //     jettonMaster: Address,
    //     amount: bigint,
    //     walletAddress: string
    // ) {
    //     const waiter = await waitForSeqno(walletAddress);

    //     const tx: SendTransactionRequest = {
    //         validUntil: Date.now() + 5 * 60 * 1000,
    //         messages: [
    //             {
    //                 address: jettonMaster.toString(),
    //                 amount: toNano(0.04).toString(),
    //                 stateInit: undefined,
    //                 payload: mintBody(Address.parse(walletAddress), amount, toNano(0.02), 0)
    //                     .toBoc()
    //                     .toString('base64')
    //             }
    //         ]
    //     };

    //     await tonConnection.sendTransaction(tx);
    //     await waiter();
    // }

    // async transfer(
    //     tonConnection: TonConnectUI,
    //     amount: bigint,
    //     toAddress: string,
    //     fromAddress: string,
    //     ownerJettonWallet: string
    // ) {
    //     const waiter = await waitForSeqno(fromAddress);

    //     const tx: SendTransactionRequest = {
    //         validUntil: Date.now() + 5 * 60 * 1000,
    //         messages: [
    //             {
    //                 address: ownerJettonWallet,
    //                 amount: toNano(0.05).toString(),
    //                 stateInit: undefined,
    //                 payload: transfer(Address.parse(toAddress), Address.parse(fromAddress), amount)
    //                     .toBoc()
    //                     .toString('base64')
    //             }
    //         ]
    //     };

    //     await tonConnection.sendTransaction(tx);

    //     await waiter();
    // }

    // async burnJettons(
    //     tonConnection: TonConnectUI,
    //     amount: bigint,
    //     jettonAddress: string,
    //     walletAddress: string
    // ) {
    //     const waiter = await waitForSeqno(walletAddress);

    //     const tx: SendTransactionRequest = {
    //         validUntil: Date.now() + 5 * 60 * 1000,
    //         messages: [
    //             {
    //                 address: jettonAddress,
    //                 amount: toNano(0.031).toString(),
    //                 stateInit: undefined,
    //                 payload: burn(amount, Address.parse(walletAddress)).toBoc().toString('base64')
    //             }
    //         ]
    //     };

    //     await tonConnection.sendTransaction(tx);

    //     await waiter();
    // }

    static async getJettonDetails(
        contractAddr: Address,
        userAddress: Address
    ): Promise<JettonData> {
        // const minter = await makeGetCall(contractAddr, 'get_jetton_data', null, tc).then(
        //     async reader => {
        //         const totalSupply = reader.readBigNumber();
        //         reader.readBigNumber();
        //         const admin = reader.readAddress();
        //         const contentCell = await readJettonMetadata(reader.readCell());

        //         return {
        //             ...contentCell,
        //             totalSupply,
        //             admin
        //         };
        //     }
        // );

        // const jWalletAddress = await makeGetCall(
        //     contractAddr,
        //     'get_wallet_address',
        //     beginCell().storeAddress(owner).endCell(),
        //     tc
        // ).then(reader => reader.readAddress());

        // TODO make it easier
        const minter = await tonApiClient.jettons.getJettonInfo(contractAddr);
        const userJettonWallet: JettonBalance = await tonApiClient.accounts.getAccountJettonBalance(
            userAddress,
            contractAddr
        );
        const isDeployed = userJettonWallet.balance !== '';

        const jettonWallet = isDeployed
            ? {
                  balance: BigInt(userJettonWallet.balance),
                  jWalletAddress: userJettonWallet.walletAddress.address,
                  jettonMasterAddress: contractAddr
              }
            : null;

        return {
            minter,
            jettonWallet
        };
    }

    // async updateMetadata(
    //     contractAddress: Address,
    //     data: {
    //         [s in JettonMetaDataKeys]?: string | undefined;
    //     },
    //     connection: TonConnectUI,
    //     walletAddress: string
    // ) {
    //     const waiter = await waitForSeqno(walletAddress);
    //     const metadata = await buildJettonOnchainMetadata(data);

    //     const tx: SendTransactionRequest = {
    //         validUntil: Date.now() + 5 * 60 * 1000,
    //         messages: [
    //             {
    //                 address: contractAddress.toString(),
    //                 amount: toNano(0.01).toString(),
    //                 stateInit: undefined,
    //                 payload: updateMetadataBody(metadata).toBoc().toString('base64')
    //             }
    //         ]
    //     };

    //     await connection.sendTransaction(tx);

    //     await waiter();
    // }
}

const jettonDeployController = new JettonDeployController();
export { jettonDeployController };