import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  let type = searchParams.get('type');

  // Si le type est 'serie', alors on remplace par 'tv'
  if (type === 'serie') {
    type = 'tv';
  }

  // Vérification du type et id
  if (!id || !type) {
    return NextResponse.json({ error: "ID ou type manquant" }, { status: 400 });
  }

  console.log(`Requête pour les crédits: https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.API_KEY_THEMOVIE}`);

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.API_KEY_THEMOVIE}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des crédits' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne lors de la récupération des crédits' }, { status: 500 });
  }
}
