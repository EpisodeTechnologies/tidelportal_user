import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import axios from "axios";
import "./Profile.css";

import { Link } from "react-router-dom";
import { createHashHistory } from "history";
const history = createHashHistory();

function Profile() {
  const [Number, setNumber] = useState("Phone Number");
  const [User_Name, setUser_Name] = useState("Name");
  const [User_Email, setUser_Email] = useState("Email");
  const [User_Gender, setUser_Gender] = useState("Gender");
  const [User_DOB, setUser_DOB] = useState("Date of Birth");
  const [User_Marital_Status, setUser_Marital_Status] =
    useState("Marital Status");
  const [User_Special_Day, setUser_Special_Day] = useState("Special day");
  const [User_Address, setUser_Address] = useState("Address");
  // const[Profileimage,setProfileimage]=useState('')
  const [Profileimage, setProfileimage] = useState(null);
  const [newProfileimage, setnewProfileimage] = useState(null);
  const [User_Company_Name, setUser_Company_Name] = useState("");
  const [User_Company_Id, setUser_Company_Id] = useState("");
  
  //   const [OtpNumber, setOtpNumber] = useState("");
  //   const [userOtpNumber, setuserOtpNumber] = useState("");
  //   const [CorrectNumber, setCorrectNumber] = useState("");

  useEffect(() => {
   
if(localStorage.getItem("user_login_details")){
  var localvar = JSON.parse(localStorage.getItem("user_login_details"));
    setnewProfileimage("img/userprofile/default.png");
    // console.log(localvar);
    if (localvar) {
      setNumber(localvar.User_Phonenumber);
      setUser_Name(localvar.User_Name);
      setUser_Gender(localvar.User_Gender);
      setUser_Gender(localvar.User_Gender);
      setUser_DOB(localvar.User_DOB);
      setUser_Marital_Status(localvar.User_Marital_Status);
      setUser_Special_Day(localvar.User_Special_Day);
      setUser_Address(localvar.User_Address);
      setUser_Email(localvar.User_Email);
      setProfileimage(localvar.User_Profile_Image);
      setUser_Company_Name(localvar.User_Company_Name)
      setUser_Company_Id(localvar.User_Company_Id)
      if (localvar.User_Profile_Image !== "null") {
        setnewProfileimage(`https://pannaiyarbiriyani.com/user/demo/img/userprofile/${localvar.User_Profile_Image}`);
      }

      if (localvar.User_Profile_Image==="" || localvar.User_Profile_Image===null) {
        setnewProfileimage("img/userprofile/default.png");

      }
    } else {
    }
  }else{
    history.push("/");
  }
  }, []);

  return (
    <>
      <SideNav />
      <div className="main_body">
        <div className="profile_body">
          <div class="profile_container">
            <div class="row " style={{paddingTop:"20px",paddingBottom:"20px"}}>
              <div class="col-sm-12 col-lg-3">
                <div className="profile_image_container">
                  <img
                    className="profile_image_square"
                    // src={Profileimage}
                    src={
                      Profileimage === '' || Profileimage === null
                        ? newProfileimage
                        : `https://pannaiyarbiriyani.com/user/demo/img/userprofile/${Profileimage}`
                    }
                  />

              <div className="row">
                            <div className="col-12">
                              <Link to="/editprofile">
                                {" "}
                                <button className="Union-5">Edit Profile</button>
                              </Link>
                            </div>
                          </div>
                </div>
              </div>
              <div class="col-sm-12 col-lg-9  pc-profile-page">
                <div className="row">
                  <div className="col-sm-12 col-lg-6">
                    <div className="form_input_field">
                                  
                  <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control" type="text" placeholder="Name"  value={User_Name} readOnly/>
                          <span>User Name</span>
                      </label>
                    </div>
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control" type="text"  placeholder="Phone Number" value={Number} readOnly/>
                          <span>User Phone Number</span>
                      </label>
                    </div>
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control" type="text" placeholder="Gender"    value={User_Gender} readOnly/>
                          <span>Gender</span>
                      </label>
                    </div>
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control"   type="date" placeholder="Date of Birth"  value={User_DOB} pattern="\d{4}-\d{2}-\d{2}" readOnly/>
                          <span>Date Of Birth</span>
                      </label>
                    </div>
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control"   type="text" placeholder="Company Name"   
                           value={User_Company_Name} 
                           readOnly/>
                          <span>Company Name</span>
                      </label>
                    </div><div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control"   type="text" placeholder="Company Id"   
                           value={User_Company_Id} 
                           readOnly/>
                          <span>Company Id</span>
                      </label>
                    </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <div className="form_input_field">
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control" type="text"  placeholder="Email"  value={User_Email} readOnly/>
                          <span>User Email Id</span>
                      </label>
                    </div>
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control" type="text"  placeholder="Marital Status" value={User_Marital_Status} readOnly/>
                          <span>Marital Status</span>
                      </label>
                    </div>
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <input class="form-control" type="text"  placeholder="Anniversary day/ Special day" value={User_Special_Day} readOnly/>
                          <span>Anniversary day / Special day</span>
                      </label>
                    </div>
                   
                    
                    <div class="form-group input-group" style={{marginTop:"20px"}}>
                    {/*<span class="input-group-addon">@</span> */}
                      <label class="has-float-label" style={{width:"100%"}}>
                          <textarea class="form-control"  rows={6} cols={50}  type="text" placeholder="Address"   value={User_Address} readOnly/>
                          <span>Address</span>
                      </label>
                    </div>
                      
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-12">
                <Link to="/editprofile">
                  {" "}
                  <button className="Union-5">Edit Profile</button>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
