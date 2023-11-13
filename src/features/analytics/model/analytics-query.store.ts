import { makeAutoObservable } from 'mobx';
import {
    apiClient,
    createAsyncAction,
    DTOStatsEstimateQuery,
    DTOStatsQueryResult,
    DTOStatsQueryStatus,
    Loadable,
    TonCurrencyAmount
} from 'src/shared';
import { AnalyticsQuery, AnalyticsQueryTemplate } from './interfaces';
import { projectsStore } from 'src/entities';

class AnalyticsQueryStore {
    request$ = new Loadable<AnalyticsQueryTemplate | null>(null);

    query$ = new Loadable<AnalyticsQuery | null>(null);

    get requestEqQuery(): boolean {
        return this.request$.value?.request === this.query$.value?.request;
    }

    constructor() {
        makeAutoObservable(this);
    }

    public estimateRequest = this.request$.createAsyncAction(async (request: string) => {
        try {
            const result = await apiClient.api.estimateStatsQuery({
                project_id: projectsStore.selectedProject!.id,
                query: request
            });

            return mapDTOStatsEstimateSQLToAnalyticsQuery(request, result.data);
        } catch (e) {
            const errText =
                (
                    e as { response: { data: { error: string } } }
                )?.response?.data?.error?.toString() || 'Unknown error';

            throw new Error(errText);
        }
    });

    createQuery = this.query$.createAsyncAction(async () => {
        const result = await apiClient.api.sendQueryToStats({
            project_id: projectsStore.selectedProject!.id,
            query: this.request$.value!.request
        });

        return mapDTOStatsSqlResultToAnalyticsQuery(result.data);
    });

    refetchQuery = this.query$.createAsyncAction(async () => {
        const result = await apiClient.api.getSqlResultFromStats(this.query$.value!.id);

        return mapDTOStatsSqlResultToAnalyticsQuery(result.data);
    });

    loadQueryAndRequest = createAsyncAction(async (id: string) => {
        this.clearRequest();
        this.query$.clear();

        this.request$.setStartLoading();
        this.query$.setStartLoading();

        const result = await apiClient.api.getSqlResultFromStats(id);
        const query = mapDTOStatsSqlResultToAnalyticsQuery(result.data);

        this.request$.setValue({
            estimatedTimeMS: query.estimatedTimeMS,
            estimatedCost: query.estimatedCost,
            request: query.request
        });

        this.query$.setValue(query);

        this.request$.setEndLoading();
        this.query$.setEndLoading();
    });

    clearRequest = (): void => {
        this.estimateRequest.cancelAllPendingCalls();
        this.request$.clear();
    };

    clear(): void {
        this.request$.clear();
        this.query$.clear();
    }
}

function mapDTOStatsEstimateSQLToAnalyticsQuery(
    request: string,
    value: DTOStatsEstimateQuery
): AnalyticsQueryTemplate {
    return {
        request,
        estimatedTimeMS: Math.ceil(value.approximate_time * 1000),
        estimatedCost: new TonCurrencyAmount(value.approximate_cost)
    };
}

export function mapDTOStatsSqlResultToAnalyticsQuery(value: DTOStatsQueryResult): AnalyticsQuery {
    const basicQuery = {
        type: 'query',
        id: value.id,
        creationDate: new Date(value.date_create),
        request: value.query!.sql!,
        estimatedTimeMS: value.estimate!.approximate_time,
        estimatedCost: new TonCurrencyAmount(value.estimate!.approximate_cost)
    } as const;

    if (value.status === DTOStatsQueryStatus.DTOExecuting) {
        return {
            ...basicQuery,
            status: 'executing'
        };
    }

    if (value.status === DTOStatsQueryStatus.DTOSuccess) {
        return {
            ...basicQuery,
            status: 'success',
            cost: new TonCurrencyAmount(value.cost!),
            spentTimeMS: value.spent_time! * 1000,
            csvUrl: value.url!,
            preview: {
                headings: [],
                data: []
            }
        };
    }

    return {
        ...basicQuery,
        status: 'error',
        cost: new TonCurrencyAmount(value.cost!),
        spentTimeMS: value.spent_time! * 1000,
        errorReason: value.error!
    };
}

export const analyticsQueryStore = new AnalyticsQueryStore();
