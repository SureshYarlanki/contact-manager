import React from "react";
import { Link } from "react-router-dom";
import { IContacts } from "../models/IContacts";

interface IProps {
  contact: IContacts;
  clickDeleteContact: (contactId: string | undefined) => void;
}

export const ContactsCard: React.FC<IProps> = (props) => {
  const { contact, clickDeleteContact } = props;
  
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
            <img className="img-fluid rounded w-100" src={contact.photo} alt="Contact" />
          </div>

          {/* Contact Details */}
          <div className="col-12 col-md-8">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Name:</strong> <span className="fw-bold">{contact.name}</span>
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> <span className="fw-bold text-break">{contact.email}</span>
              </li>
              <li className="list-group-item">
                <strong>Mobile:</strong> <span className="fw-bold">{contact.mobile}</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="col-12 col-md-1 d-flex flex-md-column justify-content-center align-items-center gap-2 mt-2">
            <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning">
              <i className="bi bi-eye-fill"></i>
            </Link>
            <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary">
              <i className="bi bi-pencil-square"></i>
            </Link>
            <button className="btn btn-danger" onClick={() => clickDeleteContact(contact.id)}>
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsCard;
