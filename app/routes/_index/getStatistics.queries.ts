/** Types generated for queries found in "app/routes/_index/getStatistics.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetStatistics' parameters type */
export type IGetStatisticsParams = void;

/** 'GetStatistics' return type */
export interface IGetStatisticsResult {
  category: string;
  count: string;
  created_at: Date;
  name: string;
  updated_at: Date;
}

/** 'GetStatistics' query type */
export interface IGetStatisticsQuery {
  params: IGetStatisticsParams;
  result: IGetStatisticsResult;
}

const getStatisticsIR: any = {"usedParamSet":{},"params":[],"statement":"select *\nfrom app_public.bot_stats"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from app_public.bot_stats
 * ```
 */
export const getStatistics = new PreparedQuery<IGetStatisticsParams,IGetStatisticsResult>(getStatisticsIR);


