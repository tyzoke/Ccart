import React from 'react'
import {Navbar} from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
        <Navbar bg='dark' variant='light' expand='lg' collapseOnSelect ></Navbar>
        
        <Navbar bg='warning' variant='danger' expand='lg' collapseOnSelect >
          <Navbar.Brand>
          <div className=" position-absolute bottom-0 start-50 translate-middle-x">@created by <span><b>tyzoke</b></span></div>
         
          </Navbar.Brand>
        </Navbar>
           
        
        <Navbar bg='dark' variant='light' expand='lg' collapseOnSelect ></Navbar>  
    </footer>
  )
}

export default Footer