import React from 'react'
import Navbar from '../components/navbar.component.jsx'
import InPageNavigation from '../components/inpage-navigation.component.jsx'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <section className='mt-20 flex justify-center gap-10'>
            <div className='w-full'>
                <InPageNavigation></InPageNavigation>
            </div>

            <div>

            </div>
        </section>
    </div>
  )
}

export default Home