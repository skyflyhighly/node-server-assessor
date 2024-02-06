// serverAssessment.test.ts
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import { findServer, Server } from "./serverAssessor";
import fetchMock from "jest-fetch-mock";

const servers: Server[] = [
  {
    url: "https://does-not-work.perfume.new",
    priority: 1,
  },
  {
    url: "https://gitlab.com",
    priority: 4,
  },
  {
    url: "http://app.scnt.me",
    priority: 3,
  },
  {
    url: "https://offline.scentronix.com",
    priority: 2,
  },
];

describe("Server Assessment", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("findServer returns online server with lowest priority", async () => {
    fetchMock.mockResponses(
      [JSON.stringify({ data: "mocked data 1" }), { status: 404 }],
      [JSON.stringify({ data: "mocked data 2" }), { status: 200 }],
      [JSON.stringify({ data: "mocked data 3" }), { status: 200 }],
      [JSON.stringify({ data: "mocked data 4" }), { status: 200 }]
    );

    const server = await findServer(servers);
    expect(server.url).toBe("https://offline.scentronix.com");
  });

  test("findServer throws error when no servers are online", async () => {
    fetchMock.mockReject(new Error("Timeout"));
    const error = await findServer([]).catch((e) => e);
    expect(error).toEqual(new Error("No servers are online"));
  });
});
