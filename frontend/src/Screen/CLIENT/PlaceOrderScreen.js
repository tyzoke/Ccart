import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button,Row ,Col,ListGroup,Card} from 'react-bootstrap'
import CheckOutSteps from '../../Component/CheckOutSteps'
import { toast } from 'react-toastify';
import Alerting from '../../Component/Alerting'
import Spinner from '../../Component/Spinner'
import { useCreateOrderMutation } from '../../slices/orderApiSlice'
import { clearCartItems } from '../../slices/cartSlice';
import { LinkContainer } from 'react-router-bootstrap';

const PlaceOrderScreen=()=>{
  const navigate=useNavigate();
  const cart=useSelector((state)=>state.cart)
  const [createOrders,{isLoading,error}]=useCreateOrderMutation()
  const dispatch=useDispatch();

  const submitHandler = async() =>{
    try{
         const orderCre=await createOrders({
          orderItems:cart.cartItems,
          shippingAddress:cart.shippingAddress,
          paymentMethod:cart.paymentMethod,
          totalAmount:cart.totalAmount,
          totalShipping:cart.totalShipping,
          totalGst:cart.totalGst,
          totalDebtingAmount:cart.totalDebitingAmount
         }).unwrap();
          dispatch(clearCartItems());
         navigate(`/orders/${orderCre._id}`);
    }catch(error){
      console.error(error); // Log the error to see its structure
      const errorMessage = error?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  
  }

  useEffect(()=>{
    if(!cart.shippingAddress.address){
      navigate('/shipping')
    }
    else if(!cart.paymentMethod){
      navigate('/payment')
    }
  },[cart.paymentMethod,cart.shippingAddress.address,navigate])
  return (
  <>
  <div className='bg-gr'> 
      <LinkContainer to='/payment'>
      <Button className='btn-block'>Back</Button>
    </LinkContainer>


<CheckOutSteps step1 step2 step3 step4 step5/>
  <Row>
    <Col md={1}></Col>
    <Col md={7}>
    <ListGroup variant='flush' style={{backgroundColor:"lightyellow"}}>
      <ListGroup.Item style={{backgroundColor:"lightyellow"}}>
        <h2>Shipping</h2>
        <p>
          <strong>Address:</strong>
          {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
        </p>
      </ListGroup.Item >

      <ListGroup.Item style={{backgroundColor:"lightyellow"}}>
        <h2>Payment Method</h2>
        <strong>Method:</strong>
        {cart.paymentMethod}
      </ListGroup.Item>
    
    <ListGroup.Item style={{backgroundColor:"gold"}}>
      <Card>
      <Card.Header as="h5" className='bg-warning fs-5'>Order Items</Card.Header>
      <Card.Body style={{backgroundColor:'gold' }} >
        {cart.cartItems.length===0?(
          <Alerting>Your cart is Empty</Alerting>
        ):( <>
          <ListGroup  >
          <ListGroup.Item  style={{backgroundColor:'lightgoldenrodyellow' }}>
                  <Col >
                  <Row >
                    <Col >
                        <strong>Image</strong> 
                    </Col>
                    <Col >
                    <strong>   Name   </strong> 
                    </Col>
                    <Col >
                    <strong> Price </strong> 
                    </Col>
                    <Col>
                    <strong> Quantity </strong> 
                    </Col>
                    <Col>
                    <strong> Totalprice </strong> 
                    </Col>
                  </Row>
                  
                  </Col>

                 
                </ListGroup.Item >
            {cart.cartItems.map((item,index)=>{
              // console.log(index +"hi");
              // console.log(item.name);
              return (
                <ListGroup.Item key={index}  style={{backgroundColor:'lightgoldenrodyellow' }}>
                  <Col >
                  <Row >
                    <Col>
                    <img src={item.image} alt={item.name}  style={{width:50}} />
                    </Col>
                    <Col>
                    {item.name}
                    </Col>
                    <Col>
                    &#8377; {item.price}
                    </Col>
                    <Col>
                    {item.qty}
                    </Col>
                    <Col>
                    &#8377; {item.price * item.qty}
                    </Col>
                  </Row>
                  
                  </Col>
                </ListGroup.Item>
              )
            })}


          </ListGroup>
          </>
        )}
        </Card.Body>
        </Card>
      </ListGroup.Item>

    </ListGroup>
     </Col>
    <Col md={3} >
    <Card>
      <Card.Header as="h5" className='bg-warning fs-5'>Order Summary</Card.Header>
      <Card.Body  style={{backgroundColor:'lightgoldenrodyellow' }}>
      <Row>
      <Col><strong>Method :</strong></Col>
      <Col>{cart.paymentMethod}</Col>
      </Row>

      <Row>
      <Col><strong>Amount :</strong></Col>
      <Col>{cart.totalAmount}</Col>
      </Row>

      <Row>
      <Col><b>Gst</b></Col>
      <Col>{cart.totalGst}</Col>
      </Row>

      <Row>
      <Col><strong>Shipping Charge:</strong></Col>
      <Col>{cart.totalShipping}</Col>
      </Row>

      <Row>
      <Col><strong>Total Amount :</strong></Col>
      <Col>{cart.totalDebitingAmount}</Col>
      </Row>
      {error && <Alerting variant='danger'>{error}</Alerting>}
      <Button type='submit' className='btn btn-sm' onClick={submitHandler} disabled={cart.cartItems.length===0} >Place Order</Button>
       {isLoading &&<Spinner/>}
      </Card.Body>
      </Card>
      
      
      </Col>
  </Row>
  </div>

  </>
)}

export default PlaceOrderScreen;

// import React,{useState} from 'react'
// import {Link,redirect,useLocation,useNavigate} from 'react-router-dom'
// import { Form,Button,Image, Card } from 'react-bootstrap'
// import {useDispatch,useSelector} from 'react-redux'
// import Alerting from '../Component/Alerting'
// import Spinner from '../Component/Spinner'
// import { saveShippingAddress } from '../slices/cartSlice'
// import CheckOutSteps from '../Component/CheckOutSteps'


// const PlaceOrderScreen = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const location = useLocation()
//     const cart = useSelector(state => state.cart)
//     const {userInfo}=useSelector((state)=>state.login)

//     // const {userInfo} = useSelector((state) => cart.login)
//      const [name, setName] = useState(userInfo.name ||'')
//      const [email, setEmail] = useState(userInfo.email ||'')
//      const [address, setAddress] = useState(userInfo.address || '')
//      console.log(address +email +name)
//   return (
//     <div>
//       <CheckOutSteps step1 step2 step3 step4 step5></CheckOutSteps>
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             <h2>Place Order</h2>
//             <Card> 
//                 <Form>
//                 <Form.Group controlId="name">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control  type='text'value={name} disabled></Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId="contactNo">
//                   <Form.Label>Contact No</Form.Label>
//                   <Form.Control  type='text' value={""} disabled></Form.Control>
             
//                 </Form.Group>
//                 <Form.Group controlId="emailId">
//                   <Form.Label>Email Id</Form.Label>
//                   <Form.Control  type='text' value={email} disabled></Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId="address">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control  type='text' value={address} disabled></Form.Control>
//                 </Form.Group>
//               </Form>
//               </Card>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PlaceOrderScreen