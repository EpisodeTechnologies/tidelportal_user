import "./App.css";
import "./mobileview.css";
// import SideNav from './Component/SideNav'
import BuyTickert from "./Component/BuyTickert";
import TicketManager from "./Component/TicketManager";
import checkout from "./Component/checkout";
import Profile from "./Component/Profile";
import ProfileEdit from "./Component/ProfileEdit";
import Login from "./Component/Login";
import ResetPassword from "./Component/ResetPassword";
import Changepassword from "./Component/changepassword";
import Otpverify from "./Component/Otpverify";
import About from "./Component/About";
import customerService from "./Component/customerService";
import notifications from "./Component/Notification"
import TermsAndConditions from "./Component/termsAndConditions";
import { BrowserRouter as Router,HashRouter, Switch, Route } from "react-router-dom";
import PrivacyPolicy from "./Component/privacy_pilicy";
import TicketDetails from "./Component/TicketDetails";

function App() {
  return (
    <>  
   
      <HashRouter >
        <Switch>
          <Route exact path="/" component={BuyTickert} ></Route>
          <Route path="/ticketmanager" component={TicketManager} ></Route>
          <Route path="/checkout" component={checkout} ></Route>
          <Route path="/about" component={About} ></Route>
          <Route path="/customerService" component={customerService} ></Route>
          <Route path="/profile" component={Profile} ></Route>
          <Route path="/login" component={Login} ></Route>
          <Route path="/reset-password" component={ResetPassword} ></Route>
          <Route path="/change-password" component={Changepassword} ></Route>
          <Route path="/createaccount" component={Otpverify} ></Route>
          <Route path="/notifications" component={notifications} ></Route>
          <Route path="/editprofile" component={ProfileEdit} ></Route>
          <Route path="/terms-and-conditions" component={TermsAndConditions} ></Route>
          <Route path="/privacy-policy" component={PrivacyPolicy} ></Route>
          <Route path="/details" component={TicketDetails} ></Route>
          
        </Switch>
      </HashRouter> 

      {/* <TicketManager/> */}
    </>
  );
}

export default App;
