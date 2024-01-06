import type { ColumnType } from "kysely";
import type { IPostgresInterval } from "postgres-interval";

export type AppPrivateDeploymentName = "blue" | "green";

export type AppPublicBanPoolAddAction = "ask" | "ban" | "nothing" | "timeout_and_ask";

export type AppPublicBanPoolAddMode = "all_bans" | "manual" | "nothing";

export type AppPublicBanPoolPermission = "blocked" | "edit" | "owner" | "view";

export type AppPublicBanPoolRemoveAction = "ask" | "nothing" | "unban";

export type AppPublicBanPoolRemoveMode = "all_unbans" | "manual" | "nothing";

export type AppPublicBlockType = "channel" | "role";

export type AppPublicEmojiStickerActionType = "message" | "reaction";

export type AppPublicGiveawayNitroType = "nitro" | "none";

export type AppPublicGuildAssetType = "emoji" | "sticker";

export type AppPublicLevelRoleOverrideType = "block" | "grant";

export type AppPublicMsgLogBlockType = "all" | "deletes" | "edits";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Interval = ColumnType<IPostgresInterval, IPostgresInterval | number, IPostgresInterval | number>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface _TimescaledbCatalogChunk {
  compressed_chunk_id: number | null;
  dropped: Generated<boolean>;
  hypertable_id: number;
  id: Generated<number>;
  schema_name: string;
  status: Generated<number>;
  table_name: string;
}

export interface _TimescaledbCatalogChunkConstraint {
  chunk_id: number;
  constraint_name: string;
  dimension_slice_id: number | null;
  hypertable_constraint_name: string | null;
}

export interface _TimescaledbCatalogChunkCopyOperation {
  backend_pid: number;
  chunk_id: number;
  completed_stage: string;
  delete_on_source_node: boolean;
  dest_node_name: string;
  operation_id: string;
  source_node_name: string;
  time_start: Generated<Timestamp>;
}

export interface _TimescaledbCatalogChunkDataNode {
  chunk_id: number;
  node_chunk_id: number;
  node_name: string;
}

export interface _TimescaledbCatalogChunkIndex {
  chunk_id: number;
  hypertable_id: number;
  hypertable_index_name: string;
  index_name: string;
}

export interface _TimescaledbCatalogCompressionAlgorithm {
  description: string | null;
  id: number;
  name: string;
  version: number;
}

export interface _TimescaledbCatalogCompressionChunkSize {
  chunk_id: number;
  compressed_chunk_id: number;
  compressed_heap_size: Int8;
  compressed_index_size: Int8;
  compressed_toast_size: Int8;
  numrows_post_compression: Int8 | null;
  numrows_pre_compression: Int8 | null;
  uncompressed_heap_size: Int8;
  uncompressed_index_size: Int8;
  uncompressed_toast_size: Int8;
}

export interface _TimescaledbCatalogContinuousAgg {
  bucket_width: Int8;
  direct_view_name: string;
  direct_view_schema: string;
  mat_hypertable_id: number;
  materialized_only: Generated<boolean>;
  partial_view_name: string;
  partial_view_schema: string;
  raw_hypertable_id: number;
  user_view_name: string;
  user_view_schema: string;
}

export interface _TimescaledbCatalogContinuousAggsBucketFunction {
  bucket_width: string;
  experimental: boolean;
  mat_hypertable_id: number;
  name: string;
  origin: string;
  timezone: string;
}

export interface _TimescaledbCatalogContinuousAggsHypertableInvalidationLog {
  greatest_modified_value: Int8;
  hypertable_id: number;
  lowest_modified_value: Int8;
}

export interface _TimescaledbCatalogContinuousAggsInvalidationThreshold {
  hypertable_id: number;
  watermark: Int8;
}

export interface _TimescaledbCatalogContinuousAggsMaterializationInvalidationLog {
  greatest_modified_value: Int8;
  lowest_modified_value: Int8;
  materialization_id: number | null;
}

