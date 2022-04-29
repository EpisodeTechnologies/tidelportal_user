import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { RiMenu5Line } from "react-icons/ri";
import reactDom from "react-dom";
import axios from "axios";
import { apibaseURL } from "../apiBaseURL";
import moment from "moment";
import {
  Popover,
  OverlayTrigger,
  Button,
  ButtonToolbar,
} from "react-bootstrap";
import { MdRedeem } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import io from "socket.io-client"

// Navigate

function SideNav(props) {
  const [marginLeft, setmarginLeft] = useState("-250");
  const [profilename, setprofilename] = useState();
  const [newProfileimage, setnewProfileimage] = useState(null);
  const [notification, setnotification] = useState([]);
  const [notificationcount, setnotificationcount] = useState(0);
  const [userID, setuserID] = useState(0);
  const [popshow, setpopshow] = useState(false);
  const [popshow1, setpopshow1] = useState(false);
  const [cart, setcart] = useState(false);



  // console.log(props)
  const History = useHistory();
  // const [ToggleNavButton,setToggleNavButton]=useState();
  var Profileimage =
    "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic-300x300.jpg";

  // const socket = io.connect("http://localhost:3003");

  // const socket = io.connect("http://localhost:3003");
  // socket.emit("receive_message", { id: 1 });
  //  console.log("hi")

  useEffect(() => {

    setnewProfileimage("img/userprofile/default.png");
    if (localStorage.getItem("user_login_details")) {



      var localvar = JSON.parse(localStorage.getItem("user_login_details"));
      setnewProfileimage("img/userprofile/default.png");
      if (localvar) {
        setprofilename(localvar);
        setuserID(localvar.Id);
        if (localvar.User_Profile_Image !== null) {
          setnewProfileimage(
            `https://pannaiyarbiriyani.com/user/demo/img/userprofile/${localvar.User_Profile_Image}`
          );
        }
        if (localvar.User_Profile_Image === "" || localvar.User_Profile_Image === null) {
          setnewProfileimage("img/userprofile/default.png");
        }
      } // console.log(localvar);

      var x = window.matchMedia("(max-width: 971px)");
      // console.log(x.matches)
      if (x.matches) {
        setmarginLeft("-250px");
      } else {
        setmarginLeft("0px");
      }
      axios
        .get(apibaseURL + "/user-Notification/" + localvar.Id)
        .then((res) => {
          // console.log("get notification", res);
          let count = 0;
          if (res.data.length > 0) {
            res.data.map((notifi, id) => {
              if (notifi.status == 0) {
                count = count + 1;
                setnotificationcount(count);
              }
            });
            setnotification(res.data);
          }
        });

      // const intervalId = setInterval(() => {
      //   axios
      //     .get(apibaseURL + "/user-Notification/" + localvar.Id)
      //     .then((res) => {
      //       // console.log("get notification", res);
      //       let count = 0;
      //       if (res.data.length > 0) {
      //         res.data.map((notifi, id) => {
      //           if (notifi.status == 0) {
      //             count = count + 1;
      //           }
      //         });
      //         setnotificationcount(count);
      //         setnotification(res.data);
      //       } else {

      //       }
      //       // axios
      //       // .post(apibaseURL + "/ticketmanager/api", {
      //       //   User_Id: localvar.Id,
      //       // })
      //       // .then((res) => {
      //       //  });
      //     });
      // }, 2000);
      // return () => clearInterval(intervalId); //This is important
    }
  }, [props.renderTimes]);

  // useEffect(() => {
  //   socket.on("notification", (data) => {
  //     console.log(data)
  //   })
  // }, []);


  setInterval(function () {
    if (localStorage.getItem("cartendTime")) {
      let count = JSON.parse(localStorage.getItem("cartendTime"))
      if (count <= new Date().getTime()) {
        cartremove();
      }
    }

    if (localStorage.getItem("tcreatet")) {
      let tcount = JSON.parse(localStorage.getItem("tcreatet"))
      if (tcount <= new Date().getTime()) {
        removelocalall();
      }
      // console.log(new Date(tcount))
    }
  }, 1000);

  const cartremove = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartList");
    localStorage.removeItem("discountPrice");
    localStorage.removeItem('cartendTime');
    localStorage.removeItem("checkoutpage");
    localStorage.removeItem("selectedDate");
    window.location.reload()
  }
  const removelocalall = () => {
    localStorage.clear();
    window.location.reload()
  }
  const Logout = () => {
    localStorage.clear();
    History.push("/");
    window.location.reload(true);
  };

  const profilePage = () => {
    History.push("/profile");
  };

  const loginPage = () => {
    History.push("/login");
  };

  const dismiss = (e) => {
    axios.post(apibaseURL + "/dismiss-Notification", { id: e }).then((res) => {
      // console.log(notificationcount);
      if (res.status == 200) {
        var x = window.matchMedia("(max-width: 800px)");

        if (x.matches) {
          // If media query matches
          setpopshow1(!popshow1)
        } else {
          setpopshow(!popshow)
        }
        // setnotificationcount(0)
      }

    });
  };
  function copycoupon(e) {
    var x = window.matchMedia("(max-width: 800px)");

    if (x.matches) {
      // If media query matches
      setpopshow1(!popshow1)
    } else {
      setpopshow(!popshow)
    }

    // console.log("fffgfgfg")
    toast("COUPON CODE COPED", {
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
  const showpop = () => {

    var x = window.matchMedia("(max-width: 800px)");
    // console.log(x.matches)
    if (x.matches) {
      // If media query matches
      setpopshow1(!popshow1)
    } else {
      setpopshow(!popshow)
    }

    // console.log("working popshow")
  }

  const navigate = () => {
    History.push("/notifications");
  }
  // if(notificationcount==1){
  const popoverBottom = (
    <Popover id="popover-positioned-bottom" title="Popover bottom">

      <div className="popover-title">
        <div className="notification-head">
          <span className="notification">Notifications</span>
          <AiOutlineClose className="close-icon-notify" onClick={showpop} />
        </div>

      </div>

      <div className="Earlier-body">
        <div className="Earlier">Earlier</div>
        {/* <Link to="/notifications"> */}
        {" "}
        <div className="seeall" onClick={() => { dismiss(userID, setnotificationcount(0)) }}>Clear all</div>
        {/* </Link> */}
      </div>
      {/* {console.log(notification)} */}
      <div className="notifi-content-body">
        {notification.map((notifi, id) => {
          var date = moment(notifi.date).format("MMM DD-YYYY ");
          var Time = moment(notifi.date).format("hh:mm a");
          var dateTime = date + "at " + Time;
          if (notifi.status == 0) {
            var str = notifi.message;
            var lastIndex = str.lastIndexOf(" ");
            return (

              <>  {notifi.Notification_type != "coupon" ?
                <Link to="/ticketmanager"> <div className="notifi-container">
                  <div className="img-body">
                    {notifi.Notification_type == "purchased" ? (
                      <img
                        src="https://img.icons8.com/ios/344/ticket-confirmed.png"
                        height={40}
                      />
                    ) : notifi.Notification_type == "expired" ? (
                      <img
                        src=" https://img.icons8.com/ios-filled/344/expired.png"
                        height={40}
                      />
                    ) : notifi.Notification_type == "redeemed" ? (
                      // <img
                      //   src="https://cdn-icons.flaticon.com/png/512/4361/premium/4361142.png?token=exp=1647943267~hmac=281b611618d93af710658f0518fef068"
                      //   // width={80}
                      //   height={40}
                      // />
                      <MdRedeem style={{ fontSize: "40px", height: "40px" }} />
                    ) : (
                      <img
                        src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/344/external-coupon-cyber-monday-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
                        // width={80}
                        height={40}
                      />
                    )}
                    {notifi.Notification_type == "purchased" ? (
                      <div className="message" >
                        <span>{dateTime}</span>
                        <span> {notifi.message}</span>
                      </div>
                    ) : notifi.Notification_type == "expired" ? (
                      <div className="message">
                        <span>{dateTime}</span>
                        <span> {notifi.message}</span>
                      </div>
                    ) : notifi.Notification_type == "redeemed" ? (
                      <div className="message">
                        <span>{dateTime}</span>
                        <span> {notifi.message}</span>
                      </div>
                    ) : (
                      <div className="message">
                        <span>{dateTime}</span>
                        <span> {notifi.message}</span>
                      </div>
                    )}

                  </div>

                </div></Link> : <div className="notifi-container">
                  <CopyToClipboard text={notifi.coupon_code}>
                    <div className="img-body">
                      {notifi.Notification_type == "purchased" ? (
                        <img
                          src="https://img.icons8.com/ios/344/ticket-confirmed.png"
                          height={40}
                        />
                      ) : notifi.Notification_type == "expired" ? (
                        <img
                          src=" https://img.icons8.com/ios-filled/344/expired.png"
                          height={40}
                        />
                      ) : notifi.Notification_type == "redeemed" ? (

                        <MdRedeem style={{ fontSize: "40px", height: "40px" }} />
                      ) : (
                        <img
                          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/344/external-coupon-cyber-monday-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
                          // width={80}
                          height={40}
                        />
                      )}
                      {notifi.Notification_type == "purchased" ? (
                        <div className="message" >
                          <span>{dateTime}</span>
                          <span> {notifi.message}</span>
                        </div>
                      ) : notifi.Notification_type == "expired" ? (
                        <div className="message">
                          <span>{dateTime}</span>
                          <span> {notifi.message}</span>
                        </div>
                      ) : notifi.Notification_type == "redeemed" ? (
                        <div className="message">
                          <span>{dateTime}</span>
                          <span> {notifi.message}</span>
                        </div>
                      ) : (

                        <div className="message">
                          <span>{dateTime}</span>
                          <span> {notifi.message.substring(0, lastIndex)} <span className="copy-coupon " style={{ color: "blue" }} onClick={() => copycoupon()}> {notifi.coupon_code}  </span>  </span>


                        </div>


                      )}

                    </div>

                  </CopyToClipboard> </div>}
              </>
            );
          }
        })}
        {notificationcount == 0 ? (
          <div className="no-notification">You have no new notifications </div>
        ) : (
          <div></div>
        )}
      </div>
    </Popover>
  );
  // }
  return (
    <>
      <ToastContainer />
      <div className="main">
        <div className="Side-nav" style={{ marginLeft: marginLeft }}>
          <i
            class="fas fa-times"
            id="sidebarbnt"
            onClick={() => setmarginLeft("-250px")}
          ></i>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "250px",
            }}
          >
            {profilename ? (
              <Link to="/profile">
                <div>
                  <img className="profile_square" src={newProfileimage} />
                </div>
              </Link>
            ) : (
              <div>
                <img className="profile_square" src={newProfileimage} />
              </div>
            )}

            <span class="Login">
              {profilename ? (
                profilename.User_Name
              ) : (
                <Link to="/login">Login</Link>
              )}
            </span>
            <span className="option_menu"> SELECT</span>
          </div>
          <div>
            <div className="nav_list">
              <ul>
                <NavLink to="/" exact activeClassName="active_nav">
                  {" "}
                  <li>
                    {" "}
                    <NavLink to="/" exact activeStyle={{ color: "#c6351e" }}>
                      {" "}
                      <i class="fas fa-ticket-alt"></i>Buy Ticket{" "}
                    </NavLink>
                  </li>
                </NavLink>

                <NavLink to="/ticketmanager" exact activeClassName="active_nav">
                  {" "}
                  <li>
                    <NavLink
                      to="/ticketmanager"
                      exact
                      activeStyle={{ color: "#c6351e " }}
                    >
                      {" "}
                      <i class="fas fa-home"></i>  Ticket Manager
                    </NavLink>
                  </li>
                </NavLink>
                <NavLink to="/about" exact activeClassName="active_nav">
                  {" "}
                  <li>
                    <NavLink
                      to="/about"
                      exact
                      activeStyle={{ color: "#c6351e " }}
                    >
                      <i class="fas fa-info-circle"></i>About Us
                    </NavLink>
                  </li>
                </NavLink>
                <NavLink
                  to="/customerService"
                  exact
                  activeClassName="active_nav"
                >
                  {" "}
                  <li>
                    <NavLink
                      to="/customerService"
                      exact
                      activeStyle={{ color: "#c6351e " }}
                    >
                      <i class="fas fa-phone-alt"></i>Customer Service
                    </NavLink>
                  </li>
                </NavLink>

                <NavLink
                  to="/notifications"
                  exact
                  activeClassName="active_nav"
                >
                  {" "}
                  <li>
                    <NavLink
                      to="/notifications"
                      exact
                      activeStyle={{ color: "#c6351e " }}
                    >
                      <i class="fas fa-bell" style={{ cursor: "pointer" }}></i>Notifications
                    </NavLink>
                  </li>
                </NavLink>

                <li className="mob-social-media">
                  <a href="https://www.facebook.com/Pannaiyar/" target="_blank">
                    {" "}
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.instagram.com/getpannaiyarbiriyani/"
                    target="_blank"
                  >
                    {" "}
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCJQdxFpSqgApewVJYZgAyVg"
                    target="_blank"
                  >
                    <FaYoutube />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="main_body_nav ">
          <div className="nav_body normal-nav">
            <div className="body_left">
              <a href="https://www.facebook.com/Pannaiyar/" target="_blank">
                {" "}
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/getpannaiyarbiriyani/"
                target="_blank"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCJQdxFpSqgApewVJYZgAyVg"
                target="_blank"
              >
                {" "}
                <i class="fab fa-youtube"></i>
              </a>
              {/* <div className="serchbar">
                <a>
                  <div className="search_icon">
                    <i class="fas fa-search" style={{ color: "white" }}></i>
                  </div>{" "}
                </a>
                <input type="text" placeholder="Type here to search" />
              </div> */}
            </div>
            <div className="body_right">
              <ButtonToolbar>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popoverBottom}
                  show={popshow}
                >
                  <div>
                    <i class="fas fa-bell" style={{ cursor: "pointer" }} onClick={notificationcount > 0 ? showpop : navigate}></i>
                    {notificationcount > 0 ? (
                      <span className="notification-count">
                        {notificationcount}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </OverlayTrigger>
              </ButtonToolbar>

              <ul class="nav navbar-nav ms-auto">
                <li class="nav-item dropdown">
                  <a href="#" class="nav-link " data-bs-toggle="dropdown" onClick={() => {
                    var x = window.matchMedia("(max-width: 971px)");
                    if (x.matches) {
                      setmarginLeft("-250px");
                    } else {
                      setmarginLeft("0px");
                      setpopshow(false)
                    }
                  }}>
                    <i class="fas fa-cog "></i>
                  </a>
                  {profilename ? (
                    <div class="dropdown-menu dropdown-menu-end">
                      <div
                        class="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={profilePage}
                      >
                        {/* <Link to="" style={{color:'black'}}> */}
                        Profile
                        {/* </Link> */}
                      </div>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item" onClick={Logout}>
                        Logout
                      </a>
                      <div class="dropdown-divider"></div>
                      <Link to="/change-password" class="dropdown-item" >
                        Change Password
                      </Link>
                    </div>
                  ) : (
                    <div class="dropdown-menu dropdown-menu-end">
                      <div
                        class="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={loginPage}
                      >
                        {/* <Link to="/login" style={{color:'black'}}> */}
                        Login
                        {/* </Link> */}
                      </div>
                    </div>
                  )}
                </li>
              </ul>
              <div className="logo_box">
                <a href="https://pannaiyarbiriyani.com/">
                  {" "}
                  <i className="PB_logo"> </i>
                </a>
              </div>
            </div>
          </div>

          {/* mobile responsive */}
          <div className="nav_body responsive-nav">
            <div className="body_left">
              <RiMenu5Line
                className="menu_bar_icon"
                onClick={() => { setmarginLeft("0px"); setpopshow1(false) }}
                id="sidebar-btn"
              />
              {/* <div>&#160;&#160;</div> */}
            </div>

            <div className="body_right">
              <div className="logo_box">
                <a href="https://pannaiyarbiriyani.com/">
                  {" "}
                  <i className="PB_logo"> </i>
                </a>
              </div>
              <ul class="nav navbar-nav ms-auto">
                <li class="nav-item dropdown">
                  <a href="#" class="nav-link " data-bs-toggle="dropdown"
                    onClick={() => {
                      var x = window.matchMedia("(max-width: 971px)");
                      if (x.matches) {
                        setmarginLeft("-250px");
                        setpopshow1(false)
                      } else {
                        setmarginLeft("0px");

                      }
                    }}>
                    <i class="fas fa-cog "></i>
                  </a>
                  {profilename ? (
                    <div class="dropdown-menu dropdown-menu-end">
                      <div
                        class="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={profilePage}
                      >
                        Profile
                      </div>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item" onClick={Logout}>
                        Logout
                      </a>
                      <div class="dropdown-divider"></div>
                      <Link to="/change-password" class="dropdown-item" >
                        Change Password
                      </Link>
                    </div>
                  ) : (
                    <div class="dropdown-menu dropdown-menu-end">
                      <div
                        class="dropdown-item"
                        onClick={loginPage}
                        style={{ cursor: "pointer" }}
                      >
                        {/* <Link to="/login" style={{color:'black'}}> */}
                        Login
                        {/* </Link> */}
                      </div>
                    </div>
                  )}
                </li>
              </ul>

              <ButtonToolbar>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popoverBottom}
                  show={popshow1}
                >
                  <div>
                    <i class="fas fa-bell" style={{ cursor: "pointer" }} onClick={() => {
                      notificationcount > 0 ? showpop() : navigate();
                      var x = window.matchMedia("(max-width: 971px)");
                      if (x.matches) {
                        setmarginLeft("-250px");

                      } else {
                        setmarginLeft("0px");

                      }
                    }}></i>
                    {notificationcount > 0 ? (
                      <span className="notification-count">
                        {notificationcount}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </OverlayTrigger>
              </ButtonToolbar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
