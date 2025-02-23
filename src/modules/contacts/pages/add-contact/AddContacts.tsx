import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../Layout/Pages/Navbar/NavBar";
import Heading from "../../../Layout/Components/heading/Heading";
import ErrorMessage from "../../../Layout/Components/error-message/ErrorMessage";
import { IContacts } from "../../models/IContacts";
import { IGroup } from "../../models/IGroup";
import { ContactService } from "../../services/ContactService";
import { ToastUtil } from "../../../../util/ToastUtil";

export const AddContacts: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [groups, setGroups] = useState<IGroup[]>([]);

  const [contact, setContact] = useState<IContacts>({
    name: "",
    photo: "",
    mobile: "",
    company: "",
    email: "",
    title: "",
    groupId: "",
  });

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await ContactService.getAllGroups();
        setGroups(response.data);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Failed to fetch groups";
        setErrorMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await ContactService.createContact(contact);
      if (response?.data) {
        ToastUtil.displaySuccessToast("Contact is Created");
        navigate("/contacts/admin");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Error creating contact";
      setErrorMessage(errorMsg);
      ToastUtil.displayErrorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar color="bg-success" />
     
  
      {loading && "Loading..."}
      
      {/* Show error message if there's an error and hide the form */}
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        
          <section className="mt-3">
            <Heading color="text-dark" heading="Add Contact" />
          <div className="container">
              <div className="row justify-content-center">
              
              {/* Form Section */}
              <div className="col-12 col-md-8 col-lg-5">
                <form onSubmit={handleSubmit}>
                  {[
                    { name: "name", type: "text", placeholder: "Name" },
                    { name: "photo", type: "text", placeholder: "Photo URL" },
                    { name: "mobile", type: "text", placeholder: "Mobile" },
                    { name: "email", type: "email", placeholder: "Email" },
                    { name: "company", type: "text", placeholder: "Company" },
                    { name: "title", type: "text", placeholder: "Title" },
                  ].map(({ name, type, placeholder }) => (
                    <div className="mb-2" key={name}>
                      <input
                        required
                        name={name}
                        value={contact[name as keyof IContacts]}
                        onChange={handleInputChange}
                        type={type}
                        placeholder={placeholder}
                        className="form-control"
                      />
                    </div>
                  ))}
  
                  <div className="mb-2">
                    <select
                      required
                      name="groupId"
                      value={contact.groupId}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select a Group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <div className="mb-2 d-flex gap-2">
                    <button type="submit" className="btn btn-success w-50">
                      Create
                    </button>
                    <Link to="/contacts/admin" className="btn btn-dark w-50">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
  
              {/* Image Preview Section */}
              {contact.photo && (
                <div className="col-12 col-md-4 d-flex justify-content-center">
                  <img
                    src={contact.photo}
                    alt="Contact Preview"
                    className="img-fluid rounded"
                    style={{ maxWidth: "250px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
  

};

export default AddContacts;
