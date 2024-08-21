import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const HelpScreen = () => {
  return (
    <div className='bg-help' >
      <div>
        <LinkContainer to='/'>
      <Button variant='primary' >  <Button variant='info' disabled>HomeScreen</Button>  </Button>
        </LinkContainer>
      </div >
      <div  className='d-flex justify-content-center top-50'>
        <Card style={{width:'400px',height:'400px',backgroundColor:'lightgoldenrodyellow' }} >
            <Card.Header className='bg-warning fs-5'>Help</Card.Header>
            <Card.Body>
                <ListGroup >
                    <ListGroup.Item style={{backgroundColor:'lightyellow' }}><h4>Toll Free Contact Number : </h4> 180017352010 </ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor:'lightyellow' }}><h4>For Technical Support    : </h4>+918737801229 </ListGroup.Item>
                    
                    <ListGroup.Item style={{backgroundColor:'lightyellow' }}><h4>Email : </h4>group.iv.cdac@gmail.com</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        </div>
        <div></div>
    </div>
  )
}

export default HelpScreen