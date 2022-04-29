import React, { useState, useEffect } from "react";
import "../Login.css";
import axios from "axios";

import { apibaseURL } from "../apiBaseURL";
import { Link, useHistory } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useParams, useLocation } from "react-router-dom";

function ChangePassword() {
  const [Oldpassword, setOldpassword] = useState("");
  const [Newpassword, setNewpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [userid, setUserid] = useState();
  const [CorrectNumber, setCorrectNumber] = useState("");
  const [passShow, setpassShow] = useState(true);
  const [passShow0, setpassShow0] = useState(true);
  const [passShow1, setpassShow1] = useState(true);
  const [verificationUserId, setverificationUserId] = useState();
  const [routeTO, setrouteTO] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const History = useHistory();
  const location = useLocation();

  useEffect(() => {

if(localStorage.getItem("user_login_details")){
    var localvar = JSON.parse(localStorage.getItem("user_login_details"));
    setUserid(localvar.Id )
}else{
    History.push("/login")
}


  }, []);

  const changepass = (e) => {
    if (e.key == "Enter" || e.type == "submit") {
      setLoader4(true);
      // console.log(Newpassword.length);
      if (Newpassword.length >= 8 && Oldpassword.length >= 8) {
        if (Newpassword == Confirmpassword) {
          if (Newpassword != Oldpassword) {
            axios
              .post(apibaseURL + "/changePassword", {
                id:userid,
                oldPassword:Oldpassword,
                newPassword:Newpassword
            })
              .then((res) => {
                if (res.data.status == "200") {
                  setCorrectNumber("");
                  History.push("/");
                  setLoader4(false);
                } else {
                  setCorrectNumber(res.data.message);
                  setLoader4(false);
                }
              });
          } else {
            setCorrectNumber("Try different password");
            setLoader4(false);
          }
        } else {
          setCorrectNumber("Both passwords are not matching");
          setLoader4(false);
        }
      } else {
        setCorrectNumber("Password must be at least 8 characters");
        setLoader4(false);
      }
    }
    e.preventDefault();
  };

  return (
    <>
      <div className="login-body">
        <div class="logincard">
          <form onSubmit={changepass}>
            <h2 id="title">Change Password</h2>
            <div className="create-account"></div>
            <p class="or">
              <span style={{ color: "red" }}>{CorrectNumber}</span>
            </p>
            <div id="email-login">
              <label for="Phone Number">
                {" "}
                <b>Old Password</b>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="phoneNUmberinput"
                  type={passShow0 ? "password" : "text"}
                  placeholder=" Enter Old Password"
                  name="UserPNumber"
                  minlength="8"
                  style={{ width: "100%" }}
                  onChange={(e) => setOldpassword(e.target.value)}
                  required
                />
                {passShow0 ? (
                  <BsFillEyeFill
                    className="pass-open-eye"
                    onClick={() => setpassShow0(!passShow0)}
                  />
                ) : (
                  <BsFillEyeSlashFill
                    className="pass-open-eye"
                    onClick={() => setpassShow0(!passShow0)}
                  />
                )}
              </div>
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
                  onChange={(e) => setNewpassword(e.target.value)}
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
                  onChange={(e) => setConfirmpassword(e.target.value)}
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
                "save"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
