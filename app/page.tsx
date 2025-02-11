'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from 'react'
import Card from './components/ui/Card'
import Carousel from './components/ui/Carousel'
import { Loader2 } from 'lucide-react'
import { Movie } from '@/app/prototypes';
import InputSearchMovies from './components/ui/InputSearchMovies'

interface CarouselItem {
  poster_path: string
}

// Composant principal qui utilise useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const categorie = searchParams.get("categorie") || "les plus populaire"; 
  const type = searchParams.get("type") || "movie"; 
  const [movies, setMovies] = useState<Movie[]>([])
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PATH_URL}/api/${type}?categorie=${categorie}`,	
          {
            headers: {
              'Cache-Control': 'max-age=3600',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data.results)) {
          throw new Error('Les données récupérées ne sont pas un tableau')
        }

        setMovies(data.results)
        setCarouselItems(
          data.results.map((movie: { poster_path: string }) => ({
            poster_path: movie.poster_path,
          }))
        )
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur est survenue')
        console.error('Erreur lors de la récupération des films:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [categorie, type])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="mb-8">
        <InputSearchMovies />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-base-200 bg-clip-text bg-gradient-to-r text-base-content">
          Découvrez les Films {categorie}
        </h1>
      </header>

      {loading ? (
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
            <div className="mx-auto p-4 flex flex-wrap justify-center gap-5 sm:justify-start">
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
        </>
      )}
    </div>
  )
}

// Composant wrapper qui inclut Suspense
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