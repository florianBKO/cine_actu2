import { NextResponse } from 'next/server';
// test
export async function GET(request: Request) {
  console.log('api appel')
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const apiKey = process.env.API_KEY_THEMOVIE;
  const BASE_URL = 'https://api.themoviedb.org/3';
  console.log(apiKey)

  if (!apiKey) {
    return NextResponse.json({ error: 'La clé API TMDB est manquante.' }, { status: 500 });
  }

  // Récupère les films populaires
  if (type === 'popular') {
    console.log('apiKey')

    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}`, { cache: 'no-store' });
    console.log('apiKey2')

    return NextResponse.json(await res.json());
  }

  // Récupère les films actuellement en salles
  if (type === 'now_playing') {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Récupère les films les mieux notés
  if (type === 'top_rated') {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Récupère les prochaines sorties
  if (type === 'upcoming') {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${apiKey}`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Récupère le dernier film ajouté (attention : retourne un objet et non une liste)
  if (type === 'latest') {
    const res = await fetch(`${BASE_URL}/movie/latest?api_key=${apiKey}`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Recherche de films par mot-clé (nécessite le paramètre "query")
  if (type === 'search') {
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
  if (type === 'detail') {
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Le paramètre "id" est requis pour récupérer les détails.' }, { status: 400 });
    }
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${apiKey}`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Récupère les films tendance (optionnel : spécifier la période via "time_window" (day ou week), par défaut "day")
  if (type === 'trending') {
    const timeWindow = searchParams.get('time_window') || 'day';
    const res = await fetch(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${apiKey}`, { cache: 'no-store' });
    return NextResponse.json(await res.json());
  }

  // Si aucun type n'est spécifié, retourne une combinaison des endpoints les plus utilisés
  const [popularRes, nowPlayingRes, topRatedRes, upcomingRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}`, { cache: 'no-store' }),
    fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}`, { cache: 'no-store' }),
    fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}`, { cache: 'no-store' }),
    fetch(`${BASE_URL}/movie/upcoming?api_key=${apiKey}`, { cache: 'no-store' })
  ]);

  return NextResponse.json({
    popular: await popularRes.json(),
    nowPlaying: await nowPlayingRes.json(),
    topRated: await topRatedRes.json(),
    upcoming: await upcomingRes.json()
  });
}
