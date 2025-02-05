'use client'
import { useState } from 'react';
import logoSite from '@/public/logo.webp';
import Image from 'next/image';

export default function Nav() {
  const [openMenu, setOpenMenu] = useState('');

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

  const menuItems = [
    {
      name: 'Film',
      subItems: ['Populaire', 'Du moment', 'A venir', 'Les mieux evalués']
    },
    {
      name: 'Émissions télévisées',
      subItems: ['Populaire', 'Diffusées aujourd\'hui', 'En cours de diffusion', 'Les mieux evalués']
    },
    {
      name: 'Artistes',
      subItems: ['Populaire']
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Mobile */}
          <div className="flex lg:hidden">
            <button 
              className="p-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => handleMenuClick('mobile')}
            >
              <Image 
                width={48} 
                height={48} 
                src={logoSite} 
                alt='logo lego' 
                className='rounded-full'
              />
            </button>
            
            {/* Menu mobile */}
            {openMenu === 'mobile' && (
              <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-lg z-50">
                {menuItems.map((item) => (
                  <div key={item.name} className="px-4 py-2">
                    <button 
                      className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md"
                      onClick={() => handleMenuClick(item.name)}
                    >
                      {item.name}
                    </button>
                    {openMenu === item.name && (
                      <div className="pl-4">
                        {item.subItems.map((subItem) => (
                          <a 
                            key={subItem}
                            href="#" 
                            className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logo - Desktop */}
          <div className="hidden lg:flex items-center">
            <Image 
              width={48} 
              height={48} 
              src={logoSite} 
              alt='logo lego' 
              className='rounded-full'
            />
          </div>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  className="px-4 py-2 text-white hover:bg-blue-600 rounded-md transition-colors"
                  onClick={() => handleMenuClick(item.name)}
                >
                  {item.name}
                </button>
                {openMenu === item.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bouton de droite */}
          <div>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
              Button
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}