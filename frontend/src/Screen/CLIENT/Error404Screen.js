import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Error404Screen = () => {
  return (
    <div >
         <Card >
            <Card.Header className='bg-warning fs-5'><Card.Title>Error Page</Card.Title></Card.Header>
            <Card.Body style={{backgroundColor:'gold' }}>
                <ListGroup>
                    <ListGroup.Item style={{backgroundColor:'lightyellow' }}>
                        Status : 404
                    </ListGroup.Item>

                    
                    <ListGroup.Item style={{backgroundColor:'lightyellow' }}>
                        Reason : Wrong URL Provided
                    </ListGroup.Item>

                    <ListGroup.Item style={{backgroundColor:'lightyellow' }}>
                        <label for='btn'>Go to Home page : </label> <Link to='/'><Button type='button' id='btn'> Home </Button></Link>
                    </ListGroup.Item>

                </ListGroup>
            </Card.Body>
        </Card>
        <div className='bg-error'></div>
    </div>
  )
}

export default Error404Screen