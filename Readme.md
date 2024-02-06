# Server Assessment

A Node.js module for assessing a list of web servers and returning the server with the lowest priority. The module uses fetch requests to check the status of the servers and provides functionality for unit testing with Jest and jest-fetch-mock.

## Content

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [API](#api)

## Installation

Install the module using npm:

```bash
npm install serverassessment
```

## Usage

```
import { findServer, Server } from 'serverassessment';

const servers: Server[] = [
  {
    "url": "https://does-not-work.perfume.new",
    "priority": 1
  },
  {
    "url": "https://gitlab.com",
    "priority": 4
  },
  // Add more servers as needed
];

findServer(servers)
  .then((server) => {
    console.log('Server with the lowest priority:', server);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## Testing

The module provides functionality for unit testing using Jest and jest-fetch-mock. Here's an example of how to write a unit test:

```
import { findServer, Server } from 'serverassessment';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const servers: Server[] = [
  // Define servers for testing
];

test('findServer returns online server with lowest priority', async () => {
  fetchMock.mockResponse(JSON.stringify({ data: 'mocked data' }), { status: 200 });
  const server = await findServer(servers);
  expect(server.url).toBe('https://example.com');
});
```

## API

### `findServer(servers: Server[]): Promise<Server>`

Finds the online server with the lowest priority from the provided list of servers.

- `servers`: An array of server objects with url and priority properties.

Returns a Promise that resolves to the online server with the lowest priority or rejects with an error if no servers are online.
