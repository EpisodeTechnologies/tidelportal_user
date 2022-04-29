import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './TicketDetails.scss'
import { Carousel } from 'react-responsive-carousel';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { IoTriangle } from "react-icons/io5";
import moment from 'moment'
import Countdown, { zeroPad } from "react-countdown";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";


export class TicketDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {

      slideImages: ['PNBI_TICKET1650548308288.png', 'PNBI_TICKET1650548308288.png', 'PNBI_TICKET1650548308288.png'],
      detailsPopUPData: '',
      cartupdate: 0
    };

    // console.log("props--->>>", props)

  }




  render() {

    let { itemPlus, itemMinus, item, counts, limitCount, limitbookedcount, back, backtoBookingPage, page } = this.props;


    let slideImages;
    if (localStorage.getItem('item')) {
      item = JSON.parse(localStorage.getItem('item'))
      slideImages = JSON.parse(item.image)
    } else {
      item = item;
      slideImages = JSON.parse(item.image)
    }
    // console.log(this.props.item);

    const renderer = ({ days, hours, minutes, seconds, completed, }) => {
      if (completed) {
        // Render a completed state
        // return <span>Ticket Expired</span>
        // window.location.reload(true)
        return (<div className="expiry-ticket-img">
          {/* <img src={'https://www.onlygfx.com/wp-content/uploads/2020/05/expired-stamp-5.png'} height="180" /> */}
        </div>)
      } else {
        return <><span>{days > 0 ? zeroPad(days) + ':' : ''}{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span><br />
        </>
        // return <div className="counter-body">
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(days)}</span><span className="count-string">Days</span></div> <span className="colan">:</span>
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(hours)}</span><span className="count-string">Hours</span></div><span className="colan">:</span>
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(minutes)}</span><span className="count-string">Minutes</span></div><span className="colan">:</span>
        //   <div className="counter-sec1" ><span className="count-number">{zeroPad(seconds)}</span><span className="count-string">Seconds</span></div>

        // </div>
      }
    };

    // limitCount
    return (

      page == "ticket" ? <>
        <div className='details_page_body'>

          <div className='image-body'>
            <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true} interval={3000}>
              {slideImages.length > 0 ?
                slideImages.map((image, key) => {
                  return (
                    <div>
                      <img src={"https://pannaiyarbiriyani.com/user/demo/img/userprofile/" + image} />
                    </div>)
                }) : <></>
              }

            </Carousel>

            <div className='top-menu'>
              {back ? <div className='icon'> <IoMdArrowRoundBack className='iomd'onClick={()=>backtoBookingPage()} /></div> : <div className='icon1'> </div>}
              <div className='ticket-details'> <span>Ticket Details</span></div>
              <div></div>
            </div>
            {/* {console.log(item)} */}
            <div className='bottom-ticket-count'>
              <div className='time-left'>{item.expired_time!=null?<span>Ticket Expired</span>:<span>Time Left
                <> <Countdown date={new Date(item.redeem_end)} renderer={renderer}></Countdown></></span>}</div>
              <div className='item'><span> {item.booking_id  ? `Booking id : ${item.booking_id}` : 'Unlimited'}</span></div>
            </div>

            <div className='food-type'>
              {item.item_type == "nonveg" ? <IoTriangle className='food-nonveg' /> : <GoPrimitiveDot className='food-veg' />}

              {/*  */}
            </div>
          </div>

          <div className='detail-body1'>
            <div className='food-time'>
              {item.redeem_validity == 'Deadline' || item.redeem_validity == 'Any time' ? <></> : <span>{item.meal_time}</span>}</div>

            <div className='food-name'> <span>{item.item_name}</span></div>

            <div className='food-tk-details'>
              <div className='ticket-name'>
                <div className='ticket-lable'> <span>Ticket Name</span></div>
                <div className='ticket-value'> <span>{item.ticket_name}</span></div>
              </div>
              <div className='ticket-count'>
                <div className='count-lable'><span>Ticket Id</span></div>
                <div className='count-value'><span>{item.ticket_id}</span></div>
              </div>
            </div>

            <div className='description-body'>
              <div className='description'><span>Description</span></div>
              <div className='description-content'><span>{item.about}</span></div>
            </div>

            <div className='teams-condition'>
              <div className='teams-head'> <span>Teams & Conditions</span></div>
              <div className='teams-list-body'>
                <ul>
                  <li><span>Redeem Validity : 1year</span></li>
                  <li><span>Book Before count down</span></li>
                  <li><span>ipsum has been the industry's standard</span></li>
                  <li><span>dummy text ever since the 1500s.</span></li>
                </ul>
              </div>
            </div>

            <div className='ticket-validation-details'>
              <div className='redeem-date-time'>
                <div className='redeem-lable'><span>Redeem start</span></div>
                <div className='redeem-start'><span>{moment(item.redeem_start).format('DD-MMM-yyy')} at {moment(item.redeem_start).format("hh:mm a")}</span></div>
              </div>
              {/* redeem_end_date_time/ */}
              <div className='validity-date'>
                <div className='validity-lable'><span>Redeem end</span></div>
                <div className='redeem-end'><span>{moment(item.redeem_end).format('DD-MMM-yyy')} at {moment(item.redeem_end).format("hh:mm a")}</span></div>
              </div>
            </div>

          </div>

          {/* <div className='book-now-body'>
          <div className='price'>
            <div className='reduce-price'><span>{item.discount == 0 ? `` : `Rs.${item.sale_price}.00`}</span></div>
            <div className='sale-price'><span >{item.discount == 0 ? `Rs.${item.sale_price}.00` : `Rs.${item.discount_price}.00`}</span></div>
          </div>
         
        </div> */}
        </div>


      </> :
        <>
          <div className='details_page_body'>

            <div className='image-body'>
              <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true} interval={3000}>
                {slideImages.length > 0 ?
                  slideImages.map((image, key) => {
                    return (
                      <div>
                        <img src={"https://pannaiyarbiriyani.com/user/demo/img/userprofile/" + image} />
                      </div>)
                  }) : <></>
                }

              </Carousel>

              <div className='top-menu'>
                {back ? <div className='icon'> <IoMdArrowRoundBack className='iomd' onClick={() => backtoBookingPage()} /></div> : <div className='icon1'> </div>}
                <div className='ticket-details'> <span>Ticket Details</span></div>
                <div></div>
              </div>

              <div className='bottom-ticket-count'>
                <div className='time-left'><span>Time Left {item.redeem_validity == 'Deadline' || item.redeem_validity == 'Any time' ? <></> :
                  <> <Countdown date={new Date(item.booking_end)} renderer={renderer}></Countdown></>}</span></div>
                <div className='item'><span> {item.is_limited == 1 ? `Ticket Count ${item.limited_quantity_count - item.booked_count}` : 'Unlimited'}</span></div>
              </div>

              <div className='food-type'>
                {item.item_type == "nonveg" ? <IoTriangle className='food-nonveg' /> : <GoPrimitiveDot className='food-veg' />}

                {/*  */}
              </div>
            </div>

            <div className='detail-body'>
              <div className='food-time'>
                {item.redeem_validity == 'Deadline' || item.redeem_validity == 'Any time' ? <></> : <span>{item.meal_time}</span>}</div>

              <div className='food-name'> <span>{item.item_name}</span></div>

              <div className='food-tk-details'>
                <div className='ticket-name'>
                  <div className='ticket-lable'> <span>Ticket Name</span></div>
                  <div className='ticket-value'> <span>{item.ticket_name}</span></div>
                </div>
                <div className='ticket-count'>
                  <div className='count-lable'><span>Ticket Id</span></div>
                  <div className='count-value'><span>{item.ticket_id}</span></div>
                </div>
              </div>

              <div className='description-body'>
                <div className='description'><span>Description</span></div>
                <div className='description-content'><span>{item.about}</span></div>
              </div>

              <div className='teams-condition'>
                <div className='teams-head'> <span>Teams & Conditions</span></div>
                <div className='teams-list-body'>
                  <ul>
                    <li><span>Redeem Validity : 1year</span></li>
                    <li><span>Book Before count down</span></li>
                    <li><span>ipsum has been the industry's standard</span></li>
                    <li><span>dummy text ever since the 1500s.</span></li>
                  </ul>
                </div>
              </div>

              <div className='ticket-validation-details'>
                <div className='redeem-date-time'>
                  <div className='redeem-lable'><span>Booking Endtime</span></div>
                  <div className='redeem-value'><span>{moment(item.booking_end).format('DD-MMM-yyy')} at {moment(item.booking_end).format("hh:mm a")}</span></div>
                </div>
                {/* redeem_end_date_time/ */}
                <div className='validity-date'>
                  <div className='validity-lable'><span></span></div>
                  <div className='validity-value'><span></span></div>
                </div>
              </div>

            </div>

            <div className='book-now-body'>
              <div className='price'>
                <div className='reduce-price'><span>{item.discount == 0 ? `` : `Rs.${item.sale_price}.00`}</span></div>
                <div className='sale-price'><span >{item.discount == 0 ? `Rs.${item.sale_price}.00` : `Rs.${item.discount_price}.00`}</span></div>
              </div>
              <div className='book-now'>
                <div className="add-cart-body">
                  <div className="minus add-btn"><HiMinusSm className="icon"

                    onClick={() =>
                      counts["count" + item.ticket_id] < 1 ? '' : itemMinus(
                        item.ticket_id,
                        item.discount == 1 ? item.discount_price : item.sale_price,
                        item.ticket_name,
                        item.item_type,
                        item.is_limited == 1 ? true : false
                        // index
                      )
                    }
                  /></div>
                  <span className="cart-count">{counts ? (
                    counts["count" + item.ticket_id]
                  ) : (
                    <></>
                  )} </span>
                  <div className="plus add-btn">  <HiPlusSm className="icon"

                    onClick={() =>
                      counts["count" + item.ticket_id] < 3 ? item.limit ? limitCount["limitCount" + item.ticket_id] - limitbookedcount["limitbookedcount" + item.ticket_id] - counts["count" + item.ticket_id] > 0 ? (limitCount["limitCount" + item.ticket_id] - limitbookedcount["limitbookedcount" + item.ticket_id]) - counts["count" + item.ticket_id] <= 0 ? 0 :
                        itemPlus(
                          item.ticket_id,
                          item.discount == 1 ? item.discount_price : item.sale_price,
                          item.ticket_name,
                          item.item_type,
                          item,
                          item.is_limited == 1 ? true : false,

                        ) : '' :
                        itemPlus(
                          item.ticket_id,
                          item.discount == 1 ? item.discount_price : item.sale_price,
                          item.ticket_name,
                          item.item_type,
                          item,
                          item.is_limited == 1 ? true : false,
                        ) : ''

                    }


                  /></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>


        </>
    )
  }
}

export default TicketDetails