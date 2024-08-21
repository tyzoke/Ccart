import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card  className='my-3 p-3 rounded ' style={{backgroundColor:'lightgoldenrodyellow'}}>
        <Link to={`/products/${product._id}`}>
            <Card.Img width='100px' height='200px' src={product.image} variant='top' />
            
        </Link>
        <Card.Body>
            <LinkContainer to={`/products/${product._id}`}>
                <Card.Title as ="div">
                    <h2>{product.name}</h2>
                </Card.Title>
            </LinkContainer>

            <Card.Text ><h2> &#8377;  {product.price}</h2></Card.Text>
            <Card.Text as='h5'> <span style={{color:'red'}}> <Rating value={product.rating}/ > {product.rating}</span></Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
