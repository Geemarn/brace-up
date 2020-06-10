import React from "react";

const Page404 = ({ location, history }) => {
  return (
    <div className="text-center mt-5 pt-5">
      <div>
        <p className="display-1 mb-0">404</p>
      </div>
      <div>
        <i className="far fa-frown-open h1" />
        <span className="text-danger h5 pl-3">
          Oops! Sorry, it seems you're lost.
        </span>
      </div>
      <div>
        <p className="text-muted mb-1">
          The page you are looking for was not found.
        </p>
        <div className=" h5">
          No match found for <code>{location.pathname}</code>
          <p
            onClick={() => history.goBack()}
            className="mt-3 font-weight-bold text-info"
            style={{ cursor: "pointer" }}
          >
            Go Back <i className="fas fa-arrow-right pl-1" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page404;
