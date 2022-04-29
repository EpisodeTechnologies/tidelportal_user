import React, { useState, useEffect } from "react";
import "../Login.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { createHashHistory } from "history";
import { apibaseURL } from "../apiBaseURL";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
const history = createHashHistory();

function Login(props) {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [CorrectNumber, setCorrectNumber] = useState("");
  const [CorrectNumber1, setCorrectNumber1] = useState("");


  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);

  const [login, setLogin] = useState(true);
  const [ForgotpasswordEmailid, setForgotpasswordEmailid] = useState('');
  const [loginForgot, setloginForgot] = useState(true);
  const [passShow, setpassShow] = useState(true);

  const [passShow1, setpassShow1] = useState(true);

  const History = useHistory();

  useEffect(() => {

    // console.log(window.location.origin)
    if (localStorage.getItem("user_login_details")) {
      history.push("/");
    } else {
      if (props.location.state !== undefined) {
        // console.log("path:router", props.location.state.forgotPass)
        if (props.location.state.forgotPass) {
          setLogin(false)
          setloginForgot(false)
        }
      }
    }

    // var localvar = JSON.parse(localStorage.getItem("user_login_details"));
  });
  const FPemailsend = (e) => {
    // console.log(e);

    if (e.key == "Enter" || e.type == "submit") {
      setLoader1(true);

      axios.post(apibaseURL + "/forgotPassword", {
        email: ForgotpasswordEmailid,
        baseUrl: window.location.origin
      })
        .then((res) => {
          // console.log(res);
          if (res.data.status == "200") {
            setCorrectNumber1(res.data.message)
            setCorrectNumber("")
            setLoader1(false);
            // History.push("/");
          } else {
            setCorrectNumber(res.data.message)
            setCorrectNumber1("")
            setLoader1(false);
          }
        });
    }
    e.preventDefault();
  };
  const Login = (e) => {

    if (e.key == "Enter" || e.type == "submit") {
      setLoader(true);
      axios
        .post(apibaseURL + "/userLogin", {
          email: email,
          password: password
        })
        .then((res) => {
          // console.log(res);
          if (res.data.status == "200") {

            // console.log(res.data.data)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_login_details", JSON.stringify(res.data.data));
            setLoader(false);
            // History.push("/");
          } else {
            setCorrectNumber(res.data.message)
            setLoader(false);
          }


        });

    } else {
      setLoader(false);
    }
    e.preventDefault();
  };
  const loginpage = (e) => {
    setLogin(true);

  };
  const createaccount = (e) => {


  };

  const Resetpassword = (e) => {
    setLogin(!login);
  };
  return (
    <>
      <div className="login-body">
        {login ? (
          <form className="logincard" onSubmit={Login}>
            <h2 id="title"> Log in</h2>

            <div className="create-account">
              <p className="msg">
                Not registered?&ensp;
                <Link to={{ pathname: "/createaccount", state: { BeforePageurl: "/login" } }}><span >Create an account</span></Link>
              </p>
            </div>
            <p className="or">
              <span style={{ color: "red" }}>{CorrectNumber}</span>
            </p>

            <div id="email-login">
              <label for="Phone Number">
                <b>User Name</b>
              </label>
              <input
                id="phoneNUmberinput"
                value={email}
                // onKeyPress={Login}
                onChange={(e) => { setemail(e.target.value); setLoader(false) }}
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
                  type={passShow ? "password" : "text"}
                  placeholder=" Enter New Password"
                  name="UserPNumber"
                  minlength="8"
                  style={{ width: "100%" }}
                  onChange={(e) => { setpassword(e.target.value); setLoader(false) }}
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
            </div>

            <button type="submit" class="cta-btn">
              {loader ? (
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Log in"
              )}
            </button>

            <div className="create-account">
              <p class="forgot-pass" onClick={(e) => Resetpassword()}>
                Forgot Your Password?{" "}
              </p>
            </div>
          </form>
        ) : (
          <form className="logincard" onSubmit={FPemailsend}>
            <h2 id="title"> Reset password</h2>
            <div className="create-account">
              <p className="msg">
                Already registered?&ensp;{loginForgot ?
                  <span onClick={(e) => setLogin(!login)}>Log in</span> : <Link to="/checkout"><span>Log in</span></Link>}
              </p>
            </div>
            <p className="or">
              <span style={{ color: CorrectNumber1 == "" ? "red" : "white" }}>{CorrectNumber1 == "" ? CorrectNumber : CorrectNumber1}</span>
            </p>


            <div id="email-login">
              <label for="Phone Number">
                {" "}
                <b>Email id</b>
              </label>

              <input
                id="phoneNUmberinput"
                value={ForgotpasswordEmailid}
                // onKeyPress={Numberotp}
                onChange={(e) => setForgotpasswordEmailid(e.target.value)}
                type="email"
                placeholder=" Enter Email id"
                name="UserpNumber"
                required
              />
            </div>
            <button type="submit" className="cta-btn" >
              {loader1 ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                " Reset "
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Login;
