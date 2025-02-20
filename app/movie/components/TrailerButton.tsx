
// TrailerButton.tsx (composant client)
'use client';

import { Play } from "lucide-react";
import { useState } from "react";

interface VideoPopupProps {
  trailerKey: string;
  onClose: () => void;
}

function VideoPopup({ trailerKey, onClose }: VideoPopupProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 v-80"
      onClick={onClose}
    >
      <div className="w-[65vw] h-[65vh] bg-black relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
        >
          Fermer
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Bande-annonce"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function TrailerButton({ trailerKey }: { trailerKey: string }) {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowTrailer(true)}
        className="btn btn-md btn-primary  gap-2 "
      >
        <Play className="w-6 h-6 " />
        Voir la bande-annonce
      </button>

      {showTrailer && (
        <VideoPopup trailerKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </>
  );
}