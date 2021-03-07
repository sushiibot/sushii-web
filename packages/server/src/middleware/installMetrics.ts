import promBundle from "express-prom-bundle";
import { Express } from "express";

export default (app: Express) => {
    app.use(
        promBundle({
            includeMethod: true,
            promClient: { collectDefaultMetrics: {} },
        })
    );
};
