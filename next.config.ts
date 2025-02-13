/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // Ajoutez cette ligne pour spécifier le sous-dossier
 //basePath: '/cine-actu', 
   basePath: '', 
  images: {
    domains: ["image.tmdb.org"], // Ajoute le domaine autorisé
  },
};

export default nextConfig;