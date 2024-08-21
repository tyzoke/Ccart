import {createSlice} from '@reduxjs/toolkit'
import { calculation } from '../CartCalcu/calculation'


// initialState=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):{cartItems:[0]};
// const initialState = {
//     items: [],
//     total: 0
//   };

//----------------------------------------------------------------------------------------
      // TRANSFER IT IN CARTCALC
//----------------------------------------------------------------------------------------
// //for round off and make value two decimal place
// const calc=(num)=>{
//     return (Math.round(num*100)/100).toFixed(2)
// }

//------------------------------------------------------------------------------------------
 

const initialState = localStorage.getItem("cart")
? JSON.parse(localStorage.getItem("cart"))
:{cartItems:[],shippingAddress:{},paymentMethod:'PayPal'};

const cartSlice=createSlice({
    name:"cart",
     initialState,
    reducers:{
        addToCart:(state,action)=>{
          const item=action.payload;
          const existItem=state.cartItems.find((p)=>p._id===item._id);

          if(existItem){
            state.cartItems=state.cartItems.map((p)=>p._id===existItem._id ? item : p)
          } else {
            state.cartItems=[...state.cartItems,item];
          }
          //---------------------------------------------------------------------------------
                   //TRANSFERED IT IN CARTCALCU
          //---------------------------------------------------------------------------------
        //   // total items price initialamount set to be zero
        //   state.totalAmount=calc(state.cartItems.reduce((initialAmount,item)=>initialAmount+item.price*item.qty,0));

        //   //total shipping price
        //   state.totalShipping=calc(Number(
        //     Number(state.totalAmount)>1000 ? 0 :
        //     (Number(state.totalAmount)>500 ? 50 :
        //     (Number(state.totalAmount)>200 ? 100 : 
        //     (Number(state.totalAmount)>100 ? 120:150)))));

        //  //total gst price
        //  state.totalGst=calc(Number(state.totalAmount*0.18));

        //  //total Debting Amount
        //  state.totalDebitingAmount=calc(
        //   Number(state.totalAmount)
        //  +Number(state.totalShipping)
        //  +Number(state.totalGst))
        
        //  localStorage.getItem("cart",JSON.stringify(state))
        //---------------------------------------------------------------------------------
       return calculation(state);
        },
      removeCartItems: (state,action) => {
        state.cartItems = state.cartItems.filter((p) => p._id !== action.payload);
        return calculation(state);
      },saveShippingAddress:(state,action)=>{
        state.shippingAddress=action.payload;
        localStorage.setItem("cart",JSON.stringify(state))
      },savePaymentMethod:(state,action)=>{
        state.paymentMethod=action.payload;
        // localStorage.setItem("cart",JSON.stringify(state));
        return calculation(state);
      },
      clearCartItems:(state,action)=>{
        state.cartItems= [];
        return calculation(state);
        // state.totalAmount=0;
        // state.totalShipping=0;
        // state.totalGst=0;
        // state.totalDebitingAmount=0;
        // localStorage.setItem("cart",JSON.stringify(state));
      },
      resetCart:(state)=>(state=initialState)
        
    }

})

export const {addToCart,removeCartItems,saveShippingAddress,savePaymentMethod ,clearCartItems}=cartSlice.actions
export default cartSlice.reducer