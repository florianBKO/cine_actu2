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
      case 'les plus populaires':
        url = `${BASE_URL}/person/popular?api_key=${apiKey}&language=fr-FR`;
        break;

      case 'search':
        const query = searchParams.get('query');
        if (!query) {
          return NextResponse.json({ error: 'Le paramètre "query" est requis pour la recherche.' }, { status: 400 });
        }
        url = `${BASE_URL}/search/person?api_key=${apiKey}&language=fr-FR&query=${encodeURIComponent(query)}`;
        break;

      case 'detail':
        const id = searchParams.get('id');
        if (!id) {
          return NextResponse.json({ error: 'Le paramètre "id" est requis pour récupérer les détails.' }, { status: 400 });
        }
        url = `${BASE_URL}/person/${id}?api_key=${apiKey}&language=fr-FR&append_to_response=movie_credits,tv_credits`;
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

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des données' }, { status: 500 });
  }
}
