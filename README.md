# Fully typed Server-to-Client API

A project to serve consistent type from the server to the client.

- pnpm workspace
- swc
- typescript
- fetch
- fastify
- typebox

# Packages

## `browser`

A browser-side API to communicate with the server fully typed.

```typescript
import * as browser from 'browser';

const fetcher = browser.createFetcher();
const response = await fetcher('GET /user');
```

## `server`

A fastify based server schema-validation enabled by consistent type library in workspace.

Run the following script to execute server with swagger ui (at `:8080/`).

```
cd packages/server && pnpm -w build && pnpm start
```

## `types`

A consistent type library.

See `server` code and `browser` code to the use of this library.