export interface _TimescaledbCatalogDimension {
  aligned: boolean;
  column_name: string;
  column_type: string;
  hypertable_id: number;
  id: Generated<number>;
  integer_now_func: string | null;
  integer_now_func_schema: string | null;
  interval_length: Int8 | null;
  num_slices: number | null;
  partitioning_func: string | null;
  partitioning_func_schema: string | null;
}

export interface _TimescaledbCatalogDimensionSlice {
  dimension_id: number;
  id: Generated<number>;
  range_end: Int8;
  range_start: Int8;
}

export interface _TimescaledbCatalogHypertable {
  associated_schema_name: string;
  associated_table_prefix: string;
  chunk_sizing_func_name: string;
  chunk_sizing_func_schema: string;
  chunk_target_size: Int8;
  compressed_hypertable_id: number | null;
  compression_state: Generated<number>;
  id: Generated<number>;
  num_dimensions: number;
  replication_factor: number | null;
  schema_name: string;
  table_name: string;
}

export interface _TimescaledbCatalogHypertableCompression {
  attname: string;
  compression_algorithm_id: number | null;
  hypertable_id: number;
  orderby_asc: boolean | null;
  orderby_column_index: number | null;
  orderby_nullsfirst: boolean | null;
  segmentby_column_index: number | null;
}

export interface _TimescaledbCatalogHypertableDataNode {
  block_chunks: boolean;
  hypertable_id: number;
  node_hypertable_id: number | null;
  node_name: string;
}

export interface _TimescaledbCatalogMetadata {
  include_in_telemetry: boolean;
  key: string;
  value: string;
}

export interface _TimescaledbCatalogRemoteTxn {
  data_node_name: string | null;
  remote_transaction_id: string;
}

export interface _TimescaledbCatalogTablespace {
  hypertable_id: number;
  id: Generated<number>;
  tablespace_name: string;
}

export interface _TimescaledbConfigBgwJob {
  application_name: string;
  config: Json | null;
  hypertable_id: number | null;
  id: Generated<number>;
  max_retries: number;
  max_runtime: Interval;
  owner: Generated<string>;
  proc_name: string;
  proc_schema: string;
  retry_period: Interval;
  schedule_interval: Interval;
  scheduled: Generated<boolean>;
}

export interface _TimescaledbInternalBgwJobStat {
  consecutive_crashes: number;
  consecutive_failures: number;
  job_id: number;
  last_finish: Timestamp;
  last_run_success: boolean;
  last_start: Generated<Timestamp>;
  last_successful_finish: Timestamp;
  next_start: Timestamp;
  total_crashes: Int8;
  total_duration: Interval;
  total_failures: Int8;
  total_runs: Int8;
  total_successes: Int8;
}

export interface _TimescaledbInternalBgwPolicyChunkStats {
  chunk_id: number;
  job_id: number;
  last_time_job_run: Timestamp | null;
  num_times_job_run: number | null;
}

export interface _TimescaledbInternalCompressedChunkStats {
  chunk_name: string | null;
  chunk_schema: string | null;
  compressed_heap_size: Int8 | null;
  compressed_index_size: Int8 | null;
  compressed_toast_size: Int8 | null;
  compressed_total_size: Int8 | null;
  compression_status: string | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  uncompressed_heap_size: Int8 | null;
  uncompressed_index_size: Int8 | null;
  uncompressed_toast_size: Int8 | null;
  uncompressed_total_size: Int8 | null;
}

export interface _TimescaledbInternalHypertableChunkLocalSize {
  chunk_id: number | null;
  chunk_name: string | null;
  chunk_schema: string | null;
  compressed_heap_size: Int8 | null;
  compressed_index_size: Int8 | null;
  compressed_toast_size: Int8 | null;
  compressed_total_size: Int8 | null;
  hypertable_id: number | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  index_bytes: Int8 | null;
  toast_bytes: Int8 | null;
  total_bytes: Int8 | null;
}

