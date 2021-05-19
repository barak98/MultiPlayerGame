
import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from './PrivateRoute';
import ForgetPassword from "./ForgetPassword";
import UpdateProfile from "./UpdateProfile";

import Join from '../components/Join/Join';
import Chat from '../components/Chat/Chat';


function App() {

  return (
      <div >
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Chat} />
              <PrivateRoute path="/upadate-profile" component={UpdateProfile}/>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/loginchat" component={Join} />
              <Route path="/forget-password" component= {ForgetPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
