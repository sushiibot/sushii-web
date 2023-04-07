import type { StatsCardProps } from "~/components/Statistics/Staticstic";
import type { IGetStatisticsResult } from "./getStatistics.queries";

export function parseStatistics(
  rawStats: IGetStatisticsResult[]
): StatsCardProps[] {
  return rawStats.map((stat) => ({
    name: stat.name,
    value: stat.count,
  }));
}
