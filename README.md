This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## To Reproduce

initiate a new next project with App Router with `npx create-next-app@latest`
and another in a separate folder with Pages Router with `npx create-next-app@latest`

then do `pnpm install` and then `pnpm install isolated-vm` on both projects.

In the `App Router` project add a new api route (/api)
route.ts
```
import { NextResponse } from 'next/server';
import { Isolate } from 'isolated-vm';
import type IsolatedVM from 'isolated-vm';

export async function POST() {
  const isolate: IsolatedVM.Isolate = new Isolate({ memoryLimit: 128 });
  return NextResponse.json({ message: `isolated-vm` });
}
```

and in the `Pages Router` project add a new api route (/api)
test.ts
```
import type { NextApiRequest, NextApiResponse } from 'next';
import { Isolate } from 'isolated-vm';
import type IsolatedVM from 'isolated-vm';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const isolate: IsolatedVM.Isolate = new Isolate({ memoryLimit: 128 });
  res.status(200).json({ message: 'John Doe' });
}
```

## Current vs. Expected behavior

On building the **`Pages Router`** project with `pnpm run build` all builds successful and the endpoint `/api/test` responds as expected. (when running `pnpm run dev`)

But when building the **`App Router`** project with `pnpm run build` i get the following error
```
  ▲ Next.js 14.2.3

   Creating an optimized production build ...
Failed to compile.

./node_modules/.pnpm/isolated-vm@4.7.2/node_modules/isolated-vm/isolated-vm.js
Module not found: Can't resolve './out/isolated_vm'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./src/app/api/route.ts


> Build failed because of webpack errors
 ELIFECYCLE  Command failed with exit code 1.
```

and the same error occurs when i call the api endpoint `/api`. (when running `pnpm run dev`)

is there a reason for this? is it as expected or is this a bug of some sorts?

## environment information
Operating System:<br>
Windows 11<br>
<br>
Binaries:<br>
pnpm: 9.1.0<br>
node: v20.13.0<br>
<br>
Relevant Packages:<br>
next: 14.2.3<br>
isolated-vm: 4.7.2<br>
