import React,{useEffect, useState} from 'react'
import { Form,Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import CheckOutSteps from '../../Component/CheckOutSteps'
import { useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { savePaymentMethod } from '../../slices/cartSlice'

const PaymentScreen = () => {
    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const cart=useSelector((state)=>state.cart);
    const {shippingAddress}=cart;
    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
            }
    },[shippingAddress,navigate])


    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
       navigate("/placeOrder");

    }
  return (
    <>
    <div className='pay-r'>
    <LinkContainer to='/shipping'>
      <Button className='btn-block'>Back</Button>
    </LinkContainer>
    

    <CheckOutSteps step1 step2 step3 step4/>
    <div className='d-flex justify-content-center top-50'>
    <Card style={{width:'400px',height:'400px',backgroundColor:'lightgoldenrodyellow' }}>
        <Card.Title className='bg-warning text-dark'>
            Payment Method
        </Card.Title>

        <Card.Body>
            <Form>
            <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal'
                 checked onChange={(e)=>setPaymentMethod(e.target.value)}/>

            <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe'
                 onChange={(e)=>setPaymentMethod(e.target.value)}/>

            <Form.Check type='radio' label='Paytm' id='Paytm' name='paymentMethod' value='Paytm'
                 onChange={(e)=>setPaymentMethod(e.target.value)}/>

            <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal'
                 onChange={(e)=>setPaymentMethod(e.target.value)}/>    

            <Form.Check type='radio' label='GooglePay' id='GooglePay' name='paymentMethod' value='GooglePay'
                 onChange={(e)=>setPaymentMethod(e.target.value)}/>     

            <Form.Check type='radio' label='Bheem' id='Bheem' name='paymentMethod' value='Bheem'
                 onChange={(e)=>setPaymentMethod(e.target.value)}/>

            <Form.Check type='radio' label='AmazonPay' id='AmazonPay' name='paymentMethod' value='AmazonPay'
                 onChange={(e)=>setPaymentMethod(e.target.value)}/>    
            
            <Button  type='submit' id='btn' className='btn btn-primary' onClick={submitHandler} >Proceed to Pay</Button>
            </Form>     
        </Card.Body>
    </Card>
    </div>
    </div>
    </>
  )
}

export default PaymentScreen