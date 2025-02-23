import React, { useEffect, useState } from "react";
import NavBar from "../../../Layout/Pages/Navbar/NavBar";
import Heading from "../../../Layout/Components/heading/Heading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IGroup } from "../../models/IGroup";
import { ContactService } from "../../services/ContactService";
import { IContacts } from "../../models/IContacts";
import { ToastUtil } from "../../../../util/ToastUtil";

export const EditContact: React.FC = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [state, setState] = useState({
    loading: false,
    errorMessage: "",
    contact: {
      name: "",
      photo: "",
      mobile: "",
      company: "",
      email: "",
      title: "",
      groupId: "",
    } as IContacts,
  });

  useEffect(() => {
    getAllGroupsFromServer();
  }, []);

  useEffect(() => {
    if (contactId) {
      getContactFromServer(contactId);
    }
  }, [contactId]);

  const getAllGroupsFromServer = () => {
    ContactService.getAllGroups()
      .then((response) => setGroups(response.data))
      .catch((error) => console.log(error));
  };

  const getContactFromServer = (contactId: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    ContactService.getContact(contactId)
      .then((response) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          contact: response.data,
        }));
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          errorMessage: error.message,
        }));
      });
  };

  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState((prev) => ({
      ...prev,
      contact: { ...prev.contact, [event.target.name]: event.target.value },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactId) {
      ContactService.updateContact(state.contact, contactId)
        .then((response) => {
          if (response && response.data) {
            navigate("/contacts/admin");
            ToastUtil.displaySuccessToast("Contact is Updated!");
          }
        })
        .catch((error) => {
          ToastUtil.displayErrorToast(error.message);
        });
    }
  };

  const { loading, contact } = state;

  return (
    <>
      {loading && "Loading..."}
      <NavBar color={"bg-success"} />
      <Heading color={"text-primary"} heading={"Edit Contact"} />

      <section className="mt-3">
        <div className="container">
          <div className="row ">
            {/* Contact Image Section */}
            <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center justify-content-center">
              {contact.photo && (
                <img
                  src={contact.photo}
                  alt="Contact"
                  className="img-fluid rounded-circle d-block mx-auto shadow"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              )}
            </div>
            {/* Contact Form Section */}
            <div className="col-12 col-md-6 col-lg-6">
              <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
                <div className="mb-2">
                  <input
                    required
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text"
                    placeholder="Name"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    type="text"
                    placeholder="Photo URL"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    type="text"
                    placeholder="Mobile"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    type="text"
                    placeholder="Company"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    type="text"
                    placeholder="Title"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <select
                    required
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    className="form-select"
                  >
                    <option value="">Select a Group</option>
                    {groups.map((group, index) => (
                      <option key={index} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2 d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <Link to="/contacts/admin" className="btn btn-dark">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>

            
          </div>
        </div>
      </section>
    </>
  );
};

export default EditContact;
