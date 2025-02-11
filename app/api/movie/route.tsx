import { NextResponse } from 'next/server';
// test
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorie = searchParams.get('categorie');
  const apiKey = process.env.API_KEY_THEMOVIE;
  const BASE_URL = 'https://api.themoviedb.org/3';

  if (!apiKey) {
    return NextResponse.json({ error: 'La clé API TMDB est manquante.' }, { status: 500 });
  }

  // Récupère les films populaires
  if (categorie === 'les plus populaire') {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}&language=fr-FR`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Récupère les films actuellement en salles
  if (categorie === 'du moment') {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}&language=fr-FR`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Récupère les films les mieux notés
  if (categorie === 'Les mieux evalués') {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}&language=fr-FR`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Récupère les prochaines sorties
  if (categorie === 'a venir') {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${apiKey}&language=fr-FR`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }



  // Recherche de films par mot-clé (nécessite le paramètre "query")
  if (categorie === 'search') {
    const query = searchParams.get('query');
    if (!query) {
      return NextResponse.json({ error: 'Le paramètre "query" est requis pour la recherche.' }, { status: 400 });
    }
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`,
      { cache: 'no-store' }
    );
    return NextResponse.json(await res.json());
  }

  // Récupère les détails d'un film spécifique (nécessite le paramètre "id")
  if (categorie === 'detail') {
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Le paramètre "id" est requis pour récupérer les détails.' }, { status: 400 });
    }
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${apiKey}`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

}
