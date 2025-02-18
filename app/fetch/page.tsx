import React from 'react';
import { Movie } from '@/app/prototypes';

export default async function Page() {
  try {
    const [movieRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/movie?categorie=oneMovie&id=1241982&page=1`),
    ]);

    if (!movieRes.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const movie = await movieRes.json() as Movie;
    console.log(movie);

    return (
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.video}</p> {/* Assurez-vous que `movie.video` existe dans les données */}
      </div>
    );
  } catch (error) {
    console.error("Erreur: ", error);
    return <div>Erreur lors du chargement des données.</div>;
  }
}
