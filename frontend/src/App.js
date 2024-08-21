import React from 'react'
import Header from '../src/Component/Header'
import Footer from './Component/Footer'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
    <Header/>
   <main className='py-3'>
    <Container>
      <Outlet/>
    </Container>
   </main>
    <Footer />
    </>
  )
}

export default App
