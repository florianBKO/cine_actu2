import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useAlert } from '@/contexts/Alert';
import { FavorieHeartProps } from '@/app/prototypes';
import { usePathname } from 'next/navigation'; // Import de usePathname

const FavorieHeart = ({ movieId, id, favorite, type, onRefresh }: FavorieHeartProps) => {
  const [isFavorie, setIsFavorie] = useState(favorite);
  const { addAlert } = useAlert();
  const pathname = usePathname(); // Récupère le chemin actuel de la page

  const isFavoriePage = pathname === '/favoris';

  // Fonction au clic
  const handleClick = async () => {
    console.log('clique');
    try {
      const response = await fetch(`/api/favorie/setListFavUser?movieId=${movieId}&type=${type}&idUser=${id}`, {
        method: 'GET', // Méthode POST
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json(); // On récupère la réponse JSON

      if (data.message === "Favori ajouté") {
        addAlert("Favori ajouté avec succès !", "info");
      } else {
        addAlert("Favori supprimé !", "error");
      }

      // Mise à jour de l'état du favori
      setIsFavorie(!isFavorie);

      if (onRefresh) {
        onRefresh();
      }

    } catch (error) {
      console.error('Erreur lors de la modification des favoris', error);
    }
  };

  return (
    <div onClick={handleClick}>
      {isFavorie ? (
        // Cœur plein (favori actif)
        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-red-500 transition-colors ${!isFavoriePage ? 'favorieCard' : ''}`}>
          <Heart className="text-gray-700 text-white w-6 h-6" />
        </div>
      ) : (
        // Cœur vide (favori inactif)
        <div className={`${!isFavoriePage ? 'favorieCard' : ''}`}>
          <Heart className="" />
        </div>
      )}
    </div>
  );
};

export default FavorieHeart;
