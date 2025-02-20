'use client'
import { useEffect, useState } from 'react';
import { Actor } from '@/app/prototypes';

export default function Acteur({ id, type }: { id: string, type:string }) {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      setError(null);

      try {
        const actorRes = await fetch(
          `${process.env.NEXT_PUBLIC_PATH_URL}/api/actor/actorMovie?id=${id}&type=${type}`
        );
        if (!actorRes.ok) {
          throw new Error('Erreur lors de la récupération des acteurs');
        }

        const actorData = await actorRes.json();
        setActors(actorData.cast as Actor[]);
      } catch (error) {
        setError('Erreur de chargement des acteurs');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, [id]); // Re-fetch when the id changes

  if (loading) {
    return <div>Chargement des acteurs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="badge badge-outline text-2xl font-bold mb-4 p-4 text-base-content border-2 border-primary">
          Acteurs
        </h2>
        <div className="overflow-x-auto mb-4">
          <div className="flex gap-4">
            {actors?.length > 0 ? (
              actors.map((actor) =>
                actor.profile_path ? (
                  <div
                    key={actor.id}
                    className="card w-64 bg-base-100 shadow-xl flex-none border-2 border-solid border-primary"
                  >
                    <figure className="relative h-96">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                        className="object-cover rounded-t-lg"
                      />
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-base-content">{actor.name}</h3>
                      <p className="text-base-content">Rôle: {actor.character}</p>
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <p>Aucun acteur trouvé ou erreur lors du chargement.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
