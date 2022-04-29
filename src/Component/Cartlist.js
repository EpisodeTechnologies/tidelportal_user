import React from "react";
import Emptycart from "../img/cartempty.jpg";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";
import { useDispatch, useSelector, connect } from "react-redux";
import { cartIncrement, cartDecrement, TotalItem ,TotalAmt} from "../action/index";
import { createHashHistory } from "history";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { GoPrimitiveDot } from "react-icons/go";
const history = createHashHistory();

class Cartlist extends React.Component {
  constructor(props) {
    // this.handleData = this.handleData.bind(this);
    super(props);

    this.state = {
     
    };
    // console.log(props);
  }
  componentDidMount() {
    if (this.props.cartreducer.TotalItem == 0) {
      // console.log(this.props.cartreducer.TotalItem);
      history.push("/");
    } else {
    }
  }



  render() {
    return (
      <>
        <div>
          {this.props.cartreducer.nonVegvalue <= 0 ? (
            <div
              className="FoodItem"
              style={{ display: this.state.item1display }}
             >
              <div className={this.props.page =="checkout"?"Food_Name_checkout  ":"Food_Name"}>
                {/* <span>
                  {" "}
                  <img
                    src="https://img.icons8.com/fluency/48/000000/non-vegetarian-food-symbol.png"
                    width="20px"
                    height="20px"
                    style={{ marginRight: "10px", marginBottom: "5px" }}
                  />
                </span> */}
                <IoTriangle className="food-symbol-nonveg_cart" />
                {/* <GoPrimitiveDot className="food-symbol-veg_cart" /> */}


                <span>Special Meals
                </span>
              </div>
               <div className={this.props.page =="checkout"?"Ticket_qnt_btn_checkout":"Ticket_qnt_btn"}>
                        <FaMinusCircle
                          className="min_btn"
                          onClick={this.props.nonVegcartDecrement}
                        />
                        <span className="Ticket_qnt-val">
                        <span>{this.props.cartreducer.nonVegvalue}</span>
                        </span>
                        <FaPlusCircle
                          className="plus_btn"
                          onClick={this.props.nonVegcartIncrement}
                        />
                      </div>
            </div>
          ) : (
            <div></div>
          )}
          {this.props.cartreducer.vegvalue >= 1 ? (
            <div
              className="FoodItem"
              style={{ display: this.state.item2display }}
            >
             <div className={this.props.page =="checkout"?"Food_Name_checkout  ":"Food_Name"}>
                <span>
                  <img
                    src="https://img.icons8.com/fluency/48/000000/vegetarian-food-symbol.png"
                    width="20px"
                    height="20px"
                    style={{ marginRight: "10px", marginBottom: "5px" }}
                  />
                </span>
                <span>Special Meals
                </span>
              </div>
              {/* <div className="Item_btn">
                <span>
                  <i
                    class="fas fa-minus"
                    onClick={this.props.vegcartDecrement}
                  ></i>
                </span>
                <span>{this.props.cartreducer.vegvalue}</span>
                <span>
                  <i
                    class="fas fa-plus"
                    onClick={this.props.vegcartIncrement}
                  ></i>
                </span>
              </div> */}
               <div className={this.props.page =="checkout"?"Ticket_qnt_btn_checkout":"Ticket_qnt_btn"}>
                        <FaMinusCircle
                          className="min_btn"
                          onClick={this.props.vegcartDecrement}
                        />
                        <span className="Ticket_qnt-val">
                        <span>{this.props.cartreducer.vegvalue}</span>
                        </span>
                        <FaPlusCircle
                          className="plus_btn"
                          onClick={this.props.vegcartIncrement}
                        />
                      </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}
// export default

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    vegcartIncrement: () => {
      dispatch(cartIncrement({type:"Vegcartincrement",price:200}));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },
    vegcartDecrement: () => {
      dispatch(cartDecrement({type:"Vegcartdecrement",price:200}));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },

    nonVegcartIncrement: () => {
      dispatch(cartIncrement({type:"nonVegcartincrement",price:100}));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },
    nonVegcartDecrement: () => {
      dispatch(cartDecrement({type:"nonVegcartdecrement",price:100}));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cartlist);