export interface AppHiddenFailures {
  attempt_count: number;
  failure_id: string;
  last_attempt: Timestamp;
  max_attempts: Generated<number>;
  next_attempt: Generated<Timestamp>;
}

export interface AppPrivateActiveDeployment {
  id: Generated<number>;
  name: AppPrivateDeploymentName;
}

export interface AppPrivateSessions {
  created_at: Generated<Timestamp>;
  last_active: Generated<Timestamp>;
  user_id: Int8;
  uuid: Generated<string>;
}

export interface AppPrivateUserAuthenticationSecrets {
  details: Generated<Json>;
  user_id: Int8;
}

export interface AppPublicBanPoolEntries {
  owner_guild_id: Int8;
  pool_name: string;
  reason: string | null;
  source_guild_id: Int8;
  user_id: Int8;
}

export interface AppPublicBanPoolGuildSettings {
  alert_channel_id: Int8 | null;
  guild_id: Int8;
}

export interface AppPublicBanPoolInvites {
  expires_at: Timestamp | null;
  invite_code: string;
  max_uses: number | null;
  owner_guild_id: Int8;
  pool_name: string;
  uses: Generated<number>;
}

export interface AppPublicBanPoolMembers {
  add_action: Generated<AppPublicBanPoolAddAction>;
  add_mode: Generated<AppPublicBanPoolAddMode>;
  member_guild_id: Int8;
  owner_guild_id: Int8;
  permission: Generated<AppPublicBanPoolPermission>;
  pool_name: string;
  remove_action: Generated<AppPublicBanPoolRemoveAction>;
  remove_mode: Generated<AppPublicBanPoolRemoveMode>;
}

export interface AppPublicBanPools {
  created_at: Generated<Timestamp>;
  creator_id: Int8;
  description: string | null;
  guild_id: Int8;
  id: Generated<number>;
  pool_name: string;
  updated_at: Generated<Timestamp>;
}

export interface AppPublicBotStats {
  category: string;
  count: Int8;
  created_at: Generated<Timestamp>;
  name: string;
  updated_at: Generated<Timestamp>;
}

export interface AppPublicCachedGuilds {
  banner: string | null;
  created_at: Generated<Timestamp>;
  features: Generated<string[]>;
  icon: string | null;
  id: Int8;
  name: string;
  splash: string | null;
  updated_at: Generated<Timestamp>;
}

export interface AppPublicCachedUsers {
  avatar_url: string;
  discriminator: number;
  id: Int8;
  last_checked: Timestamp;
  name: string;
}

export interface AppPublicEmojiStickerStats {
  action_type: AppPublicEmojiStickerActionType;
  asset_id: Int8;
  count: Int8;
  count_external: Generated<Int8>;
  guild_id: Int8;
  time: Generated<Timestamp>;
}

export interface AppPublicEmojiStickerStatsRateLimits {
  action_type: AppPublicEmojiStickerActionType;
  asset_id: Int8;
  last_used: Generated<Timestamp>;
  user_id: Int8;
}

export interface AppPublicFeedItems {
  feed_id: string;
  item_id: string;
}

export interface AppPublicFeeds {
  feed_id: string;
  metadata: Json | null;
}

export interface AppPublicFeedSubscriptions {
  channel_id: Int8;
  feed_id: string;
  guild_id: Int8;
  mention_role: Int8 | null;
}

export interface AppPublicGiveawayEntries {
  created_at: Generated<Timestamp>;
  giveaway_id: Int8;
  is_picked: Generated<boolean>;
  user_id: Int8;
}

export interface AppPublicGiveaways {
  channel_id: Int8;
  end_at: Timestamp;
  guild_id: Int8;
  host_user_id: Int8;
  id: Int8;
  is_ended: Generated<boolean>;
  num_winners: number;
  prize: string;
  required_boosting: boolean | null;
  required_max_level: number | null;
  required_min_level: number | null;
  required_nitro_state: AppPublicGiveawayNitroType | null;
  required_role_id: Int8 | null;
  start_at: Timestamp;
}

