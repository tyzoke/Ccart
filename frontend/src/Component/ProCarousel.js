import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Spinner from './Spinner'
import Alerting from './Alerting'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'

const ProCarousel = () => {
    const {data:topProducts,isLoading,error} = useGetTopProductsQuery()

  return isLoading ?  <Spinner /> : error ? <Alerting variant="danger" >{error}</Alerting> : (
    <Carousel className="bg-dark" variant="dark" interval={null} pause="hover">
        {topProducts.map(product => (
            <Carousel.Item key={product.id} interval={null}>
                <Link to={`/product/${product.id}`} className="nav-link">
                <Image src={product.image} alt={product.name} fluid /> 

                </Link>
            </Carousel.Item>
            ))}
    </Carousel>
   
);
};

export default ProCarousel