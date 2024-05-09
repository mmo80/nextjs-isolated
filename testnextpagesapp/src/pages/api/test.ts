// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
