
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({ 
            query:()=>({
                url:PRODUCTS_URL,
                method:'GET'
                }),
                keepUnusedDataFor:5
            }),
        getProductDetails:builder.query({
          query:(productId)=>({
               url: `${PRODUCTS_URL}/${productId}`,

          }),
          keepUnusedDataFor:5
        }),
        getTopProducts:builder.query({
            query:()=>({
                url: `${PRODUCTS_URL}/top-products`,
                method:'GET'
                }),
                keepUnusedDataFor:5
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
                method:'DELETE',
            }),
        }),
        }),

});

export const {useGetProductsQuery ,
     useGetProductDetailsQuery,
     useGetTopProductsQuery,
     useDeleteProductMutation,

}=productsApiSlice