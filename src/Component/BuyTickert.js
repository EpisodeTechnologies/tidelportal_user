import React from "react";
import { Link, useHistory } from "react-router-dom";
import'./proceed_model.scss'

import Body_img from "../img/collection-indian-biryanis-styled-260nw-1836975842.png";
import Body_img_icon from "../img/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle (1)1.png";
import Emptycart from "../img/cartempty.jpg";
import veg_img from "../img/veg.jpg";
import special from "../img/special.jpg";
import DatePicker from './datePicker'
import $ from 'jquery';

import nonveg_img from "../img/non_veg.jpg";
import brandlogo from "../img/brandlogo-4.png";
import { GrClose } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import Checkout from "./checkout";
import Cart from "./Cart";
import SideNav from "./SideNav";
import Veg from "./menu_veg";
import NonVeg from "./menu_non_veg";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  cartIncrement,
  cartDecrement,
  TotalItem,
  TotalAmt,
} from "../action/index";
import Modal from "react-bootstrap/Modal";
// import Tabs from "react-bootstrap/Tabs";
import { HiSortDescending } from "react-icons/hi";

import {Button} from "react-bootstrap";
// import { BiFoodTag } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { IoTriangle } from "react-icons/io5";
import axios from "axios";
import { apibaseURL } from "../apiBaseURL";
import Countdown, { zeroPad } from "react-countdown";
import moment from 'moment'
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { createHashHistory } from "history";

import TicketDetails from "./TicketDetails";
import io from "socket.io-client"
const history = createHashHistory();
// const history =useHistory()





