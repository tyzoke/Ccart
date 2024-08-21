import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {Image, Button,Card, CardTitle,FormControl, ListGroup, Row ,Col} from 'react-bootstrap'
import { useDispatch,useSelector} from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import {Table} from 'react-bootstrap'
import { addToCart,removeCartItems } from '../../slices/cartSlice'
import CheckOutSteps from '../../Component/CheckOutSteps'


const CartScreen = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const addToCartHandler=async(products,qty)=>{
     dispatch(addToCart({...products,qty}));
  }

  const removeFromCartHandler=async(id)=>{
    dispatch(removeCartItems(id));
 }

 const checkoutHandler=async()=>{
  navigate('/users/login?redirect=/shipping');

 }
  
  return (
    <>
    <div className='bg-gr'>
    <LinkContainer to='/'>
      <Button className='btn btn-block'>Back</Button>
    </LinkContainer>
    
    <CheckOutSteps step1 step2/>
    
    <Row>
    <Col className='col-1'></Col>
      <Col>
    
    <Card style={{width:'600px',backgroundColor:'lightgoldenrodyellow' }} variant='flush'>
      <CardTitle className='bg-warning' >Cart</CardTitle>
      <Card.Body>
       {cartItems.length===0?(<h1>Your cart is empty</h1>):(

        <Table striped bordered hover>
          <thead>
            <th>Product Name</th>
            <th>Quantity</th>
             <th>Price</th>
             <th>Remove</th>
          </thead>
          {cartItems.map((item)=>(
               <>
          <tbody key={item._id}>
            <td><Image src={item.image} fluid rounded width="50px"/></td>
          <td>{item.name}</td>
             <td> <FormControl as='select' value={item.qty} onChange={(e)=>{addToCartHandler(item,Number(e.target.value))}}>
                                    {[...Array(item.countInStock).keys()].map((x)=>(
                                      <option key={x+1} value={x+1}>{x+1}</option>
                                    ))}
                                  </FormControl></td>
             <td>&#8377;{item.price}</td>
             <td><Button variant='danger' onClick={()=>removeFromCartHandler(item._id)}><FaTrash /></Button></td>
          </tbody>
          </>
          ))}
        </Table>
       
        
       )}

      </Card.Body>
    </Card>
    
    </Col>
    <Col className='col-1'></Col>
    <Col>
    
    <Card  style={{width:'300px',backgroundColor:'lightgoldenrodyellow' }} variant='flush'>
    <CardTitle className='bg-warning' > Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</CardTitle>
      <ListGroup variant='flush'>
             
             <ListGroup.Item style={{backgroundColor:"lightyellow"}}>
            <b> &#8377; </b>{cartItems.reduce((acc,item)=>acc + item.qty * item.price,0)}
             </ListGroup.Item>
             <ListGroup.Item style={{backgroundColor:"lightyellow"}}>
              <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>Proceed To Pay</Button>
             </ListGroup.Item>
      </ListGroup>
    </Card>
    
    </Col>
    </Row>
    </div>
    </>
  )
}

export default CartScreen