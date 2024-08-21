import React from 'react'
import { ListGroup,Card,Row,Col, Button } from 'react-bootstrap'
import Spinner from '../../Component/Spinner'
import Alerting from '../../Component/Alerting'
import { useGetOrdersQuery} from '../../slices/orderApiSlice' 
import { LinkContainer } from 'react-router-bootstrap'

const OrderListScreen = () => {
  const {data:orders,isLoading,err } = useGetOrdersQuery();
  //const {data:ord, error, isLoading} = useGetMyOrdersQuery();

//  console.log(orders);


 
  return (
    <div>
      
        <Card style={{backgroundColor:'lightgoldenrodyellow' }}>
          <Card.Header className='bg-warning fs-5'>Order List</Card.Header>
          {isLoading?(<Spinner/>):(err?(<Alerting>{err?.data?.message || err.error} </Alerting>):(
             <Card.Body >
             <ListGroup >
              <ListGroup.Item className='bg-warning fs-5'>
             <Row >    
              <Col md={2}  style={{backgroundColor:'gold' }}>Id</Col>
              <Col md={1}  style={{backgroundColor:'lightyellow' }}>User Name</Col>
              <Col md={1}  style={{backgroundColor:'lightgoldenrodyellow' }}>User Id</Col>
              <Col md={1}  style={{backgroundColor:'lightyellow' }}>Number Of Items</Col>
              <Col md={1}  style={{backgroundColor:'lightgoldenrodyellow' }}>Amount</Col>
              <Col md={1}  style={{backgroundColor:'lightyellow' }}>Order On</Col>
              <Col style={{backgroundColor:'lightgoldenrodyellow' }}> Payment Status </Col>
              <Col  style={{backgroundColor:'lightyellow' }}>Delivery Status</Col>
              <Col md={1} style={{backgroundColor:'lightgoldenrodyellow' }}>Check Details</Col>
              </Row>
              </ListGroup.Item>
              {orders && orders.map((order)=>{
               console.log(order.totalAmount);
               return(
             <ListGroup.Item className='bg-warning fs-5'>  
              <Row>    
              <Col md={2}  style={{backgroundColor:'gold' }}>{order._id}</Col>
              <Col md={1}  style={{backgroundColor:'lightyellow' }}>{order.user.name}</Col>
              <Col md={1}  style={{backgroundColor:'lightgoldenrodyellow' }}>{order.user._id}</Col>
              <Col md={1}  style={{backgroundColor:'lightyellow' }}>{order.orderItems.length}</Col>
              <Col md={1}  style={{backgroundColor:'lightgoldenrodyellow' }}>{order.totalDebtingAmount}</Col>
              <Col md={1}  style={{backgroundColor:'lightyellow' }}>{order.createdAt.substring(0,10)}</Col>
              <Col style={{backgroundColor:'lightgoldenrodyellow' }}>{order.isPaid?<Alerting variant='success' >Paid</Alerting>:<Alerting>Not Paid</Alerting>}</Col>
              <Col   style={{backgroundColor:'lightyellow' }}>{order.isDelivered?<Alerting variant='success'>Delivered</Alerting>:<Alerting variant='danger'>Not Delivered</Alerting>}</Col>
              <Col md={1} style={{backgroundColor:'lightgoldenrodyellow' }}><td> 
                        <LinkContainer to={`/orders/${order._id}`}>
                        <Button> Details</Button>
                        </LinkContainer>
                        </td></Col>
             

              </Row> 

               </ListGroup.Item>
               )
              })}
             </ListGroup>
          </Card.Body>
          ))}
          
        </Card>

    </div>
  )
}
export default OrderListScreen