import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'

import MenuFilters from './MenuFilter/MenuFilters'
import ListProducts from './ListProducts'

function Home() {

    const { products } = useSelector(state => state.products)

    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open)
    }

    return (
        <div className='flex flex-col '>
            <section className='bg-amber-500  border-x-2 border-b-4 border-b-orange-900 border-x-orange-900 rounded-b-2xl'>
                <Navbar/>
            </section>
            
            <section className='p-2'>
                <div className={`${open ? 'absolute bg-amber-900/50  rounded-md items-center flex-col ' : 'none'} flex `}>
                    <MenuFilters
                        toggleopen={open} />
                    <button
                        className={`${open ? 'bg-amber-900  sm:bg-orange-700 m-2 p-2 h-8 rounded-md flex justify-center items-center' :
                            'bg-white/40 sm:bg-orange-700 m-2 p-2 h-8 rounded-md flex justify-center items-center sm:relative sm:-top-14'}`}
                        onClick={() => handleToggle()}>{open ? 
                        <p className='font-bold text-white '>CLOSE</p> :
                        <p className='font-bold text-white '>MENU</p>}
                    </button>
                </div>
                <div className='bg-orange-500/80  rounded-md'>
                    <ListProducts
                        products={products} />
                </div>
            </section>
        </div>
    )
}

export default Home