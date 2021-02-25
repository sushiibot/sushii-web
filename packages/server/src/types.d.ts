import { User } from "next-auth";

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}
