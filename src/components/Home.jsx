import React from 'react'
import PasswordGenerator from './PasswordGenerator'
import Savedpasswords from './Savedpasswords'

function Home() {
    return (
        <div className='flex justify-between'>
            <div className='ml-10 w-full'>
                <PasswordGenerator />
            </div>
            <div className='mr-10 w-full'>
                <Savedpasswords />
            </div>
        </div>
    )
}

export default Home
