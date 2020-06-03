import React, { Suspense } from "react";
import StyledMain from "../../styles/main";
import Route from "../CustomRoute";
import Main from "../../../Module/Dashboard/Main";

const Loading = () => (
  <div className="animated fadeIn pt-1 text-center">Loading...</div>
);

const Layout = () => {
  return (
    <div>
      <StyledMain>
        <Suspense fallback={Loading}>
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
        </Suspense>
      </StyledMain>
    </div>
  );
};

export default Layout;
