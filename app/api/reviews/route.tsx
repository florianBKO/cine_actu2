import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  let type = searchParams.get('type');
  
  if (type === 'serie') {
    type = 'tv';
  }

  if (!id || !type) {
    return NextResponse.json({ error: "ID ou type manquant" }, { status: 400 });
  }
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.API_KEY_THEMOVIE}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des avis' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne lors de la récupération des avis' }, { status: 500 });
  }
}