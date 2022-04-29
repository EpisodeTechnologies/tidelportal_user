

export const cartIncrement = (action) => ({
    type:action.type,
    payload:action.price,
 });
 export const cartDecrement = (action) => ({
   type:action.type,
   payload:action.price,
 });
 export const TotalItem = (action) => ({
   type:action,
   payload:'',
});
export const TotalAmt = (action) => ({
   type:action,
   payload:'',
});
export const discountCalculator = (action) => ({
   type:action.type,
   payload:action.payload,
});