class BuyTickert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      mobilecartdisplay: "",
      cartempty: null,
      show: false,
      foodTypes: [],
      CartItem: [],
      cart: [],
      cartIdAarry: [],
      countValues: [],
      dummyState: true,
      modelImage: '',
      modelAboutContent: '',
      selectedDate: '',
      apiGetFullData: [],
      buyTickertData: [],
      allbuyTickertData: [],
      filterdata: 'all',
      slideImages: ['PNBI_TICKET1650548308288.png', 'PNBI_TICKET1650548308288.png', 'PNBI_TICKET1650548308288.png'],
      detailsPopUPData: '',
      cartupdate: 0,
      detailspage: true,
      addbtn: true,
      minus: true,
      ProceedCheckout:false,
      retureCheckout:false,
      mobileCart:true,
      removeCartId:'',
      errorCartAdd:''
    };

  
  }

  componentDidMount() {
    localStorage.removeItem("discountPrice");

if(localStorage.getItem("checkoutpage")){
  let checkout =localStorage.getItem("checkoutpage")

  this.setState({mobileCart:false})
this.setState({retureCheckout:true})
  // localStorage.removeItem('checkoutpage');
}else{
  localStorage.removeItem('cart');
  localStorage.removeItem('cartList');
  localStorage.removeItem('cartendTime');
  localStorage.removeItem("discountPrice");
  localStorage.removeItem("selectedDate");
  this.setState({mobileCart:true})
}

let ticketTime = { value: new Date(new Date().setDate(new Date().getDate() + 0)) }
let getDate;
    if (localStorage.getItem("selectedDate")) {
     getDate = JSON.parse(localStorage.getItem("selectedDate"))
      // console.log(getDate)
      ticketTime = getDate;
      this.setState({selectedDate:ticketTime});
      // console.log("true")
    
    } else {
      // localStorage.setItem("selectedDate", JSON.stringify(ticketTime));
      this.setState({selectedDate:ticketTime});
      // console.log("false")
    }
   

    window.addEventListener('scroll', this.handleScroll);
    if (this.props.cartreducer.TotalItem > 0) {
      this.setState({ cartempty: false });
    } else {
      this.setState({ cartempty: true });
    }
    if (localStorage.getItem("cart")) {
      this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
    }
    $(function () {
      var move = '200px';
      $("div.active")
        .next("div.timeline-item")
        .css("border-left-width", "0");

      $(".prev-btn").click(function () {
        $(".timeline-list").animate({ scrollLeft: "-=" + move });

      });
      $(".next-btn").click(function () {
        $(".timeline-list").animate({ scrollLeft: "+=" + move });
      });

      $(".timeline-item").click(function () {
        $(".timeline-item").removeClass('active');
        $(this).addClass('active');
      });
      $(".filter").click(function () {
        $(".filter").removeClass('active');
        $(this).addClass('active');
      });

    });

    axios.get(apibaseURL + "/tickets/ticketsByDate/" + ticketTime.value).then((res) => {
      // console.log("FoodDataApi", res.data);
      if (res.data && res.status == 200 && res.data.data) {
        if (res.data.data) {
          let buyTickerts = [];

          buyTickerts.push(res.data.data.BreakFast)
          buyTickerts.push(res.data.data.MorningSnacks)
          buyTickerts.push(res.data.data.Lunch)
          buyTickerts.push(res.data.data.EveningSnacks)
          buyTickerts.push(res.data.data.Dinner)
          buyTickerts.push(res.data.data.LateNight)
          buyTickerts.push(res.data.data.FullDay)
          buyTickerts.push(res.data.data.Specials)
          // console.log("->", buyTickerts)

          this.setState({ buyTickertData: buyTickerts, apiGetFullData: res, allbuyTickertData: buyTickerts });
        }
      }
    })

    const intervalId = setInterval(() => {
      // this.setState({cartupdate:this.state.cartupdate+1});

      this.ticketgetapi()
      // console.log('cart')
    }, 5000);




  }

  componentWillUnmount() {
    clearInterval(this.intervalId);

  }

  ticketgetapi = () => {

    // console.log(this.state.selectedDate.value)
    axios.get(apibaseURL + "/tickets/ticketsByDate/" + this.state.selectedDate.value).then((res) => {
      // console.log("FoodDataApi", res.data);
      if (res.data && res.status == 200) {

        if (res.data.data) {
          let buyTickerts = [];
          let allbuyTickertData = [];
          let filterdata = this.state.filterdata;
          if (true) {
            allbuyTickertData.push(res.data.data.BreakFast)
            allbuyTickertData.push(res.data.data.MorningSnacks)
            allbuyTickertData.push(res.data.data.Lunch)
            allbuyTickertData.push(res.data.data.EveningSnacks)
            allbuyTickertData.push(res.data.data.Dinner)
            allbuyTickertData.push(res.data.data.LateNight)
            allbuyTickertData.push(res.data.data.FullDay)
            allbuyTickertData.push(res.data.data.Specials)
          }
          if (filterdata == "all") {
            buyTickerts.push(res.data.data.BreakFast)
            buyTickerts.push(res.data.data.MorningSnacks)
            buyTickerts.push(res.data.data.Lunch)
            buyTickerts.push(res.data.data.EveningSnacks)
            buyTickerts.push(res.data.data.Dinner)
            buyTickerts.push(res.data.data.LateNight)
            buyTickerts.push(res.data.data.FullDay)
            buyTickerts.push(res.data.data.Specials)
          }
          if (filterdata == "snacks") {
            buyTickerts.push(res.data.data.MorningSnacks)
            buyTickerts.push(res.data.data.EveningSnacks)
          }
          if (filterdata == "meals") {
            buyTickerts.push(res.data.data.BreakFast)
            buyTickerts.push(res.data.data.Lunch)
            buyTickerts.push(res.data.data.Dinner)
            buyTickerts.push(res.data.data.LateNight)
            buyTickerts.push(res.data.data.FullDay)
          }

          if (filterdata == "spacial") {

            buyTickerts.push(res.data.data.Specials)
          }
          this.setState({ buyTickertData: buyTickerts, apiGetFullData: res, allbuyTickertData: allbuyTickertData });
        } else {
          this.setState({ buyTickertData: [], apiGetFullData: [], allbuyTickertData: [] });

        }
      }
    })
  }


  addcart = () => {

    // localStorage.removeItem("cart")
    // localStorage.removeItem("cartList")
    axios.get(apibaseURL + "/tickets/ticketsByDate/" + this.state.selectedDate.value).then((res) => {
      // console.log("FoodDataApi", res.data);
      if (res.data && res.status == 200) {
        let buyTickerts = [];
        let filterdata = this.state.filterdata;
        if (filterdata == "all") {
          buyTickerts.push(res.data.data.BreakFast)
          buyTickerts.push(res.data.data.MorningSnacks)
          buyTickerts.push(res.data.data.Lunch)
          buyTickerts.push(res.data.data.EveningSnacks)
          buyTickerts.push(res.data.data.Dinner)
          buyTickerts.push(res.data.data.LateNight)
          buyTickerts.push(res.data.data.FullDay)
          buyTickerts.push(res.data.data.Specials)
        }
        if (filterdata == "snacks") {
          buyTickerts.push(res.data.data.MorningSnacks)
          buyTickerts.push(res.data.data.EveningSnacks)
        }
        if (filterdata == "meals") {
          buyTickerts.push(res.data.data.BreakFast)
          buyTickerts.push(res.data.data.Lunch)
          buyTickerts.push(res.data.data.Dinner)
          buyTickerts.push(res.data.data.LateNight)
          buyTickerts.push(res.data.data.FullDay)
        }

        if (filterdata == "spacial") {
          buyTickerts.push(res.data.data.Specials)
        }



        this.setState({ buyTickertData: buyTickerts, apiGetFullData: res });

      }

    })

  }



  itemPlus = (id, price, name, foodtype, itemDetails, limit) => {

    // console.log(this.state.addbtn)

      this.setState({ addbtn: false });
     if (true) {
      this.setState({ addbtn: true });
       this.addcart()
      if (!localStorage.getItem("cart")) {
        var EndTime = new Date().getTime();
      }
      if (localStorage.getItem("cart")) {
        let cartDetails = JSON.parse(localStorage.getItem("cart"));
        if (cartDetails.length == 0) {
          var EndTime = new Date().getTime();
        }

      }

      // this.addcart()
      let cart = [];
      let totalItemcount = 0;
      let totalAmount = 0;
      let countValues = this.state.countValues;
      if (localStorage.getItem("cartList")) {
        let cartlist = JSON.parse(localStorage.getItem("cartList"));
        totalItemcount = cartlist.totalItemcount;
        totalAmount = cartlist.totalAmount;

      }
      if (localStorage.getItem("cart")) {
        let cartDetails = JSON.parse(localStorage.getItem("cart"));
        cart = cartDetails;
        const array1 = [];

        cart.map((item) => {
          array1.push(item.itemId);
          if (item.itemId == id) {
            item.itemQty = item.itemQty + 1;
            totalItemcount = totalItemcount + 1;
            totalAmount = totalAmount + 1 * price;

            countValues["count" + id] = item.itemQty;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          localStorage.setItem(
            "cartList",
            JSON.stringify({ totalItemcount, cart, totalAmount })
          );
          this.setState({ cart: cart });
        });

        if (!array1.includes(id)) {
          cart.push({
            itemName: name,
            itemFoodType: foodtype,
            itemId: id,
            itemPrice: price,
            itemQty: 1,
            itemFoodName: itemDetails.item_name,
            bookingDate: this.state.selectedDate,
            limit: limit
          });
          totalItemcount = totalItemcount + 1;
          totalAmount = totalAmount + price;
          countValues["count" + id] = 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem(
          "cartList",
          JSON.stringify({ totalItemcount, cart, totalAmount })
        );
        this.setState({ cart: cart });
      } else {
        cart.push({
          itemName: name,
          itemFoodType: foodtype,
          itemId: id,
          itemPrice: price,
          itemQty: 1,
          itemFoodName: itemDetails.item_name,
          bookingDate: this.state.selectedDate,
          limit: limit

        });
        totalItemcount = totalItemcount + 1;
        totalAmount = totalAmount + price;
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem(
          "cartList",
          JSON.stringify({ totalItemcount, cart, totalAmount })
        );
        countValues["count" + id] = 1;
        this.setState({ cart: cart });
      }
      this.setState({ countValues });
      // addcart();

      // }
    } else {
      // console.log("cart errer status-->", res)
      this.addcart()
    }

    // }); /*api end*/

  };

  itemMinus = (id, price, name, foodtype, limit) => {
    this.setState({ minus: false });
    
    if (true) {
      this.setState({ minus: true });
      if (localStorage.getItem("cart")) {
        let cartDetails = JSON.parse(localStorage.getItem("cartList"));
        // console.log(cartDetails.totalItemcount.length)
        if (cartDetails.totalItemcount == 1) {

          localStorage.removeItem("cartendTime");

        }
      }
      let cart = this.state.cart;
      let totalItemcount = 0;
      let totalAmount = 0;
      let countValues = this.state.countValues;
      if (localStorage.getItem("cartList")) {
        let cartlist = JSON.parse(localStorage.getItem("cartList"));
        totalItemcount = cartlist.totalItemcount;
        totalAmount = cartlist.totalAmount;

        // console.log(cartlist);
      }

      cart.map((item, i) => {
        // array1.push(item.itemId);  
        if (item.itemId == id) {
          if (item.itemQty <= 0) {
            //  .splice(index,1)
          } else {
            item.itemQty = item.itemQty - 1;
            totalItemcount = totalItemcount - 1;
            totalAmount = totalAmount - price;
            countValues["count" + id] = countValues["count" + id] - 1;

            if (item.itemQty == 0) {
              cart.splice(i, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem(
              "cartList",
              JSON.stringify({ totalItemcount, cart, totalAmount })
            );
          }
        }

        this.setState({ cart: cart });
        this.setState({ countValues });
      });

      this.addcart();
    } else {
      this.addcart();
    }

    // });

  };
 backtoBookingPage =()=>{
    this.setState({show:false})
         }
removeCartIdItem=()=>{
let id= this.state.removeCartId?this.state.removeCartId:'';

// console.log("removeCart-->",id)
  if(localStorage.getItem('cart')){
    let cart =JSON.parse(localStorage.getItem('cart'));
   let{ totalItemcount, totalAmount } = JSON.parse(localStorage.getItem("cartList"));
       cart.map((data,i)=>{
        let tkId=data.itemId
        // console.log(tkId==id);
        if(id==tkId){

          // console.log(data)
          totalItemcount=totalItemcount-data.itemQty
          totalAmount=totalAmount-data.itemPrice
          cart.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          localStorage.setItem(
            "cartList",
            JSON.stringify({ totalItemcount, cart, totalAmount })
          );
          this.setState({ProceedCheckout:false})
        }
       })
  }

}
           
   ProceedCheckout =()=>{

      let addcart=[];
    if(localStorage.getItem('cart')){
      let cart =JSON.parse(localStorage.getItem('cart'))
      cart.map((data,id)=>{
      let tkCart={
          "ticketId" :  data.itemId,
          "count" : data.itemQty,
          "bookingDate" : data.bookingDate.value
      }
       addcart.push(tkCart)
      })
    axios.post(apibaseURL + "/tickets/addCartItems" , addcart).then((res) => {

      if(res.data.status=="200"){
if(res.data.data){
  if(res.data.data.cartId){


 var EndTime = new Date(res.data.data.cartRemoveTime).getTime();
        // localStorage.setItem("cartendTime", EndTime + + 300000);
          localStorage.setItem("cartendTime",EndTime);
            localStorage.setItem("cartId",res.data.data.cartId);
        localStorage.setItem("checkoutpage",true)
        // console.log("cart--->add",res.data)
        history.push('/checkout')
 }
    }
      }else{
        if(res.data.status=="400"){
          let mess;
          if(res.data.availabeCount>0){
            mess=`Only ${res.data.availabeCount} Tickets Available in ${res.data.ticket_name}(${res.data.item_name})`
          }else{
            mess=`${res.data.ticket_name}(${res.data.item_name}) ${res.data.message}`
          }
    this.setState({ProceedCheckout:true,removeCartId:res.data.ticket_id,errorCartAdd:mess})

        }
      }
    

    


    });
  } 
     }
  render() {

let getDate=this.state.selectedDate
   

    // window.addEventListener('scroll', this.handleScroll);
    // localStorage.setItem("user", JSON.stringify({ name: this.state }));
    let cartDetails;
    let cartList;
    if (localStorage.getItem("cart")) {
      cartDetails = JSON.parse(localStorage.getItem("cart"));
      cartList = JSON.parse(localStorage.getItem("cartList"));
    }
    let { foodTypes } = this.state;

    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

    var AllDates = [];
    var showdate;
    for (var i = 0; i <= 100; i++) {
      // let date = new Date(tomorrow.setDate(new Date().getDate() + i))
      // let value = new Date(tomorrow.setDate(new Date().getDate() + i))
      var current = new Date(); //'Mar 11 2022' current.getTime() = 1426060964567
      let date = new Date(current.getTime() + i * 86400000); // + 1 day in ms
      let data;
      // console.log(date)
      // console.log("selected",new Date(getDate.value).date)

      if (i == 0) {
        data = {
          // date: date.getDate(),
          date: date.getDate(),
          day: dayNames[date.getDay()],
          time: date.getTime(),
          year: date.getFullYear(),
          month: monthName[date.getMonth()],
          holiday: false,
          active:moment(date).format("MMM DD-YYYY ")==moment(new Date(getDate.value)).format("MMM DD-YYYY ")?true:false,
          showdate: "Today",
          value: date

        }
        showdate = data
        AllDates.push(data)
      } else if (i == 1) {
        data = {
          date: date.getDate(),
          day: dayNames[date.getDay()],
          time: date.getTime(),
          year: date.getFullYear(),
          holiday: false,
          month: monthName[date.getMonth()],
          value: date,
          active:moment(date).format("MMM DD-YYYY ")==moment(new Date(getDate.value)).format("MMM DD-YYYY ")?true:false,
          showdate: "Upcoming",
        }

        AllDates.push(data)
      }
      else {
        data = {
          date: date.getDate(),
          day: dayNames[date.getDay()],
          time: date.getTime(),
          year: date.getFullYear(),
          month: monthName[date.getMonth()],
          holiday: false,
          value: date,
          active:moment(date).format("MMM DD-YYYY ")==moment(new Date(getDate.value)).format("MMM DD-YYYY ")?true:false,
          showdate: "Upcoming",
        }
        // console.log(date.getMonth())
        AllDates.push(data)
      }
    }

    // console.log("selectedDate",this.state.selectedDate.value)
    const dateSelected = (data, key) => {
       localStorage.setItem("selectedDate",JSON.stringify({value:data.value}));
      this.setState({ selectedDate: data })
      localStorage.removeItem("cart")
      localStorage.removeItem("cartList")
      localStorage.removeItem("discountPrice");
      axios.get(apibaseURL + "/tickets/ticketsByDate/" + data.value).then((res) => {
        // console.log("FoodDataApi", res.data);
        if (res.data && res.status == 200) {
          if (res.data.data) {
            let buyTickerts = [];
            let allbuyTickertData = [];
            let filterdata = this.state.filterdata;
            if (true) {
              allbuyTickertData.push(res.data.data.BreakFast)
              allbuyTickertData.push(res.data.data.MorningSnacks)
              allbuyTickertData.push(res.data.data.Lunch)
              allbuyTickertData.push(res.data.data.EveningSnacks)
              allbuyTickertData.push(res.data.data.Dinner)
              allbuyTickertData.push(res.data.data.LateNight)
              allbuyTickertData.push(res.data.data.FullDay)
              allbuyTickertData.push(res.data.data.Specials)
            }
            if (filterdata == "all") {
              buyTickerts.push(res.data.data.BreakFast)
              buyTickerts.push(res.data.data.MorningSnacks)
              buyTickerts.push(res.data.data.Lunch)
              buyTickerts.push(res.data.data.EveningSnacks)
              buyTickerts.push(res.data.data.Dinner)
              buyTickerts.push(res.data.data.LateNight)
              buyTickerts.push(res.data.data.FullDay)
              buyTickerts.push(res.data.data.Specials)
            }
            if (filterdata == "snacks") {
              buyTickerts.push(res.data.data.MorningSnacks)
              buyTickerts.push(res.data.data.EveningSnacks)
            }
            if (filterdata == "meals") {
              buyTickerts.push(res.data.data.BreakFast)
              buyTickerts.push(res.data.data.Lunch)
              buyTickerts.push(res.data.data.Dinner)
              buyTickerts.push(res.data.data.LateNight)
              buyTickerts.push(res.data.data.FullDay)
            }

            if (filterdata == "spacial") {

              buyTickerts.push(res.data.data.Specials)
            }



            this.setState({ buyTickertData: buyTickerts, apiGetFullData: res, allbuyTickertData: allbuyTickertData });

          }

        }
      })

    }
    const addcart = () => {
      axios.get(apibaseURL + "/tickets/ticketsByDate/" + this.state.selectedDate.value).then((res) => {
        // console.log("FoodDataApi", res.data);
        if (res.data && res.status == 200) {
          let buyTickerts = [];
          let allbuyTickertData = [];
          let filterdata = this.state.filterdata;
          if (true) {
            allbuyTickertData.push(res.data.data.BreakFast)
            allbuyTickertData.push(res.data.data.MorningSnacks)
            allbuyTickertData.push(res.data.data.Lunch)
            allbuyTickertData.push(res.data.data.EveningSnacks)
            allbuyTickertData.push(res.data.data.Dinner)
            allbuyTickertData.push(res.data.data.LateNight)
            allbuyTickertData.push(res.data.data.FullDay)
            allbuyTickertData.push(res.data.data.Specials)
          }
          if (filterdata == "all") {
            buyTickerts.push(res.data.data.BreakFast)
            buyTickerts.push(res.data.data.MorningSnacks)
            buyTickerts.push(res.data.data.Lunch)
            buyTickerts.push(res.data.data.EveningSnacks)
            buyTickerts.push(res.data.data.Dinner)
            buyTickerts.push(res.data.data.LateNight)
            buyTickerts.push(res.data.data.FullDay)
            buyTickerts.push(res.data.data.Specials)
          }
          if (filterdata == "snacks") {
            buyTickerts.push(res.data.data.MorningSnacks)
            buyTickerts.push(res.data.data.EveningSnacks)
          }
          if (filterdata == "meals") {
            buyTickerts.push(res.data.data.BreakFast)
            buyTickerts.push(res.data.data.Lunch)
            buyTickerts.push(res.data.data.Dinner)
            buyTickerts.push(res.data.data.LateNight)
            buyTickerts.push(res.data.data.FullDay)
          }

          if (filterdata == "spacial") {

            buyTickerts.push(res.data.data.Specials)
          }
          this.setState({ buyTickertData: buyTickerts, apiGetFullData: res, allbuyTickertData: allbuyTickertData });
        }
      })

      // var cart = cartrender();
      // if (cart) {
      history.push("/checkout");
      // }
      // console.log(cart);


    }
    const filterTicket = (filterdata) => {

      let buyTickerts = []
      let res = this.state.apiGetFullData;
      // console.log(res.data)
      this.setState({ filterdata: filterdata });
      if (res.data) {
        if (filterdata == "all") {
          buyTickerts.push(res.data.data.BreakFast)
          buyTickerts.push(res.data.data.MorningSnacks)
          buyTickerts.push(res.data.data.Lunch)
          buyTickerts.push(res.data.data.EveningSnacks)
          buyTickerts.push(res.data.data.Dinner)
          buyTickerts.push(res.data.data.LateNight)
          buyTickerts.push(res.data.data.FullDay)
          buyTickerts.push(res.data.data.Specials)
        }
        if (filterdata == "snacks") {
          buyTickerts.push(res.data.data.MorningSnacks)
          buyTickerts.push(res.data.data.EveningSnacks)
        }
        if (filterdata == "meals") {
          buyTickerts.push(res.data.data.BreakFast)
          buyTickerts.push(res.data.data.Lunch)
          buyTickerts.push(res.data.data.Dinner)
          buyTickerts.push(res.data.data.LateNight)
          buyTickerts.push(res.data.data.FullDay)
        }

        if (filterdata == "spacial") {

          buyTickerts.push(res.data.data.Specials)
        }


        this.setState({ buyTickertData: buyTickerts })
      }
    }

    const reverseOrder = (e) => {
      // console.log("reverse")
      let reverseData = this.state.buyTickertData
      reverseData.reverse()
      this.setState({ buyTickertData: reverseData })
    }

 showdate = this.state.selectedDate ? this.state.selectedDate : showdate;
    
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        // return <span>Ticket Expired</span>
        // window.location.reload(true)
        return (<div className="expiry-ticket-img">
          {/* <img src={'https://www.onlygfx.com/wp-content/uploads/2020/05/expired-stamp-5.png'} height="180" /> */}
        </div>)
      } else {
        return <><span>{days > 0 ? zeroPad(days) + ':' : ''}{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span><br />
        </>
        // return <div className="counter-body">
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(days)}</span><span className="count-string">Days</span></div> <span className="colan">:</span>
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(hours)}</span><span className="count-string">Hours</span></div><span className="colan">:</span>
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(minutes)}</span><span className="count-string">Minutes</span></div><span className="colan">:</span>
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(seconds)}</span><span className="count-string">Seconds</span></div>

        // </div>
      }
    };
    let Cart1 = [];
    if (localStorage.getItem("cart")) {
      Cart1 = JSON.parse(localStorage.getItem("cart"));
    }
    let filterCart = [];
    let totalAmount = 0;
    let totalItemcount = 0;

