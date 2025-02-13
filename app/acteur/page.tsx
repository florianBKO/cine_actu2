'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Actor } from '../prototypes';
import FetchError from '../components/ui/FetchError';

export default function HomeContent() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/actor?categorie=les plus populaire`,
                { cache: 'no-store' } );
                const data = await response.json();
                setActors(data.results); // TMDB retourne les acteurs sous "results"
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };
        fetchActors();
    }, []);

    if (error) {
        return ( <FetchError error={error} /> );
    }

    return (
        <div className="min-h-screen bg-base-200 text-base-content">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                    Découvrez les Acteurs Populaires
                </h1>

                {loading ? (
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <Loader2 className="w-20 h-20 animate-spin text-blue-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {actors.map((actor) => (
                            <div key={actor.id} className="group text-center p-4 bg-white rounded-lg shadow-md border-2 border-solid border-primary transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-profile.png'}
                                    alt={actor.name}
                                    width={100}
                                    height={200}
                                    className="mx-auto mb-3 w-full"
                                />
                                <h2 className="text-lg font-semibold text-black">{actor.name}</h2>
                                <p className="text-gray-500 text-sm">{actor.known_for_department}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
