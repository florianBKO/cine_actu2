'use client';
import { useEffect, useState } from 'react';

export default function Reviews({ id, type }: { id: string, type: string }) {
  const [reviews, setReviews] = useState<{
    id: string;
    author: string;
    content: string;
    created_at: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PATH_URL}/api/reviews?id=${id}&type=${type}`
        );
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des avis');
        }

        const data = await response.json();
        setReviews(data.results || []);
      } catch (error) {
        setError('Erreur de chargement des avis');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, type]);

  if (loading) {
    return <div>Chargement des avis...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section>
      <h2 className="badge badge-outline text-2xl font-bold mb-4 p-4 text-base-content border-2 border-primary mt-4">
        Avis des spectateurs
      </h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-2 border-primary p-4 rounded-lg bg-base-100 shadow-md">
              <h3 className="font-bold text-lg text-base-content">{review.author}</h3>
              <p className="text-base-content">
                {review.content.length > 300
                  ? review.content.slice(0, 300).replace(/<\/?[^>]+(>|$)/g, "") + '...'
                  : review.content.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <span className="text-sm text-gray-500">
                Publié le {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun avis disponible.</p>
      )}
    </section>
  );
}