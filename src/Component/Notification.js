import React, { useState, useEffect ,Component,useRef} from "react";
import { NavLink, Link ,useHistory} from "react-router-dom";

import axios from "axios";
import { apibaseURL } from "../apiBaseURL";
import "./Notification.scss";
import SideNav from "./SideNav";
import moment from "moment";
import { MdRedeem } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import  io from "socket.io-client"

import {

  Overlay,Tooltip

} from "react-bootstrap";

function Notification()  {


    const [notification, setnotification] = useState([]);
    const [notificationcount, setnotificationcount] = useState(0);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const History = useHistory();

    // const socket = io.connect("http://localhost:3000")


    useEffect(() => {

      if (localStorage.getItem("user_login_details")) {
        var localvar = JSON.parse(localStorage.getItem("user_login_details"));
        axios.get(apibaseURL + "/user-Notification/" + localvar.Id).then((res) => {
          // console.log("get notification", res);
          let count = 0;
          if (res.data.length > 0) {

            // console.log(res.data)
            
            res.data.map((notifi, id) => {
            //   if (notifi.status == 0) {
                count = count + 1;
                setnotificationcount(count);
            //   }
            });
            setnotification(res.data);
          }
        });
        const intervalId = setInterval(() => {
        axios.get(apibaseURL + "/user-Notification/" + localvar.Id).then((res) => {
          // console.log("get notification", res);
          let count = 0;
          if (res.data.length > 0) {
           res.data.map((notifi, id) => {
            //   if (notifi.status == 0) {
                count = count + 1;
            //    }
            });
            setnotificationcount(count);
            setnotification(res.data);
          }
        });
    
        }, 1000)
        return () => clearInterval(intervalId); //This is important
      }else{
        History.push("/login")
      }
      }, []);


      const dismiss = (e) => {
        axios.post(apibaseURL + "/dismiss-Notification",{"id":e}).then((res) => {
          // console.log(res)
          // if(notificationcount==1){
          //   setnotificationcount(0);
          // }
      
        });
      };
      function copycoupon(e) {
        // console.log("fffgfgfg")
        toast("COUPON CODE COPED", {
          position:"bottom-center",
          reverseOrder:true,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    
  return (
    <>
     <ToastContainer />
      <SideNav />
      <div className="main_body">
        <div className="notification-body">
          <div className="notification-container">
            <div className="notification-container-head">
              <h1 className="notification-container-head-left">Notifications</h1>
              <div className="notification-container-head-right"></div>
            </div>
            <div>
           <div className="Earlier-body">
        <div className="Earlier">Earlier</div>
       {/* <Link to="/notifications"> <div className="seeall">See all</div></Link> */}
      </div>
   
      <div className="notifi-content-body1">
      {notification.map((notifi, id) => {
        // if (notifi.status == 0) {

            var date = moment(notifi.date).format("MMM DD-YYYY ");
            var Time = moment(notifi.date).format("hh:mm a");
            var dateTime = date + "at " + Time;

            var str =notifi.message;
            var lastIndex = str.lastIndexOf(" ");
            var myArray = str.split(" ");
               
            str = str.substring(0, lastIndex);
            // console.log(str)
            // console.log( myArray[myArray.length-1])
           return (
            <> <div className="notifi-container">
                <div className="img-body">
                  {notifi.Notification_type=="purchased"?
                   <Link to="/ticketmanager" style={{color:"black"}}><img src="https://img.icons8.com/ios/344/ticket-confirmed.png"
                   height={40}
                  /></Link>:notifi.Notification_type=="expired"?
                  <Link to="/ticketmanager" style={{color:"black"}}> <img src=" https://img.icons8.com/ios-filled/344/expired.png"
                   height={40}
                  /></Link>:notifi.Notification_type=="redeemed"?
                  // <img
                  //   src="https://cdn-icons.flaticon.com/png/512/4361/premium/4361142.png?token=exp=1647943267~hmac=281b611618d93af710658f0518fef068"
                  //   // width={80}
                  //   height={40}
                  // /> 
                  <Link to="/ticketmanager" style={{color:"black"}}><MdRedeem style={{fontSize:"40px",height:"40px"}}/></Link>
                :  <img
                src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/344/external-coupon-cyber-monday-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
                // width={80}
                height={40}
              />}
                 {notifi.Notification_type == "coupon" ? (
                     <div className="message">
                     <span>{dateTime}</span>
                     <span>{str} 
                     
                       
                 
                     <CopyToClipboard text={myArray[myArray.length-1]}>
                     <span className="copy-coupon " style={{color:"blue"}}  onClick={() => copycoupon()}> {myArray[myArray.length-1]}  </span>      
                     </CopyToClipboard>
                    
                    
                    
                     </span>
                  </div>
                    ) :
                 <Link to="/ticketmanager" style={{color:"black"}}><div className="message">
                    <span>{dateTime}</span>
                    <span> {notifi.message}</span>
                  </div>
                  </Link>}
                </div>
                <div className="dismiss-btn">
                  {/* <button className="Dismiss-button" onClick={()=>dismiss(notifi.id)}>Delete</button> */}
                </div>
              </div>
             
            </>
          );
        // } 

       
      })}
      { notificationcount == 0?<div className="no-notification">You have no notifications</div>:<div></div>}
</div>
    
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
