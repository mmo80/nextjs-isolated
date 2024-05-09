import { NextResponse } from 'next/server';
import { Isolate } from 'isolated-vm';
import type IsolatedVM from 'isolated-vm';

export async function POST() {
  const isolate: IsolatedVM.Isolate = new Isolate({ memoryLimit: 128 });

  return NextResponse.json({ message: `isolated-vm` });
}
