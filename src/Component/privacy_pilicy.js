import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Testimonial from "./Testimonial";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import "./About.scss";
import "./termsAndConditions.scss";

import  io from "socket.io-client"
// const socket = io.connect("http://localhost:3003");
// socket.emit("receive_message", {id:1});


function PrivacyPolicy() {
  // const [room, setRoom] = useState(98);

  // Messages States
  // const [message, setMessage] = useState("bala");
  // const sendMessage = () => {
  //   socket.emit("send_message", { message, room });
  // };

  const stars = 5;
  return (
    <>
      {/* <SideNav /> */}
      <div className="main_body">
        <div className="about-container">
          <div className="terms-and-conditions">
            <h3 className="header" style={{textAlign:"center"}} >PRIVACY POLICY</h3>
            <h4 className="title">Personal Information We Collect:</h4>

            <p className="description">
              We collects several types of information regarding our Guest User
              and Register Users: We collects personally identifiable
              information from our users. The personal information collected by
              us mainly consists of Contact Details (i.e. Email Address, Contact
              Number), Personal Details (i.e. User Name), Billing Details (i.e.
              Physical Billing address, Payment Method, Transaction Details),
              User Preferences (i.e. Preferences of order method, Time-zone,
              Language), User Comments (i.e. Feedback, Complain). We collect
              information so that you can place order, request information and
              support and make product suggestions.
            </p>
            <p className="description">
              Our website and mobile application use forms to collects
              information. We receive and store your information you enter on
              our website or mobile applications, five us any other way like
              email, telephone or other communications with our customer service
              team. If you contact us for support, we will keep an internal
              records for that also.
            </p>
            <h4 className="title">How We Use the Information We Collects:</h4>
            <p className="description">
              We used to communicate with you through emails, messages or call.
              We use emails to confirm orders placed by you or to send
              information requested by you. We are also providing email links to
              contact us directly. We are eager to reply you for your message.
              The information which you have send to us may be reviewed,
              discarded or used. These information may be used to improve our
              Website, Application, Product and Services.
            </p>
            <p className="description">
              We used to communicate with you through emails, messages or call.
              We use emails to confirm orders placed by you or to send
              information requested by you. We are also providing email links to
              contact us directly. We are eager to reply you for your message.
              The information which you have send to us may be reviewed,
              discarded or used. These information may be used to improve our
              Website, Application, Product and Services.
            </p>
            <p className="description">
              To process your order we may send your information to credit
              reference and fraud prevention agencies.
            </p>

            <h4 className="title">Cookies: </h4>
            <p className="description">A cookie is a piece of data stored on a site visitor’s hard drive to help us improve your access to our site and identify repeat visitors to our site. Cookies can also help customize the site for visitors. Personal information cannot be collected via cookies and other tracking technology, however, if you previously provided personally identifiable information, cookies may be tied to such information. We are not storing any cookies to browser by code, its browsers feature to store cookies by clicking on save password. </p>
            <h4 className="title">Security: </h4>
            <p className="description"> We believe the security of your information is a serious issue and we are committed to protecting the information we receive from you. We take precautions to protect your information. We use security measures to protect against the loss, misuse or alteration of the information under our control. When you submit sensitive information via website or application, your information is protected both online and offline. Whenever you enter sensitive information on our forms, the information is encrypted using MD5 and transmitted to us in a secure way. While we use encryption to protect your sensitive information transmitted online, we also protect your information offline. The computers/servers in which we store personally identifiable information are kept in a secure environment. We will retain personal information only as long as our business needs require. We will then destroy or render unreadable any such information upon disposal. However, we do not guarantee that unauthorized access will never occur. Users who have registered to the site agree to keep their password in strict confidence and not disclose such password to any third party.</p>
    
           
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
