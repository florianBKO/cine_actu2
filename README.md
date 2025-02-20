## 📱 Accédez au Projet

Le projet est hébergé sur [Apercu](https://cine-actu2.vercel.app/).

---

# 📖 Documentation du Projet CineActu

Bienvenue dans la documentation du projet CineActu, une application web de gestion de films utilisant Next.js, Prisma, Next-Auth, et plusieurs autres technologies modernes. Ce projet permet de visualiser des jaquettes de films, d'interagir avec une base de données et d'utiliser l'API de TheMovieDB.



## 🚀 Installation et Lancement

Pour démarrer avec le projet, suivez les étapes ci-dessous :

1. Clonez le projet :

   ```bash
   git clone https://github.com/florianBKO/cine_actu2.git
   cd cine_actu2
   ```
## 🔑 Variables d'environnement

Assurez-vous de configurer les variables d'environnement suivantes dans votre fichier `.env` :

```env
DATABASE_URL="mysql://user:password@localhost:3306/mydatabase"
JWT_SECRET="votre-secret-key-tres-securisee"
API_KEY_THEMOVIE="Votre clé API de TheMovieDB"
NEXT_PUBLIC_PATH_URL="http://localhost:3000/"
```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Mettez à jour votre base de données avec Prisma :

   ```bash
   npm prisma migrate dev
   ```

4. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

---



Pour obtenir la clé API de TheMovieDB, rendez-vous sur [leur site officiel](https://developer.themoviedb.org/docs/getting-started).

---

## 📦 Dépendances Principales

Voici les principales dépendances utilisées dans le projet :

- **Next.js** 15.1.6 — Framework React pour SSR et SSG. [Site officiel](https://nextjs.org/)
- **Prisma** 6.3.1 — ORM pour interagir avec la base de données. [Site officiel](https://www.prisma.io/)
- **Next-Auth** 4.24.11 — Authentification sécurisée. [Site officiel](https://next-auth.js.org/)
- **bcryptjs** 3.0.0 — Hash des mots de passe. [GitHub](https://github.com/dcodeIO/bcrypt.js)
- **Lucide-React** 0.474.0 — Pack d'icônes. [Site officiel](https://lucide.dev/)
- **React-Player** 2.16.0 — Intégration de vidéos. [GitHub](https://github.com/CookPete/react-player)
- **Swiper** 11.2.2 — Carrousels interactifs. [Site officiel](https://swiperjs.com/)
- **Jose** 5.9.6 — Gestion des tokens JWT. [GitHub](https://github.com/panva/jose)
- **Motion** 12.4.1 — Animations fluides. [Site officiel](https://www.framer.com/motion/)
- **daisyUI** — [Site officiel](https://daisyui.com/)

---

## 🔐 Authentification avec Next-Auth

Le projet utilise **Next-Auth** pour la gestion de l'authentification avec l'intégration de **Prisma Adapter** pour stocker les utilisateurs dans la base de données.

### Installation de Next-Auth

```bash
npm install next-auth @next-auth/prisma-adapter
```

---

## 🎥 Intégration de Vidéos avec React-Player

Le projet utilise **React-Player** pour l'intégration de vidéos YouTube.

### Installation de React-Player

```bash
npm install react-player
```

Exemple d'intégration :

```jsx
import ReactPlayer from 'react-player';

<ReactPlayer url="https://youtu.be/xyz" controls />
```

---

## 🖼️ Utilisation de Swiper

Le projet utilise **Swiper** pour les carrousels interactifs.

### Installation de Swiper

```bash
npm install swiper
```

---

## ☁️ Hébergement sur Vercel

Le projet est hébergé sur **Vercel**, une plateforme de déploiement continu pour les applications Next.js.

Pour déployer sur Vercel :

```bash
vercel deploy
```

---

## 🗄️ Base de Données MySQL sur Railway

La base de données MySQL est hébergée sur **Railway**, une plateforme cloud qui simplifie la gestion des bases de données.

Exemple de configuration dans le fichier `.env` :

```env
DATABASE_URL="mysql://user:password@host:port/database"
```

---



🚀 **Projet construit avec Next.js, Prisma, Next-Auth, TailwindCSS, DaisyUI et l'API TMDB. Hébergé sur Vercel avec une base de données MySQL sur Railway.**
