import { Provider } from "./state/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home/home";
import Login from "./views/Login/login";
import Signup from "./views/Signup/signup";
import Threads from "./components/threads";
import Thread from "./views/Thread/threadView";
import Store from "./views/Store/store";

import CreateCategory from "./components/modals/createCategory";

import ProtectedRoute from "./components/Protected";

function App() {
  return (
    <div>
      <Provider>
        <div className="App">
          <Router>
            <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <ProtectedRoute exact path="/threads" component={Threads} />
              <ProtectedRoute exact path="/thread" component={Thread} />
              <ProtectedRoute exact path="/store" component={Store} />
            </Switch>
          </Router>
          <CreateCategory />
        </div>
      </Provider>
    </div>
  );
}

export default App;
