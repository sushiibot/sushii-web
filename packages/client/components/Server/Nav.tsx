import Link from "next/link";

/**
 * Sidebar navigation for server pages /server/id/...
 *
 * Should display pages specific to each server, possibly hide the ones that
 * aren't toggled to be shown publicly, ie. optional public mod logs, optional
 * ban appeals, etc
 */

export default function ServerNav() {
    return (
        <div>
            Server Navigation
            <ul>
                <li>Home</li>
                <li>Leaderboard</li>
                <li>Tag List</li>
                {/* Below should be queried to check if setting
                    is enabled and user has perms to view */}
                <li>Dashboard</li>
                <li>Mod Log</li>
                <li>Ban Appeal</li>
            </ul>
        </div>
    );
}
