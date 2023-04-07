import NodeCache from "node-cache";
import type { IGetLeaderboardResult } from "./getLeadboard.queries";

export class LeaderboardCache {
  constructor(public cache: NodeCache) {}

  set(key: string, value: IGetLeaderboardResult[]): boolean {
    return this.cache.set(key, value, 5 * 60);
  }

  get(key: string): IGetLeaderboardResult[] | undefined {
    return this.cache.get<IGetLeaderboardResult[]>(key);
  }
}

const leaderboardCache = new LeaderboardCache(new NodeCache());

export default leaderboardCache;
