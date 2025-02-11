import React from 'react';
import { Terminal, Package, SmilePlus, Film, Code } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-base-200 p-8 text-base-content">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <h1 className="text-4xl font-bold mb-8 flex justify-center ">Documentation du Projet</h1>

        {/* Section Installation */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Terminal className="w-6 h-6 " />
              Installation du Projet
            </h2>
            <div className="mockup-code">
              <pre data-prefix="1"><code>npx create-next-app@latest mon-projet</code></pre>
              <pre data-prefix="2"><code>cd mon-projet</code></pre>
            </div>
            <p className="mt-4 ">Options de configuration recommandées :</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>TypeScript → Yes</li>
              <li>ESLint → Yes</li>
              <li>Tailwind CSS → Yes</li>
              <li>App Router → Yes</li>
              <li>Import alias → Yes</li>
            </ul>
          </div>
        </div>

        {/* Section DaisyUI */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Package className="w-6 h-6" />
              Installation de DaisyUI
            </h2>
            <div className="mockup-code">
              <pre data-prefix="1"><code>npm install daisyui@latest</code></pre>
            </div>
            <p className="mt-4">Configuration dans tailwind.config.js :</p>
            <div className="mockup-code">
              <pre data-prefix="1"><code>module.exports = {'{'}</code></pre>
              <pre data-prefix="2"><code>  content: ['./app/**/*.js,ts,jsx,tsx'],</code></pre>
              <pre data-prefix="3"><code>  plugins: [require('daisyui')],</code></pre>
              <pre data-prefix="4"><code>{'}'}</code></pre>
            </div>
          </div>
        </div>

        {/* Section Lucide React */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <SmilePlus className="w-6 h-6" />
              Installation de Lucide React
            </h2>
            <div className="mockup-code">
              <pre data-prefix="1"><code>npm install lucide-react</code></pre>
            </div>
            <p className="mt-4">Exemple d'utilisation :</p>
            <div className="mockup-code">
              <pre data-prefix="1"><code>import {'{ Home }'} from 'lucide-react';</code></pre>
              <pre data-prefix="2"><code>{'<Home className="w-6 h-6" />'}</code></pre>
            </div>
          </div>
        </div>

        {/* Section API TMDB */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Film className="w-6 h-6" />
              Configuration de l'API TMDB
            </h2>
            <div className="space-y-4">
              <p>1. Créez un compte sur TMDB et obtenez votre clé API</p>
              <p>2. Créez un fichier .env.local à la racine du projet :</p>
              <div className="mockup-code">
                <pre data-prefix="1"><code>API_KEY_THEMOVIE=votre_clé_api</code></pre>
              </div>
              <p>3. Exemple d'utilisation de l'API :</p>
              <div className="mockup-code">
                <pre data-prefix="1"><code>const BASE_URL = 'https://api.themoviedb.org/3';</code></pre>
                <pre data-prefix="2"><code>const apiKey = process.env.API_KEY_THEMOVIE;</code></pre>
                <pre data-prefix="3"><code>const res = await fetch(</code></pre>
                <pre data-prefix="4"><code>  `BASE_URL/movie/popular?api_key=apiKey&language=fr-FR`</code></pre>
                <pre data-prefix="5"><code>);</code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Section Structure du Projet */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Code className="w-6 h-6" />
              Structure du Projet
            </h2>
            <div className="mockup-code">
              <pre data-prefix="📁"><code>app/</code></pre>
              <pre data-prefix="├─"><code>api/</code></pre>
              <pre data-prefix="│ └─"><code>route.ts    # API routes</code></pre>
              <pre data-prefix="├─"><code>components/   # Composants réutilisables</code></pre>
              <pre data-prefix="├─"><code>styles/       # Fichiers CSS</code></pre>
              <pre data-prefix="└─"><code>page.tsx      # Page principale</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}