import next from "next";

const isDev = process.env.NODE_ENV === "development";

export default function getNext() {
    return next({
        dev: isDev,
        dir: `${__dirname}/../../client/src`,
        quiet: !isDev,
        // Don't specify 'conf' key
    });
}
