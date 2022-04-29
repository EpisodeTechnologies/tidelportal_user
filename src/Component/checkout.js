import React, { useEffect, useState } from "react";
import Body_img from "../img/collection-indian-biryanis-styled-260nw-1836975842.png";
// import Emptycart from "../img/cartempty.jpg";
import Razorpay from "../img/razer_light.png";
import axios from "axios";
import SideNav from "./SideNav";
import { Redirect, navigation, Link } from "react-router-dom";
import moment from "moment";
import QRCode from "qrcode";
import Cartlist from "./Cartlist";
import { useDispatch, useSelector, connect } from "react-redux";
import { discountCalculator } from "../action/index";
import { apibaseURL } from "../apiBaseURL";
// import dataURLtoFile from "../utils/dataURLtoFile";
import { createHashHistory } from "history";
import { GoPrimitiveDot } from "react-icons/go";
import { IoTriangle } from "react-icons/io5";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Countdown, { zeroPad } from "react-countdown";
const history = createHashHistory();

class checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      usernumber: "",
      User_Id: "",
      number: "",
      verifycode: "",
      numbermax: "none",
      numberotpmax: "none",
      selectedlocation: "Saibaba Colony",
      User_OTP: "",
      User_Phonenumber: "6369537855",
      User_name: "",
      User_email: "",
      selectdisplay: "",
      selectdisplay1: "none",
      vegQ: 0,
      nonvegQ: 0,
      CouponCode: null,
      payment_amt: 1000,
      reload: true,
      renderTimes: 0,
      discountPrice: 0,
      Price: 0,
      cart: [],
      loader: false,
      email: "",
      password: "",
      CorrectNumber: "",
      passShow: true,
      applyedCouponCode: "",
      loadingSpring: "none",
      cartupdate:0

    };
  }
  componentDidMount() {
    // const user = JSON.parse(localStorage.getItem("user"));

     if(localStorage.getItem("checkoutpage")){
      
    if (localStorage.getItem("cart")) {
      this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
      if (localStorage.getItem("cart")) {
        let cartDetails = JSON.parse(localStorage.getItem("cart"));
        let cartList = JSON.parse(localStorage.getItem("cartList"));
        // console.log(cartList.totalAmount);
        this.setState({ Price: parseInt(cartList.totalAmount) });
      }
    }
  } else {
      history.push("/");
    }
    var localvar = JSON.parse(localStorage.getItem("user_login_details"));

    this.setState({ vegQ: this.props.cartreducer.vegvalue });
    this.setState({ nonvegQ: this.props.cartreducer.nonVegvalue });

    if (localvar) {
      if (localStorage.getItem("discountPrice")) {
        let discountPrice = JSON.parse(localStorage.getItem("discountPrice"))
        this.setState({
          discountPrice: discountPrice.price,
          applyedCouponCode: discountPrice.couponCode,
        });
      }
      this.setState({ userName: localvar.User_Name });
      this.setState({ usernumber: localvar.User_Phonenumber });
      this.setState({ User_Id: localvar.Id });
      // console.log(localvar.Id);

      this.setState({ payment_amt: this.props.cartreducer.cartTotalAmt });
      // veg_biriyani:user.name.value2,
      // nonveg_biriyani:user.name.value1,
      document.getElementById("payment").style.display = "none";
      document.getElementById("paymentmethode").style.display = "inline";
    } else {
      // this.setState({ selectdisplay: "" });
      // this.setState({ selectdisplay1: "none" });
    }

  }

  componentDidUpdate(e) {
    let cartDetails;
    let cartList;
    if (localStorage.getItem("cart")) {
      cartDetails = JSON.parse(localStorage.getItem("cart"));
      cartList = JSON.parse(localStorage.getItem("cartList"));
      if (cartDetails.length > 0) {
      } else {
        history.push("/");
      }
    }
  }

  itemPlus = (id, price, name, foodtype) => {
    let cart = [];
    let totalItemcount = 0;
    let totalAmount = 0;
    // let countValues = this.state.countValues;
    if (localStorage.getItem("cartList")) {
      let cartlist = JSON.parse(localStorage.getItem("cartList"));
      totalItemcount = cartlist.totalItemcount;
      totalAmount = cartlist.totalAmount;

      // console.log(cartlist);
    }
    if (localStorage.getItem("cart")) {
      let cartDetails = JSON.parse(localStorage.getItem("cart"));
      cart = cartDetails;
      // console.log(cart);
      const array1 = [];

      cart.map((item) => {
        array1.push(item.itemId);
        if (item.itemId == id) {
          item.itemQty = item.itemQty + 1;
          totalItemcount = totalItemcount + 1;
          totalAmount = totalAmount + 1 * price;

          // countValues["count" + id] = item.itemQty;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem(
          "cartList",
          JSON.stringify({ totalItemcount, cart, totalAmount })
        );
        this.setState({ cart: cart });
      });

      // console.log(array1);

      if (!array1.includes(id)) {
        cart.push({
          itemName: name,
          itemFoodType: foodtype,
          itemId: id,
          itemPrice: price,
          itemQty: 1,
        });
        totalItemcount = totalItemcount + 1;
        totalAmount = totalAmount + price;
        // countValues["count" + id] = 1;
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
      });
      totalItemcount = totalItemcount + 1;
      totalAmount = totalAmount + price;
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem(
        "cartList",
        JSON.stringify({ totalItemcount, cart, totalAmount })
      );
      // countValues["count" + id] = 1;
      this.setState({ cart: cart });
    }
    // this.setState({ countValues });
  };

  itemMinus = (id, price, name, foodtype, index) => {
    let cart = this.state.cart;
    let totalItemcount = 0;
    let totalAmount = 0;
    // let countValues = this.state.countValues;
    if (localStorage.getItem("cartList")) {
      let cartlist = JSON.parse(localStorage.getItem("cartList"));
      totalItemcount = cartlist.totalItemcount;
      totalAmount = cartlist.totalAmount;

      // console.log(cartlist);
    }
    cart.map((item, i) => {
      if (item.itemId == id) {
        if (item.itemQty <= 0) {
        } else {
          item.itemQty = item.itemQty - 1;
          totalItemcount = totalItemcount - 1;
          totalAmount = totalAmount - price;
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
    });
  };

  render() {
  //   setTimeout(function () {
  //     cartremove()
  //   }, 300000
  //   );

  // const cartremove=()=>{
  //   localStorage.removeItem('cart');
  //   localStorage.removeItem('cartList');
  //   this.forceUpdate()
  // }

    // console.console.log( this.state.User_Id);
    const user = JSON.parse(localStorage.getItem("user"));
    let { discountPrice } = this.state;
    var localvar = JSON.parse(localStorage.getItem("user_login_details"));
    let cartDetails;
    let cartList;
    if (localStorage.getItem("cart")) {
      cartDetails = JSON.parse(localStorage.getItem("cart"));
      cartList = JSON.parse(localStorage.getItem("cartList"));
    }

    // console.log(localvar);

    const updateData = () => {
      this.render();
      this.componentDidMount();
      changeaddress();
      this.setState({ renderTimes: this.state.renderTimes + 1 });
      // this.render(<SideNav />, document.body);
    };

    const sendotp_checkout = (e) => {
      if (e.key == "Enter" || e.type == "click") {
        var number = this.state.number;
        if (number.length < 10) {
          this.setState({ numbermax: "" });
        } else {
          this.setState({ numbermax: "none" });
          document.getElementById("loginnumber").style.display = "none";
          document.getElementById("verifylogin").style.display = "inline";

          var digits = "0123456789";
          let OTP = "";
          for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
          }
          this.setState({ User_OTP: OTP });
          axios
            .post(apibaseURL + "/login", {
              user_Number: this.state.number,
              user_otp: OTP,
            })
            .then((res) => {
              // console.log(res.data.length);
              axios
                .post("https://pannaiyarbiriyani.com/api/otp/index.php", {
                  user_Number: this.state.number,
                  user_otp: OTP,
                })
                .then((res) => {
                  // console.log("succss");
                });

              if (res.data.length <= 0) {
                this.setState({ User_Phonenumber: "" });
                this.setState({ userName: "" });
              } else {
                this.setState({
                  User_Phonenumber: res.data[0].User_Phonenumber,
                });
                this.setState({ userName: res.data[0].User_Name });
              }
            });
        }
      }
    };

    const Login = (e) => {
      if (e.key == "Enter" || e.type == "submit") {
        this.setState({ loader: true });
        axios
          .post(apibaseURL + "/userLogin", {
            email: this.state.email,
            password: this.state.password,
          })
          .then((res) => {
            // console.log(res);
            if (res.data.status == "200") {
              // console.log(res.data.data);
              localStorage.setItem(
                "user_login_details",
                JSON.stringify(res.data.data)
              );
              this.setState({ loader: false });
              this.setState({ reload: false });
              updateData();
              // History.push("/");
            } else {
              // this.state.CorrectNumber(res.data.message)
              this.setState({ CorrectNumber: res.data.message });
              this.setState({ loader: false });
            }
          });
      } else {
        this.setState({ loader: false });
      }
      e.preventDefault();
    };
    const verifyotp_checkout = (e) => {
      if (e.key == "Enter" || e.type == "click") {
        var numberotp = this.state.verifycode;
        if (numberotp.length < 4) {
          this.setState({ numberotpmax: "" });
        } else {
          // OTP issue
          if (numberotp == 1234) {
            // OTP issue
            // if (numberotp == this.state.User_OTP) {
            if (this.state.User_Phonenumber === this.state.number) {
              document.getElementById("verifylogin").style.display = "none";

              // document.getElementById("selectlocation").style.display = "none";
              // document.getElementById("selected").style.display = "inline";
              document.getElementById("payment").style.display = "none";
              document.getElementById("paymentmethode").style.display =
                "inline";

              axios
                .post(apibaseURL + "/logindetail/api", {
                  User_Number: this.state.number,
                })
                .then((res) => {
                  localStorage.setItem(
                    "user_login_details",
                    JSON.stringify(res.data[0])
                  );
                  this.setState({ reload: false });
                  updateData();
                });
            } else {
              document.getElementById("verifylogin").style.display = "none";
              document.getElementById("newuser").style.display = "inline";
            }
          } else {
            this.setState({ numberotpmax: "" });
          }
        }
      }
    };
    const againLogin = () => {
      document.getElementById("verifylogin").style.display = "none";
      document.getElementById("loginnumber").style.display = "inline";
    };
    const Address1 = () => {
      // this.setState({ selectedlocation: "Hope College" });
      // document.getElementById("selectlocation").style.display = "none";
      // document.getElementById("selected").style.display = "inline";
      // document.getElementById("payment").style.display = "none";
      // document.getElementById("paymentmethode").style.display = "inline";
      // document.getElementById("changelocation").style.display = "inline";
    };
    const Address2 = () => {
      // this.setState({ selectedlocation: "Saibaba Colony" });
      // document.getElementById("selectlocation").style.display = "none";
      // document.getElementById("selected").style.display = "inline";
      // document.getElementById("payment").style.display = "none";
      // document.getElementById("paymentmethode").style.display = "inline";
      // document.getElementById("changelocation").style.display = "inline";
    };
    const changeaddress = () => {
      // this.setState({ selectedlocation: "Saibaba Colony" });
      // document.getElementById("selectlocation").style.display = "inline";
      // document.getElementById("selected").style.display = "none";
      // document.getElementById("payment").style.display = "inline";
      // document.getElementById("paymentmethode").style.display = "none";
    };

    const Register_account = (e) => {
      if (e.key == "Enter" || e.type == "click") {
        axios
          .post(apibaseURL + "/register", {
            user_name: this.state.User_name,
            user_Number: this.state.number,
            user_email: this.state.User_email,
          })
          .then((res) => {
            // console.log(res);
            document.getElementById("newuser").style.display = "none";
            axios
              .post(apibaseURL + "/logindetail/api", {
                User_Number: this.state.number,
              })
              .then((res) => {
                // console.log(res);
                this.setState({ userName: res.data[0].User_Name });
                this.setState({ usernumber: res.data[0].User_Phonenumber });
                this.setState({ User_Id: res.data[0].Id });

                localStorage.setItem(
                  "user_login_details",
                  JSON.stringify(res.data[0])
                );
                this.setState({ reload: false });
                updateData();
                // location.reload()
                // window.location.reload(true);
              });
            this.setState({ userName: this.state.User_name });
          });
      }
    };

    const handleChangenumber = (e) => {
      this.setState({ number: e.target.value });
    };
    const handleChangeverifyotp = (e) => {
      this.setState({ verifycode: e.target.value });
    };
    const handleChangeregisterusername = (e) => {
      this.setState({ User_name: e.target.value });
    };
    const handleChangeregisteruseremail = (e) => {
      this.setState({ User_email: e.target.value });
    };

    // razorpay  start function
    // const [name, setName] = useState('Mehul')
    function loadScript(src) {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    }
    var payment_amt = cartList ? cartList.totalAmount - discountPrice : 0;
    const __DEV__ = document.domain === "localhost";
    var user_id = this.state.User_Id;
    var applyedCouponCode = this.state.applyedCouponCode;
    async function displayRazorpay() {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }


      // rzp_test_EhF0zEAkyVro5D test
      // rzp_live_dkBE2nBmVOfZ1m live episode
      // rzp_live_CrRxq8gHuSM96z justkitchen
      // rzp_test_7k2E5AZGf8muFK indra
      const options = {
        key: "rzp_test_7k2E5AZGf8muFK", // Enter the Key ID generated from the Dashboard
        amount: payment_amt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Tidel Party",
        // description: "Test Transaction",
        image:
          "data:image/jpeg;base64,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",

        handler: function (response) {
          // console.log(response);
          let notification = true;
          let tickets = []
          let bookingDate;
          let totalTickets = 0;

          if (response.razorpay_payment_id) {

            if (cartDetails.length > 0) {
              cartDetails.map((FoodData) => {
                // console.log("Checkout===>", FoodData)
                let ticket = {
                  "ticketId": FoodData.itemId,
                  "quantity": FoodData.itemQty
                }
                bookingDate = FoodData.bookingDate.value
                totalTickets = totalTickets + FoodData.itemQty;
                tickets.push(ticket);
              });

              // console.log(tickets)
              let passData = {
                "paymentId": response.razorpay_payment_id,
                "bookingDate": bookingDate,
                "userId": user_id,
                "tickets": tickets,
                "totalTickets": totalTickets
              }
              bookingApi(passData);

            } else {
              history.push("/");
            }
          } else {
          }
        },

      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }


    const bookingApi = ({ paymentId, bookingDate, tickets, userId, totalTickets }) => {
      this.setState({ loadingSpring: "inline" });
      // console.log({ paymentId, bookingDate, tickets, userId })
      // console.log(paymentId)
      let passData = {
        "paymentId": paymentId,
        "bookingDate": bookingDate,
        "userId": userId,
        "couponApplied": applyedCouponCode == '' ? false : true,
        "couponcode": applyedCouponCode,
        "tickets": tickets,
        "cartId": localStorage.getItem('cartId')?localStorage.getItem('cartId'):''
      }
      axios
        .post(apibaseURL + "/tickets/bookTicket", passData).then((res) => {
          // console.log("after APi--->", res)

          if (res.data.status == "200") {
            // if (notification) {
            //   notification = false;
            axios
              .post(apibaseURL + "/add-Notification", {
                message: `${totalTickets} Ticket purchased`,
                user_id: localvar.Id,
                Notification_type: "purchased",
              })
              .then((res) => {
                localStorage.removeItem("cart");
                localStorage.removeItem("cartList");
                localStorage.removeItem("discountPrice");     
                localStorage.removeItem('cartendTime');
                localStorage.removeItem("checkoutpage");
                localStorage.removeItem("selectedDate");
                setTimeout(() => {


                  history.push("/ticketmanager");
                },2000)
              });
          }
        })

    }


    const applyCoupon = (price) => {


      // console.log(price);
      if (this.state.CouponCode != "") {
        axios
          .post(apibaseURL + "/redeemCoupon", {
            userId: parseInt(this.state.User_Id),
            couponCode: this.state.CouponCode,
            totalPrice: price - this.state.discountPrice,
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.status == "200") {
              localStorage.setItem("discountPrice", JSON.stringify({ price: res.data.data.discount_amount, couponCode: this.state.CouponCode }));

              this.setState({
                applyedCouponCode: this.state.CouponCode,
                discountPrice: res.data.data.discount_amount,
                CouponCode: "",
              });
              // alert(res.data.data.discount_amount);
            }
            if (res.data.status == "400") {
              this.setState({ applyedCouponCode: '' });
              toast.error(res.data.message, {
                position: "bottom-center",
                reverseOrder: true,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            }
          });
      }
    };
    const resendotpverify = (e) => {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      // setOtpNumber(OTP);
      this.setState({ User_OTP: OTP });
      // this.setState({User_OTP:1234})
      axios
        .post("https://pannaiyarbiriyani.com/api/otp/index.php", {
          user_Number: Number,
          user_otp: OTP,
        })
        .then((res) => {
          let data = {
            User_Phonenumber: Number,
            //   userotp: 1234,
          };
          axios
            .post(apibaseURL + "/login", {
              user_Number: this.state.User_Phonenumber,
              user_otp: OTP,
              // user_otp: 1234,
            })
            .then((res) => {
              if (res.status == 200) {
              } else {
              }
            });
        });
    };


    let counts;
    let limitCount;
    let limitbookedcount;
    let cartcountdb;
 
    if (localStorage.getItem('LimitCount')) {
      var LimitCount = JSON.parse(localStorage.getItem('LimitCount'));
      counts = LimitCount.counts;
      limitCount = LimitCount.limitCount;
      limitbookedcount = LimitCount.limitbookedcount
      cartcountdb=LimitCount.cartcountdb
      // console.log("LimitCount-->>>>", LimitCount)
    }
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
    return (
      <>
        <ToastContainer />
        <SideNav renderTimes={this.state.renderTimes} />
        <div style={{ display: this.state.loadingSpring }} class="loading">Loading&#8230;</div>

        <div className="main_body">
          <div
            className="row reverse-col"
            style={{
              marginRight: "calc(var(--bs-gutter-x) * .5)",
              backgroundImage: Body_img,
            }}
          >
            <div className="col-sm-12 col-md-12 col-lg-8">
              <div className="body_checkout_container">
                <div className="container_checkout_text">
                  <div class="Rectangle-AddressDetails">
                    <span class="Account-Details">Account Details</span>
                    {localvar ? (
                      <span
                        id="alreadyuser"
                        style={{
                          display: "",
                        }}
                      >
                        {" "}
                        : Welcome, {this.state.userName} -{" "}
                        {this.state.usernumber}
                      </span>
                    ) : (
                      <form className="logincard logincard1" onSubmit={Login}>
                        <h2 id="title"> Log in</h2>

                        <div className="create-account">
                          <p className="msg">
                            Not registered?&ensp;
                            <Link
                              to={{
                                pathname: "/createaccount",
                                state: { BeforePageurl: "/checkout" },
                              }}
                            >
                              <span>Create an account</span>
                            </Link>
                          </p>
                        </div>
                        <p className="or">
                          <span style={{ color: "red" }}>
                            {this.state.CorrectNumber}
                          </span>
                        </p>

                        <div id="email-login">
                          <label for="Phone Number">
                            <b>User Name</b>
                          </label>
                          <input
                            id="phoneNUmberinput"
                            value={this.state.email}
                            // onKeyPress={Login}
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                            type="email"
                            placeholder=" Enter Email id"
                            name="useremail"
                            // maxlength="10"
                            required
                          />
                        </div>
                        <div id="email-login">
                          <label for="Phone Number">
                            <b>Password</b>
                          </label>

                          <div style={{ position: "relative" }}>
                            <input
                              id="phoneNUmberinput"
                              type={this.state.passShow ? "password" : "text"}
                              placeholder=" Enter New Password"
                              name="UserPNumber"
                              minlength="8"
                              style={{ width: "100%" }}
                              onChange={(e) => { this.setState({ password: e.target.value, loader: false }) }}
                              required
                            />
                            {this.state.passShow ? (
                              <BsFillEyeFill
                                className="pass-open-eye"
                                onClick={(e) => { this.setState({ passShow: !this.state.passShow }) }} />
                            ) : (
                              <BsFillEyeSlashFill
                                className="pass-open-eye"
                                onClick={(e) => { this.setState({ passShow: !this.state.passShow }) }}
                              />
                            )}
                          </div>
                        </div>

                        <button type="submit" class="cta-btn">
                          {this.state.loader ? (
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            "Log in"
                          )}
                        </button>

                        <div className="create-account">
                          <Link
                            to={{
                              pathname: "/login",
                              state: { BeforePageurl: "/checkout", forgotPass: true },
                            }}
                          > <p
                            class="forgot-pass"

                          >
                              Forgot Your Password?{" "}
                            </p></Link>
                        </div>
                      </form>
                    )}
                  </div>
                  <div class="Rectangle-Location">
                    <div
                      id="selected"
                      style={{ display: this.state.selectdisplay }}
                    >
                      <span class="Account-Details">
                        {/* Location : {this.state.selectedlocation} */}
                        Location : Food Court Tidel Park
                      </span>
                      <span
                        class="Account-Details changelocation"
                        id="changelocation"
                        onClick={changeaddress}
                      >
                        {/* Change{" "} */}
                      </span>
                    </div>
                    <div
                      style={{ display: this.state.selectdisplay1 }}
                      // style={{ display: "none" }}

                      id="selectlocation"
                    >
                      <span class="Select-Location-after">Select Location</span>
                      <div className="Address-loaction">
                        <div className="Address1" onClick={Address1}>
                          <div class="Address1-Map">
                            <iframe
                              className="map-image"
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1809221885937!2d77.02000521475125!3d11.025048692153119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857c4b73756e1%3A0x2c9f190a19bffd39!2sPannaiyar%20Biriyani!5e0!3m2!1sen!2sin!4v1634863311805!5m2!1sen!2sin"
                              width="180"
                              height="180"
                              allowfullscreen=""
                              loading="lazy"
                            />
                          </div>
                          <span class="Address1-details">
                            North Side Rd, Peelamedu, Valluvar Nagar, Hope
                            College, Coimbatore, Tamil Nadu 641004
                          </span>
                          <div className="d-flex justify-content-center">
                            <span className="Gift-Coupon-apply">
                              <span className="my-2">SELECT</span>
                            </span>
                          </div>
                        </div>
                        <div className="Address2" onClick={Address2}>
                          <div class="Address1-Map">
                            <iframe
                              className="map-image"
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2457287997736!2d76.93750291416262!3d11.020181157662003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8591526cc277b%3A0xe0e683a5311cc7b4!2sPannaiyar%20Biriyani!5e0!3m2!1sen!2sin!4v1628905456680!5m2!1sen!2sin"
                              width="180"
                              height="180"
                              allowfullscreen=""
                              loading="lazy"
                            />
                          </div>
                          <span class="Address1-details">
                            56, Bharathi Park Rd, near icici bank, 7th cross,
                            Saibaba Colony, Coimbatore, Tamil Nadu 641043
                          </span>
                          <div className="d-flex justify-content-center">
                            <span className="Gift-Coupon-apply">
                              <span className="my-2">SELECT</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="Rectangle-Payment">
                    <div id="payment">
                      <span class="Account-Details">Payment</span>
                    </div>
                    <div style={{ display: "none" }} id="paymentmethode">
                      <div>
                        <span className="Payment_method">Payment method</span>
                      </div>
                      <div>
                        <div
                          style={{
                            marginLeft: "20px",
                            padding: "20px 10px 20px 10px",
                          }}
                        >
                          <img src={Razorpay} width="150px" />
                          <br />
                        </div>
                        <span class="Razor-Pay">Razor Pay</span>

                        <div class="Union-39" onClick={() => { displayRazorpay(); }}>
                          {" "}
                          <span class="Pay-699">
                            Pay ₹
                            {cartList
                              ? cartList.totalAmount - discountPrice
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12	col-md-12 col-lg-4">
              <div class="checkout-cart">
                <div className="cart-summary">
                  <div>
                    <span>Order Summary</span>
                  </div>
                  <div>
                    <i class="fas fa-shopping-cart"></i>
                  </div>
                </div>
                <div className="Empatcart" style={{ display: "none" }}>
                  {/* <img
               src={Emptycart}
               /> */}
                </div>
                <div className="CartDetails">
                  <div className="CartItem">
                    <span>{cartList ? cartList.totalItemcount : 0}</span> item
                  </div>
                  <div className="itemlist">
                    {/* <Cartlist page={"checkout"} /> */}
                    {cartDetails ? (
                      cartDetails.length > 0 ? (
                        cartDetails.map((item, index) => {

                          // localStorage.setItem('LimitCount', JSON.stringify({ limitCount, limitbookedcount, counts }));
                          // console.log(item)
                          return (
                            <div className="FoodItem">
                              <div className="Food_Name_checkout">
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
                              {/* <div className="Ticket_qnt_btn_checkout">
                                <FaMinusCircle
                                  className="min_btn"
                                  // onClick={this.props.nonVegcartDecrement}
                                  onClick={() =>
                                    this.itemMinus(
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
                                </span>
                                <FaPlusCircle
                                  className="plus_btn"
                                  // onClick={this.props.nonVegcartIncrement}
                                  onClick={() =>
                                    item.limit ? limitCount["limitCount" + item.itemId] - limitbookedcount["limitbookedcount" + item.itemId]-cartcountdb["cartcountdb"+ item.ticket_id] > 0 ? (limitCount["limitCount" + item.itemId] - limitbookedcount["limitbookedcount" + item.itemId])-cartcountdb["cartcountdb"+ item.itemId] <= 0 ? 0 : this.itemPlus(item.itemId,
                                      item.itemPrice,
                                      item.itemName,
                                      item.itemFoodType

                                    ) : '' :
                                      this.itemPlus(
                                        item.itemId,
                                        item.itemPrice,
                                        item.itemName,
                                        item.itemFoodType
                                      )

                                  }
                                />
                              </div> */}
                            </div>
                          );
                        })
                      ) : (
                        history.push("/")
                      )
                    ) : (
                      <></>
                    )}

                    <div className="Gift-Coupon-div">
                      <span class="Gift-Coupon">Coupon Code</span>
                      <div className="Gift-Coupon-inner">
                        <input
                          class="Gift-Coupon-input"
                          type="text"
                          value={this.state.CouponCode}
                          onChange={(e) =>
                            this.setState({
                              CouponCode: e.target.value,
                              Price: cartList ? cartList.totalAmount : 0,
                            })
                          }
                        />
                        <div
                          onClick={() =>
                            applyCoupon(cartList ? cartList.totalAmount : 0)
                          }
                          className="Gift-Coupon-apply"
                        >
                          <span>Apply</span>
                        </div>
                      </div>
                    </div>
                    <div className="Subtotal-chechout">
                      <span>Subtotal</span>
                    </div>

                    <div className="Rate-div">
                      <span class="Rate">Rate</span>
                      <span>{cartList ? cartList.totalAmount : 0}</span>
                    </div>
                    <div className="Discount-div">
                      <span class="Discount">Discount</span>
                      <span>{this.state.discountPrice}</span>
                    </div>
                    <div className="checkout_cart_Line">
                      <span className="Line-123"></span>
                    </div>
                    <div className="Tax-and-Charges-div">
                      <span class="Tax-and-Charges">Tax-and-Charges </span>
                      <span>0</span>
                    </div>
                    <div className="checkout_cart_Line">
                      <span className="Line-123"></span>
                    </div>
                    <div className="ToPay-div">
                      <span class=" To-Pay"> To Pay </span>
                      <span>
                        ₹ {cartList ? cartList.totalAmount - discountPrice : 0}
                      </span>
                    </div>
                    <div style={{display:"flex",justifyContent:'center',alignItems:'center',padding:'0px 0px 20px 0px ',color:'white'}}>
                      <div>
                       Time Left - <span><Countdown date={new Date(JSON.parse(localStorage.getItem('cartendTime')))} renderer={renderer}></Countdown></span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
    // }
    // else{

    //   history.push('ticketmanager')
    // }
  }
}

// export default checkout;

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    cartValue: () => {
      dispatch({ type: "ticketSuccess", payload: "" });
    },
    discount: (val) => {
      // console.log(val);
      dispatch(
        discountCalculator({ type: "discountCalculator", payload: val })
      );
    },

    //     nonVegcartValue: () => {
    //       dispatch(cartIncrement("nonVegcartincrement"));
    //     },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(checkout);
