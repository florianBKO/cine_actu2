'use server';
import { NextResponse } from 'next/server';

export default async function Reviews({ id }: { id: string }) {
  let reviews: {
    id: string;
    author: string;
    content: string;
    created_at: string;
  }[] = [];

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.API_KEY_THEMOVIE}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des avis');
    }

    const data = await response.json();
    reviews = data.results;
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="">
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
</p>              <span className="text-sm text-gray-500">Publié le {new Date(review.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun avis disponible.</p>
      )}
    </section>
  );
}
