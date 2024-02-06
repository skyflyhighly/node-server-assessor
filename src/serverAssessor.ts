import fetch, { Response } from "node-fetch";

export interface Server {
  url: string;
  priority: number;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error("Timeout"));
    }, timeout);

    try {
      const response = await fetch(url, {
        ...options,
        body: null,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      resolve(response);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

async function checkServer(
  server: Server
): Promise<Server & { online: boolean }> {
  try {
    const response: Response = await fetchWithTimeout(
      server.url,
      { method: "GET", body: null },
      5000
    );
    if (response.ok) {
      return { ...server, online: true };
    } else {
      return { ...server, online: false };
    }
  } catch (error) {
    return { ...server, online: false };
  }
}

export async function findServer(servers: Server[]): Promise<Server> {
  const serverChecks = servers.map((server) => checkServer(server));
  const results = await Promise.all(serverChecks);
  const onlineServers = results.filter((server) => server.online);

  if (onlineServers.length === 0) {
    throw new Error("No servers are online");
  }

  onlineServers.sort((a, b) => a.priority - b.priority);

  return onlineServers[0];
}
