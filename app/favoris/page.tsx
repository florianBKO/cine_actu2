'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Movie } from '@/app/prototypes';
import FavorieHeart from '../components/ui/FavorieHeart';

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = useAuth(); // Récupérer l'utilisateur connecté
  const [listFavorie, setListFavorie] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshList, setRefreshList] = useState(false);

  const handleClickRefreshList = () => {
    setRefreshList(prev => !prev);  // Toggle l'état refreshList pour rafraîchir la liste
  };

  // Récupérer la liste des favoris de l'utilisateur
  useEffect(() => {
    if (!user?.id) return; // Vérifier si l'utilisateur est connecté
    setLoading(true); // Activer le loading lors de la récupération des favoris
    const fetchFavorie = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/favorie/getListFav?idUser=${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Erreur lors de la récupération des favoris');
        const data = await response.json();
        setListFavorie(data); // Mettre à jour la liste des favoris
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorie();
  }, [user?.id, refreshList]); // Re-exécuter le useEffect lorsque l'id de l'utilisateur ou refreshList change

  // Effet pour récupérer les films en fonction des favoris
  useEffect(() => {
    if (listFavorie.length === 0) return; // Si la liste des favoris est vide, ne rien faire

    const fetchMovies = async () => {
      try {
        setLoading(true);

        // Récupérer les informations détaillées des films en fonction de l'ID des favoris
        const movieRequests = listFavorie.map((favorie) =>
          fetch(`https://api.themoviedb.org/3/movie/${favorie.id_movie}?api_key=be202a75160ad60b4028904d9b7e6e22`)
        );

        // Attendre que toutes les requêtes soient terminées
        const responses = await Promise.all(movieRequests);
        const movieData = await Promise.all(responses.map((res) => res.json()));

        // Mettre à jour les films avec les données récupérées
        setMovies(movieData);
      } catch (error) {
        console.error('Erreur lors de la récupération des films', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [listFavorie, refreshList]); // Re-exécuter le useEffect lorsque la liste des favoris ou refreshList change

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Chargement...</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2>Aucun film trouvé.</h2>
      </div>
    );
  }

  return (
    <div className=" bg-base-200 w-[100%] p-4 ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 ">
        Films favoris
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        {movies.map((movie) => (
          <div className="card card-side bg-base-100 shadow-xl  border-2 border-solid border-primary" key={movie.id}>
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-32 h-48 object-cover rounded-lg"
              />
            </figure>
            <div className="card-body text-base-content">
              <h3 className="text-xl font-semibold  mb-2">
                {movie.title}
              </h3>
              <p className="text-sm mb-2">
                Date de sortie: {movie.release_date}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-yellow-500">
                  Note : {movie.vote_average}
                </span>
                <div className="card-actions" onClick={handleClickRefreshList}>
                  <FavorieHeart movieId={movie.id} id={user?.id} favorite={true}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
