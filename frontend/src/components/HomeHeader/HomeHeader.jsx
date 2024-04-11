import React from 'react'
import { Logo } from './Logo'
import { Nav } from './Nav'
import Logout from '../Logout.jsx'

function HomeHeader() {
  return (
    <header className="bg-slate-400 sticky top-0 z-1 flex w-full flex-wrap items-center justify-between border-b border-gray-100 bg-background p-8 font-sans font-bold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary"
    >
      <div className="flex items-center w-1/3">
        <Logo />
      </div>
            
      <div className="flex-1">
        <Nav />
      </div>

      <div className="flex items-center w-1/3 justify-end space-x-4">
        <Logout/>
      </div>  

    </header>
  )
}

export default HomeHeader