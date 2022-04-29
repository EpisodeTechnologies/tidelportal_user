import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import newProfileimage from '';
// import ImageCrop from "./ImageCrop";
import Button from "@material-ui/core/Button";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import getCroppedImg from "../utils/cropImage";
import dataURLtoFile from "../utils/dataURLtoFile";
import { apibaseURL } from "../apiBaseURL";
import { FaEdit } from "react-icons/fa";
import { createHashHistory } from "history";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import "./ProfileEdit.scss";
const history = createHashHistory();

function ProfileEdit() {
  const History = useHistory();
  const inputRef = React.useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();
  const [Number, setNumber] = useState("");
  const [User_Id, setUser_Id] = useState("");
  const [User_Name, setUser_Name] = useState("");
  const [User_Email, setUser_Email] = useState("");
  const [User_Gender, setUser_Gender] = useState("Male");
  const [User_DOB, setUser_DOB] = useState("");
  const [User_Marital_Status, setUser_Marital_Status] = useState("Single");
  const [User_Special_Day, setUser_Special_Day] = useState("");
  const [User_Company_Name, setUser_Company_Name] = useState("");
  const [User_Company_Id, setUser_Company_Id] = useState("");
  const [User_Address, setUser_Address] = useState("");
  const [Profileimage, setProfileimage] = useState(null);
  const [newProfileimage, setnewProfileimage] = useState(null);
  const [CroppedImagefile, setCroppedImagefile] = React.useState(null);
  const [selectedFile, setselectedFile] = useState("");
  const [newcropimage, setnewcropimage] = useState(null);
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [PhoneNumberVerification, setPhoneNumberVerification] = useState(true);
  const [EmailVerification, setEmailVerification] = useState(true);
  const [cphonenumber, setcphonenumber] = useState("");
  const [cphoneotp, setcphoneotp] = useState("");
  const [cemail, setcemail] = useState("");
  const [cemailotp, setcemailotp] = useState("");
  const [CorrectNumber, setCorrectNumber] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_login_details")) {
      var localvar = JSON.parse(localStorage.getItem("user_login_details"));
      setnewProfileimage("img/userprofile/default.png");
      // console.log(localvar);
      if (localvar) {
        setUser_Id(localvar.Id);
        setNumber(localvar.User_Phonenumber);
        setUser_Name(localvar.User_Name);
        setUser_Gender(localvar.User_Gender);
        setUser_Gender(localvar.User_Gender==''?User_Gender:localvar.User_Gender);
        setUser_DOB(localvar.User_DOB);
        setUser_Marital_Status(localvar.User_Marital_Status==''?User_Marital_Status:localvar.User_Marital_Status);
        setUser_Special_Day(localvar.User_Special_Day);
        setUser_Address(localvar.User_Address);
        setUser_Email(localvar.User_Email);
        setProfileimage(localvar.User_Profile_Image);
        setUser_Company_Name(localvar.User_Company_Name);
        setUser_Company_Id(localvar.User_Company_Id);
        if (localvar.User_Profile_Image !== "null") {
          setnewProfileimage(
            `https://pannaiyarbiriyani.com/user/demo/img/userprofile/${localvar.User_Profile_Image}`
          );
        }
        if (
          localvar.User_Profile_Image === "" ||
          localvar.User_Profile_Image === null
        ) {
          setnewProfileimage("img/userprofile/default.png");
        }
      }
    } else {
      history.push("/");
    }
  }, []);

  const saveprofile = (e) => {
    axios
      .post(apibaseURL + "/profilesave/api", {
        User_Id: User_Id,
        User_Name: User_Name,
        User_Number: Number,
        User_Email: User_Email,
        User_Gender: User_Gender,
        User_DOB: User_DOB,
        User_Marital_Status: User_Marital_Status,
        User_Special_Day: User_Special_Day,
        User_Company_Name: User_Company_Name,
        User_Company_Id: User_Company_Id,
        User_Address: User_Address,
        Profileimage: Profileimage,
      })
      .then((res) => {
        var data = res.data[0];
        // console.log(res.data[0]);
        localStorage.setItem("user_login_details", JSON.stringify(data));
        setTimeout(() => {
          History.push("/profile");
        }, 1000);
      });
  };

  const [cropDisplay, setcropDisplay] = React.useState("none");
  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 10, y: 10 });
  const [zoom, setZoom] = React.useState(1);
  const onCropComplete = (CroppedAreaPercentage, CroppedareaPixels) => {
    setCroppedArea(CroppedareaPixels);
  };
  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      // console.log("hi")
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        // console.log(reader.result);
        setImage(reader.result);
        setcropDisplay("flex");
      });
    }
  };

  const cropImage = async () => {
    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataurl = canvas.toDataURL("image/png");

    // console.log(canvasDataurl);
    // const convertedURLtoFile = dataURLtoFile(canvasDataurl, "crop-image.jpg");
    // // console.log(convertedURLtoFile.url);
    // setCroppedImagefile(convertedURLtoFile);
    canvas.toBlob((file) => {
      // console.log(URL.createObjectURL(file));
      setnewcropimage(URL.createObjectURL(file));
    });

    setcropDisplay("none");
    let newimagename = "PNBI" + Date.now() + ".png";
    // console.log('res');
    // const formData = new FormData();
    // formData.append("myFile", convertedURLtoFile);
    axios
      .post("https://pannaiyarbiriyani.com/api/profileImage/index.php", {
        image: canvasDataurl,
        image_name: newimagename,
      })
      .then((res) => {
        // console.log(res);
        // canvas.toBlob((file) => {
        //   // console.log(URL.createObjectURL(file));
        //   setnewcropimage(URL.createObjectURL(file));
        // });
        setProfileimage(newimagename);
      });
    setProfileimage(newimagename);
  };

  const cropCancel = () => {
    // setImage("");
    setcropDisplay("none");
  };

  const changePhoneNumber = (e) => {
    if (cphonenumber && cphoneotp) {
      axios
        .post(apibaseURL + "/verifyPhoneNo/user", {
          phone: cphonenumber,
          userId: User_Id,
          otp: parseInt(cphoneotp)
        })
        .then((res) => {
          // console.log(res)
          if (res.data.status == "200") {
            localStorage.setItem("user_login_details", JSON.stringify(res.data.data));
            setCorrectNumber('')
            setPhoneNumberVerification(true)
            History.push("/profile")
          } else {
            setCorrectNumber(res.data.message)
          }
        })
    }
    if (cphonenumber && cphoneotp == '') {
      axios
        .post(apibaseURL + "/changePhoneNo/user", {
          phone: cphonenumber,
          userId: User_Id
        })
        .then((res) => {
          // console.log(res)
          if (res.data.status == "200") {
            setPhoneNumberVerification(false)
            setCorrectNumber('');
          } else {
            setCorrectNumber(res.data.message)
          }

        })

    }

    e.preventDefault();
  }
  const changeEmailId = (e) => {

    if (cemail && cemailotp) {
      axios
      .post(apibaseURL + "/verifyEmailId/user", {
        email: cemail,
        userId: User_Id,
        otp: parseInt(cemailotp)
      })
      .then((res) => {
        // console.log(res)
        if (res.data.status == "200") {
          localStorage.setItem("user_login_details", JSON.stringify(res.data.data));
          setCorrectNumber('')
          setEmailVerification(true)
          History.push("/profile")
        } else {
          setCorrectNumber(res.data.message)
        }
      })
    }
    if (cemail && cemailotp == '') {
      axios
      .post(apibaseURL + "/changeEmailId/user", {
        email: cemail,
        userId: User_Id
      })
      .then((res) => {
        // console.log(res)
        if (res.data.status == "200") {
          setEmailVerification(false)
          setCorrectNumber('');
        } else {
          setCorrectNumber(res.data.message)
        }

      })

  
    }
    e.preventDefault();
  }
  // console.log(Profileimage);
  return (
    <>
      <SideNav />

      <div className="main_body">
        <div className="edit_profile_body">
          <div className="edit_profile_container">
            <div
              class="row "
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              <div className="col-sm-12 col-lg-3">
                <div className="edit_profile_image_container">
                  <img
                    className="edit_profile_image_square"
                    // style={{backgroundImage: "url(/img/userprofile/PNBI1636538658668.png)"}}
                    src={
                      Profileimage === "" || Profileimage === null
                        ? newProfileimage
                        : newcropimage
                          ? newcropimage
                          : `https://pannaiyarbiriyani.com/user/demo/img/userprofile/${Profileimage}`
                    }
                  />

                  <div className="edit_Edit_camera_icon">
                    <label for="file-up" id="up-label">
                      <i
                        className="fas fa-camera"
                        onClick={triggerFileSelectPopup}
                      ></i>
                    </label>
                    <input
                      type="file"
                      name="sampleFile"
                      hidden
                      // onChange={onFileChange}
                      ref={inputRef}
                      value={null}
                      onChange={(e) => {
                        onSelectFile(e);
                        e.target.value = null;
                      }}
                      accept=".png, .jpg, .jpeg"
                    />
                  </div>
                  <div className="row">
                    <div
                      className="col-12 pc-view-save-btn"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button className="Union-5" onClick={saveprofile}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="image_container_crop"
                style={{
                  display: cropDisplay,
                }}
              >
                <div
                  className="img_crop_container"
                  style={{
                    height: "100%",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <div
                    className="img_crop_container_cropper"
                    style={{
                      height: "70%",
                      // width: "70%",
                      position: "relative",
                      marginTop: "10px",
                    }}
                  >
                    {image ? (
                      <>
                        <Cropper
                          image={image}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          cropSize={{ width: 200, height: 200 }}
                        />
                        {/* <img
                          src={croppedArea}
                          style={{ width: "300px", height: "300px" }}
                        /> */}
                      </>
                    ) : null}
                  </div>
                  <div style={{ height: "10%" }}>
                    <Slider
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </div>
                  <div className="img_crop_container_buttons">
                    <Button
                      style={{ marginRight: "20px" }}
                      variant="contained"
                      color="primary"
                      onClick={cropImage}
                    >
                      Upload
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .pdf,.docx"
                        // ref={inputRef}
                        hidden
                      />
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={cropCancel}
                    >
                      Cancel
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .pdf,.docx"
                        // ref={inputRef}
                        hidden
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-lg-9 pc-profile-page">
                <div className="row">
                  <div className="col-sm-12 col-lg-6">
                    <div className="form_input_field">
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setUser_Name(e.target.value)}
                            value={User_Name}
                          />
                          <span>User Name</span>
                        </label>
                      </div>
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Phone Number"
                            onClick={() => {setshow(true);setCorrectNumber('')}}
                            onChange={(e) => setNumber(e.target.value)}
                            value={Number}
                            readOnly
                          />
                          <span>User Phone Number</span>
                          <FaEdit
                            className="edit_icon"
                            onClick={() => setshow(true)}
                          />
                        </label>
                      </div>{" "}
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        <label
                          class="form-group has-float-label"
                          style={{ width: "100%" }}
                        >
                          <select
                            class="form-control custom-select"
                            value={User_Gender}
                            onChange={(e) => setUser_Gender(e.target.value)}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <span>Gender</span>
                        </label>
                      </div>
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <input
                            class="form-control"
                            type="date"
                            placeholder="Date of Birth"
                            onChange={(e) => setUser_DOB(e.target.value)}
                            value={User_DOB}
                            pattern="\d{4}-\d{2}-\d{2}"
                          />
                          <span>Date Of Birth</span>
                        </label>
                      </div>
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Company Name"
                            value={User_Company_Name}
                            onChange={(e) =>
                              setUser_Company_Name(e.target.value)
                            }
                          />
                          <span>Company Name</span>
                        </label>
                      </div>
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Company Id"
                            value={User_Company_Id}
                            onChange={(e) => setUser_Company_Id(e.target.value)}
                          />
                          <span>Company Id</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <div className="form_input_field">
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Email"
                            onClick={() => {setshow1(true);setCorrectNumber('')}}
                            onChange={(e) => setUser_Email(e.target.value)}
                            value={User_Email}
                            readOnly
                          />
                          <span>User Email Id</span>
                          <FaEdit
                            className="edit_icon"
                            onClick={() => setshow1(true)}
                          />
                        </label>
                      </div>
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        <label
                          class="form-group has-float-label"
                          style={{ width: "100%" }}
                        >
                          <select
                            class="form-control custom-select"
                            value={User_Marital_Status}
                            onChange={(e) =>
                              setUser_Marital_Status(e.target.value)
                            }
                          >
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value=" It complicated with Biriyani">
                              It complicated with Biriyani
                            </option>
                          </select>
                          <span>Marital Status</span>
                        </label>
                      </div>
                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Anniversary day/ Special day"
                            onChange={(e) =>
                              setUser_Special_Day(e.target.value)
                            }
                            value={User_Special_Day}
                          />
                          <span>Anniversary day / Special day</span>
                        </label>
                      </div>

                      <div
                        class="form-group input-group"
                        style={{ marginTop: "20px" }}
                      >
                        {/*<span class="input-group-addon">@</span> */}
                        <label
                          class="has-float-label"
                          style={{ width: "100%" }}
                        >
                          <textarea
                            class="form-control"
                            rows={7}
                            cols={50}
                            type="text"
                            placeholder="Address"
                            onChange={(e) => setUser_Address(e.target.value)}
                            value={User_Address}
                          />
                          <span>Address</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mobile-view-save-btn">
                <button className="Union-5" onClick={saveprofile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        centered
        onHide={() => { setshow(false); setPhoneNumberVerification(true) }}
        dialogClassName="modal-90w "
        id="modal-phonenumberchange"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <div></div>
          <IoClose className="close-icon" onClick={() => { setshow(false); setPhoneNumberVerification(true) }} />
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={changePhoneNumber} className="form_input_field form_input_field1">
            <h4 style={{ textAlign: "center", color: "white" }}>
              Change Phone Number
            </h4>
            <p className="or">
              <span style={{ color: "red" }}>
                {CorrectNumber}</span>
            </p>
            <div class="form-group input-group" style={{ marginTop: "20px" }}>
              <label class="has-float-label" style={{ width: "100%" }}>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Phone Number"
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => setcphonenumber(e.target.value)}
                  value={cphonenumber}
                  required
                  readOnly={PhoneNumberVerification ? false : true}
                />
                <span>New Phone Number</span>
              </label>
            </div>
            {PhoneNumberVerification ? (
              <></>
            ) : (
              <div class="form-group input-group" style={{ marginTop: "20px" }}>
                <label class="has-float-label" style={{ width: "100%" }}>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Enter OTP"
                    maxLength={4}
                    onChange={(e) => setcphoneotp(e.target.value)}
                    value={cphoneotp}
                    required
                  />
                  <span>Enter OTP</span>
                </label>
              </div>
            )}
            <div class="form-group input-group" style={{ marginTop: "20px" }}>
              {PhoneNumberVerification ? (
                <button type="submit" className="edit-phonenumber" style={{ width: "100%" }} >
                  Verify
                </button>
              ) : (
                <button type="submit" className="edit-phonenumber" style={{ width: "100%" }}
                >
                  Confirm
                </button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={show1}
        centered
        onHide={() => { setshow1(false); setEmailVerification(true) }}
        dialogClassName="modal-90w "
        id="modal-emailidchange"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <div></div>
          <IoClose className="close-icon" onClick={() => { setshow1(false); setEmailVerification(true) }} />
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={changeEmailId} className="form_input_field form_input_field1">
            <h4 style={{ textAlign: "center", color: "white" }}>
              Change Email id
            </h4>
            <p className="or">
              <span style={{ color: "red" }}>
                {CorrectNumber}
              </span>
            </p>
            <div class="form-group input-group" style={{ marginTop: "20px" }}>
              <label class="has-float-label" style={{ width: "100%" }}>
                <input
                  class="form-control"
                  type="email"
                  placeholder="Email id"
                  onChange={(e) => setcemail(e.target.value)}
                  value={cemail}
                  required
                  readOnly={EmailVerification ? false : true}
                />
                <span>New Email id</span>
              </label>
            </div>
            {EmailVerification ? (
              <></>
            ) : (
              <div class="form-group input-group" style={{ marginTop: "20px" }}>
                <label class="has-float-label" style={{ width: "100%" }}>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Enter OTP"
                    maxLength={4}
                    onChange={(e) => setcemailotp(e.target.value)}
                    value={cemailotp}
                    required
                  />
                  <span>Enter OTP</span>
                </label>
              </div>
            )}
            <div class="form-group input-group" style={{ marginTop: "20px" }}>
              {EmailVerification ? (
                <button type="submit" className="edit-phonenumber" style={{ width: "100%" }} >
                  Verify
                </button>
              ) : (
                <button type="submit" className="edit-phonenumber" style={{ width: "100%" }}
                >
                  Confirm
                </button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* // cphonenumber,cphoneotp,cemail,cemailotp,EmailVerification,changeEmailId */}
    </>
  );
}

export default ProfileEdit;