export interface AppPublicGuildBans {
  guild_id: Int8;
  user_id: Int8;
}

export interface AppPublicGuildConfigs {
  data: Generated<Json>;
  disabled_channels: Int8[] | null;
  id: Int8;
  join_msg: string | null;
  join_msg_enabled: Generated<boolean>;
  join_react: string | null;
  leave_msg: string | null;
  leave_msg_enabled: Generated<boolean>;
  log_member: Int8 | null;
  log_member_enabled: Generated<boolean>;
  log_mod: Int8 | null;
  log_mod_enabled: Generated<boolean>;
  log_msg: Int8 | null;
  log_msg_enabled: Generated<boolean>;
  lookup_details_opt_in: Generated<boolean>;
  lookup_prompted: Generated<boolean>;
  msg_channel: Int8 | null;
  mute_dm_enabled: Generated<boolean>;
  mute_dm_text: string | null;
  prefix: string | null;
  role_channel: Int8 | null;
  role_config: Json | null;
  role_enabled: Generated<boolean>;
  warn_dm_enabled: Generated<boolean>;
  warn_dm_text: string | null;
}

export interface AppPublicGuildEmojisAndStickers {
  guild_id: Int8;
  id: Int8;
  name: string;
  type: AppPublicGuildAssetType;
}

export interface AppPublicLevelRoleApplyJobs {
  channel_id: Int8;
  created_at: Generated<Timestamp>;
  guild_id: Int8;
  interaction_id: Int8;
  members_applied: Generated<Int8>;
  members_not_found: Generated<Int8>;
  members_skipped: Generated<Int8>;
  members_total: Int8;
  members_total_processed: Generated<Int8>;
  message_id: Int8;
  notify_user_id: Int8;
  requests_processed: Generated<Int8>;
  requests_total: Int8 | null;
  updated_at: Generated<Timestamp>;
}

export interface AppPublicLevelRoleOverrides {
  guild_id: Int8;
  role_id: Int8;
  type: AppPublicLevelRoleOverrideType;
  user_id: Int8;
}

export interface AppPublicLevelRoles {
  add_level: Int8 | null;
  guild_id: Int8;
  remove_level: Int8 | null;
  role_id: Int8;
}

export interface AppPublicLookupGroupInvites {
  expires_at: Timestamp | null;
  invite_code: string;
  name: string;
  owner_guild_id: Int8;
}

export interface AppPublicLookupGroupMembers {
  member_guild_id: Int8;
  name: string;
  owner_guild_id: Int8;
}

export interface AppPublicLookupGroups {
  creator_id: Int8;
  description: string | null;
  guild_id: Int8;
  id: Generated<number>;
  name: string;
}

export interface AppPublicMembers {
  guild_id: Int8;
  join_time: Timestamp;
  user_id: Int8;
}

export interface AppPublicMessages {
  author_id: Int8;
  channel_id: Int8;
  content: string;
  created: Timestamp;
  guild_id: Int8;
  message_id: Int8;
  msg: Json;
}

export interface AppPublicModLogs {
  action: string;
  action_time: Timestamp;
  attachments: Generated<string[]>;
  case_id: Int8;
  executor_id: Int8 | null;
  guild_id: Int8;
  msg_id: Int8 | null;
  pending: boolean;
  reason: string | null;
  user_id: Int8;
  user_tag: string;
}

export interface AppPublicMsgLogBlocks {
  block_type: AppPublicMsgLogBlockType;
  channel_id: Int8;
  guild_id: Int8;
}

export interface AppPublicMutes {
  case_id: Int8 | null;
  end_time: Timestamp | null;
  guild_id: Int8;
  pending: Generated<boolean>;
  start_time: Timestamp;
  user_id: Int8;
}

