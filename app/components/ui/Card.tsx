import { Clapperboard, Heart, } from "lucide-react";
import RadialProgress from './RadialProgress';
import { CardProps } from '@/app/prototypes';
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import FavorieHeart from "./FavorieHeart";


export default function Card({ id, title, poster_path, release_date, vote_average,favorite }: CardProps) {
  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/500';
  const { user }   = useAuth();
console.log(user?.id);
  // Formatage de la date
  const formattedDate = new Date(release_date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl  border-2 border-solid border-primary transition-shadow duration-300 overflow-hidden  flex-grow basis-80 max-w-xs transform transition-transform hover:scale-105">
      {/* Image Container */}
      <figure className="relative h-[450px]">
  {/* Progress indicator */}
  <div className="absolute top-2 right-2 z-10">
    <RadialProgress vote_average={vote_average} />
  </div>

  {/* Image avec effet de hover */}
  <div className="w-full overflow-hidden">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 min-h-[81px]"
    />
    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
</figure>


      {/* Card Content */}
      <div className="card-body p-4 bg-white">
        {/* Titre */}
        <h4 className="card-title text-base font-bold text-center line-clamp-2 min-h-[2rem]  text-base-dark flex justify-center">
          {title}        <FavorieHeart movieId={id} id={user?.id} favorite={favorite} />

        </h4>

        {/* Actions */}
        <div className="card-actions flex flex-col items-center gap-2 ">
          <Link href={`/movie/${id}`}>
            <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white w-full gap-2 transition-colors duration-200 ">
              Plus d'infos
              <Clapperboard className="w-4 h-4" />
            </button>
          </Link>
        
          <div className=" text-xs px-3 text-base-dark">
            Date de sortie {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}