import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorie = searchParams.get('categorie');
  const apiKey = process.env.API_KEY_THEMOVIE;
  const BASE_URL = 'https://api.themoviedb.org/3';

  if (!apiKey) {
    return NextResponse.json({ error: 'La clé API TMDB est manquante.' }, { status: 500 });
  }

  try {
    let url = '';

    switch (categorie) {
      case 'les plus populaire':
        url = `${BASE_URL}/discover/tv?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc`;
        break;

      case 'Diffusées aujourdhui':
        url = `${BASE_URL}/tv/airing_today?api_key=${apiKey}&language=fr-FR`;
        break;

      case 'En cours de diffusion':
        url = `${BASE_URL}/discover/tv?api_key=${apiKey}&language=fr-FR&with_status=3|4&sort_by=first_air_date.desc`;
        break;

      case 'Les mieux évalués':
        url = `${BASE_URL}/discover/tv?api_key=${apiKey}&language=fr-FR&sort_by=vote_average.desc&vote_count.gte=100`;
        break;

      case 'search':
        const query = searchParams.get('query');
        if (!query) {
          return NextResponse.json({ error: 'Le paramètre "query" est requis pour la recherche.' }, { status: 400 });
        }
        url = `${BASE_URL}/search/tv?api_key=${apiKey}&language=fr-FR&query=${encodeURIComponent(query)}`;
        break;

      case 'detail':
        const id = searchParams.get('id');
        if (!id) {
          return NextResponse.json({ error: 'Le paramètre "id" est requis pour récupérer les détails.' }, { status: 400 });
        }
        url = `${BASE_URL}/tv/${id}?api_key=${apiKey}&language=fr-FR`;
        break;

      default:
        return NextResponse.json({ error: 'Catégorie non valide' }, { status: 400 });
    }

    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des données' }, { status: 500 });
  }
}