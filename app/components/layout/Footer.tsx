import { Github } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
<footer className=" footer-center bg-primary text-primary-content p-8">
  <aside>
  <video className="w-[600px] aspect-video rounded-lg shadow-lg" autoPlay muted loop>
  <source src={`${process.env.NEXT_PUBLIC_PATH_URL}/intro.mp4`} type="video/mp4" />
  Votre navigateur ne supporte pas la vidéo.
</video>
    <p className='text-base-dark'>Copyright © {new Date().getFullYear()} - By Florian Savoie</p>
  </aside>
  <nav>
 

<div className="avatar placeholder">
  <div className="bg-gray-700 text-white w-12 rounded-full">
  <a href="https://github.com/florianBKO" target='blank'><Github className='bg-base-dark'/></a>
  </div>
</div>
    
  </nav>
</footer>  )
}

export default Footer