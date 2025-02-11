import { NextResponse } from 'next/server';

export  async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('id'); // Extraire l'ID du film
  const apiKey = process.env.API_KEY_THEMOVIE;
  const BASE_URL = 'https://api.themoviedb.org/3';

  if (!apiKey) {
    return NextResponse.json({ error: 'La clé API TMDB est manquante.' }, { status: 500 });
  }

  if (!movieId) {
    return NextResponse.json({ error: 'L\'ID du film est manquant.' }, { status: 400 });
  }

  // Requête pour récupérer les réseaux sociaux du film
  const res = await fetch(`${BASE_URL}/movie/${movieId}/external_ids?api_key=${apiKey}`, { cache: 'no-store' });

  // Si la réponse est réussie
  if (!res.ok) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des données.' }, { status: res.status });
  }

  return NextResponse.json(await res.json());
}
