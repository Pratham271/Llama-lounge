import React from 'react'
import { ModeToggle } from './ui/toggle-mode'
import { LogoIcon } from './ui/Icons'

const Appbar = async() => {

  
  return (
    <div className="flex justify-between items-center p-3 w-full top-0 bg-transparent z-50 border-b shadow-md">
        <div className="flex flex-row items-center gap-5 md:px-10">
        <div className="flex  text-lg items-center">
          <div className='h-8 w-8 rounded-md bg-black flex items-center justify-center mr-1'>
            <LogoIcon/>
          </div>
          <h1 className='font-medium'>Llama-Lounge</h1>
        </div>
        </div>
        <div className='flex items-center bg-transparent md:px-24'>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Appbar
