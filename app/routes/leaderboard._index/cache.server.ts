import NodeCache from "node-cache";
import type { UserRank } from "~/db/Leaderboard/Leaderboard.server";

export class LeaderboardCache {
  private cache = new NodeCache();

  constructor() {
    this.cache = new NodeCache();
  }

  set(key: string, value: UserRank[]): boolean {
    return this.cache.set(key, value, 5 * 60);
  }

  get(key: string): UserRank[] | undefined {
    return this.cache.get<UserRank[]>(key);
  }
}

const leaderboardCache = new LeaderboardCache();

export default leaderboardCache;
