import { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { H4, Overlay } from 'src/shared';
import {
    CreateInvoiceModal,
    FilterInvoiceByStatus,
    InvoicesProjectInfo,
    InvoicesSearchInput,
    InvoicesTable
} from 'src/features';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';

const ManageInvoicesPage: FunctionComponent = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Overlay display="flex" flexDirection="column">
            <H4 mb="1">Invoices</H4>
            <InvoicesProjectInfo mb="5" />
            <Flex gap="4" mb="9">
                <InvoicesSearchInput w="264px" />
                <FilterInvoiceByStatus />
                <Button h="44px" ml="auto" onClick={onOpen} variant="primary">
                    New Invoice
                </Button>
            </Flex>
            <InvoicesTable flex="1 1 auto" />
            <CreateInvoiceModal isOpen={isOpen} onClose={onClose} />
        </Overlay>
    );
};

export default observer(ManageInvoicesPage);
