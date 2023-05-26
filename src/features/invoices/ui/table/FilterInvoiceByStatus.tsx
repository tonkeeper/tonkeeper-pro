import { ComponentProps, FunctionComponent } from 'react';
import {
    Box,
    Button,
    Center,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { ArrowIcon, MenuButtonStyled, Span, TickIcon } from 'src/shared';
import { invoicesTableStore, InvoiceStatus } from '../../models';
import { invoiceBadges } from './InvoiceStatusBadge';

const FilterInvoiceByStatus: FunctionComponent<ComponentProps<typeof Box>> = props => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Menu
            closeOnSelect={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            placement="bottom-start"
            {...props}
        >
            <MenuButton
                as={MenuButtonStyled}
                w="fit-content"
                h="fit-content"
                px="4"
                py="3"
                rightIcon={<ArrowIcon />}
            >
                <Flex textStyle="label2" gap="2">
                    Filter by status{' '}
                    {!!invoicesTableStore.pagination.filter.status?.length && (
                        <Center
                            textStyle="label3"
                            w="5"
                            h="5"
                            color="icon.contrast"
                            borderRadius="100%"
                            bgColor="text.primary"
                        >
                            {invoicesTableStore.pagination.filter.status.length}
                        </Center>
                    )}
                </Flex>
            </MenuButton>
            <MenuList zIndex={100} w="240px">
                <Flex justify="space-between" mb="2" pt="2" px="1" color="text.secondary">
                    <Span textStyle="label2">Display only</Span>
                    <Button
                        h="fit-content"
                        p="0"
                        onClick={() => {
                            invoicesTableStore.clearFilterByStatus();
                            onClose();
                        }}
                        variant="flat"
                    >
                        <Span color="text.secondary" textStyle="body2">
                            Clear all
                        </Span>
                    </Button>
                </Flex>
                {Object.keys(InvoiceStatus).map(status => (
                    <MenuItem
                        key={status}
                        onClick={e => {
                            e.preventDefault();
                            invoicesTableStore.toggleFilterByStatus(status as InvoiceStatus);
                        }}
                    >
                        <Checkbox
                            icon={<TickIcon w="12px" />}
                            id="subtractFeeFromAmount"
                            isChecked={invoicesTableStore.pagination.filter.status?.includes(
                                status as InvoiceStatus
                            )}
                        >
                            {invoiceBadges[status as InvoiceStatus].label}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default observer(FilterInvoiceByStatus);
