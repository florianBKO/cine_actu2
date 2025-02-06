import Image from "next/image";
import { Star, Calendar, Heart, Eye, Trophy } from "lucide-react";
import RadialProgress from '@/app/components/ui/RadialProgress';

interface MoviePageProps {
  params: { id: string };
}

interface Movie {
  id: number;
  original_title: string;
  overview?: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  release_date: string;
  title: string;
  video: string;
  vote_count: number;
  vote_average: number;
}

interface Acteur {
  id: number;
  name: string;
  credit_id: string;
  character: string;
  profile_path: string;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = params; // Récupérer l'id depuis les paramètres d'URL

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=be202a75160ad60b4028904d9b7e6e22`
  );
  const acteurRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=be202a75160ad60b4028904d9b7e6e22`
  );

  const movie = await res.json() as Movie;
  const acteurData = await acteurRes.json();
  const acteurs = acteurData.cast as Acteur[];

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error shadow-lg max-w-md">
          <div>
            <span>Erreur lors de la récupération du film</span>
          </div>
        </div>
      </div>
    );
  }

  if (!movie.poster_path) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-warning shadow-lg max-w-md">
          <div>
            <span>Film non trouvé (ID: {id})</span>
          </div>
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

  return (
    <div className="min-h-screen bg-base-200 p-6 ">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-4xl font-bold text-center mb-3">Film Recherché</h1>

        <div
          className="card lg:card-side bg-base-100 shadow-xl mb-8 p-6 bg-card pb-10 mt-10"
          style={{ "--bg-image": `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
        >
          <figure className="relative w-full lg:w-1/4 min-w-[280px] max-w-[280px] mx-auto lg:mx-0">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 280px"
                className="rounded-lg object-cover"
                priority
              />
            </div>
            <button className="btn btn-circle absolute top-0 right-0 bg-base-100">
              <RadialProgress vote_average={movie.vote_average} />
            </button>
          </figure>

          <div className="card-body">
            <h2 className="card-title text-2xl">{movie.title}</h2>
            <p className="py-4">{movie.overview}</p>

            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                <span>{movie.vote_average.toFixed(1)} / 10</span>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary gap-2">
                <Eye className="w-5 h-5" />
                Regarder maintenant
              </button>
              <button className="btn btn-outline gap-2">
                <Heart className="w-5 h-5" />
                Favoris
              </button>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat bg border-black border-solid border rounded-lg ">
                <div className="stat-figure text-secondary">
                  <Trophy className="w-8 h-8" />
                </div>
                <div className="stat-title">Popularité</div>
                <div className="stat-value">{Math.round(movie.popularity).toLocaleString()}</div>
                <div className="stat-desc">Points de popularité</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <Star className="w-8 h-8" />
                </div>
                <div className="stat-title">Total des votes</div>
                <div className="stat-value">{movie.vote_count.toLocaleString()}</div>
                <div className="stat-desc">Nombre d'évaluations</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary"></div>
                <div className="stat-title">Note moyenne</div>
                <div className="stat-value">{movie.vote_average.toFixed(1)}/10</div>
                <div className="stat-desc">Basé sur {movie.vote_count} votes</div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Acteurs</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-2">
            {acteurs.length === 0 ? (
              <p>Aucun acteur trouvé</p>
            ) : (
              acteurs.map((actor) => (
                actor.profile_path ? (
                  <div key={actor.id} className="card w-64 bg-base-100 shadow-xl flex-none">
                    <figure>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                        className="rounded-lg"
                        width={150}
                        height={225}
                      />
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title">{actor.name}</h3>
                      <p>Rôle: {actor.character}</p>
                    </div>
                  </div>
                ) : null
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
