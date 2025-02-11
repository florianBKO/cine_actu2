import { Star, Heart, ThumbsUp } from 'lucide-react';  // Autres icônes possibles
import React from 'react';

interface infosProps {
  titre: string;
  value: string | number;
  description: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
export default function InfoStat({ titre, value, description, icon }: infosProps) {


  const IconComponent = icon || Star;  // Si aucune icône n'est fournie, utilise Star par défaut

  return (
    <div className="stat bg-base-200/50 backdrop-blur border-white/10 border rounded-lg">
      <div className="stat-figure text-primary">
        <IconComponent className="w-8 h-8" />
      </div>
      <div className="stat-title text-base-content">{titre}</div>
      <div className="stat-value text-base-content">{value}</div>
      <div className="stat-desc text-base-content">{description}</div>
    </div>
  );
}

