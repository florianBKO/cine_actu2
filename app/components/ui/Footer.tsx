import { Github } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
<footer className="footer footer-center bg-primary text-primary-content p-10">
  <aside>
  <video className="w-[600px] aspect-video rounded-lg shadow-lg" autoPlay muted loop>
  <source src="/intro.mp4" type="video/mp4" />
  Votre navigateur ne supporte pas la vidéo.
</video>
    <p>Copyright © {new Date().getFullYear()} - By Florian Savoie</p>
  </aside>
  <nav>
 

<div className="avatar placeholder">
  <div className="bg-neutral text-neutral-content w-12 rounded-full">
  <a href=""><Github /></a>
  </div>
</div>
    
  </nav>
</footer>  )
}

export default Footer