export interface AppPublicNotifications {
  guild_id: Int8;
  keyword: string;
  user_id: Int8;
}

export interface AppPublicReminders {
  description: string;
  expire_at: Timestamp;
  id: Int8;
  set_at: Timestamp;
  user_id: Int8;
}

export interface AppPublicRoleMenuRoles {
  description: string | null;
  emoji: string | null;
  guild_id: Int8;
  menu_name: string;
  position: number | null;
  role_id: Int8;
}

export interface AppPublicRoleMenus {
  description: string | null;
  guild_id: Int8;
  max_count: number | null;
  menu_name: string;
  required_role: Int8 | null;
}

export interface AppPublicTags {
  attachment: string | null;
  content: string;
  created: Timestamp;
  guild_id: Int8;
  owner_id: Int8;
  tag_name: string;
  use_count: Int8;
}

export interface AppPublicUserLevels {
  guild_id: Int8;
  last_msg: Timestamp;
  level: Generated<Int8>;
  msg_all_time: Int8;
  msg_day: Int8;
  msg_month: Int8;
  msg_week: Int8;
  user_id: Int8;
}

export interface AppPublicUsers {
  fishies: Int8;
  id: Int8;
  is_patron: boolean;
  last_fishies: Timestamp | null;
  last_rep: Timestamp | null;
  lastfm_username: string | null;
  patron_emoji: string | null;
  profile_data: Json | null;
  rep: Int8;
}

export interface AppPublicWebUserGuilds {
  guild_id: Int8;
  manage_guild: Generated<boolean | null>;
  owner: boolean;
  permissions: Int8;
  user_id: Int8;
}

export interface AppPublicWebUsers {
  avatar: string | null;
  created_at: Generated<Timestamp>;
  details: Generated<Json>;
  discriminator: number;
  id: Int8;
  is_admin: Generated<boolean>;
  updated_at: Generated<Timestamp>;
  username: string;
}

export interface AppPublicXpBlocks {
  block_id: Int8;
  block_type: AppPublicBlockType;
  guild_id: Int8;
}

export interface GraphileMigrateCurrent {
  content: string;
  date: Generated<Timestamp>;
  filename: Generated<string>;
}

export interface GraphileMigrateMigrations {
  date: Generated<Timestamp>;
  filename: string;
  hash: string;
  previous_hash: string | null;
}

export interface TimescaledbExperimentalChunkReplicationStatus {
  chunk_name: string | null;
  chunk_schema: string | null;
  desired_num_replicas: number | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  non_replica_nodes: string[] | null;
  num_replicas: Int8 | null;
  replica_nodes: string[] | null;
}

export interface TimescaledbInformationChunks {
  chunk_name: string | null;
  chunk_schema: string | null;
  chunk_tablespace: string | null;
  data_nodes: string[] | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  is_compressed: boolean | null;
  primary_dimension: string | null;
  primary_dimension_type: string | null;
  range_end: Timestamp | null;
  range_end_integer: Int8 | null;
  range_start: Timestamp | null;
  range_start_integer: Int8 | null;
}

export interface TimescaledbInformationCompressionSettings {
  attname: string | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  orderby_asc: boolean | null;
  orderby_column_index: number | null;
  orderby_nullsfirst: boolean | null;
  segmentby_column_index: number | null;
}

export interface TimescaledbInformationContinuousAggregates {
  compression_enabled: boolean | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  materialization_hypertable_name: string | null;
  materialization_hypertable_schema: string | null;
  materialized_only: boolean | null;
  view_definition: string | null;
  view_name: string | null;
  view_owner: string | null;
  view_schema: string | null;
}

export interface TimescaledbInformationDataNodes {
  node_name: string | null;
  options: string[] | null;
  owner: string | null;
}

export interface TimescaledbInformationDimensions {
  column_name: string | null;
  column_type: string | null;
  dimension_number: Int8 | null;
  dimension_type: string | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  integer_interval: Int8 | null;
  integer_now_func: string | null;
  num_partitions: number | null;
  time_interval: Interval | null;
}

