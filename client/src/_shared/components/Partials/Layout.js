import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import Route from "../CustomRoute";
import Main from "../../../Module/Dashboard/Main";
import Page404 from "../Errors/Page404";

const Loading = () => (
  <div className="animated fadeIn pt-1 text-center">Loading...</div>
);

const Layout = () => {
  return (
    <div>
      <Suspense fallback={Loading}>
        <Switch>
          {["/dashboard", "/dashboard/:id"].map((path, idx) => {
            return (
              <Route
                key={idx}
                path={path}
                exact={true}
                name={"Dashboard"}
                isPrivate={true}
                component={Main}
              />
            );
          })}
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Layout;
