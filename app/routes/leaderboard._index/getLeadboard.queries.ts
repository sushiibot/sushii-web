/** Types generated for queries found in "app/routes/leaderboard._index/getLeadboard.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type level_timeframe = 'ALL_TIME' | 'DAY' | 'MONTH' | 'WEEK';

/** 'GetLeaderboard' parameters type */
export interface IGetLeaderboardParams {
  guildId?: number | string | null | void;
  offset?: number | string | null | void;
  timeframe?: level_timeframe | null | void;
}

/** 'GetLeaderboard' return type */
export interface IGetLeaderboardResult {
  avatar_url: string | null;
  current_level: string | null;
  discriminator: number | null;
  gained_levels: string | null;
  next_level_xp_progress: string | null;
  next_level_xp_required: string | null;
  user_id: string | null;
  username: string | null;
  xp: string | null;
  xp_diff: string | null;
}

/** 'GetLeaderboard' query type */
export interface IGetLeaderboardQuery {
  params: IGetLeaderboardParams;
  result: IGetLeaderboardResult;
}

const getLeaderboardIR: any = {"usedParamSet":{"timeframe":true,"guildId":true,"offset":true},"params":[{"name":"timeframe","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":56}]},{"name":"guildId","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":66}]},{"name":"offset","required":false,"transform":{"type":"scalar"},"locs":[{"a":86,"b":92}]}],"statement":"select *\nfrom app_public.timeframe_user_levels(:timeframe, :guildId)\nlimit 100\noffset :offset"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from app_public.timeframe_user_levels(:timeframe, :guildId)
 * limit 100
 * offset :offset
 * ```
 */
export const getLeaderboard = new PreparedQuery<IGetLeaderboardParams,IGetLeaderboardResult>(getLeaderboardIR);


