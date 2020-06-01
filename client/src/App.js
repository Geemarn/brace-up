import React, { Fragment, lazy, Suspense } from "react";
import { Slide, ToastContainer } from "react-toastify";
import Route from "./_shared/components/CustomRoute";
import { Switch } from "react-router-dom";

//styling
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//components
const Auth = lazy(() => import("./Auth"));
const Layout = lazy(() => import("./_shared/components/Partials/Layout"));
const Page404 = lazy(() => import("./_shared/components/Errors/Page404"));

const loading = () => (
  <div className="animated fadeIn pt-5 text-center">Loading...</div>
);

const App = () => {
  return (
    <Fragment>
      <ToastContainer
        containerId={1}
        transition={Slide}
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        enableMultiContainer={false}
        closeOnClick={true}
        rtl={false}
        draggable={false}
        pauseOnHover={true}
        position="bottom-right"
      />
      <Switch>
        <Suspense fallback={loading}>
          <Route exact path="/" name="login" component={Auth} />
          <Route exact path="/register" name="register" component={Auth} />
          <Route
            exact
            path="/404"
            name="Page 404"
            component={Page404}
            isPrivate={false}
          />
          <Route path="/:app" name="layout" component={Layout} />
        </Suspense>
      </Switch>
    </Fragment>
  );
};

export default App;
