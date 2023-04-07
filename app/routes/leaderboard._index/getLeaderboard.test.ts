import { afterAll, describe, expect, test } from "@jest/globals";
import { client } from "../..//database.server";
import { getLeaderboard } from "./getLeadboard.queries";

describe("getLeaerboard", () => {
  afterAll(async () => {
    await client.end();
  });

  test("successful query", async () => {
    const data = await getLeaderboard.run(
      {
        // Global
        guildId: null,
        timeframe: "ALL_TIME",
      },
      client
    );

    expect(data).toBeDefined();
  });
});
