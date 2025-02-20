import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorie = searchParams.get('categorie');
  const page = searchParams.get('page');
  const apiKey = process.env.API_KEY_THEMOVIE;
  const BASE_URL = 'https://api.themoviedb.org/3';

  if (!apiKey) {
    return NextResponse.json({ error: 'La clé API TMDB est manquante.' }, { status: 500 });
  }

  if (!categorie) {
    return NextResponse.json({ error: 'Le paramètre "categorie" est requis.' }, { status: 400 });
  }

  try {
    let res;

    switch (categorie) {
      case 'les plus populaire':
        res = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`, { cache: 'no-store' });
        break;

      case 'du moment':
        res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}&language=fr-FR&page=${page}`, { cache: 'no-store' });
        break;

      case 'Les mieux evalués':
        res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}&language=fr-FR&page=${page}`, { cache: 'no-store' });
        break;

      case 'a venir':
        res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${apiKey}&language=fr-FR&page=${page}`, { cache: 'no-store' });
        break;

      case 'videos': {
        const id = searchParams.get('id');
        if (!id) {
          return NextResponse.json({ error: 'Le paramètre "id" est requis pour récupérer les vidéos.' }, { status: 400 });
        }
        res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${apiKey}`, { cache: 'no-store' });
        break;
      }

      case 'search': {
        const query = searchParams.get('query');
        if (!query) {
          return NextResponse.json({ error: 'Le paramètre "query" est requis pour la recherche.' }, { status: 400 });
        }
        res = await fetch(
          `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=fr-FR&page=${page}`,
          { cache: 'no-store' }
        );
        break;
      }

      case 'detail': {
        const id = searchParams.get('id');
        if (!id) {
          return NextResponse.json({ error: 'Le paramètre "id" est requis pour récupérer les détails.' }, { status: 400 });
        }
        res = await fetch(`${BASE_URL}/movie/${id}?api_key=${apiKey}&language=fr-FR&page=${page}`, { cache: 'no-store' });
        break;
      }

      case 'oneMovie': {
        const id = searchParams.get('id');
        if (!id) {
          return NextResponse.json({ error: 'Le paramètre "id" est requis pour récupérer les détails.' }, { status: 400 });
        }
        res = await fetch(`${BASE_URL}/movie/${id}?api_key=${apiKey}`, { cache: 'no-store' });
        break;
      }

      default:
        return NextResponse.json({ error: 'Catégorie non reconnue.' }, { status: 400 });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: 'Une erreur s\'est produite lors de la récupération des données.' }, { status: 500 });
  }
}