const cartrender = () => {
      let reture = false
      this.state.allbuyTickertData.length > 0 ?
        this.state.allbuyTickertData.map((data, key) => {
          data.length > 0 ? data.map((item, id) => {
            if (Cart1.length > 0) {
              // console.log("cart-->>", Cart1)
              const result = Cart1.filter(cart => cart.itemId == item.ticket_id);
              if (result[0]) {
                filterCart.push(result[0]);
                totalItemcount = totalItemcount + result[0].itemQty;
                totalAmount = totalAmount + (result[0].itemQty * result[0].itemPrice);
              }
              localStorage.setItem("cart", JSON.stringify(filterCart));
              let cart = Cart1;
              localStorage.setItem("cartList", JSON.stringify({ totalItemcount, cart, totalAmount }));
              cartDetails = filterCart;
              cartList = { totalItemcount, cart, totalAmount }


            }
            reture = true
          }) : reture = false
        }) : reture = false
      return reture
    }
 
const removeCart =()=>{
 if( localStorage.getItem('cartId')){
        let cartId =  localStorage.getItem('cartId');
        axios.get(apibaseURL + "/tickets/removeCartItems/" + cartId).then((res) => {
        // console.log("remove--->>",res)
          if(res.data.status=="200"){
              localStorage.removeItem('cart');
              localStorage.removeItem('cartList');
              localStorage.removeItem('cartendTime');
              localStorage.removeItem("discountPrice"); 
              localStorage.removeItem("checkoutpage");
              this.setState({retureCheckout:false,mobileCart:true})
            }
        });
      }
 }
