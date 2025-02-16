'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Movie } from '@/app/prototypes';
import { Heart } from 'lucide-react';

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = useAuth(); // Récupérer l'utilisateur connecté
  const [listFavorie, setListFavorie] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [user?.id]); // Re-exécuter le useEffect lorsque l'id de l'utilisateur change

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
  }, [listFavorie]); // Re-exécuter le useEffect lorsque la liste des favoris change

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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Films favoris</h1>
      <div className="flex flex-wrap gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-primary flex items-center space-x-6 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
          >
            {/* Image du film */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-32 h-48 object-cover rounded-lg"
            />
  
            {/* Informations du film */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">Date de sortie: {movie.release_date}</p>
              <div className="flex items-center text-yellow-500">
                <span className="text-lg font-semibold">{movie.vote_average}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2l2 7h7l-5 5 2 7-6-4-6 4 2-7-5-5h7l2-7z"
                  />
                </svg>
              </div>
            </div>
  
            {/* Bouton cœur */}
            <div className="flex items-center justify-center w-12 h-12  rounded-full  bg-red-500 transition-colors">
              <Heart className="text-gray-700 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
