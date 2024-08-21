import React,{useEffect} from 'react'
import {PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { usePayOrderMutation,useGetPayPalClientQuery } from '../../slices/orderApiSlice'
import {toast ,ToastContainer} from 'react-toastify'
import {useSelector} from 'react-redux'
import CheckOutSteps from '../../Component/CheckOutSteps'
import { useParams} from 'react-router-dom'
import Alerting from '../../Component/Alerting'
import { Card,Row,Col,ListGroup,Button, CardBody } from 'react-bootstrap'
import Spinner from '../../Component/Spinner'
import {useGetOrderDetailsQuery,useDeliverOrderMutation} from '../../slices/orderApiSlice'
import { LinkContainer } from 'react-router-bootstrap'


const OrderScreen = () => {
    const {id:orderId} = useParams()
    // console.log(orderId)
    const { data:ord,refetch,isLoading,error} = useGetOrderDetailsQuery(orderId)
    const [payOrder,{isLoading:loadingPayOrder,error:errorPayOrder}]=usePayOrderMutation();
    const [{isPending},paypalDispatch]=usePayPalScriptReducer();
    
    const {userInfo} =useSelector((state)=>state.login);
    // console.log(userInfo)
    const {data:paypal ,isLoading:loadingPayPal,error:errorPayPal}=useGetPayPalClientQuery()
    
    const [delivery,{isLoading:loadingDelivery,error:errorDelivery}]=useDeliverOrderMutation(); 

    // // const newl =useState(ord.order.isPaid)
    // console.log(userInfo)
    // console.log(ord.order.isPaid)
    
    //  console.log(ord)
    // console.log({newl}+"u")
   
    const onApproveTest=async()=>{
        await payOrder({orderId,details:{payer:{}}})
        refetch();
        toast.success('Payment Successfull')
    }

    const onApproveDeliveryTest=async()=>{
        await delivery({orderId,details:{payer:{}}})
        refetch();
        toast.success('Delivery Successfull')
    }
    
    async function  onApprove(data,Actions){
        return await Actions.ord.capture().then(async function(details){
            try{
                await payOrder({orderId,details})
               refetch();
                toast.success('Payment Successfull')
            }
            catch(error){
                toast.error(error?.data?.message || error.message)
            }
        })
    }

    const onError=(error)=>{
        toast.error(error?.data?.message || error.message)
    }
    
    const paytOrder=(data,actions)=>{
        return  actions.ord.create({
            purchase_units:[
                {
                    amount:{
                        value:ord.order.totalDebtingAmount,
                    },
                },
            ],
        }).then((orderId)=>{
            return orderId
        });
    }

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadingPayPalScript=async()=>{
                paypalDispatch({
                    type: 'resetOPtions',value:{
                        'client-Id':paypal.clientId,
                        currency:'USE'
                    }
                });
                paypalDispatch({type:'setLoadingStatus',value:'pending'});
            }
        if(ord && !ord.isPaid){
                if(!window.paypal){
                     loadingPayPalScript();
                }
            }
            
            }
            }, [ord,paypal,paypalDispatch,loadingPayPal,errorPayPal])

    if (isLoading) {
        return <Spinner />;
      }
    else if (error) {
        return <Alerting>{error?.data?.message || error.message} </Alerting>;
      }

      console.log(ord)

  return (
    <>
      
      <LinkContainer to='/placeOrder'>
      <Button className='btn-block'>Back</Button>
    </LinkContainer>
   <ToastContainer/>
      <CheckOutSteps step1 step2 step3 step4 step5 step6 />
      {ord.order.isPaid ? (<Alerting variant='success'>Your Order is Received successfully. Your Order Id number is <u>{orderId}</u></Alerting>):(
        <Alerting variant='info'>Your Payment is not complete.</Alerting>
      )} 
      
      <h1><strong>My Orders</strong></h1>
       <Row>
        <Col>
        <Card>
            <Card.Header className='bg-warning fs-5'> Status</Card.Header>
            <Card.Body  style={{backgroundColor:'lightgoldenrodyellow' }}> 
                <Row>
                    <Col>  <strong> Delivery status : </strong> </Col>
                    <Col>
                   {ord.order.isDelivered ?(<Alerting variant='success'>Delivered on {ord.order.deliveredAt}</Alerting>)
                   :(<Alerting variant='primary'>Not Delivered Yet</Alerting>)} 
                   </Col>
                </Row>
                 <Row> 
                    <Col>  <strong> Payment status : </strong> </Col>
                   <Col>{ord.order.isPaid ?(<Alerting variant='success'>Paid on {ord.order.paidAt}</Alerting>)
                   :(<Alerting variant='primary'>Not Paid Yet</Alerting>)}
                   </Col>
                   </Row> </Card.Body>

                   {loadingDelivery && <Spinner/>}
        </Card>
        </Col>
        
        {(!ord.order.isPaid)?<>  <Col>
        <Card>
              <Card.Header className='bg-warning fs-5'>
                Payment Gateway
              </Card.Header>
              <Card.Body  style={{backgroundColor:'lightgoldenrodyellow' }}>
                
                {loadingPayPal && <Spinner />}
                {isPending ? <Spinner/> :(
                <div>

                    
                    <PayPalButtons  paytOrder={paytOrder} onApprove={onApprove} onError={onError} ></PayPalButtons>
                </div>)}
              </Card.Body>
        </Card>
        </Col></>:<></>

        }
        {(userInfo?.isAdmin ||userInfo?.data?.isAdmin) ?(
            <Card  style={{backgroundColor:'lightgoldenrodyellow' }}>
            <Card.Header className='bg-warning fs-5'>
                Testing Purpose
            </Card.Header>
            <CardBody  style={{backgroundColor:'lightgoldenrodyellow' }}>
           <Row> <Button onClick={onApproveTest} style={{marginBottom:'10px'}}>For Testing Payment Successfull</Button></Row>
            <Row><Button onClick={onApproveDeliveryTest} style={{marginBottom:'10px'}}>For Testing Delivery Successfull</Button></Row>
            </CardBody>

            </Card>
            ):(<></>)}
      </Row> 
       
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header className='bg-warning fs-5'>Customer details</Card.Header>
            <Card.Body  style={{backgroundColor:'gold' }}>
            <ListGroup variant="flush">
                <ListGroup.Item  style={{backgroundColor:'lightgoldenrodyellow' }}>
                    <h4>{ord.order.user.name}</h4>
                    <p><strong>Contact No : </strong>{userInfo?.contactNumber || userInfo?.data?.contactNumber}</p>
                    <p><strong>Email : </strong> {ord.order.user.email}</p>
                    <p><strong>Address : </strong> {ord.order.shippingAddress.address}</p>
                    <p><strong>City : </strong> {userInfo?.city || userInfo?.data?.city}</p>
                    <p><strong>PinCode : </strong> {userInfo.postalCode || userInfo?.data?.postalCode}</p>
                    <p><strong>State : </strong>{userInfo.state || userInfo?.data?.state}</p>
                    <p><strong>Country : </strong>{userInfo.country || userInfo?.data?.country}</p>
                    
                    
                </ListGroup.Item>
            </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
        <Card>
            <Card.Header className='bg-warning fs-5'>Parcel details</Card.Header>
            <Card.Body style={{backgroundColor:'gold' }}>
            <ListGroup variant="flush">
                {ord.order.orderItems.map((tem)=>(
                    <ListGroup.Item key={tem._id}  style={{backgroundColor:'lightgoldenrodyellow' }}>
                        <h4>Product Name : {tem.name}</h4>
                        <p><strong>Price : &#8377; </strong>{tem.price}</p>
                        <p><strong>Quantity : </strong>{tem.qty}</p>
                        
                    </ListGroup.Item>
                
                ))}
              
            </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
      
        <Card>
            <Card.Header className='bg-warning fs-5'>Shipping details</Card.Header>
            <CardBody style={{backgroundColor:'gold' }}>
                <ListGroup>
                    <ListGroup.Item  style={{backgroundColor:'lightgoldenrodyellow' }}>
                        <p><strong>Amount : </strong>{ord.order.totalAmount} </p>
                        <p><strong>Gst : </strong>{ord.order.totalGst}</p>
                        <p><strong>Shipping : </strong>{ord.order.totalShipping}</p>
                       
                    </ListGroup.Item>
                    <ListGroup.Item  style={{backgroundColor:'lightgoldenrodyellow' }}>
                    <p><strong>Total Payable Amount :</strong>{ord.order.totalDebtingAmount}</p>
                    </ListGroup.Item>
                </ListGroup>
            </CardBody>
        </Card>
        </Col>
      </Row>
     
    
    </>
   

    

  )
}

export default OrderScreen