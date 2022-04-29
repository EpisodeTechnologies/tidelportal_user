import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import { apibaseURL } from "../apiBaseURL";
import axios from "axios";

function CustomerService() {
  const [Number, setNumber] = useState(" ");
  const [User_Name, setUser_Name] = useState("");
  const [User_Email, setUser_Email] = useState("");
  const [User_Message, setUser_Message] = useState("");

  var style = {
    backgroundColor: "#2a2a30",
    height: "auto",
    marginTop: "150px",
    borderRadius: "10px",
  };
  var style1 = {};
  function formValue(e) {
    // console.log(Number);
    // console.log(User_Name);
    // console.log(User_Email);
    // console.log(User_Message);
    axios
      .post(apibaseURL + "/sendmail", {
        phone: Number,
        name: User_Name,
        email: User_Email,
        message: User_Message,
      })
      .then((res) => {
      
        if(res.data.code==200){
          setNumber(' ');
          setUser_Name('');
          setUser_Email('');
          setUser_Message('');
        }
      });
  }

  return (
    <>
      <SideNav />
      <div className="main_body">
        <div class="row ticket_margin_contact">
         
            <form
              className="col-sm-12 col-md-12 col-lg-5 contact_form"
              style={style}
              onSubmit={formValue}
            >
              <div className="mb-3 px-4 bg-transparent">
                <label
                  for="fname"
                  className="form-label"
                  style={{ color: "#fff", fontSize: "23px" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control bg-transparent shadow-none"
                  id="fname"
                  placeholder="Enter Name"
                  style={{
                    border: "0",
                    borderBottom: "1px solid #fff",
                    color: "#fff",
                  }}
                  value={User_Name}
                  onChange={(e) => setUser_Name(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 px-4 bg-transparent">
                <label
                  for="emailId"
                  className="form-label"
                  style={{ color: "#fff", fontSize: "23px" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent shadow-none"
                  id="emailId"
                  placeholder="name@example.com"
                  style={{
                    border: "0",
                    borderBottom: "1px solid #fff",
                    color: "#fff",
                  }}
                  value={User_Email}
                  onChange={(e) => setUser_Email(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 px-4 bg-transparent ">
                <label
                  for="phNo"
                  className="form-label"
                  style={{ color: "#fff", fontSize: "23px" }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control bg-transparent shadow-none   "
                  id="phNo"
                  value={Number}
                  placeholder="Enter Phone Number"

                  onChange={(e) => setNumber(e.target.value)}
                  style={{
                    border: "0",
                    borderBottom: "1px solid #fff",
                    color: "#fff",
                  }}
                  required
                />
              </div>
              <div className="mb-3 px-4 bg-transparent ">
                <label
                  for="message"
                  className="form-label"
                  style={{ color: "#fff", fontSize: "23px" }}
                >
                  What would you like to say?
                </label>
                <textarea
                  className="form-control bg-transparent shadow-none px-3"
                  id="message"
                  rows="3"
                  style={{
                    border: "0",
                    borderBottom: "1px solid #fff",
                    color: "#fff",
                  }}
                  // placeholder="Enter Message"
                  value={User_Message}
                  onChange={(e) => setUser_Message(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  style={{
                    margin: "30px 10px",
                    padding: "15px 47px 14px 48px",
                    backgroundColor: "rgb(198, 53, 30)",
                    borderRadius: "30px",
                    border: "none",
                  }}
                >
                  Send Now
                </button>
              </div>
            </form>
         
          <div
            className="col-sm-12	col-md-12	col-lg-7 row location_section "
            style={style1}
          >
            <div className="col-sm-12	col-md-12	col-lg-6 border-start1 text-center">
              <div className="mt-5">
              <a href="mailto:pannaiyarbiriyani@gmail.com">  <i
                  className="fas fa-envelope border p-3"
                  style={{
                    color: "rgb(198, 53, 30)",
                    fontSize: "20px",
                    borderRadius: "50px",
                  }}
                ></i></a>
                <h5
                  className="pt-2"
                  style={{ color: "#fff", fontSize: "20px" }}
                >
                 pannaiyarbiriyani@gmail.com
                </h5>
              </div>
              <div className="mt-5">
              <a href="tel:9894856956">  <i
                  className="fas fa-phone-alt border p-3"
                  style={{
                    color: "rgb(198, 53, 30)",
                    fontSize: "20px",
                    borderRadius: "50px",
                  }}
                ></i></a>
                <h5
                  className="pt-2"
                  style={{ color: "#fff", fontSize: "20px" }}
                >
                  +91 98948 56956
                </h5>
                {/* <h5 className="" style={{ color: "#fff", fontSize: "20px" }}>
                  +91 99999 11111
                </h5> */}
              </div>
              <div className="mt-5">
                <a href="https://wa.me/<+919894856956> "><i
                  className="fab fa-whatsapp border p-3"
                  style={{
                    color: "rgb(198, 53, 30)",
                    fontSize: "20px",
                    borderRadius: "50px",
                  }}
                ></i></a>
                <h5
                  className="pt-2"
                  style={{ color: "#fff", fontSize: "20px" }}
                >
                  +91 98948 56956
                </h5>
                {/* <h5 className="" style={{ color: "#fff", fontSize: "20px" }}>
                  +91 99999 11111
                </h5> */}
              </div>
            </div>
            <div className="col-sm-12	col-md-12	col-lg-6 border-start1">
              <div className="">
                <div class="Address1-Map">
                  <iframe
                    className="map-image"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0912085612713!2d77.01634515068355!3d11.031783457405632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8578e89a4e04f%3A0x5f10fc5a43b95850!2sTidel%20Park%2C%20Peelamedu%2C%20B.R.%20Puram%20Industrial%20Estate%2C%20Coimbatore%2C%20Tamil%20Nadu%20641014!5e0!3m2!1sen!2sin!4v1647594343308!5m2!1sen!2sin"
                    width="150"
                    height="150"
                    allowfullscreen=""
                    loading="lazy"
                  />
                </div>
                <span class="Address1-details">
                  Tidel Park, Peelamedu, Pannaiyar Biriyani, Coimbatore, Tamil
                  Nadu.
                </span>
              </div>
              {/* <div className="">
                <div class="Address1-Map">
                  <iframe
                    className="map-image"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2457287997736!2d76.93750291416262!3d11.020181157662003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8591526cc277b%3A0xe0e683a5311cc7b4!2sPannaiyar%20Biriyani!5e0!3m2!1sen!2sin!4v1628905456680!5m2!1sen!2sin"
                    width="150"
                    height="150"
                    allowfullscreen=""
                    loading="lazy"
                  />
                </div>
                <span class="Address1-details">
                  56, Bharathi Park Rd, near icici bank, 7th cross, Saibaba
                  Colony, Coimbatore, Tamil Nadu 641043
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerService;
