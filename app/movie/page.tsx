'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Star, Calendar, Trophy, ThumbsDown, ThumbsUp } from "lucide-react";
import RadialProgress from '@/app/components/ui/RadialProgress';
import { Movie, Trailer } from '@/app/prototypes';
import InfoStat from "@/app/components/ui/InfoStat";
import FetchError from "@/app/components/ui/FetchError";
import ListSocial from "./components/listSocial";
import { TrailerButton } from "./components/TrailerButton";
import Acteur from "@/app/movie/components/Acteur";
import Reviews from "./components/Reviews";

const MoviePageContent = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string; // Assertion explicite que id est une chaîne
  const type = searchParams.get('type') || 'movie';

  useEffect(() => {
    if (!id || !type) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieRes = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/${type}?categorie=oneMovie&id=${id}`);
        if (!movieRes.ok) throw new Error('Erreur de chargement du film');
        const movieData = await movieRes.json();
        setMovie(movieData as Movie);

        const trailerRes = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/${type}?categorie=videos&id=${id}`);
        const trailerData = await trailerRes.json();
        setTrailers(trailerData.results as Trailer[]);
      } catch (err) {
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <FetchError error={error} />;
  if (!movie?.poster_path) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-warning shadow-lg max-w-md">
          <span>Film non trouvé (ID: {id})</span>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const time = Math.floor(movie.runtime / 60) + "h" + (movie.runtime % 60 < 10 ? "0" : "") + (movie.runtime % 60) + "m";
  const rating = Number(movie.vote_average.toFixed(1));
  const RatingIcon = rating > 5 ? ThumbsUp : ThumbsDown;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-base-content font-serif tracking-tight">
          Film Recherché
        </h1>

        <div className="relative rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm shadow-2xl mb-12 border-2 border-solid border-primary">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row gap-12">
            {/* Poster */}
            <div className="relative w-full lg:w-1/3 max-w-sm mx-auto lg:mx-0">
              <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 280px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-white">
              <div className="flex justify-between">
                <h2 className="text-4xl font-bold mb-4 font-serif text-base-content">{movie.title || movie.name}</h2>
                <span style={{ position: 'relative', top: 0, right: 0 }}>
                  <RadialProgress vote_average={movie.vote_average} />
                </span>
              </div>
              <p className="text-lg leading-relaxed mb-6 text-base-content">{movie.overview}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3 text-gray-200">
                  <Calendar className="w-6 h-6 text-primary" />
                  <span className="text-lg text-base-content">{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-lg text-base-content">{rating} / 10</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <InfoStat titre="Popularité" value={Math.round(movie.popularity).toLocaleString()} description="Points de popularité" icon={Trophy} />
                <InfoStat titre="Total des votes" value={movie.vote_count} description="Nombre d'évaluations" icon={Star} />
                <InfoStat titre="Note moyenne" value={`${rating}/10`} description={`Basé sur ${movie.vote_count} votes`} icon={RatingIcon} />
              </div>

              {/* Duration */}
              <p className="text-right text-lg mb-6 text-base-content">Durée du film: {time}</p>

              {/* Trailer Button */}
              {trailers.length > 0 && (
                <div className="flex justify-between items-center mb-6">
                  <ListSocial id={id} />
                  <TrailerButton trailerKey={trailers[0].key} />
                </div>
              )}

              {/* Genres */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-base-content">Catégories</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 rounded-full bg-primary/80 text-base-content font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <Acteur id={id} type={type} />
        <Reviews id={id} type={type} />
      </div>
    </div>
  );
};

export default function MoviePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <MoviePageContent />
    </Suspense>
  );
}
