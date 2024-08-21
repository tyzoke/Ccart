import React from 'react'
import Spin from '../../Component/Spinner'
import {Row,Col} from 'react-bootstrap'
// import axios from 'axios'
import Product from '../../Component/Product'

//from redux toolkit
import { useGetProductsQuery } from '../../slices/productsApiSlice'
import Alerting from '../../Component/Alerting'
import { Link } from 'react-router-dom'


const HomeScreen = () => {
  const {data: products,isLoading,error}=useGetProductsQuery()
 
// const [products,setProducts]=useState([])

// useEffect(()=>{
//   const fetchProducts= async()=>{
//     const {data} = await axios.get('/products')
//     setProducts(data)
//   }
//   fetchProducts()
// },[])

  return (
    < >
    <div >
    {isLoading ? (
      <Spin />
    ) : error ?(
      <Alerting variant='danger'>{error?.data?.message || error.error}</Alerting>
    ):(
      <>
      
      <h1 >Latest Product</h1>
     
      <Row>
          {products.map((product)=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />  
              </Col>
  
          ))}
          </Row>
          </>
        )}
      </div>
    </>
  )
}

export default HomeScreen