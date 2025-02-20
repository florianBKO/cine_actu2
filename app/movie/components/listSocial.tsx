'use client'
import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { ExternalIds } from '@/app/prototypes';


const ListSocial = ({ id }: { id: string }) => {
  const [socialData, setSocialData] = useState<ExternalIds | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/social?id=${id}`); // Utilisation correcte des backticks
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSocialData(data);
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        console.error(err);
      }
    };

    fetchSocialData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {socialData ? (
        <ul className="flex space-x-4">

          {socialData.facebook_id && (
            <li>
              <a
                href={`https://www.facebook.com/${socialData.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xl text-blue-600 border border-blue-600 border-solid p-2 rounded-lg hover:bg-blue-100"              >
                <Facebook className="w-5 h-5" />

              </a>
            </li>
          )}
          {socialData.instagram_id && (
            <li>
              <a href={`https://www.instagram.com/${socialData.instagram_id}`} target="_blank" className="flex items-center gap-2 text-xl text-pink-500 border border-pink-500 border-solid p-2 rounded-lg hover:bg-blue-100"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </li>
          )}
          {socialData.twitter_id && (
            <li>
              <a href={`https://twitter.com/${socialData.twitter_id}`} target="_blank" className="flex items-center gap-2 text-xl text-blue-400 border border-blue-400 border-solid p-2 rounded-lg hover:bg-blue-100"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </li>
          )}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ListSocial;
