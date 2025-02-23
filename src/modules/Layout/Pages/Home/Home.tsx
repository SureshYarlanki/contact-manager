import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <div className="landing d-flex align-items-center justify-content-center text-center vh-100">
        <div className="container">
          <h1 className="text-white display-4 display-md-2 display-lg-1 fw-bold">
            Contacts Manager App
          </h1>

          <Link to={"contacts/admin"}>
            <button className="btn btn-success mt-4 px-4 py-2 w-10 w-md-50 w-lg-25">
              Manage Contacts
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
