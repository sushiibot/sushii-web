import type { Insertable, Selectable, Updateable } from "kysely";

import type { AppPublicBotStats } from "../types";

export type BotStatRow = Selectable<AppPublicBotStats>;
export type InsertableBotStatRow = Insertable<AppPublicBotStats>;
export type UpdateableBotStatRow = Updateable<AppPublicBotStats>;
