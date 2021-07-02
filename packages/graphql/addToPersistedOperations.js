const map = require("./server.json");
const { promises: fsp } = require("fs");

async function main() {
    const persisted_dir = `${__dirname}/.persisted_operations/`;
    try {
        await fsp.mkdir(persisted_dir);
    } catch { }


    await Promise.all(
        Object.entries(map).map(([hash, query]) =>
            fsp.writeFile(`${__dirname}/.persisted_operations/${hash}.graphql`, query)
        )
    );
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
