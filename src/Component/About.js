import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import Testimonial from "./Testimonial";
// import Slider from "react-slick";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
// import SimpleReactLightbox from 'simple-react-lightbox'
import "./About.scss";
import image1 from "../img/about_1.png";
import image2 from "../img/about_2.png";
import ratingLogo from "../img/ratingLogo.png";
import steps from "../img/book_step.png";

import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";

import gallery1 from "../img/gallery/image5.png";
import gallery2 from "../img/gallery/image6.png";
import gallery3 from "../img/gallery/image2.png";
import gallery4 from "../img/gallery/image4.png";
import gallery5 from "../img/gallery/image3.png";
import gallery6 from "../img/gallery/image1.png";

import { IoMdQuote } from "react-icons/io";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

function About() {
  const stars = 5;
  return (
    <>
      <SideNav />
      <div className="main_body">
        <div className="about-container">
          <div className="section1">
            <div className="left-side">
              <img className="left-img" src={image1} />
            </div>
            {/*  */}
            <div className="right-side">
              <div className="title">
                <span className="hr-line-head"></span>
                <h4>What is Tidel Party</h4>
              </div>
              <div className="discription">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                  In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                  justo. Nullam dictum felis eu pede mollis pretium. Integer
                  tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                  vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                  consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                  nulla ut metus varius laoreet. Quisque rutrum. Aenean
                  imperdiet. Etiam ultricies nisi vel augue. Curabitur
                  ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
                  Maecenas tempus, tellus eget condimentum rhoncus, sem quam
                  semper libero, sit amet adipiscing sem neque sed ipsum. Nam
                  quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                  Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                  ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet
                  orci eget eros faucibus tincidunt.
                </p>
              </div>
              <div className="sub-title">
                <span className="hr-line-head"></span>
                <h4>View Menus</h4>
              </div>
              <h3 className="heading">ABOUT US</h3>
            </div>
          </div>
          <div className="section2">
            {/*  */}
            <div className="right-side">
              <div className="title">
                <span className="hr-line-head"></span>
                <h4>What is Tidel Party</h4>
              </div>
              <div className="discription">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.{" "}
                </p>
              </div>
              {/* <div className="sub-title">
              <span className="hr-line-head"></span>
              <h4>View Menus</h4>
            </div> */}
            </div>
            <div className="left-side">
              <img className="left-img" src={image2} />
              <h3 className="heading">
                DELIGHTFUL <br />
                EXPERIENCE
              </h3>
            </div>
          </div>
          <div className="section3">
            <div className="row">
              <div className="col-md-7 left-side">
                <div className="title">
                  <h4>What Our Clients Have to Say</h4>
                  <p>
                    Pannaiyar Briyani has received 4.9 Star Rating From 38
                    Google reviews
                  </p>
                </div>
              </div>
              <div className="col-md-5 right-side d-flex">
                <div className="rating-logo">
                  <img src={ratingLogo} />
                </div>
                <div className="rating-content ">
                  <h4>4.6 / 5</h4>
                  <p>
                    Based on 38 reviews <br />
                    Powered by Google
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="section4">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="review-box">
                    <div className="review-head">
                      <div className="review-person">
                        <div className="person-img">
                          <img src={ratingLogo} />
                        </div>
                        <div className="person-name">
                          <h4>Jhonsy</h4>
                        </div>
                      </div>
                      <div className="star-rating">
                        <div className="rating-box">
                          <div className="rating-container">
                            <input
                              type="radio"
                              name="rating"
                              value="5"
                              id="star-5"
                            />{" "}
                            <label for="star-5">&#9733;</label>
                            <input
                              type="radio"
                              name="rating"
                              value="4"
                              id="star-4"
                            />{" "}
                            <label for="star-4">&#9733;</label>
                            <input
                              type="radio"
                              name="rating"
                              value="3"
                              id="star-3"
                              checked
                            />{" "}
                            <label for="star-3">&#9733;</label>
                            <input
                              type="radio"
                              name="rating"
                              value="2"
                              id="star-2"
                            />{" "}
                            <label for="star-2">&#9733;</label>
                            <input
                              type="radio"
                              name="rating"
                              value="1"
                              id="star-1"
                            />{" "}
                            <label for="star-1">&#9733;</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="review-body">
                      <div className="review-title">
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit.
                        </p>
                      </div>
                      <div className="review-discription">
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit. Aenean commodo ligula eget dolor. Aenean massa.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item ">
                  <div className="review-box">
                    <div className="review-head">
                      <div className="review-person">
                        <div className="person-img">
                          <img src={ratingLogo} />
                        </div>
                        <div className="person-name">
                          <h4>Smith</h4>
                        </div>
                      </div>
                      <div className="star-rating">
                        <div className="rating-box">
                          <div className="rating-container">
                            <input
                              type="radio"
                              name="rating2"
                              value="5"
                              id="star-5"
                            />{" "}
                            <label for="star-5">&#9733;</label>
                            <input
                              type="radio"
                              name="rating2"
                              value="4"
                              id="star-4"
                              checked
                            />{" "}
                            <label for="star-4">&#9733;</label>
                            <input
                              type="radio"
                              name="rating2"
                              value="3"
                              id="star-3"
                            />{" "}
                            <label for="star-3">&#9733;</label>
                            <input
                              type="radio"
                              name="rating2"
                              value="2"
                              id="star-2"
                            />{" "}
                            <label for="star-2">&#9733;</label>
                            <input
                              type="radio"
                              name="rating2"
                              value="1"
                              id="star-1"
                            />{" "}
                            <label for="star-1">&#9733;</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="review-body">
                      <div className="review-title">
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit.
                        </p>
                      </div>
                      <div className="review-discription">
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit. Aenean commodo ligula eget dolor. Aenean massa.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item ">
                  <div className="review-box">
                    <div className="review-head">
                      <div className="review-person">
                        <div className="person-img">
                          <img src={ratingLogo} />
                        </div>
                        <div className="person-name">
                          <h4>Rock</h4>
                        </div>
                      </div>
                      <div className="star-rating">
                        <div className="rating-box">
                          <div className="rating-container">
                            <input
                              type="radio"
                              name="rating3"
                              value="5"
                              id="star-5"
                            />{" "}
                            <label for="star-5">&#9733;</label>
                            <input
                              type="radio"
                              name="rating3"
                              value="4"
                              id="star-4"
                            />{" "}
                            <label for="star-4">&#9733;</label>
                            <input
                              type="radio"
                              name="rating3"
                              value="3"
                              id="star-3"
                            />{" "}
                            <label for="star-3">&#9733;</label>
                            <input
                              type="radio"
                              name="rating3"
                              value="2"
                              id="star-2"
                              checked
                            />{" "}
                            <label for="star-2">&#9733;</label>
                            <input
                              type="radio"
                              name="rating3"
                              value="1"
                              id="star-1"
                            />{" "}
                            <label for="star-1">&#9733;</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="review-body">
                      <div className="review-title">
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit.
                        </p>
                      </div>
                      <div className="review-discription">
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit. Aenean commodo ligula eget dolor. Aenean massa.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <BsArrowLeftCircle className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <BsArrowRightCircle className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="section5">
            <div className="section-head">
              <h4>How to book a ticket</h4>
            </div>
            <div className="section-body">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <img className="mb-5 card-icon" src={steps} />
                      <h5 className="mb-2 card-subtitle">Step 01</h5>
                      <h5 className="mb-1 card-title">Order</h5>
                      <h5 className="mb-3 card-head">Delivery</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <img className="mb-5 card-icon" src={steps} />
                      <h5 className="mb-2 card-subtitle">Step 02</h5>
                      <h5 className="mb-1 card-title">Order</h5>
                      <h5 className="mb-3 card-head">Delivery</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <img className="mb-5 card-icon" src={steps} />
                      <h5 className="mb-2 card-subtitle">Step 03</h5>
                      <h5 className="mb-1 card-title">Order</h5>
                      <h5 className="mb-3 card-head">Delivery</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section6">
            <div className="section-head">
              <h4>Gallery</h4>
              <span className="hr-line-head"></span>
            </div>
            <div className="section-body">
              <SimpleReactLightbox>
                <SRLWrapper>
                  <a className="" href={gallery1}>
                    <img src={gallery1} alt="Gallery Images" />
                  </a>
                  <a className="" href={gallery2}>
                    <img src={gallery2} alt="Gallery Images" />
                  </a>
                  <a className="" href={gallery3}>
                    <img src={gallery3} alt="Gallery Images" />
                  </a>
                  <a className="" href={gallery4}>
                    <img src={gallery4} alt="Gallery Images" />
                  </a>
                  <a className="" href={gallery5}>
                    <img src={gallery5} alt="Gallery Images" />
                  </a>
                  <a className="" href={gallery6}>
                    <img src={gallery6} alt="Gallery Images" />
                  </a>
                </SRLWrapper>
              </SimpleReactLightbox>
            </div>
          </div>
          <div className="section7">
            <div className="section-head">
              <h4>Testimonials</h4>
            </div>
            <div className="section-body">
              <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                  <div className="card">
                    <div className="card-body text-center px-5 py-3">
                      <IoMdQuote className="card-icon mb-5"></IoMdQuote>
                      <h5 className="card-title mb-4">Title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <div className="card-body text-center px-5 py-3">
                      <IoMdQuote className="card-icon mb-5"></IoMdQuote>
                      <h5 className="card-title mb-4">Title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section8">
            <div className="section-head">
              <h4>Got a Question About Our Tidel Party?</h4>
            </div>
            <div className="section-body">
              <Accordion allowZeroExpanded="true">
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      What harsh truths do you prefer to ignore?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Exercitation in fugiat est ut ad ea cupidatat ut in
                      cupidatat occaecat ut occaecat consequat est minim minim
                      esse tempor laborum consequat esse adipisicing eu
                      reprehenderit enim.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Is free will real or just an illusion?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      In ad velit in ex nostrud dolore cupidatat consectetur ea
                      in ut nostrud velit in irure cillum tempor laboris sed
                      adipisicing eu esse duis nulla non.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      What harsh truths do you prefer to ignore?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Exercitation in fugiat est ut ad ea cupidatat ut in
                      cupidatat occaecat ut occaecat consequat est minim minim
                      esse tempor laborum consequat esse adipisicing eu
                      reprehenderit enim.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Is free will real or just an illusion?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      In ad velit in ex nostrud dolore cupidatat consectetur ea
                      in ut nostrud velit in irure cillum tempor laboris sed
                      adipisicing eu esse duis nulla non.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      What harsh truths do you prefer to ignore?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Exercitation in fugiat est ut ad ea cupidatat ut in
                      cupidatat occaecat ut occaecat consequat est minim minim
                      esse tempor laborum consequat esse adipisicing eu
                      reprehenderit enim.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Is free will real or just an illusion?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      In ad velit in ex nostrud dolore cupidatat consectetur ea
                      in ut nostrud velit in irure cillum tempor laboris sed
                      adipisicing eu esse duis nulla non.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="footer-copyright">
          Copyright Pannaiyar Biriyani All Right Reserved.
          <Link to="/privacy-policy" >   Privacy Policy </Link>
               |
              <Link to="/terms-and-conditions" > Terms and Conditions</Link>
        </div>
        </div>

       
      </div>
    </>
  );
}

export default About;
