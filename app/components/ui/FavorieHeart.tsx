import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FavorieHeartProps {
  movieId: number;
  id: number | undefined; // Utilisateur connecté
  favorite: boolean;
}

const FavorieHeart = ({ movieId,id, favorite }: FavorieHeartProps) => {
  const [isFavorie, setIsFavorie] = useState(favorite);

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/favorie?movieId=${movieId}&idUser=${id}`, {
        method: 'GET', // Méthode POST
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json(); // On récupère la réponse JSON
      setIsFavorie(!isFavorie); // Inverser l'état du favori après l'ajout ou la suppression
      alert(data.message); // Affiche un message de succès
    } catch (error) {
      console.error('Erreur lors de la modification des favoris', error);
    }
  };

  return (
    <div onClick={handleClick}>
    {isFavorie ? (
      // Cœur plein (favori actif)
      <div>
        <Heart className="text-red-500" />
      </div>
    ) : (
      // Cœur vide (favori inactif)
      <div>
        <Heart className="" />
      </div>
    )}
  </div>
  );
};

export default FavorieHeart;
