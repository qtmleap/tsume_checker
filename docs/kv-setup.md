# How to provision Vercel KV

## 1. Create the database
- Dashboard: **Storage → KV → “New KV Database”**.  
- CLI:  
  ```bash
  npm i -g vercel            # if not installed
  vercel login               # authenticate
  vercel link                # link local folder to the Vercel project
  vercel kv create my-kv-db  # create the database
  ```

## 2. Environment variables
Vercel auto-adds:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

## 3. Local development
```bash
vercel env pull .env.local   # pulls the variables
npm run dev                  # or pnpm / yarn dev
```

## 4. Usage in code
```ts
import { kv } from '@vercel/kv'

const value = await kv.get<string>('some-key')
```

## ⚙️  CLI version

If you see  
`Error: Can't deploy more than one path.`  
your Vercel CLI is too old for the `storage` sub-commands.

```bash
npm uninstall -g vercel          # optional – remove old install
npm i -g vercel@latest           # or: npm i -g vercel@canary
vercel --version                 # should now be ≥ 39
```

## Creating the KV database

```bash
vercel storage create kv tsumepara
vercel env pull .env.local       # pulls KV_REST_API_* vars
```
