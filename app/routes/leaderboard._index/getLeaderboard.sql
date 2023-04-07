/* @name GetLeaderboard */
select *
from app_public.timeframe_user_levels(:timeframe, :guildId)
limit 100 offset :offset;
