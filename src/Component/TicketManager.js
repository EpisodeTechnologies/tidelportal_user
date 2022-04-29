import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import axios from "axios";
import { apibaseURL } from "../apiBaseURL";
import { BiFoodTag } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Countdown, { zeroPad } from "react-countdown";
import { createHashHistory } from "history";
import redeemed from './../img/redeemed.png';
import { GoPrimitiveDot } from "react-icons/go";
import { IoTriangle } from "react-icons/io5";
import { HiSortDescending } from "react-icons/hi";
import $, { map } from 'jquery';
import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import { Carousel } from 'react-responsive-carousel';
import TicketDetails from "./TicketDetails";

import io from "socket.io-client"
import moment from 'moment'
import { FALSE } from "sass";
// const socket = io.connect("http://localhost:3003")





const history = createHashHistory()


function TicketManager() {
  const [userticketDetails, setuserticketDetails] = useState([]);
  const [ticketDetails, setticketDetails] = useState([]);
  // 
  const [todaydisplay, settodaydisplay] = useState("");
  const [redeemdisplay, setredeemdisplay] = useState("");
  const [activedisplay, setactivedisplay] = useState("");
  const [expireddisplay, setexpireddisplay] = useState("");

  const [allcolor, setallcolor] = useState("#4095fb");
  const [todaycolor, settodaycolor] = useState("");
  const [redeemcolor, setredeemcolor] = useState("");
  const [activecolor, setactivecolor] = useState("");
  const [expiredcolor, setexpiredcolor] = useState("");
  const [show, setshow] = useState(false);
  const [detailsPopUPData, setdetailsPopUPData] = useState('');
  const [slideImages, setslideImages] = useState([]);

  const [finalData, setfinalData] = useState([]);

  const [filter1var, setfilter1var] = useState('all');
  const [filter2var, setfilter2var] = useState('all');

  const [reverse, setreverse] = useState(false);
  const [detailspage, setdetailspage] = useState(false);






  const dispatch = useDispatch();

  useEffect(() => {
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


    if (localStorage.getItem("user_login_details")) {
      var localvar = JSON.parse(localStorage.getItem("user_login_details"));
      var token = localStorage.getItem("token");
      // console.log(token)
      // /tickets/getAllBookingsByUser/15
      if (localvar) {
        axios
          .get(apibaseURL + "/tickets/getAllBookingsByUser/" + localvar.Id, { headers: { authorization: token } })
          .then((res) => {
            if (res.data.status == "200") {
              if (res.data.data.length > 0) {
                setuserticketDetails(res.data.data);
                setticketDetails(res.data.data.sort(function (a, b) {
                  return (b.id - a.id);

                }))
                // console.log("TicketManager", res.data.data.length)
                setfinalData(res.data.data)
              }
            }
            else {
              // history.push("");
            }
          });
      } else {
        setuserticketDetails("");
      }


      const intervalId = setInterval(() => {
        if (localvar) {
          var token = localStorage.getItem("token");
          // console.log(token)
          axios.get(apibaseURL + "/tickets/getAllBookingsByUser/" + localvar.Id, { headers: { authorization: token } })
            .then((res) => {
              //  if(res.data.length)
              if (res.data.status == "200") {
              if (res.data.data.length > 0) {
                setuserticketDetails(res.data.data);
                // console.log("TicketManager", res.data.data.length)
                // filterTicketfirst()
              } else {
                // history.push("");
              }
            }
              // dispatch({ type: "ticketSuccess", payload: "" });
            });
        } else {
          setuserticketDetails("");
        }
      }, 5000)
      return () => clearInterval(intervalId); //This is important



    } else {
      history.push("/login");
    }
  }, []);

  // useEffect(()=>{
  //   socket.on("receive_message", (data)=>{
  //     console.log(data);
  //   });
  // },[socket])

  const ticketAll = () => {
    // setredeemdisplay("");
    // setactivedisplay("");
    setallcolor("#4095fb");
    setredeemcolor("");
    setactivecolor("");
    // setexpireddisplay("");
    setexpiredcolor("");
    settodaycolor("");
    // settodaydisplay("")
  };
  const ticketActive = () => {
    // setredeemdisplay("none");
    // setactivedisplay("");
    setallcolor("");
    setredeemcolor("");
    setactivecolor("#4095fb");
    // setexpireddisplay("none")
    setexpiredcolor("");
    settodaycolor("");
    // settodaydisplay("none")
  };
  const ticketToaday = () => {
    // setredeemdisplay("none");
    // setactivedisplay("");
    setallcolor("");
    setredeemcolor("");
    settodaycolor("#4095fb");
    // settodaydisplay("")
    setactivecolor("");
    // setexpireddisplay("none")
    setexpiredcolor("");

    // today
  };
  const ticketRedeem = () => {
    // setredeemdisplay("");
    // setactivedisplay("none");
    setallcolor("");
    setredeemcolor("#4095fb");
    setactivecolor("");
    // setexpireddisplay("none")
    setexpiredcolor("");
    settodaycolor("");
    // settodaydisplay("none")
  };
  const ticketExpired = () => {
    // setredeemdisplay("none");
    // setactivedisplay("none");
    setallcolor("");
    setredeemcolor("");
    setactivecolor("");
    // setexpireddisplay("")
    setexpiredcolor("#4095fb");
    settodaycolor("");
    // settodaydisplay("none")
  };

  // console.log(new Date());
  const filterTicketfirst = (var1, var2) => {

    setuserticketDetails()
    let FinalData = []
    let filter1var = var1;
    let filter2var = var2;
    console.log("filter1var-->", filter1var)
    console.log("filter2var-->", filter2var)

    if (ticketDetails) {

      ticketDetails.map((data) => {
        if (filter1var == "all") {
          // all
          if (filter2var == "all") {
            FinalData.push(data)
          }
          // snacks
          if (filter2var == "snacks") {
            if (data.redeem_validity == "Meal Time") {
              if (data.meal_time == "Evening Snacks") {
                FinalData.push(data)
              }
              if (data.meal_time == "Morning Snacks") {
                FinalData.push(data)
              }
            }
          }
          // meals
          if (filter2var == "meals") {
            if (data.redeem_validity == "Meal Time") {
              if (data.meal_time != "Evening Snacks" && data.meal_time != "Morning Snacks") {
                FinalData.push(data)
              }
            }
          }
          // special
          if (filter2var == "special") {
            if (data.redeem_validity != "Meal Time") {
              FinalData.push(data)
            }
          }
        }
        if (filter1var == "today") {
          if (data.booking_status == "active") {
            if (new Date(data.booking_time).getDate() == new Date().getDate()) {
              // all
              if (filter2var == "all") {
                FinalData.push(data)
              }
              // snacks
              if (filter2var == "snacks") {
                if (data.redeem_validity == "Meal Time") {
                  if (data.meal_time == "Evening Snacks") {
                    FinalData.push(data)
                  }
                  if (data.meal_time == "Morning Snacks") {
                    FinalData.push(data)
                  }
                }
              }
              // meals
              if (filter2var == "meals") {
                if (data.redeem_validity == "Meal Time") {
                  if (data.meal_time != "Evening Snacks" && data.meal_time != "Morning Snacks") {
                    FinalData.push(data)
                  }
                }
              }
              // special
              if (filter2var == "special") {
                if (data.redeem_validity != "Meal Time") {
                  FinalData.push(data)
                }
              }
            }
          }
        }
        if (filter1var == "active") {
          if (data.booking_status == "active") {
            // all
            if (filter2var == "all") {
              FinalData.push(data)
            }
            // snacks
            if (filter2var == "snacks") {
              if (data.redeem_validity == "Meal Time") {
                if (data.meal_time == "Evening Snacks") {
                  FinalData.push(data)
                }
                if (data.meal_time == "Morning Snacks") {
                  FinalData.push(data)
                }
              }
            }
            // meals
            if (filter2var == "meals") {
              if (data.redeem_validity == "Meal Time") {
                if (data.meal_time != "Evening Snacks" && data.meal_time != "Morning Snacks") {
                  FinalData.push(data)
                }
              }
            }
            // special
            if (filter2var == "special") {
              if (data.redeem_validity != "Meal Time") {
                FinalData.push(data)
              }
            }
          }
        }

        if (filter1var == "redeem") {
          // all
          if (data.booking_status == "redeemed") {

            if (filter2var == "all") {
              FinalData.push(data)
            }
            // snacks
            if (filter2var == "snacks") {
              if (data.redeem_validity == "Meal Time") {
                if (data.meal_time == "Evening Snacks") {
                  FinalData.push(data)
                }
                if (data.meal_time == "Morning Snacks") {
                  FinalData.push(data)
                }
              }
            }
            // meals
            if (filter2var == "meals") {
              if (data.redeem_validity == "Meal Time") {
                if (data.meal_time != "Evening Snacks" && data.meal_time != "Morning Snacks") {
                  FinalData.push(data)
                }
              }
            }
            // special
            if (filter2var == "special") {
              if (data.redeem_validity != "Meal Time") {
                FinalData.push(data)
              }
            }
          }
        }
        if (filter1var == "expired") {

          if (data.booking_status == "expired") {
            // all
            if (filter2var == "all") {
              FinalData.push(data)
            }
            // snacks
            if (filter2var == "snacks") {
              if (data.redeem_validity == "Meal Time") {
                if (data.meal_time == "Evening Snacks") {
                  FinalData.push(data)
                }
                if (data.meal_time == "Morning Snacks") {
                  FinalData.push(data)
                }
              }
            }
            // meals
            if (filter2var == "meals") {
              if (data.redeem_validity == "Meal Time") {
                if (data.meal_time != "Evening Snacks" && data.meal_time != "Morning Snacks") {
                  FinalData.push(data)
                }
              }
            }
            // special
            if (filter2var == "special") {
              if (data.redeem_validity != "Meal Time") {
                FinalData.push(data)
              }
            }
          }
        }
      })
    }
    setfinalData(FinalData);

  }

  console.log("finalData--->", finalData)

  let finalData1 = finalData;
  const reverseOrder = (e) => {
    finalData1.reverse();
    setreverse(reverse + 1);
  }


  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // return <span>Ticket Expired</span>
      // window.location.reload(true)
      return (<div className="expiry-ticket-img">
        <img src={'https://www.onlygfx.com/wp-content/uploads/2020/05/expired-stamp-5.png'} height="180" />
      </div>)
    } else {
      // return <><span>{days > 0 ? zeroPad(days) +' : ':''}{zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}</span><br/>
      //       </> 

      return <div className="counter-body">
        <div className="counter-sec1" ><span className="count-number">{zeroPad(days)}</span><span className="count-string">Days</span></div> <span className="colan">:</span>
        <div className="counter-sec1" ><span className="count-number">{zeroPad(hours)}</span><span className="count-string">Hours</span></div><span className="colan">:</span>
        <div className="counter-sec1" ><span className="count-number">{zeroPad(minutes)}</span><span className="count-string">Minutes</span></div><span className="colan">:</span>
        <div className="counter-sec1" ><span className="count-number">{zeroPad(seconds)}</span><span className="count-string">Seconds</span></div>

      </div>
    }
  };
  const backtoBookingPage = () => {
    setshow(false)
  }

  return (
    <>
      <SideNav />
      <div className="main_body">
        <div className="Rectangle_ticket_container">
          <div className="ticket_manager_nav">
            <ul>
              <li style={{ color: allcolor }} onClick={() => { ticketAll(); setfilter1var('all'); filterTicketfirst('all', filter2var) }}>
                All
              </li>
              <li style={{ color: todaycolor }} onClick={() => { ticketToaday(); setfilter1var('today'); filterTicketfirst('today', filter2var) }}>
                Today
              </li>
              <li style={{ color: activecolor }} onClick={() => { ticketActive(); setfilter1var('active'); filterTicketfirst('active', filter2var) }}>
                Active{" "}
              </li>
              <li style={{ color: redeemcolor }} onClick={() => { ticketRedeem(); setfilter1var('redeem'); filterTicketfirst('redeem', filter2var) }}>
                Redeemed
              </li>
              <li style={{ color: expiredcolor }} onClick={() => { ticketExpired(); setfilter1var('expired'); filterTicketfirst('expired', filter2var) }}>
                Expired
              </li>
            </ul>
          </div>
          <div className="Rectangle_ticket_body">
            <div className="Rectangle_ticket_list">

              <div className="show_tk_filter">
                <div className="show_ticket_filter_body" >
                  <div className="show_filter_all active filter" onClick={() => { setfilter2var('all'); filterTicketfirst(filter1var, 'all') }}>All</div>
                  <div className="show_filter_snacks  filter" onClick={() => { setfilter2var('snacks'); filterTicketfirst(filter1var, 'snacks') }}>SNACKS</div>
                  <div className="show_filter_meals filter" onClick={() => { setfilter2var('meals'); filterTicketfirst(filter1var, 'meals') }}>MEALS</div>
                  <div className="show_filter_special filter" onClick={() => { setfilter2var('special'); filterTicketfirst(filter1var, 'special') }}>SPECIAL</div>
                  <HiSortDescending className="show_filter_icon" onClick={() => reverseOrder()} />

                </div>
              </div>
              {finalData1 ? (

                finalData1.map((data) => {
                  console.log('FinalData->>', data.id)

                  if (data.booking_status == "redeemed") {
                    var createdate = moment(data.create_at).format("MMM DD-YYYY ");
                    var createTime = moment(data.create_at).format("hh:mm a");
                    var createdateTime = createdate + "at " + createTime;
                    var redeemstartdate = moment(data.redeem_start).format("MMM DD-YYYY ");
                    var redeemstartTime = moment(data.redeem_start).format("hh:mm a");
                    var redeemstartdateTime = redeemstartdate + "at " + redeemstartTime;
                    var redeemenddate = moment(data.redeem_end).format("MMM DD-YYYY ");
                    var redeemendTime = moment(data.redeem_end).format("hh:mm a");
                    var redeemenddateTime = redeemenddate + "at " + redeemendTime;
                    return (
                      <>
                        <div className="Rectangle_ticket_Details" style={{ display: redeemdisplay }}>
                          <a href={`https://pannaiyarbiriyani.com/user/demo/img/userprofile/${data.qr_image}`}> <img
                            src={`https://pannaiyarbiriyani.com/user/demo/img/userprofile/${data.qr_image}`}
                            width="150"
                            height="150"
                          /></a>
                          <div className="ticket_number">
                            {data.item_type == "veg" ? (
                              <GoPrimitiveDot className="food-symbol-veg-ticket" />
                            ) : (
                              <IoTriangle className="food-symbol-nonveg-ticket" />
                            )}
                            <span>{data.booking_id}</span>
                          </div>
                          <h2>{data.ticket_name}</h2>
                          {/* <h2>{data.item_name}</h2> */}
                          <p id="VeiwDetails_tk" onClick={() => {
                            var x = window.matchMedia("(max-width: 971px)");
                            if (x.matches) {
                              setshow(true); setslideImages(JSON.parse(data.image)); setdetailsPopUPData(data); setdetailspage(true)
                            } else {
                              setshow(true); setslideImages(JSON.parse(data.image)); setdetailsPopUPData(data); setdetailspage(false)

                            }

                          }}

                          >Veiw Details</p>

                          {/* <p>{createdateTime}</p> */}
                          {/* <h4>{data.Branch_name}</h4> */}
                          <h4>Food Court Tidel Park</h4>

                          <h1>OTP - {data.booking_otp}</h1>
                          <h1>Redeem</h1>
                          <p> Start - {redeemstartdateTime}</p>
                          <p> End - {redeemenddateTime}</p>

                          <p style={{ color: '#ffffff', backgroundColor: data.item_type == "veg" ? '#007a08' : 'red', padding: '5px 8px', display: 'inline-block' }}>{data.meal_time ? data.meal_time.toUpperCase() : 'Special'.toUpperCase()}</p>
                          <p >{" "}</p><br />
                          <b></b>
                          <p>Redeemed on</p>
                          <p>{data.redeemed_time}</p>

                          <div className="redeem-ticket-img">
                            <img src={redeemed} height="100" />
                          </div>
                        </div>
                      </>
                    );
                  }
                  if (data.booking_status == "active") {
                    var createdate = moment(data.create_at).format("MMM DD-YYYY ");
                    var createTime = moment(data.create_at).format("hh:mm a");
                    var createdateTime = createdate + "at " + createTime;
                    var redeemstartdate = moment(data.redeem_start).format("MMM DD-YYYY ");
                    var redeemstartTime = moment(data.redeem_start).format("hh:mm a");
                    var redeemstartdateTime = redeemstartdate + "at " + redeemstartTime;
                    var redeemenddate = moment(data.redeem_end).format("MMM DD-YYYY ");
                    var redeemendTime = moment(data.redeem_end).format("hh:mm a");
                    var redeemenddateTime = redeemenddate + "at " + redeemendTime;
                    return (
                      <>
                        <div className="Rectangle_ticket_Details" style={{ display: activedisplay }}>
                          <a href={`https://pannaiyarbiriyani.com/user/demo/img/userprofile/${data.qr_image}`}> <img
                            src={`https://pannaiyarbiriyani.com/user/demo/img/userprofile/${data.qr_image}`}
                            width="150"
                            height="150"
                          /></a>
                          <div className="ticket_number">
                            {data.item_type == "veg" ? (
                              <GoPrimitiveDot className="food-symbol-veg-ticket" />
                            ) : (
                              <IoTriangle className="food-symbol-nonveg-ticket" />
                            )}
                            <span>{data.booking_id}</span>
                          </div>
                          <h2>{data.ticket_name}</h2>
                          {/* <h2>{data.item_name}</h2> */}
                          <p id="VeiwDetails_tk"onClick={() => {
                            var x = window.matchMedia("(max-width: 971px)");
                            if (x.matches) {
                              setshow(true); setslideImages(JSON.parse(data.image)); setdetailsPopUPData(data); setdetailspage(true)
                            } else {
                              setshow(true); setslideImages(JSON.parse(data.image)); setdetailsPopUPData(data); setdetailspage(false)

                            }

                          }}>Veiw Details</p>

                          {/* <p>{createdateTime}</p> */}
                          {/* <h4>{data.Branch_name}</h4> */}
                          <h4>Food Court Tidel Park</h4>

                          <h1>OTP - {data.booking_otp}</h1>
                          <h1>Redeem</h1>
                          <p> Start - {redeemstartdateTime}</p>
                          <p> End - {redeemenddateTime}</p>

                          <p style={{ color: '#ffffff', backgroundColor: data.item_type == "veg" ? '#007a08' : 'red', padding: '5px 8px', display: 'inline-block' }}>{data.meal_time ? data.meal_time.toUpperCase() : 'Special'.toUpperCase()}</p>
                          <p >{" "}</p><br />
                          <p>Expiring by</p>
                          {data.redeem_end ? new Date(data.redeem_end).getTime() >= Date.now() ?
                            <b style={{ color: 'rgb(198, 53, 30)' }}>
                              <Countdown date={new Date(data.redeem_end)} renderer={renderer}></Countdown>
                            </b> :
                            <p>{new Date(data.redeem_end).toLocaleString()}</p> :
                            <></>
                          }

                          {new Date(data.redeem_end).getTime() <= Date.now() ?
                            <div className="expiry-ticket-img">
                              <img src={'https://www.onlygfx.com/wp-content/uploads/2020/05/expired-stamp-5.png'} height="180" />
                            </div> : <></>}
                        </div>
                      </>
                    )
                  }
                  if (data.booking_status == "expired") {
                    var createdate = moment(data.create_at).format("MMM DD-YYYY ");
                    var createTime = moment(data.create_at).format("hh:mm a");
                    var createdateTime = createdate + "at " + createTime;
                    var redeemstartdate = moment(data.redeem_start).format("MMM DD-YYYY ");
                    var redeemstartTime = moment(data.redeem_start).format("hh:mm a");
                    var redeemstartdateTime = redeemstartdate + "at " + redeemstartTime;
                    var redeemenddate = moment(data.redeem_end).format("MMM DD-YYYY ");
                    var redeemendTime = moment(data.redeem_end).format("hh:mm a");
                    var redeemenddateTime = redeemenddate + "at " + redeemendTime;
                    return (
                      <>
                        <div className="Rectangle_ticket_Details" style={{ display: expireddisplay }}>
                          <a href={`https://pannaiyarbiriyani.com/user/demo/img/userprofile/${data.qr_image}`}> <img
                            src={`https://pannaiyarbiriyani.com/user/demo/img/userprofile/${data.qr_image}`}
                            width="150"
                            height="150"
                          /></a>
                          <div className="ticket_number">
                            {data.item_type == "veg" ? (
                              <GoPrimitiveDot className="food-symbol-veg-ticket" />
                            ) : (
                              <IoTriangle className="food-symbol-nonveg-ticket" />
                            )}
                            <span>{data.booking_id}</span>
                          </div>
                          <h2>{data.ticket_name}</h2>
                          {/* <h2>{data.item_name}</h2> */}
                          <p id="VeiwDetails_tk" onClick={() => {
                            var x = window.matchMedia("(max-width: 971px)");
                            if (x.matches) {
                              setshow(true); setslideImages(JSON.parse(data.image)); setdetailsPopUPData(data); setdetailspage(true)
                            } else {
                              setshow(true); setslideImages(JSON.parse(data.image)); setdetailsPopUPData(data); setdetailspage(false)

                            }

                          }}>Veiw Details</p>

                          {/* <p>{createdateTime}</p> */}
                          {/* <h4>{data.Branch_name}</h4> */}
                          <h4>Food Court Tidel Park</h4>

                          <h1>OTP - {data.booking_otp}</h1>
                          <h1>Redeem</h1>
                          <p> Start - {redeemstartdateTime}</p>
                          <p> End - {redeemenddateTime}</p>

                          <p style={{ color: '#ffffff', backgroundColor: data.item_type == "veg" ? '#007a08' : 'red', padding: '5px 8px', display: 'inline-block' }}>{data.meal_time ? data.meal_time.toUpperCase() : 'Special'.toUpperCase()}</p>
                          <p >{" "}</p><br /> <p>Expiring by</p>
                          {data.expired_time ? new Date(data.expired_time).getTime() >= Date.now() ?
                            <b style={{ color: 'rgb(198, 53, 30)' }}>
                              <Countdown date={new Date(data.expired_time)} renderer={renderer}></Countdown>
                            </b> :
                            <p>{new Date(data.expired_time).toLocaleString()}</p> :
                            <></>
                          }

                          {new Date(data.expired_time).getTime() <= Date.now() ?
                            <div className="expiry-ticket-img">
                              <img src={'https://www.onlygfx.com/wp-content/uploads/2020/05/expired-stamp-5.png'} height="180" />
                            </div> : <></>}
                        </div>
                      </>
                    )
                  }

                }
                ))

                :

                (<div></div>)}
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={() => setshow(false)}
          dialogClassName="modal-90w"
          id="modal-dialog"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Modal.Header>
            <div></div>
            <IoClose
              className="close-icon"
              onClick={() => setshow(false)}
            />
          </Modal.Header>
          <Modal.Body>


            <TicketDetails item={detailsPopUPData ? detailsPopUPData : ''} page={"ticket"} back={detailspage} backtoBookingPage={backtoBookingPage} />



          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default TicketManager;