const backtocheckoutpage =()=>{
     history.push('/checkout')
     }
   
    let counts = {};
    let limitCount = {};
    let limitbookedcount = {};
    let cartcountdb = {};
    return (
      <>
    
          <>
            <SideNav />
           {this.state.mobileCart?<Cart value={this.state} showdate={showdate} ProceedCheckout={()=>this.ProceedCheckout()}  />:<></>} 

            <div className="main_body">
              <div className="row bothSidePaddiing" >
                <div className="col-sm-12	col-md-12	col-lg-12">
                  <div
                    className="body_container"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="container_text">
                      {/* <span className="Trending-Offer"> Trending Offer</span> */}
                      <div className="container_inner_text">
                        <h1 className="Pannaiyar-Party">Tidel Party</h1>
                        <h3 className="Different-meal-course">
                          12 Different Meal Course
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="" style={{ display: "flex", justifyContent: "center", margin: "20px 0px 0px 0px" }}>
                <DatePicker AllDates={AllDates} onClickDate={dateSelected} />
              </div>
              <hr className="hrTag" />

              <div className="tk_filter">
                <div className="ticket_filter_body" >
                  <div className="filter_all active filter" onClick={() => filterTicket('all')}>All</div>
                  <div className="filter_snacks  filter" onClick={() => filterTicket('snacks')}>SNACKS</div>
                  <div className="filter_meals filter" onClick={() => filterTicket('meals')}>MEALS</div>
                  <div className="filter_special filter" onClick={() => filterTicket('spacial')}>SPECIAL</div>
                  <HiSortDescending className="filter_icon" onClick={() => reverseOrder("reverse")} />

                </div>
              </div>
              <div class="row ticket_margin"  >
                {/* version 5 new tickets */}
                <div className="col-sm-12	col-md-12	col-lg-8 pc-new-ticket">
                  {/* {cartrender()} */}
                  {this.state.buyTickertData.length > 0 ?
                    this.state.buyTickertData.map((data, key) => {

                      return (<>
                        {data.length > 0 ?
                          <div className="new-ticket-body" id="ticket-body">
                            <div className="new-ticket-container">
                              {data.length > 0 ?
                                <div className="new-ticket-header">
                                  <div className="new-ticket-dot">  </div>
                                  <div className="new-ticket-time">
                                    {data[0].redeem_validity == 'Deadline' || data[0].redeem_validity == 'Any time' ? <><span>Specials</span></> : <span>{data[0].redeem_start} - {data[0].redeem_end} </span>}
                                    {data[0].redeem_validity == 'Deadline' || data[0].redeem_validity == 'Any time' ? <></> : <span>({data[0].meal_time})</span>}
                                  </div>
                                  <div className="new-ticket-available">
                                    <span> {data[0].redeem_validity == 'Deadline' || data[0].redeem_validity == 'Any time' ? ` ${data.length}` + " " + "Specials" : <>{data.length} {data[0].meal_time}</>} Available</span>
                                  </div>
                                </div> : <></>}
                              {data.length > 0 ? data.map((item, id) => {

                                counts["count" + item.ticket_id] = 0;

                                if (Cart1.length > 0) {
                                  Cart1.map((item1) => {
                                    if (item.ticket_id == item1.itemId) {
                                      counts["count" + item.ticket_id] = item1.itemQty;
                                    }
                                  });
                                }
                                limitCount["limitCount" + item.ticket_id] = item.is_limited == 1 ? item.limited_quantity_count : 1;
                                limitbookedcount["limitbookedcount" + item.ticket_id] = item.is_limited == 1 ? item.booked_count : 0;
                                cartcountdb["cartcountdb" + item.ticket_id] = item.is_limited == 1 ? item.cart_count : 0;

                                // let limitCount = {};
                                // let limitbookedcount = {};
                                localStorage.setItem('LimitCount', JSON.stringify({ limitCount, limitbookedcount, counts, cartcountdb }));
                                let image = JSON.parse(item.image)
                                // { console.log(this.state.addbtn) }
                                return (<>
                                  <div className="new-ticket-box">

                                    <div className="ticket-box-container">
                                      <div className="ticket-top-box">
                                        <div className="ticket-food-image">
                                          <img src={"https://pannaiyarbiriyani.com/user/demo/img/userprofile/" + image[0]} height="50px" className="" />
                                        </div>
                                        <div className="ticket-top-right">
                                          <div>
                                            <div className="ticket-food-mealtime"><span>{item.redeem_validity == 'Deadline' || item.redeem_validity == 'Any time' ? "Specials" : item.ticket_name}</span></div>
                                            <div className="ticket-food-name"><span>{item.item_name}</span></div>
                                          </div>
                                          <div className="ticket-food-type">
                                            {item.item_type == 'veg' ? <GoPrimitiveDot className="food-symbol-veg" /> : <IoTriangle className="food-symbol-nonveg" />}
                                          </div>
                                        </div>

                                      </div>
                                      <div className="ticket-center-box">
                                        <div className="center-dot"></div>
                                        <div className="time-left-body">
                                          <div className="time-left-count"> {item.redeem_validity == 'Deadline' || item.redeem_validity == 'Any time' ? <></> :
                                            <> <Countdown date={new Date(item.booking_end)} renderer={renderer}></Countdown></>}</div>
                                          {item.redeem_validity == 'Deadline' || item.redeem_validity == 'Any time' ? <>{""}</> :
                                            <> <div className="time-left-text">Time Left</div></>}
                                        </div>
                                        <div className="ticket-left-body">
                                          <div class="top">
                                            <span className="ticket-left-count">{item.is_limited == 1 ? limitCount["limitCount" + item.ticket_id] - limitbookedcount["limitbookedcount" + item.ticket_id]- (this.state.retureCheckout?0:counts["count" + item.ticket_id])  > 0 ? (limitCount["limitCount" + item.ticket_id] - limitbookedcount["limitbookedcount" + item.ticket_id]) - (this.state.retureCheckout?0:counts["count" + item.ticket_id]) : 0 : '∞'}	</span>
                                          </div>
                                          <div className="ticket-left-text"><span>Ticket Left</span></div>
                                        </div>

                                        <div className="ticket-price-body">
                                          <div className="ticket-reduce-price">{item.discount == 1 ? `Rs.${item.sale_price}` : ''}</div>
                                          <div className="sale-price">{item.discount == 1 ? `Rs.${item.discount_price}` : `Rs.${item.sale_price}`}</div>
                                        </div>

                                      </div>
                                      <div className="new-ticket-hr-div"></div>
                                      <div className="ticket-bottom-box">
                                        <div className="details-body" onClick={() => {
                                          var x = window.matchMedia("(max-width: 971px)");
                                          if (x.matches) {
                                            
                                            localStorage.removeItem('item');
                                            this.setState({ show: true, detailsPopUPData: item, slideImages: JSON.parse(item.image),detailspage:true })

                                          } else {
                                            localStorage.removeItem('item');
                                            this.setState({ show: true, detailsPopUPData: item, slideImages: JSON.parse(item.image),detailspage:false })


                                          }

                                        }}><span className="text">Details</span></div>
                                        <div className="add-cart-body">
                                          <div className="minus add-btn"><HiMinusSm className="icon"

                                            onClick={() =>
                                              this.state.minus ? counts["count" + item.ticket_id] < 1 ? '' : this.itemMinus(
                                                item.ticket_id,
                                                item.discount == 1 ? item.discount_price : item.sale_price,
                                                item.ticket_name,
                                                item.item_type,
                                                item.is_limited == 1 ? true : false
                                                // index
                                              ) : ''
                                            }

                                          /></div>

                                          <span className="cart-count">{counts ? (
                                            counts["count" + item.ticket_id]
                                          ) : (
                                            <></>
                                          )} </span>
                                          <div className="plus add-btn"><HiPlusSm className="icon"

                                            onClick={(e) =>

                                              this.state.addbtn ? counts["count" + item.ticket_id] < 3 ? item.is_limited == 1 ? limitCount["limitCount" + item.ticket_id] - limitbookedcount["limitbookedcount" + item.ticket_id] -  (this.state.retureCheckout?0:counts["count" + item.ticket_id]) > 0 ? (limitCount["limitCount" + item.ticket_id] - limitbookedcount["limitbookedcount" + item.ticket_id]) -  (this.state.retureCheckout?0:counts["count" + item.ticket_id]) <= 0 ? 0 : this.itemPlus(
                                                item.ticket_id,
                                                item.discount == 1 ? item.discount_price : item.sale_price,
                                                item.ticket_name,
                                                item.item_type,
                                                item,
                                                item.is_limited == 1 ? true : false

                                              ) : '' :
                                                this.itemPlus(
                                                  item.ticket_id,
                                                  item.discount == 1 ? item.discount_price : item.sale_price,
                                                  item.ticket_name,
                                                  item.item_type,
                                                  item,
                                                  item.is_limited == 1 ? true : false,

                                                ) : '' : ''

                                            }
                                          /></div>
                                          <div></div>
                                        </div>

                                      </div>
                                    </div>

                                  </div>
                                </>)
                              }) : <></>}

                            </div>
                          </div> : <></>}
                      </>)
                    }) : <></>}


                </div>
                {/* version 5 new tickets */}
                <div className="col-sm-12	col-md-12	col-lg-4">
                  <div className="Rectangle-cart">
                    <div className="cart">
                      <div>
                        <span>Cart</span>
                      </div>
                      <div>
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                    </div>
                    <div className="Line-125"></div>
                    {cartList != null ? (
                      cartList.totalItemcount <= 0 ? (
                        <div className="Empatcart">
                          <b>Cart Empty</b>
                        </div>
                      ) : (
                        <div className="CartDetails">
                          <div className="itemlist">
                            {/* <Cartlist /> */}
                            {cartDetails ? (
                              cartDetails.length > 0 ? (
                                cartDetails.map((item, index) => {
                                  return (
                                    <div
                                      className="FoodItem"
                                    // style={{ display: this.state.item1display }}
                                    >
                                      <div className="Food_Name">
                                        {item.itemFoodType == "veg" ? (
                                          <GoPrimitiveDot className="food-symbol-veg_cart" />
                                        ) : (
                                          <IoTriangle className="food-symbol-nonveg_cart" />
                                        )}
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                          <span>{item.itemName}{" "}<span style={{ fontSize: "13px" }}>({item.itemFoodName})</span></span>
                                          <div style={{ fontSize: "13px" }}> ({moment(item.bookingDate.value).format('DD-MMM-yyy')})</div>
                                        </div>
                                      </div>
                                      <div className="Ticket_qnt_btn">
                                        <FaMinusCircle
                                          className="min_btn"
                                          // onClick={this.props.nonVegcartDecrement}
                                          onClick={() =>
                                            counts["count" + item.itemId] < 1 ? '' : this.itemMinus(
                                              item.itemId,
                                              item.itemPrice,
                                              item.itemName,
                                              item.itemFoodType,
                                              index
                                            )
                                          }
                                        />
                                        <span className="Ticket_qnt-val">
                                          <span>{item.itemQty}</span>
                                          {/* {"====",console.log(counts["count"+item.itemId] < 3)} */}
                                        </span>
                                        <FaPlusCircle
                                          className="plus_btn"
                                          // onClick={this.props.nonVegcartIncrement}


                                          onClick={() =>
                                            counts["count" + item.itemId] < 3 ? item.limit ? limitCount["limitCount" + item.itemId] - limitbookedcount["limitbookedcount" + item.itemId] - cartcountdb["cartcountdb" + item.itemId] > 0 ? (limitCount["limitCount" + item.itemId] - limitbookedcount["limitbookedcount" + item.itemId]) - cartcountdb["cartcountdb" + item.itemId] <= 0 ? 0 :
                                              this.itemPlus(
                                                item.itemId,
                                                item.itemPrice,
                                                item.itemName,
                                                item.itemFoodType

                                              ) : '' :
                                              this.itemPlus(
                                                item.itemId,
                                                item.itemPrice,
                                                item.itemName,
                                                item.itemFoodType
                                              ) : ''

                                          }

                                        />
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="Empatcart">
                                  {/* <img src={Emptycart} /> */}
                                  {/* <b>Cart Empty</b> */}
                                </div>
                              )
                            ) : (
                              <div className="Empatcart">
                                {/* <img src={Emptycart} /> */}
                                <b>Cart Empty</b>
                              </div>
                            )}

                            <div className="Line-125"></div>
                            {/* </div> */}
                            <div className="Subtotal">
                              <div className="Food_Name">
                                <span>Subtotal</span>
                              </div>
                              <div className="Total_amt">
                                <span>₹{cartList ? cartList.totalAmount : 0}</span>
                              </div>
                            </div>
                            <div>
                              <span className="Extra-charges-may-apply">
                                Extra charges may apply
                              </span>
                            </div>
                            <div
                              style={{ display: "flex", justifyContent: "center" }}
                            >
                              <div>
                                <div className="Union-31" onClick={() => this.ProceedCheckout()}>
                                  <span className="Proceed-To-Checkout">
                                    Proceed To Checkout
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <>
                        {" "}
                        <div className="Empatcart">
                          {/* <img src={Emptycart} /> */}
                          <b>Cart Empty</b>
                        </div>{" "}
                      </>
                    )}
                  </div>
                </div>
                {/* /privacy-policy */}

                <Modal
                  show={this.state.show}
                  onHide={() => this.setState({ show: false })}
                  dialogClassName="modal-90w"
                  id="modal-dialog"
                  aria-labelledby="example-custom-modal-styling-title"
                  centered
                >
                  <Modal.Header>
                    <div></div>
                    <IoClose
                      className="close-icon"
                      onClick={() => this.setState({ show: false })}
                    />
                  </Modal.Header>
                  <Modal.Body>

                    <TicketDetails item={this.state.detailsPopUPData?this.state.detailsPopUPData:''}  itemPlus={this.itemPlus} itemMinus={this.itemMinus} counts={counts} limitCount={limitCount} limitbookedcount={limitbookedcount} back={this.state.detailspage} backtoBookingPage={this.backtoBookingPage} />
            </Modal.Body>
                </Modal>


                <Modal
                  show={this.state.ProceedCheckout}
                  onHide={() => this.setState({ ProceedCheckout: false })}
                  dialogClassName="modal-90w"
                  id="modal-proceed"
                  aria-labelledby="example-custom-modal-styling-title"
                  centered
                >
                  <Modal.Header>
                    <h4> Warning</h4>
                    <IoClose
                      className="close-icon"
                      onClick={() => this.setState({ ProceedCheckout: false })}
                    />
                  </Modal.Header>
                  <Modal.Body>

<div className="m-body">
<div className="mess-content"><span> {this.state.errorCartAdd}</span></div>
<div className="remove-item" onClick={()=>this.removeCartIdItem()}><span>Remove Item</span></div>
</div>  
               
{/* <button>Modify</button> */}


                  </Modal.Body>
                </Modal>

                <Modal
                  show={this.state.retureCheckout}
                  // onHide={() => this.setState({ retureCheckout: false })}
                  dialogClassName="modal-90w"
                  id="modal-returncheckout"
                  aria-labelledby="example-custom-modal-styling-title"
                  centered
                >
                  <Modal.Header>
                    <h4> Warning</h4>
                    {/* <IoClose
                      className="close-icon"
                      onClick={() => this.setState({ retureCheckout: false })}
                    /> */}
                  </Modal.Header>
                  <Modal.Body>

<div className="m-body">
<div className="mess-content"><span>Already added cart item Purchase or Remove</span></div>
<div className="button-body">
<div className="cart-modify" onClick={()=>removeCart() }><span>Remove</span></div>
<div className="continue-checkout" onClick={()=>backtocheckoutpage()}><span>Purchase </span></div>
</div>
</div>  
               
{/* <button>Modify</button> */}


                  </Modal.Body>
                </Modal>
              </div>
              <div className="footer-copyright">
                Copyright Pannaiyar Biriyani All Right Reserved.
                <Link to="/privacy-policy" >   Privacy Policy </Link>
                |
                <Link to="/terms-and-conditions" > Terms and Conditions</Link>
              </div>
            </div>
          </>
          

      </>
    );
  }
}

// export default BuyTickert;

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    VegcartIncrement: (amt) => {
      dispatch(cartIncrement({ type: "Vegcartincrement", price: 200 }));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },
    VegcartDecrement: (amt) => {
      dispatch(cartDecrement({ type: "Vegcartdecrement", price: 200 }));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },

    nonVegcartIncrement: (amt) => {
      dispatch(cartIncrement({ type: "nonVegcartincrement", price: 100 }));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },
    nonVegcartDecrement: (amt) => {
      dispatch(cartDecrement({ type: "nonVegcartdecrement", price: 100 }));
      dispatch(TotalItem("cartTotalItem"));
      dispatch(TotalAmt("cartTotalamt"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyTickert);


// function MyVerticallyCenteredModal(props) {
//   return (
   
//   );
// }