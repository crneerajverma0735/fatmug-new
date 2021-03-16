import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import Navbars from "./components/navbar/Navbar";
import Alert from "./components/alert/Alert";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import WriteArticle from "./components/writeArticle/WriteArticle";
import YourArticle from "./components/yourArticle/YourArticle";
import Publish from "./components/publish/Publish";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='container-fluid main'>
        <Router>
          <Navbars />
          <Alert />
          <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute exact path='/home' component={Home} />

            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/your-article' component={YourArticle} />
            <PrivateRoute exact path='/publish' component={Publish} />

            <PrivateRoute
              exact
              path='/write-article'
              component={WriteArticle}
            />
            <Route path='*' component={Login} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
