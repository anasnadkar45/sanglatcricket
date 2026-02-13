import React from 'react'
import { ModeToggle } from './theme/ModeToggle'

const Navbar = () => {
    return (
        <div className='w-full flex justify-between items-center py-4 px-2 fixed top-0 bg-background border-b backdrop-blur-sm z-50'>
            <h1 className='text-xl font-bold'>N.B.S.C Sanglat</h1>
            <ModeToggle />
        </div>
    )
}

export default Navbar