export interface TimescaledbInformationHypertables {
  compression_enabled: boolean | null;
  data_nodes: string[] | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  is_distributed: boolean | null;
  num_chunks: Int8 | null;
  num_dimensions: number | null;
  owner: string | null;
  replication_factor: number | null;
  tablespaces: string[] | null;
}

export interface TimescaledbInformationJobs {
  application_name: string | null;
  config: Json | null;
  hypertable_name: string | null;
  hypertable_schema: string | null;
  job_id: number | null;
  max_retries: number | null;
  max_runtime: Interval | null;
  next_start: Timestamp | null;
  owner: string | null;
  proc_name: string | null;
  proc_schema: string | null;
  retry_period: Interval | null;
  schedule_interval: Interval | null;
  scheduled: boolean | null;
}

export interface TimescaledbInformationJobStats {
  hypertable_name: string | null;
  hypertable_schema: string | null;
  job_id: number | null;
  job_status: string | null;
  last_run_duration: Interval | null;
  last_run_started_at: Timestamp | null;
  last_run_status: string | null;
  last_successful_finish: Timestamp | null;
  next_start: Timestamp | null;
  total_failures: Int8 | null;
  total_runs: Int8 | null;
  total_successes: Int8 | null;
}

export interface DB {
  "_timescaledb_catalog.chunk": _TimescaledbCatalogChunk;
  "_timescaledb_catalog.chunk_constraint": _TimescaledbCatalogChunkConstraint;
  "_timescaledb_catalog.chunk_copy_operation": _TimescaledbCatalogChunkCopyOperation;
  "_timescaledb_catalog.chunk_data_node": _TimescaledbCatalogChunkDataNode;
  "_timescaledb_catalog.chunk_index": _TimescaledbCatalogChunkIndex;
  "_timescaledb_catalog.compression_algorithm": _TimescaledbCatalogCompressionAlgorithm;
  "_timescaledb_catalog.compression_chunk_size": _TimescaledbCatalogCompressionChunkSize;
  "_timescaledb_catalog.continuous_agg": _TimescaledbCatalogContinuousAgg;
  "_timescaledb_catalog.continuous_aggs_bucket_function": _TimescaledbCatalogContinuousAggsBucketFunction;
  "_timescaledb_catalog.continuous_aggs_hypertable_invalidation_log": _TimescaledbCatalogContinuousAggsHypertableInvalidationLog;
  "_timescaledb_catalog.continuous_aggs_invalidation_threshold": _TimescaledbCatalogContinuousAggsInvalidationThreshold;
  "_timescaledb_catalog.continuous_aggs_materialization_invalidation_log": _TimescaledbCatalogContinuousAggsMaterializationInvalidationLog;
  "_timescaledb_catalog.dimension": _TimescaledbCatalogDimension;
  "_timescaledb_catalog.dimension_slice": _TimescaledbCatalogDimensionSlice;
  "_timescaledb_catalog.hypertable": _TimescaledbCatalogHypertable;
  "_timescaledb_catalog.hypertable_compression": _TimescaledbCatalogHypertableCompression;
  "_timescaledb_catalog.hypertable_data_node": _TimescaledbCatalogHypertableDataNode;
  "_timescaledb_catalog.metadata": _TimescaledbCatalogMetadata;
  "_timescaledb_catalog.remote_txn": _TimescaledbCatalogRemoteTxn;
  "_timescaledb_catalog.tablespace": _TimescaledbCatalogTablespace;
  "_timescaledb_config.bgw_job": _TimescaledbConfigBgwJob;
  "_timescaledb_internal.bgw_job_stat": _TimescaledbInternalBgwJobStat;
  "_timescaledb_internal.bgw_policy_chunk_stats": _TimescaledbInternalBgwPolicyChunkStats;
  "_timescaledb_internal.compressed_chunk_stats": _TimescaledbInternalCompressedChunkStats;
  "_timescaledb_internal.hypertable_chunk_local_size": _TimescaledbInternalHypertableChunkLocalSize;
  "app_hidden.failures": AppHiddenFailures;
  "app_private.active_deployment": AppPrivateActiveDeployment;
  "app_private.sessions": AppPrivateSessions;
  "app_private.user_authentication_secrets": AppPrivateUserAuthenticationSecrets;
  "app_public.ban_pool_entries": AppPublicBanPoolEntries;
  "app_public.ban_pool_guild_settings": AppPublicBanPoolGuildSettings;
  "app_public.ban_pool_invites": AppPublicBanPoolInvites;
  "app_public.ban_pool_members": AppPublicBanPoolMembers;
  "app_public.ban_pools": AppPublicBanPools;
  "app_public.bot_stats": AppPublicBotStats;
  "app_public.cached_guilds": AppPublicCachedGuilds;
  "app_public.cached_users": AppPublicCachedUsers;
  "app_public.emoji_sticker_stats": AppPublicEmojiStickerStats;
  "app_public.emoji_sticker_stats_rate_limits": AppPublicEmojiStickerStatsRateLimits;
  "app_public.feed_items": AppPublicFeedItems;
  "app_public.feed_subscriptions": AppPublicFeedSubscriptions;
  "app_public.feeds": AppPublicFeeds;
  "app_public.giveaway_entries": AppPublicGiveawayEntries;
  "app_public.giveaways": AppPublicGiveaways;
  "app_public.guild_bans": AppPublicGuildBans;
  "app_public.guild_configs": AppPublicGuildConfigs;
  "app_public.guild_emojis_and_stickers": AppPublicGuildEmojisAndStickers;
  "app_public.level_role_apply_jobs": AppPublicLevelRoleApplyJobs;
  "app_public.level_role_overrides": AppPublicLevelRoleOverrides;
  "app_public.level_roles": AppPublicLevelRoles;
  "app_public.lookup_group_invites": AppPublicLookupGroupInvites;
  "app_public.lookup_group_members": AppPublicLookupGroupMembers;
  "app_public.lookup_groups": AppPublicLookupGroups;
  "app_public.members": AppPublicMembers;
  "app_public.messages": AppPublicMessages;
  "app_public.mod_logs": AppPublicModLogs;
  "app_public.msg_log_blocks": AppPublicMsgLogBlocks;
  "app_public.mutes": AppPublicMutes;
  "app_public.notifications": AppPublicNotifications;
  "app_public.reminders": AppPublicReminders;
  "app_public.role_menu_roles": AppPublicRoleMenuRoles;
  "app_public.role_menus": AppPublicRoleMenus;
  "app_public.tags": AppPublicTags;
  "app_public.user_levels": AppPublicUserLevels;
  "app_public.users": AppPublicUsers;
  "app_public.web_user_guilds": AppPublicWebUserGuilds;
  "app_public.web_users": AppPublicWebUsers;
  "app_public.xp_blocks": AppPublicXpBlocks;
  "graphile_migrate.current": GraphileMigrateCurrent;
  "graphile_migrate.migrations": GraphileMigrateMigrations;
  "timescaledb_experimental.chunk_replication_status": TimescaledbExperimentalChunkReplicationStatus;
  "timescaledb_information.chunks": TimescaledbInformationChunks;
  "timescaledb_information.compression_settings": TimescaledbInformationCompressionSettings;
  "timescaledb_information.continuous_aggregates": TimescaledbInformationContinuousAggregates;
  "timescaledb_information.data_nodes": TimescaledbInformationDataNodes;
  "timescaledb_information.dimensions": TimescaledbInformationDimensions;
  "timescaledb_information.hypertables": TimescaledbInformationHypertables;
  "timescaledb_information.job_stats": TimescaledbInformationJobStats;
  "timescaledb_information.jobs": TimescaledbInformationJobs;
}
