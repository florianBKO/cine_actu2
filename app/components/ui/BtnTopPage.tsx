import { PanelTopClose } from 'lucide-react'
import React from 'react'

function BtnTopPage() {
    return (
        <div className='flex justify-end  bg-base-200  '>
            <a href="#topPage" title='retour haut de page'>
                <button className="btn btn-circle hover:bg-primary bg-primary text-white border-priary mb-3 mr-5">
                  <PanelTopClose />
                </button>
            </a>
        </div>
    )
}

export default BtnTopPage