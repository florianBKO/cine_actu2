'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from 'react'
import Card from './components/ui/Card'
import Carousel from './components/ui/Carousel'
import { ArrowBigDown, Loader2 } from 'lucide-react'
import { Movie } from '@/app/prototypes';
import InputSearchMovies from './components/ui/InputSearch'
import FetchError from "./components/ui/FetchError";

interface CarouselItem {
  poster_path: string
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([])
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1)
  const [categorie, setCategorie] = useState(searchParams.get("categorie") || "les plus populaire");
  const [type, setType] = useState(searchParams.get("type") || "movie");

  const addPage = () => {
    setPage(prev => prev + 1);
  }

  // Effet pour gérer les changements de searchParams
  useEffect(() => {
    const newCategorie = searchParams.get("categorie") || "les plus populaire";
    const newType = searchParams.get("type") || "movie";
    
    // Réinitialiser l'état seulement si la catégorie ou le type change
    if (newCategorie !== categorie || newType !== type) {
      setCategorie(newCategorie);
      setType(newType);
      setMovies([]); 
      setPage(1); // Réinitialiser la page à 1
      setSearch(null);
    }
  }, [searchParams, categorie, type]);

  // Gestionnaire de recherche
  const handleSearch = (newSearch: string | null) => {
    setSearch(newSearch);
    setPage(1); // Réinitialiser la page à 1 lors d'une nouvelle recherche
    setMovies([]); // Vider les films existants
  };

  // Effet pour charger les films
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = search
          ? `${process.env.NEXT_PUBLIC_PATH_URL}/api/${type}?categorie=search&query=${search}&page=${page}`
          : `${process.env.NEXT_PUBLIC_PATH_URL}/api/${type}?categorie=${categorie}&page=${page}`;

        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'max-age=3600',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.results)) {
          throw new Error('Les données récupérées ne sont pas un tableau');
        }

        if (page === 1) {
          setMovies(data.results); // Remplacer les films pour la première page
          setCarouselItems(data.results.map((movie: { poster_path: string }) => ({
            poster_path: movie.poster_path,
          })));
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.results]); // Ajouter les nouveaux films
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        console.error('Erreur lors de la récupération des films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, search, categorie, type]);

  if (error) {
    return <FetchError error={error} />
  }

  return (
    <div>
      <header className="mb-8">
        <InputSearchMovies 
          search={search} 
          setSearch={handleSearch}
          setMovie={setMovies}
        />

        <h1 className="text-4xl md:text-5xl font-bold text-center text-base-200 bg-clip-text bg-gradient-to-r text-base-content">
          Découvrez les Films {categorie}
        </h1>
      </header>

      {loading && page === 1 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <section className="mb-12">
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-solid border-primary">
              <Carousel DataCarousel={carouselItems} />
            </div>
          </section>

          <section>
            <div className="mx-auto p-4 flex flex-wrap justify-center gap-5">
              {movies.map((movie) => (
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              ))}
            </div>
          </section>
          
          <div className="flex justify-center mt-4">
            <button 
              className="btn btn-primary" 
              onClick={addPage}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <ArrowBigDown />Suivant<ArrowBigDown />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        }>
          <HomeContent />
        </Suspense>
      </main>
    </div>
  )
}