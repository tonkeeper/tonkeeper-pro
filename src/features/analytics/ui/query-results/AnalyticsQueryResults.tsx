import { ComponentProps, FunctionComponent, useCallback } from 'react';
import { Box, Button, Center, Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import { ButtonLink, DownloadIcon16, RefreshIcon16, Span, useIntervalUpdate } from 'src/shared';
import { observer } from 'mobx-react-lite';
import { analyticsQueryStore, isAnalyticsQuerySuccessful } from '../../model';
import { AnalyticsQueryResultsCountdown } from './AnalyticsQueryResultsCountdown';
import { toJS } from 'mobx';
import { AnalyticsTable } from './AnalyticsQueryResultsTable';
import RepeatRequestModal from './RepeatRequestModal';
import { formatRepeatInterval } from '../utils';

const AnalyticsQueryResults: FunctionComponent<ComponentProps<typeof Box>> = props => {
    const query = analyticsQueryStore.query$.value;
    const { isOpen, onClose, onOpen } = useDisclosure();

    const callback = useCallback(() => {
        if (query?.status === 'executing') {
            analyticsQueryStore.refetchQuery();
        }
    }, [query?.status]);
    useIntervalUpdate(callback, 1000);

    const repeatInterval = formatRepeatInterval(query?.repeatFrequencyMs);

    return (
        <Flex direction="column" {...props}>
            <Flex align="center" h="8" mb="3">
                <Span textStyle="label1">Query Results</Span>
                {query?.status === 'executing' && (
                    <AnalyticsQueryResultsCountdown query={toJS(query)} ml="2" />
                )}
                {query && isAnalyticsQuerySuccessful(query) && (
                    <Flex align="center" justify="space-between" flex="1" pl="3">
                        {!query.preview.isAllDataPresented && (
                            <Span mr="3" color="text.secondary" textStyle="body2">
                                The first {query.preview.data.length} lines are shown; download the
                                rest for the full results
                            </Span>
                        )}
                        <Flex gap="2" ml="auto">
                            <Button
                                isLoading={analyticsQueryStore.isQueryIntervalUpdateLoading}
                                leftIcon={<RefreshIcon16 color="icon.primary" />}
                                onClick={onOpen}
                                size="sm"
                                variant="secondary"
                            >
                                Repeat Request
                                {!!query.repeatFrequencyMs && (
                                    <Span color="text.secondary">
                                        &nbsp;·&nbsp;{repeatInterval}
                                    </Span>
                                )}
                            </Button>
                            <ButtonLink
                                leftIcon={<DownloadIcon16 />}
                                size="sm"
                                variant="secondary"
                                href={query.csvUrl}
                                isExternal
                                download="customers.csv"
                            >
                                Download CSV
                            </ButtonLink>
                        </Flex>
                    </Flex>
                )}
            </Flex>
            {query?.status !== 'success' && (
                <Center h="10">
                    {!query && 'No data available'}
                    {query?.status === 'executing' && <Spinner color="icon.secondary" size="sm" />}
                    {query?.status === 'error' && (
                        <Box w="100%">
                            <Box textStyle="body1" mb="1" textAlign="center">
                                Data loading error
                            </Box>
                            <Box textStyle="body3" fontFamily="mono">
                                {query.errorReason}
                            </Box>
                        </Box>
                    )}
                </Center>
            )}
            {query?.status === 'success' && (
                <AnalyticsTable flex="1" source={toJS(query.preview)} />
            )}
            <RepeatRequestModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default observer(AnalyticsQueryResults);
