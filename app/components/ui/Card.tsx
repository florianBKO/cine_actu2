import { Clapperboard } from "lucide-react";
import RadialProgress from './RadialProgress';

interface CardProps {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function Card({ title, poster_path, release_date, vote_average }: CardProps) {
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}` 
    : 'https://via.placeholder.com/500';

  // Formatage de la date
  const formattedDate = new Date(release_date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="card w-60 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group gap-2">
      {/* Image Container */}
      <figure className="relative">
        {/* Progress indicator */}
        <div className="absolute top-2 right-2 z-10">
          <RadialProgress vote_average={vote_average} />
        </div>
        
        {/* Image avec effet de hover */}
        <div className="w-full h-85 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </figure>

      {/* Card Content */}
      <div className="card-body p-4 bg-white">
        {/* Titre */}
        <h4 className="card-title text-base font-bold text-center line-clamp-2 min-h-[3rem]">
          {title}
        </h4>

        {/* Actions */}
        <div className="card-actions flex flex-col items-center gap-2 mt-2">
          <div className="badge badge-outline text-xs px-3 py-3">
            {formattedDate}
          </div>
          
          <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white w-full gap-2 transition-colors duration-200">
            Plus d'infos
            <Clapperboard className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}