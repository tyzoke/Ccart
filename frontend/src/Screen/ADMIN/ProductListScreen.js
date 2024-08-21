import React from 'react'
import { useGetProductsQuery } from '../../slices/productsApiSlice'
import { Button, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import Alerting from '../../Component/Alerting';
import { useDeleteProductMutation } from '../../slices/productsApiSlice';
import { toast, ToastContainer } from 'react-toastify';


const ProductListScreen = () => {
    const { data: products,refetch,isLoading, error } = useGetProductsQuery()
    // console.log(products);
     const [deleteProduct,{isLoading:deleteLoading}] = useDeleteProductMutation();
   
     const deleteHandler=async(product)=>{
     const id=product._id
      
        try{
        await deleteProduct(id);
        refetch();
        console.log(id)
        // refetch();
       toast("Deleted Successfully")
        }catch(err){
          toast(error.message);
          }
      
     }

  return (
    <div>
      <ToastContainer/>
     <Card style={{backgroundColor:'lightgoldenrodyellow' }}>
        <Card.Header  className='bg-warning fs-5'>
            <Card.Title >Product List</Card.Title>
        </Card.Header>

        <Card.Body >
            <ListGroup>   
                <ListGroup.Item style={{backgroundColor:'lightgoldenrodyellow' }}>
                <Row>
                                        <Col  style={{backgroundColor:'lightyellow' }}><h4>ID</h4></Col>
                                        <Col  style={{backgroundColor:'lightgoldenrodyellow' }}><h4>Image</h4></Col>
                                        <Col  style={{backgroundColor:'lightyellow' }}><h4>Name</h4></Col>
                                        <Col  style={{backgroundColor:'lightgoldenrodyellow' }}><h4>Price</h4></Col>
                                        <Col  style={{backgroundColor:'lightyellow' }}><h4>CountInStock</h4></Col>
                                        <Col  style={{backgroundColor:'lightgoldenrodyellow' }}><h4>description</h4></Col>
                                        <Col  style={{backgroundColor:'lightyellow' }}><h4>Remove</h4></Col>
                                    </Row>
                    </ListGroup.Item>      
                   {isLoading ? (<Spinner/>) : error ? ( <Alerting variant='danger'  > {error?.data?.message || error.error}</Alerting>) : (
                        <div>{products.map((product) => (
                                   <ListGroup.Item className='bg-warning fs-5' key={product.id}>
                                    <Row>
                                        <Col  style={{backgroundColor:'lightyellow' }}>{product._id}</Col>
                                        <Col  style={{backgroundColor:'lightgoldenrodyellow' }}> <Card.Img src={`${product.image}`} width='80px' height='80px' rounded></Card.Img></Col>
                                        <Col  style={{backgroundColor:'lightyellow' }}>{product.name}</Col>
                                        <Col  style={{backgroundColor:'lightgoldenrodyellow' }}>&#8377;{product.price}</Col>
                                        <Col  style={{backgroundColor:'lightyellow' }}>{product.countInStock}</Col>
                                        <Col  style={{backgroundColor:'lightgoldenrodyellow' }}>{product.description}</Col>
                                        <Col  style={{backgroundColor:'lightyellow' }}><Button  onClick={()=>deleteHandler(product)}>Delete</Button></Col>
                                    </Row>
                                    </ListGroup.Item>
                                    ))}
                        </div> )
                          }
            </ListGroup>

        </Card.Body>
     </Card>


    </div>
  )
}

export default ProductListScreen