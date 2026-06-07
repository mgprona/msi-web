# msi-web
Web test

## Visitor counter

This site includes a small visitor counter powered by Cloudflare Workers and Workers KV.

Counter endpoint: `https://msi-web-counter.mgprona.workers.dev/visit`

### Deploy the counter

1. Log in to Cloudflare Wrangler:

```powershell
npx.cmd wrangler login
```

2. Create a KV namespace if one has not been created yet:

```powershell
npx.cmd wrangler kv namespace create VISIT_COUNTER
```

3. Copy the generated namespace `id` into `wrangler.toml`.

4. Deploy the Worker:

```powershell
npx.cmd wrangler deploy
```

5. Put the deployed Worker URL in `index.html` as `counterEndpoint`.

The free Cloudflare plan is enough for a small site. With Workers KV, the main free limit is 1,000 writes per day, so this setup is best for roughly 1,000 counted page views per day or less.
