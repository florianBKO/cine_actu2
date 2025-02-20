import React from 'react';
import { Terminal, Package, ShieldCheck, PlayCircle, LockKeyhole, SwatchBook, Users, Database, Cloud } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-base-200 p-8 text-base-content">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <h1 className="text-4xl font-bold mb-8 text-center">📖 Documentation du Projet CineActu</h1>

        {/* Section Installation du Projet */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              Installation du Projet
            </h2>
            <div className="mockup-code">
              <pre data-prefix="1"><code>npx create-next-app@latest cine_actu2</code></pre>
              <pre data-prefix="2"><code>cd cine_actu2</code></pre>
              <pre data-prefix="3"><code>npm install</code></pre>
            </div>
            <p className="mt-4">Configuration recommandée :</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>TypeScript → ✅</li>
              <li>Tailwind CSS  ✅</li>
            </ul>
          </div>
        </div>

        {/* Section Variables d'environnement */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <LockKeyhole className="w-6 h-6" />
              Variables d'environnement
            </h2>
            <p>Assurez-vous de configurer les variables d'environnement suivantes dans votre fichier <code>.env</code> :</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li><strong><code>DATABASE_URL</code></strong> — URL de connexion à votre base de données (par exemple : <code>mysql://user:password@localhost:3306/mydatabase</code>).</li>
              <li><strong><code>JWT_SECRET</code></strong> — Clé secrète utilisée pour signer les tokens JWT (par exemple : <code>votre-secret-key-tres-securisee</code>).</li>
              <li><strong><code>API_KEY_THEMOVIE</code></strong> — Clé API pour accéder à l'API de TheMovieDB. <a href="https://developer.themoviedb.org/docs/getting-started" target="_blank">Obtenez un token API ici</a>(Simple a obtenir).</li>
              <li><strong><code>NEXT_PUBLIC_PATH_URL</code></strong> — URL de votre application Next.js en développement (par exemple : <code>http://localhost:3000/</code>).</li>
            </ul>
          </div>
        </div>

        {/* Section Dépendances Principales */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Package className="w-6 h-6" />
              Dépendances Principales
            </h2>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li><strong>Next.js 15.1.6</strong> — Framework React pour SSR et SSG. <a href="https://nextjs.org/" target="_blank">Site officiel</a></li>
              <li><strong>Prisma 6.3.1</strong> — ORM pour interagir avec la base de données. <a href="https://www.prisma.io/" target="_blank">Site officiel</a></li>
              <li><strong>Next-Auth 4.24.11</strong> — Authentification sécurisée. <a href="https://next-auth.js.org/" target="_blank">Site officiel</a></li>
              <li><strong>bcryptjs 3.0.0</strong> — Hash des mots de passe. <a href="https://github.com/dcodeIO/bcrypt.js" target="_blank">GitHub</a></li>
              <li><strong>Lucide-React 0.474.0</strong> — Pack d'icônes. <a href="https://lucide.dev/" target="_blank">Site officiel</a></li>
              <li><strong>React-Player 2.16.0</strong> — Intégration de vidéos. <a href="https://github.com/CookPete/react-player" target="_blank">GitHub</a></li>
              <li><strong>Swiper 11.2.2</strong> — Carrousels interactifs. <a href="https://swiperjs.com/" target="_blank">Site officiel</a></li>
              <li><strong>Jose 5.9.6</strong> — Gestion des tokens JWT. <a href="https://github.com/panva/jose" target="_blank">GitHub</a></li>
              <li><strong>Motion 12.4.1</strong> — Animations fluides. <a href="https://www.framer.com/motion/" target="_blank">Site officiel</a></li>
              <li><strong>daisyui</strong> — <a href="https://daisyui.com/" target="_blank">Site officiel</a></li>
            </ul>
          </div>
        </div>


        {/* Section Authentification */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" />
              Authentification avec Next-Auth
            </h2>
            <p>Intégration de <strong>Next-Auth</strong> avec <strong>Prisma Adapter</strong> pour une gestion sécurisée des utilisateurs.</p>
            <div className="mockup-code">
              <pre data-prefix="1"><code>npm install next-auth @next-auth/prisma-adapter</code></pre>
            </div>

          </div>
        </div>


        {/* Section Composants Vidéos */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <PlayCircle className="w-6 h-6" />
              Intégration de Vidéos avec React-Player
            </h2>
            <div className="mockup-code">
              <pre data-prefix="1"><code>npm install react-player</code></pre>
            </div>
            <p className="mt-4">Exemple d'intégration :</p>
            <div className="mockup-code">
              <pre data-prefix="1"><code>import ReactPlayer from 'react-player';</code></pre>
              <pre data-prefix="2"><code>{'<ReactPlayer url="https://youtu.be/xyz" controls />'}</code></pre>
            </div>
          </div>
        </div>

        {/* Section Carrousels */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <SwatchBook className="w-6 h-6" />
              Utilisation de Swiper
            </h2>
            <div className="mockup-code">
              <pre data-prefix="1"><code>npm install swiper</code></pre>
            </div>

          </div>
        </div>

        {/* Section Hébergement */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Cloud className="w-6 h-6" />
              Hébergement sur Vercel
            </h2>
            <p>Le projet est hébergé sur <strong>Vercel</strong>, une plateforme de déploiement continu pour les applications Next.js. Vercel offre une intégration fluide avec GitHub, permettant des déploiements automatiques à chaque push sur la branche principale.</p>
            <div className="mockup-code">
              <pre data-prefix="1"><code>vercel deploy</code></pre>
            </div>
          </div>
        </div>

        {/* Section Base de Données */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Database className="w-6 h-6" />
              Base de Données MySQL sur Railway
            </h2>
            <p>La base de données MySQL est hébergée sur <strong>Railway</strong>, une plateforme cloud qui simplifie la gestion des bases de données. Prisma est utilisé pour interagir avec la base de données, offrant une couche d'abstraction puissante et sécurisée.</p>
            <div className="mockup-code">
              <pre data-prefix="1"><code>DATABASE_URL="mysql://user:password@host:port/database"</code></pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm opacity-75">
          <p>🚀 Projet construit avec Next.js, Prisma, Next-Auth, TailwindCSS, DaisyUI et l'API TMDB. Hébergé sur Vercel avec une base de données MySQL sur Railway.</p>
        </div>
      </div>
    </div>
  );
}