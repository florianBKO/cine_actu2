import { NextResponse } from 'next/server';
// test
export async function GET(request: Request) {

  
  const apiKey = process.env.API_KEY_THEMOVIE;
  const BASE_URL = 'https://api.themoviedb.org/3';

  const res = await fetch(`${BASE_URL}/person/popular?api_key=${apiKey}`, { cache: 'no-store' });
  return NextResponse.json(await res.json());
}
