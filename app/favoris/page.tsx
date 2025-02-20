'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Movie } from '@/app/prototypes';
import FavorieHeart from '../components/ui/FavorieHeart';
import RadialProgress from '../components/ui/RadialProgress';

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = useAuth();
  const [listFavorie, setListFavorie] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRemoveFavorite = (movieId: number, type: string) => {
    // Mise à jour de la liste de favoris
    setListFavorie(prev => prev.filter(fav =>
      !(fav.id_movie === movieId && fav.type === type)));

    // Mise à jour de la liste des films
    setMovies(prev => prev.filter(movie =>
      !(movie.id === movieId && movie.type === type)));
  };

  // la liste des favoris au chargement 
  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);

    const fetchFavorie = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/favorie/getListFavUser?idUser=${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Erreur lors de la récupération des favoris');
        const data = await response.json();
        setListFavorie(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorie();
  }, [user?.id]); // Dépendance correcte

  // Récupérer les détails des films/séries en favoris
  useEffect(() => {
    if (listFavorie.length === 0) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);

        const movieRequests = listFavorie.map((favorie) => {
          const type = favorie.type === 'serie' ? 'tv' : favorie.type;
          return fetch(`https://api.themoviedb.org/3/${type}/${favorie.id_movie}?api_key=be202a75160ad60b4028904d9b7e6e22`)
            .then((res) => res.json())
            .then((movieData) => ({
              ...movieData,
              type: favorie.type,
            }));
        });

        const movieData = await Promise.all(movieRequests);
        setMovies(movieData);
      } catch (error) {
        console.error('Erreur lors de la récupération des films', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [listFavorie]);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Chargement...</div>
      </div>
    );
  }

  // Aucun favori trouvé
  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2>Aucun film trouvé dans vos favoris.</h2>
      </div>
    );
  }

  // Rendu principal
  return (
    <div className="bg-base-200 w-full p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Films favoris
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={`${movie.id}-${movie.type}`}
            className="card card-side bg-base-100 shadow-xl border-2 border-solid border-primary"
          >
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-32 h-48 object-cover rounded-lg"
              />
            </figure>
            <div className="card-body text-base-content">

              <div className='flex justify-between'> <h3 className="text-xl font-semibold mb-2">{movie.title || movie.name}</h3>
                <span style={{ position: 'relative', top: 0, right: 0 }}>
                  <RadialProgress vote_average={movie.vote_average} />
                </span>
              </div>

              <p className="text-sm mb-2">Date de sortie: {movie.release_date || movie.first_air_date}  </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-yellow-500">
                  Note : {movie.vote_average?.toFixed(1)}
                </span>
                <FavorieHeart
                  movieId={movie.id}
                  id={user?.id}
                  favorite={true}
                  type={movie.type}
                  onRefresh={() => handleRemoveFavorite(movie.id, movie.type)}
                />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}