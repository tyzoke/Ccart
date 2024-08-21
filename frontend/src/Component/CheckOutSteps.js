import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const CheckOutSteps = ({step1,step2,step3,step4,step5,step6}) => {
  return (
    <Nav className='justify-content-center mb-4 '>
      <Nav.Item className='badge text-bg-warning'>
        {step1?(
        <LinkContainer to='/users/login' className={step1 ? ('active') : ''}>
        <Nav.Link className='rounded text-bg-success'>Sign In  &#8658;</Nav.Link>
        </LinkContainer>
        ):(<Nav.Link disabled>Sign In</Nav.Link>)}
      </Nav.Item>
      

      <Nav.Item className='badge text-bg-warning'>  
      {step2?(
        <LinkContainer to='/cart' className={step2 ? 'active' : ''}>
        <Nav.Link className='rounded text-bg-success'>Cart &#8658;</Nav.Link>
        </LinkContainer>
        ):(<Nav.Link disabled>Cart</Nav.Link>)}
      </Nav.Item>

      <Nav.Item className='badge text-bg-warning'>
        {step3?(
        <LinkContainer to='/shipping' className={step3 ? 'active' : ''}>
        <Nav.Link className='rounded text-bg-success'>Shipping &#8658;</Nav.Link>
        </LinkContainer>
        ):(<Nav.Link disabled>Shipping</Nav.Link>)}
        </Nav.Item>

      <Nav.Item className='badge text-bg-warning'>
        {step4?(
        <LinkContainer to='/payment' className={step4 ? 'active' : ''}>
        <Nav.Link className='rounded text-bg-success'>Payment &#8658;</Nav.Link>
        </LinkContainer>
        ):(<Nav.Link disabled>Payment</Nav.Link>)}
      </Nav.Item>

      <Nav.Item className='badge text-bg-warning' >
        {step5?(
          <LinkContainer to='/placeorder' className={step5 ? 'active' : ''}>
            <Nav.Link className='rounded text-bg-success'>Place Order &#8658;</Nav.Link>
            </LinkContainer>
            ):(<Nav.Link disabled>Place Order</Nav.Link>)}
      </Nav.Item>

      <Nav.Item className='badge text-bg-warning' >
        {step6?(
          <LinkContainer to='/order' className={step6 ? 'active' : ''}>
            <Nav.Link className='rounded text-bg-success'>Order &#8658;</Nav.Link>
            </LinkContainer>
            ):(<Nav.Link disabled>Order</Nav.Link>)}
      </Nav.Item>
    </Nav>
  )
}

export default CheckOutSteps