import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory,useParams } from "react-router-dom";
import { apibaseURL } from "../apiBaseURL";
import { createHashHistory } from "history";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

import "../Login.css";
const history = createHashHistory();

function Otpverify(props) {
  const History = useHistory();
  const testvalue  = useParams();

  const [number, setNumber] = useState("");
  const [userOtpNumber, setuserOtpNumber] = useState("");

  const [Email, setEmail] = useState("");
  const [OtpEmail, setOtpEmail] = useState("");

  const [Username, setUsername] = useState("");
  const [Newpassword, setNewpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");

  const [CorrectNumber, setCorrectNumber] = useState("");
  const [passShow, setpassShow] = useState(true);
  const [passShow1, setpassShow1] = useState(true);
  const [verificationUserId, setverificationUserId] = useState();

  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [loader4, setLoader4] = useState(false);

  const [phonenumberotp, setphonenumberotp] = useState(true);
  const [verificationNumber, setverificationNumber] = useState(false);
  const [emailotp, setemailotp] = useState(false);
  const [verificationemail, setverificationemail] = useState(false);
  const [signup, setsignup] = useState(false);

  const [routeTO, setrouteTO] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user_login_details")) {
      history.push("/");
    } else {
      if(props.location.state!==undefined){
        // console.log("path:router",props.location.state.BeforePageurl)
        setrouteTO(props.location.state.BeforePageurl)
      }
    }
  
  }, []);

  // Number OTP ***********************************************************************************
  const Numberotp = (e) => {
    if (e.key == "Enter" || e.type == "submit") {
      setLoader(true);
      // console.log(typeof number);
      // if (typeof(number)=="number") {
      setCorrectNumber("");
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      if (number.length == 10) {
        setCorrectNumber("");
        axios
          .post(apibaseURL + "/sendPhoneOTP/user", {
            phone: number,
          })
          .then((res) => {
            //
            if (res.data.status == "200") {
              // console.log(res.data.data.id);
              setCorrectNumber(" ");
              setverificationUserId(res.data.data.id);
              setphonenumberotp(false);
              setverificationNumber(true);
              setLoader(false);
            } else {
              setCorrectNumber(res.data.message);
              setLoader(false);
            }
          });
      } else {
        setCorrectNumber("Please Enter valid Number ");
        setLoader(false);
      }
    }
    e.preventDefault();
  };

  // EMAIL OTP ***********************************************************************************
  const Emailotp = (e) => {
    // console.log(e);

    if (e.key == "Enter" || e.type == "submit") {
      setLoader2(true);

      axios
        .post(apibaseURL + "/sendEmailOTP/user", {
          id: verificationUserId,
          email: Email,
        })
        .then((res) => {
          if (res.data.status == "200") {
            setCorrectNumber(" ");
            setemailotp(false);
            setverificationemail(true);
            setLoader2(false);
          } else {
            setCorrectNumber(res.data.message);
            setLoader2(false);
          }
        });
    }
    e.preventDefault();
  };

  //NUMBER OTP VERIFICATION ***********************************************************************************
  const otpverify = (e) => {
    if (e.key == "Enter" || e.type == "click") {
      setLoader1(true);
      if (userOtpNumber.length == 4) {
        setCorrectNumber("");
        axios
          .post(apibaseURL + "/phoneOTPverify/user", {
            id: verificationUserId,
            phone: number,
            otp: Number(userOtpNumber),
          })
          .then((res) => {
            if (res.data.status == "200") {
              setverificationNumber(false);
              setemailotp(true);
              setLoader1(false);
            } else {
              setCorrectNumber(res.data.message);
              setLoader1(false);
            }
          });
      } else {
        setCorrectNumber("Check for OTP");
        setLoader1(false);
      }
    }
  };

  //EMAIL OTP VERIFICATION ***********************************************************************************
  const emailotpverify = (e) => {
    // setLoader3(true);
    if (e.key == "Enter" || e.type == "submit") {
      setLoader1(true);
      if (OtpEmail.length == 4) {
        setCorrectNumber("");
        axios
          .post(apibaseURL + "/emailOTPverify/user", {
            id: verificationUserId,
            email: Email,
            otp: Number(OtpEmail),
          })
          .then((res) => {
            if (res.data.status == "200") {
              setCorrectNumber(" ");
              setLoader3(false);
              setverificationemail(false);
              setsignup(true);
            } else {
              setCorrectNumber(res.data.message);
              setLoader3(false);
            }
          });
      } else {
        setCorrectNumber("Check for OTP");
        setLoader1(false);
      }
    }
    e.preventDefault();
  };

  //RESEND Number OTP ***********************************************************************************
  const resendotpverify = (e) => {
    if (number.length == 10) {
      setCorrectNumber("");
      axios
        .post(apibaseURL + "/sendPhoneOTP/user", {
          phone: number,
        })
        .then((res) => {
          if (res.data.status == "200") {
            setCorrectNumber(" ");
            setphonenumberotp(false);
            setverificationNumber(true);
            setLoader(false);
          } else {
            setCorrectNumber(res.data.message);
            setLoader(false);
          }
        });
    }
  };
  const resendotpverifymail = (e) => {
    if (e.key == "Enter" || e.type == "click") {
      axios
        .post(apibaseURL + "/sendEmailOTP/user", {
          id: verificationUserId,
          email: Email,
        })
        .then((res) => {
          if (res.data.status == "200") {
            setCorrectNumber(" ");
            setemailotp(false);
            setverificationemail(true);
          } else {
            setCorrectNumber(res.data.message);
          }
        });
    }
  };
  // SING UP ************************************************************************************
  const Resister = (e) => {
    if (e.key == "Enter" || e.type == "submit") {
      setLoader4(true)
      // console.log(Newpassword.length);
      if (Newpassword.length >= 8) {
        if (Newpassword == Confirmpassword) {

          axios
          .post(apibaseURL + "/userRegister",   {
            id:verificationUserId,
            userName:Username,
            password :Newpassword
        })
          .then((res) => {
            //
            if (res.data.status == "200") {
              setCorrectNumber("");
              history.push(routeTO);
              setLoader4(false);
            } else {
              setCorrectNumber(res.data.message);
              setLoader4(false);
            }
          });

        
         
        } else {
          setCorrectNumber("Both passwords are not matching");
          
        }
      } else {
        setCorrectNumber("Password must be at least 8 characters");
        setLoader4(false)
      }
    }
    e.preventDefault();
  };
  const loginpage = (e) => {};

  return (
    <>
      <div className="login-body">
        {phonenumberotp ? (
          <form className="logincard" onSubmit={Numberotp}>
            <h2 id="title"> Create account</h2>
            <div className="create-account">
              <p className="msg">
                {" "}
                Already registered?&ensp;
                <Link to={routeTO}>
                  {" "}
                  <span>Log in</span>
                </Link>
              </p>
            </div>
            <p className="or">
              <span style={{ color: "red" }}>{CorrectNumber}</span>
            </p>

            <div id="email-login">
              <label for="Phone Number">
                {" "}
                <b>Phone Number</b>
              </label>
              <input
                id="phoneNUmberinput"
                value={number}
                // onKeyPress={Numberotp}
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                placeholder=" Enter Phone Number"
                name="UserpNumber"
                maxlength="10"
                required
              />
            </div>
            <button type="submit" className="cta-btn">
              {loader ? (
                <div className="spinner-border" role="status">
                  {" "}
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                " Send OTP"
              )}
            </button>
          </form>
        ) : (
          <></>
        )}

        {verificationNumber ? (
          <div class="logincard">
            <h2 id="title">Create account</h2>
            <p id="subtitle">
              We have sent an OTP to {number} <Link to="/login"></Link>
            </p>
            <p class="or">
              <span style={{ color: "red" }}>{CorrectNumber}</span>
            </p>
            <div id="email-login">
              <label for="Verify OTP">
                <b>Enter OTP or </b>
                <span onClick={resendotpverify}>
                  <span
                    style={{
                      color: "red",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Resend OTP
                  </span>
                </span>
              </label>
              <input
                id="phoneNUmberinput"
                type="text"
                value={userOtpNumber}
                placeholder="Enter OTP"
                name="user-otp"
                maxLength="4"
                onKeyPress={otpverify}
                onChange={(e) => setuserOtpNumber(e.target.value)}
                required
              />
            </div>

            <button className="cta-btn" onClick={otpverify}>
              {loader1 ? (
                <div className="spinner-border" role="status">
                  {" "}
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span style={{ color: "white", width: "100%" }}>or</span>
            </div>

            <div className="create-account">
              <p className="msg">
                {/* OTP not Recived?&ensp; */}
                <span
                  onClick={() => {
                    setphonenumberotp(true);
                    setverificationNumber(false);
                  }}
                >
                  Edit Phone Number
                </span>{" "}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}

        {emailotp ? (
          <form className="logincard" onSubmit={Emailotp}>
            <h2 id="title"> Create account</h2>
            <div className="create-account">
              <p className="msg">
                {" "}
                Already registered?&ensp;
                <Link to="/login">
                  {" "}
                  <span onClick={(e) => loginpage()}>Log in</span>
                </Link>
              </p>
            </div>
            <p className="or">
              <span style={{ color: "red" }}>{CorrectNumber}</span>
            </p>

            <div id="email-login">
              <label for="Phone Number">
                {" "}
                <b>Email id</b>
              </label>
              <input
                id="phoneNUmberinput"
                value={Email}
                // onKeyPress={Numberotp}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder=" Enter Email "
                name="UserpNumber"
                // maxlength="10"
                required
              />
            </div>
            <button type="submit" className="cta-btn">
              {loader2 ? (
                <div className="spinner-border" role="status">
                  {" "}
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                " Send OTP"
              )}
            </button>
          </form>
        ) : (
          <></>
        )}

        {verificationemail ? (
          <form onSubmit={emailotpverify} class="logincard">
            <h2 id="title">Create account</h2>
            <p id="subtitle">We have sent an OTP to {Email}</p>
            <p class="or">
              <span style={{ color: "red" }}>{CorrectNumber}</span>
            </p>
            <div id="email-login">
              <label for="Verify OTP">
                <b>Enter OTP or </b>
                <span onClick={resendotpverifymail}>
                  <span
                    style={{
                      color: "red",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Resend OTP
                  </span>
                </span>
              </label>
              <input
                id="phoneNUmberinput"
                type="text"
                value={OtpEmail}
                placeholder="Enter OTP"
                name="user-otp"
                maxLength="4"
                // onKeyPress={emailotpverify}
                onChange={(e) => setOtpEmail(e.target.value)}
                required
              />
            </div>
            <button className="cta-btn" type="submit">
              {loader3 ? (
                <div className="spinner-border" role="status">
                  {" "}
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span style={{ color: "white", width: "100%" }}>or</span>
            </div>
            <div className="create-account">
              <p className="msg">
                <span
                  onClick={() => {
                    setemailotp(true);
                    setverificationemail(false);
                  }}
                >
                  Edit Email id
                </span>{" "}
              </p>
            </div>
          </form>
        ) : (
          <></>
        )}

        {signup ? (
          <div class="logincard">
            <form onSubmit={Resister}>
              <h2 id="title">Create account</h2>
              <div className="create-account">
                <p className="msg">
                  {" "}
                  Already registered?&ensp;
                  <Link to={routeTO}>
                    {" "}
                    <span>Log in</span>
                  </Link>
                </p>
              </div>
              <p class="or">
                <span style={{ color: "red" }}>{CorrectNumber}</span>
              </p>
              <div id="email-login">
                <label for="Username">
                  {" "}
                  <b>Name</b>
                </label>
                <input
                  id="phoneNUmberinput"
                  value={Username}
                  placeholder=" Enter name"
                 
                  onChange={(e) =>{ setUsername(e.target.value); setLoader4(false);}}
                  name="Username"
                  required
                />
                <label for="Phone Number">
                  {" "}
                  <b>New Password</b>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="phoneNUmberinput"
                    type={passShow ? "password" : "text"}
                    placeholder=" Enter New Password"
                    name="UserPNumber"
                    minlength="8"
                    style={{ width: "100%" }}
          
                    onChange={(e) =>{ setNewpassword(e.target.value); setLoader4(false);}}
                    required
                  />
                  {passShow ? (
                    <BsFillEyeFill
                      className="pass-open-eye"
                      onClick={() => setpassShow(!passShow)}
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      className="pass-open-eye"
                      onClick={() => setpassShow(!passShow)}
                    />
                  )}
                </div>
                <label for="Phone Number">
                  {" "}
                  <b>Confirm Password</b>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="phoneNUmberinput"
                    type={passShow1 ? "password" : "text"}
                    placeholder=" Enter Confirm Password"
                    name="UserPNumber"
                    minlength="8"
                    style={{ width: "100%" }}
                   
                    onChange={(e) =>{ setConfirmpassword(e.target.value); setLoader4(false);}}
                    required
                  />
                  {passShow1 ? (
                    <BsFillEyeFill
                      className="pass-open-eye"
                      onClick={() => setpassShow1(!passShow1)}
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      className="pass-open-eye"
                      onClick={() => setpassShow1(!passShow1)}
                    />
                  )}
                </div>
              </div>
             
              <button className="cta-btn" type="submit">
              {loader4 ? (
                <div className="spinner-border" role="status">
                  {" "}
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Otpverify;
