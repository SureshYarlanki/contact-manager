import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/Layout/Pages/Home/Home";
import ContactAdmin from "./modules/contacts/pages/contacts-admin/ContactAdmin";
import AddContacts from "./modules/contacts/pages/add-contact/AddContacts";
import EditContact from "./modules/contacts/pages/edit-contact/EditContact";
import ViewContact from "./modules/contacts/pages/view-contact/ViewContact";
import { ToastContainer } from "react-toastify";
import NotFound404 from "./modules/Layout/Pages/Not-found/NotFound404";

const App = () => {
  return (
    <>
      < ToastContainer

        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable pauseOnHover theme="light"

      />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/contacts/admin"} element={<ContactAdmin />} />
          <Route path={"/contacts/add"} element={<AddContacts />} />
          <Route path={"/contacts/edit/:contactId"} element={<EditContact />} />
          <Route path={"/contacts/view/:contactId"} element={<ViewContact />} />
          {/* <Route path={"*"} element={<ErrorMessage/>} /> */}
          <Route path={'*'} element={<NotFound404/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
