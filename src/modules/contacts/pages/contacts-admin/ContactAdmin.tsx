import React, { useEffect, useState } from "react";
import NavBar from "../../../Layout/Pages/Navbar/NavBar";
import Heading from "../../../Layout/Components/heading/Heading";
import { Link } from "react-router-dom";
import { IContacts } from "../../models/IContacts";
import { ContactService } from "../../services/ContactService";
import ContactsCard from "../../components/ContactsCard";
import { ToastUtil } from "../../../../util/ToastUtil";


export const ContactAdmin: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [state, setState] = useState({
    loading: false,
    contacts: [] as IContacts[],
    filteredContacts: [] as IContacts[],
    errorMessage: "",
  });

  useEffect(() => {
    getAllContactFromServer();
  }, []);


  const makeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    if (event.target.value.trim() !== "") {
      setState({
        ...state,
        filteredContacts: state.contacts.filter(contacts => contacts.name.toLowerCase().trim().includes(event.target.value.toLowerCase().trim()))
      })

    }
    else {
      setState({
        ...state,
        filteredContacts: state.contacts
      })
    }

  }

  const getAllContactFromServer = () => {
    setState({ ...state, loading: true });
    ContactService.getAllContacts()
      .then((response) => {
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        });
      })
      .catch((error) => {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      });
  };
  const { loading, errorMessage, filteredContacts } = state;


  const clickDeleteContact = (contactId: string | undefined): void => {
    if (contactId) {
      ContactService.deleteContacts(contactId).then((response) => {
        if (response.data) {
          getAllContactFromServer();
          ToastUtil.displayInfoToast("Contact is Deleted!")
        }
      }).catch((error) => {
        ToastUtil.displayErrorToast(error.messages)
      })
      getAllContactFromServer()
    }

  }
  return (
    <>


      <NavBar color={"bg-dark"} />
      <Heading color={"text-dark"} heading={"Contact Manager"} />

      {!loading && errorMessage.length > 0}
      {/* <pre>{JSON.stringify(state.filteredContacts.length) }</pre> */}
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <form>
              <input
                value={searchQuery}
                onChange={e => makeSearch(e)}
                type="text"
                className="form-control"
                placeholder="Search here"
              />
            </form>
          </div>
          <div className="col-12 col-md-3 mt-2 mt-md-0 d-flex flex flex-sm-col align-items-sm-center gap-2">
            <input type="submit" className="btn btn-dark w-100 w-sm-auto" value="Search" />
            <Link to={"/contacts/add"} className="btn btn-success w-100 w-sm-auto">
              <i className="bi bi-plus-circle-fill"></i> New
            </Link>
          </div>
        </div>

      </div>

      {/* <pre>{ JSON.stringify(contacts)}</pre> */}

      {filteredContacts.length > 0 ? (
        <section className="mt-3">
          <div className="container">
            <div className="row">
              {filteredContacts.map((contact, index) => {
                return (
                  <div className="col-sm-6  mt-3" key={contact.id}>
                    {contact && <ContactsCard contact={contact} clickDeleteContact={clickDeleteContact} />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="container mt-3">
            <div className="row">
              <div className="col text-center">
                <p className="h4 text-danger">
                  {loading ? "Loading..." : errorMessage ? "Server Error" : "No Contacts Found"}
                </p>
              </div>
            </div>
          </div>

        </>
      )}
    </>
  );
};
export default ContactAdmin;
