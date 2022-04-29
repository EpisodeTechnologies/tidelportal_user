import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Testimonial from "./Testimonial";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import "./About.scss";
import "./termsAndConditions.scss";

function TermsAndConditions() {
  const stars = 5;
  return (
    <>
      <SideNav />
      <div className="main_body">
        <div className="about-container">
          <div className="terms-and-conditions">
            <h3 className="header"  style={{textAlign:"center"}}>TERMS & CONDITIONS</h3>
            <h4 className="title">
              These terms must be accepted by you when you use Just Kitchen website
              or Application:
            </h4>
            <h5 className="sub-title">
              1) You must not accept these terms if:
            </h5>
            <p className="description">
              You are not lawfully entitled to use Just Kitchen website or App in
              the country in which you are located or reside If you are not of
              legal age to bind agreement with us
            </p>
            <h5 className="sub-title">
              2) If any change made to Terms & Conditions:
            </h5>
            <p className="description">
              Just Kitchen team can modify Terms & conditions at any time, in sole
              discretion. If Just Kitchen team will be modifying any content, team
              will let you know either by site or through app. It's a major
              factor that you do agree to modified Terms & conditions. If you
              don't agree to be bound by the modified Terms, then you can't use
              the services any more. Over Srvices are evolving over time we can
              change or close any services at any time without any notice, at
              our sole discretion.
            </p>
            <h5 className="sub-title">3) Privacy :</h5>
            <p className="description">
              Your privacy is very important to us. We will assure you that your
              any private data will not be disclosed anywhere at any cost. If
              you have any questions or concerns about terms and conditions,
              please contact us at support@Just Kitchen.com
            </p>
            <h5 className="sub-title">legal Activity</h5>
            <p className="description">
              Do not use Just Kitchen to promote any illegal activities.
            </p>
            <h5 className="sub-title">Harmful Activities</h5>
            <p className="description">
              Do not distribute content that harms or interferes with the
              operation of the networks,Servers, or other infrastructure of
              Just Kitchen.
            </p>
            <h5 className="sub-title">Hacking Personal Information</h5>
            <p className="description">
              Do not access other user’s account without their permission. Do
              not disturb other people’s personal information like email Id,
              passwords, play store or app store credentials without their
              permission.
            </p>
            <h4 className="title">Refund Policy:</h4>
            <h5 className="sub-title">1) For Restaurant Owner:</h5>
            <p className="description">
              IN case of payment did by mistake or in case of any payment
              related issues from Google Play Store or App Store, we are not
              entitled to refund any amount. If it’s very crucial and any
              genuine problem is seen in our system than we can look into it and
              resolve the issue or issue refund.
            </p>
            <h5 className="sub-title">2) For Customer of Restaurant:</h5>
            <p className="description">
              IN case of payment did by mistake or in case of any payment
              related issues for food ordered with Just Kitchen, we are not entitled
              to refund any amount. Restaurant Owner will be responsible for
              issue refund to customer for placed order in any case.
            </p>
            <h5 className="sub-title">Order Approval:</h5>
            <p className="description">
              Just Kitchen is not responsible for any kind of order cancelation or
              approval. Delivery time, Taxes, Delivery Charges and Delivery
              times are decided by the restaurant owner. Restaurant owners are
              only responsible for any kind of updates and changes of extra
              charges. Just Kitchen is not taking any kind of taxes or extra charges
              from the customers.
            </p>
            <h5 className="sub-title">
              Communication Problems between Customer and Restaurant:
            </h5>
            <p className="description">
              In case of misbehaviour, miscommunication or any illegal
              activities done by customer and restaurant registered here, we
              will not be responsible for any such activities as we are not
              taking any proof of their identity.
            </p>
            <h5 className="sub-title">Blocking or Deleting your Account</h5>
            <p className="description">
              If we notice any illegal activity then we have all rights to
              permanently Block your account without any notice and reasons.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions;
