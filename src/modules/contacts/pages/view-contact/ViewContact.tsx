import React, { useEffect, useState } from "react";
import NavBar from "../../../Layout/Pages/Navbar/NavBar";
import Heading from "../../../Layout/Components/heading/Heading";
import { Link, useParams } from "react-router-dom";
import { IContacts } from "../../models/IContacts";
import { ContactService } from "../../services/ContactService";
import { IGroup } from "../../models/IGroup";

interface IState {
  loading: boolean;
  contact: IContacts;
  errorMessage: string;
  group: IGroup;
}

export const ViewContact: React.FC = () => {
  const { contactId } = useParams();
  const [state, setState] = useState<IState>({
    loading: false,
    contact: {} as IContacts,
    errorMessage: "",
    group: {} as IGroup,
  });

  useEffect(() => {
    if (contactId) {
      getContactFromServer(contactId);
    }
  }, [contactId]);

  const getContactFromServer = (contactId: string) => {
    setState({ ...state, loading: true });
    ContactService.getContact(contactId)
      .then((contactResponse) => {
        const contact = contactResponse.data;
        ContactService.getGroup(contact)
          .then((groupResponse) => {
            const group = groupResponse.data;
            setState({
              ...state,
              loading: false,
              contact: contact,
              group: group,
            });
          })
          .catch((error) => {
            console.log(error);
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
  const { loading, errorMessage, contact, group } = state;
  return (
    <>
      {loading && "Loading..."}
      <NavBar color={"bg-dark"} />
      <Heading color={"text-success"} heading={"View Contact"} />
      {!loading && errorMessage.length > 0}
      {contact &&
        group &&
        Object.keys(contact).length > 0 &&
        Object.keys(group).length > 0 && (
          <section className="mt-3">
            <div className="container">
              <div className="row mt-3 justify-content-center">
                {/* Contact Image Section */}
                <div className="col-12 col-md-4 text-center">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded-circle mt-3 shadow"
                    alt="Contact"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>
                {/* Contact Details Section */}
                <div className="col-12 col-md-6 mt-3">
                  <ul className="list-group">
                    <li className="list-group-item">
                      Name: <span className="fw-bold">{contact.name}</span>
                    </li>
                    <li className="list-group-item">
                      Email: <span className="fw-bold"> {contact.email}</span>
                    </li>
                    <li className="list-group-item">
                      Mobile: <span className="fw-bold"> {contact.mobile}</span>
                    </li>
                    <li className="list-group-item">
                      Company: <span className="fw-bold"> {contact.company}</span>
                    </li>
                    <li className="list-group-item">
                      Title: <span className="fw-bold"> {contact.title}</span>
                    </li>
                    <li className="list-group-item">
                      Group: <span className="fw-bold">{group.name}</span>
                    </li>
                </ul>
                <div className="row mt-3 ">
                <div className="col  ">
                  <Link to="/contacts/admin" className="btn btn-dark">
                    <i className="bi bi-arrow-left-circle"></i> Back
                  </Link>
                </div>
              </div>
              </div>
              <div className="col-12 col-md-2 mt-3"></div>
              </div>
              {/* Back Button Section */}
              
            </div>
          </section>
        )}
    </>
  );
};
export default ViewContact;
