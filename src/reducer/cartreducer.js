var initialState = {
  vegvalue: 0,
  nonVegvalue: 0,
  TotalItem: 0,
  cartempty: true,
  vegTotalAmt: 0,
  nonVegTotalAmt: 0,
  cartTotalAmt: 0,
  login_details: null,
  discount:0,
  discountPrice:0,
  cartdiscountPrice:0
};

const cartreducer = (state = initialState, action) => {

  // console.log(action)
  switch (action.type) {
    case "GET_BUSINESS_CATEGORY":

    case "Vegcartincrement":
      return {
        ...state,
        vegvalue: state.vegvalue + 1,
        vegTotalAmt: (state.vegvalue + 1) * action.payload,
      };
    case "Vegcartdecrement":
      return {
        ...state,
        vegvalue: state.vegvalue === 0 ? 0 : state.vegvalue - 1,
        vegTotalAmt:
          state.vegvalue === 0 ? 0 * action.payload : (state.vegvalue - 1) * action.payload,
      };
    case "nonVegcartincrement":
      return {
        ...state,
        nonVegvalue: state.nonVegvalue + 1,
        nonVegTotalAmt: (state.nonVegvalue + 1) * action.payload,
      };
    case "nonVegcartdecrement":
      return {
        ...state,
        nonVegvalue: state.nonVegvalue === 0 ? 0 : state.nonVegvalue - 1,
        nonVegTotalAmt:
          state.nonVegvalue === 0 ? 0 * action.payload: (state.nonVegvalue - 1) * action.payload,
      };
    case "cartTotalItem":
      return {
        ...state,

        TotalItem: state.vegvalue + state.nonVegvalue,
      };
    case "cartTotalamt":
      return {
        ...state,
        cartdiscountPrice:(state.vegTotalAmt + state.nonVegTotalAmt)-((state.vegTotalAmt + state.nonVegTotalAmt)*state.discount/100).toFixed(0),
        cartTotalAmt:state.vegTotalAmt + state.nonVegTotalAmt,
        discountPrice:((state.vegTotalAmt + state.nonVegTotalAmt)*state.discount/100).toFixed(0)
      };
    case "logindetails":
      return {
        ...state,

        cartTotalAmt: state.vegTotalAmt + state.nonVegTotalAmt,
      };
    case "ticketSuccess":
      // console.log('ticketSuccess');
      return {
        ...state,
        vegvalue: 0,
        nonVegvalue: 0,
        TotalItem: 0,
        vegTotalAmt: 0,
        nonVegTotalAmt: 0,
        cartTotalAmt: 0,
      };
      case "discountCalculator":
        // console.log('discountCalculator');
        return {
          ...state,
          discount:action.payload,
          cartdiscountPrice:(state.vegTotalAmt + state.nonVegTotalAmt)-((state.vegTotalAmt + state.nonVegTotalAmt)*action.payload/100).toFixed(0),
          discountPrice:((state.vegTotalAmt + state.nonVegTotalAmt)*action.payload/100).toFixed(0),
          cartTotalAmt:state.vegTotalAmt + state.nonVegTotalAmt,
        };

    default:
      return state;
  }
};
export default cartreducer;


// if (this.state.CouponCode === "PBCP1232") {
//     var Discount=(this.props.cartreducer.cartTotalAmt*10/100);
//    var price=this.props.cartreducer.cartTotalAmt-Discount;
//    console.log("dis%",price.toFixed(0))
//    this.setState({payment_amt:price.toFixed(0),DiscountPrice:Discount.toFixed(0)})
//   }