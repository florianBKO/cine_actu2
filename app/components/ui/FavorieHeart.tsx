import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useAlert } from '@/contexts/Alert';
import { FavorieHeartProps } from '@/app/prototypes';
import { usePathname } from 'next/navigation'; // Import de usePathname

const FavorieHeart = ({ movieId, id, favorite }: FavorieHeartProps) => {
  const [isFavorie, setIsFavorie] = useState(favorite);
  const { addAlert } = useAlert();
  const pathname = usePathname(); // Récupère le chemin actuel de la page

  const isFavoriePage = pathname === '/favoris';
  const handleClick = async () => {
    try {
      const response = await fetch(`/api/favorie?movieId=${movieId}&idUser=${id}`, {
        method: 'GET', // Méthode POST
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json(); // On récupère la réponse JSON
      if (data.message === "Favori ajouté") {
        addAlert("Favorie ajouté avec succès !", "info")
      } else {
        addAlert("Favorie supprimé !", "error")
      }
      setIsFavorie(!isFavorie); // Inverser l'état du favori après l'ajout ou la suppression

    } catch (error) {
      console.error('Erreur lors de la modification des favoris', error);
    }
  };

  return (
    <div onClick={handleClick}>
      {isFavorie ? (
        // Cœur plein (favori actif)
        <div className={`flex items-center justify-center w-8 h-8  rounded-full  bg-red-500 transition-colors ${!isFavoriePage ? 'favorieCard' : ''}`}>
          <Heart className="text-gray-700 text-white w-6 h-6" />
        </div>
      ) : (
        // Cœur vide (favori inactif)
        <div  className={`${!isFavoriePage ? 'favorieCard' : ''}` }>
          <Heart className=""  />
        </div>
      )}
    </div>
  );
};

export default FavorieHeart;
