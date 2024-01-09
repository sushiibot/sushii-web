import type { Insertable, Selectable, Updateable } from "kysely";
import type { AppPublicUserLevels } from "../types";

export type UserLevelRow = Selectable<AppPublicUserLevels>;
export type InsertableUserLevelRow = Insertable<AppPublicUserLevels>;
export type UpdateableUserLevelRow = Updateable<AppPublicUserLevels>;
