


 const calc=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}

export const calculation=(state)=>{

     // total items price initialamount set to be zero
     state.totalAmount=calc(state.cartItems.reduce((initialAmount,item)=>initialAmount+item.price*item.qty,0));

     //total shipping price
     state.totalShipping=calc(Number(
       Number(state.totalAmount)>1000 ? 0 :
       (Number(state.totalAmount)>500 ? 50 :
       (Number(state.totalAmount)>200 ? 100 : 
       (Number(state.totalAmount)>100 ? 120:150)))));

    //total gst price
    state.totalGst=calc(Number(state.totalAmount*0.18));

    //total Debting Amount
    state.totalDebitingAmount=calc(
     Number(state.totalAmount)
    +Number(state.totalShipping)
    +Number(state.totalGst))
   
    localStorage.getItem("cart",JSON.stringify(state))
}