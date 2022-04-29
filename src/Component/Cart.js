
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, connect } from "react-redux";
import React, { Component } from 'react'
import { createHashHistory } from "history";
import moment from 'moment'
const history = createHashHistory();

export class Cart extends Component {



  constructor(props) {

    super(props);

    this.state = {


    }
    // console.log(props.showdate);
  }
  componentDidMount() {
 
    let totalItemcount;
    let totalAmount;
    if (localStorage.getItem("cartList")) {
      let cartlist = JSON.parse(localStorage.getItem("cartList"));
      totalItemcount = cartlist.totalItemcount;
      totalAmount = cartlist.totalAmount;
    }
    if (totalItemcount == 0) {
      // console.log(this.props.cartreducer.TotalItem);
      history.push("/");
      this.setState({ mobilecartdisplay: "none" });
    } else {
      this.setState({ mobilecartdisplay: "" });
    }


  }
  componentDidUpdate() {
    if (this.props.cartreducer.TotalItem < 0) {
      // console.log(this.props.cartreducer.TotalItem);
      this.setState({ mobilecartdisplay: "" });

    }

  }


  render() {
    let {ProceedCheckout}= this.props;
    let totalItemcount;
    let totalAmount;
    let showdate = this.props.showdate
    if (localStorage.getItem("cartList")) {
      let cartlist = JSON.parse(localStorage.getItem("cartList"));
      totalItemcount = cartlist.totalItemcount;
      totalAmount = cartlist.totalAmount;
    }
    return (<>
      <div className="mobileviewcart">
        <div style={{ backgroundColor: "#c6351e", position: "fixed", width: "100%", height: "50px", display: "flex", alignItems: "center", bottom: "0px", zIndex: "999999", display: totalItemcount == 0 || !localStorage.getItem("cartList") ? "none" : "", transition: "1s" }}>

          <div style={{ width: "100%", height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 20px", }} onClick={ProceedCheckout}>
            <div style={{ color: "white" }}><span>{totalItemcount}</span> items <span>|</span><span> ₹{totalAmount}</span></div>
            <div style={{ color: "white", cursor: "pointer" }}> <div style={{ position: "absolute", left: '36%', top: '0px;', fontSize: '15px;' }}>{moment(showdate.value).format('DD-MMM-yyy')}</div>  VIEW CART <i class="fas fa-shopping-cart"></i> </div>
            {/* <div  style={{color:"white"}}><span>4</span> item</div> */}
          </div>

        </div>
      </div>
    </>
    );
  }
}




const mapStateToProps = (state) => {
  return state;
};


const mapDispatchToProps = (dispatch, props) => {
  return {

    //   vegcartIncrement: () => {
    //     dispatch(cartIncrement("Vegcartincrement"));

    //   },
    //   vegcartDecrement: () => {
    //     dispatch(cartDecrement("Vegcartdecrement"));

    //   },

    //   nonVegcartIncrement: () => {
    //     dispatch(cartIncrement("nonVegcartincrement"));

    //   },
    //   nonVegcartDecrement: () => {
    //     dispatch(cartDecrement("nonVegcartdecrement"));

    //   },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);