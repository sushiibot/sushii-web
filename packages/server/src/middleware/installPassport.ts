import { Express } from "express";
import { get } from "lodash";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

import { getWebsocketMiddlewares } from "../app";
import installPassportStrategy from "./installPassportStrategy";

interface DbSession {
    session_id: string;
}

declare global {
    namespace Express {
        interface User {
            session_id: string;
        }
    }
}

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

if (!DISCORD_CLIENT_ID) {
    throw new Error("DISCORD_CLIENT_ID not in environment");
}

if (!DISCORD_CLIENT_SECRET) {
    throw new Error("DISCORD_CLIENT_ID not in environment");
}

export default async (app: Express) => {
    passport.serializeUser((sessionObject: DbSession, done) => {
        done(null, sessionObject.session_id);
    });

    passport.deserializeUser((session_id: string, done) => {
        done(null, { session_id });
    });

    const passportInitializeMiddleware = passport.initialize();
    app.use(passportInitializeMiddleware);
    getWebsocketMiddlewares(app).push(passportInitializeMiddleware);

    const passportSessionMiddleware = passport.session();
    app.use(passportSessionMiddleware);
    getWebsocketMiddlewares(app).push(passportSessionMiddleware);

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    await installPassportStrategy(
        app,
        "discord",
        DiscordStrategy,
        {
            clientID: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET,
            scope: ["identify", "guilds"],
            prompt: "none",
        },
        {},
        async (profile, _accessToken, _refreshToken, _extra, _req) => ({
            id: profile.id,
            profile: profile,
        }),
        ["token", "tokenSecret"]
    );
};
