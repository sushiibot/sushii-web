import { User } from "next-auth";

declare global {
    namespace Express {
        interface User {
            session_id: string;
        }
    }

    interface Error {
        code?: string;
        statusCode?: string;
        status?: string;
    }
}
