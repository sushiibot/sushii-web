import { Express, RequestHandler } from "express";
import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const baseUrl = "/api/auth/";

const SECRET = process.env.SECRET;
if (!SECRET) {
    console.warn!("SECRET not in environment");
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    throw new Error("DATABASE_URL not in environment");
}

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

if (!DISCORD_CLIENT_ID) {
    throw new Error("DISCORD_CLIENT_ID not in environment");
}

if (!DISCORD_CLIENT_SECRET) {
    throw new Error("DISCORD_CLIENT_ID not in environment");
}

export default (app: Express) => {
    app.use((req, res, next) => {
        if (!req.url.startsWith(baseUrl)) {
            return next();
        }

        // Fill in the "nextauth" [catch all route parameter](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
        req.query.nextauth = req.url // start with request url
            .slice(baseUrl.length) // make relative to baseUrl
            .replace(/\?.*/, "") // remove query part, use only path part
            .split("/"); // as array of strings

        // Bruh, req has nested query parsing but NextAuth only wants string | string[]
        // So with express query parser set to simple it will do string | string[]
        // but ofc typescript still doesn't know that and I don't really want to bother
        // dealing with this for an extended amount of time god
        NextAuth((req as any) as NextApiRequest, res, {
            database: process.env.DATABASE_URL,
            secret: SECRET,
            providers: [
                Providers.Discord({
                    clientId: DISCORD_CLIENT_ID,
                    clientSecret: DISCORD_CLIENT_SECRET,
                    scope: "identify guilds",
                }),
            ],
            session: {
                jwt: false,
                maxAge: 30 * 24 * 60 * 60, // 30 days
                updateAge: 24 * 60 * 60, // 24 hours
            },
            callbacks: {
                async signIn(user, account, profile) {
                    // req.user = user;
                    console.log("signed in:");
                    console.log("user:", user);
                    console.log("account:", account);
                    console.log("profile:", profile);

                    return true;
                },
                async redirect(url, baseUrl) {
                    return baseUrl;
                },
                async session(session, user) {
                    return session;
                },
            },
        });
    });
};
