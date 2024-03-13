import React from 'react'
import Header from './components/Header'
import GameArea from './components/GameArea'

export default function App() {
  return (
    <div className='font-mono'>
      <Header />
      <div className='flex justify-center items-center'>
        <GameArea />
      </div>
    </div>
  )
}
