import React, { useState } from "react";
import "./index.scss";
import formImage from "../../asset/image2.png";
const Form = ({ utilityFunctions }) => {
  let { changeData, setActivePage } = utilityFunctions;

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    checked: "",
  });
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  //function to validate the email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //function to validate the phone number
  function validatePhone(phone) {
    return String(phone).match(/^\d{10}$/);
  }

  //function to validate that all the fields are filled
  function validateForm() {
    let isValid = true;
    setFormErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      checked: "",
    });

    Object.entries(formDetails).forEach(([key, value]) => {
      if (value.length === 0) {
        isValid = false;
        setFormErrors((prev) => ({
          ...prev,
          [`${key}`]: `${
            key === "confirmPassword" ? "password match" : key
          } is required`,
        }));
      }
    });
    return isValid;
  }

  function setError(errortype) {
    switch (errortype) {
      case "email":
        setFormErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email",
        }));
        break;
      case "confirmPassword":
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: "Password does not match",
        }));
        break;
      case "phone":
        setFormErrors((prev) => ({
          ...prev,
          phone: "Invalid Phone Number",
        }));
        break;
      case "checked":
        setFormErrors((prev) => ({
          ...prev,
          checked: "Please accept the terms and conditions",
        }));
        break;

      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // is all the fields are filled
    if (!validateForm()) return;
    // is the email is valid
    if (!validateEmail(formDetails.email)) return setError("email");
    // is password is valid
    if (formDetails.password !== formDetails.confirmPassword)
      return setError("confirmPassword");
    // is the phone number is valid
    if (!validatePhone(formDetails.phone)) return setError("phone");
    // is terms and conditions are checked
    if (!isTermsChecked) return setError("checked");

    //* if we all the checks are passed
    changeData();
    setActivePage("bar-chart");
  };

  return (
    <div className="wrapper">
      <div className="form-image-container">
        <img className="form-image" src={formImage} alt="date range image" />
        <section className="form-text-wrapper">
          <h2>Choose a date range</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
            obcaecati illum eum, impedit
          </p>
        </section>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <h3>Create an account</h3>
        <div className="input-wrapper">
          <p className="input-label">Your email address</p>
          <input
            className="input"
            value={formDetails.email}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            type="text"
          />
          {formErrors.email && (
            <span className="input-err">{formErrors.email}</span>
          )}
        </div>
        <div className="input-wrapper">
          <p className="input-label">Your password</p>
          <input
            className="input"
            value={formDetails.password}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            type="text"
          />
          {formErrors.password && (
            <span className="input-err">{formErrors.password}</span>
          )}
        </div>
        <div className="input-wrapper">
          <p className="input-label">Confirm your password</p>
          <input
            className="input"
            value={formDetails.confirmPassword}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));
            }}
            type="password"
          />
          {formErrors.confirmPassword && (
            <span className="input-err">{formErrors.confirmPassword}</span>
          )}
        </div>
        <div className="input-wrapper">
          <p className="input-label">Your full name</p>
          <input
            className="input"
            value={formDetails.name}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            type="text"
          />
          {formErrors.name && (
            <span className="input-err">{formErrors.name}</span>
          )}
        </div>
        <div className="input-wrapper input-wrapper__phone">
          <p className="input-label">Your phone number</p>
          <input
            className="input input__phone"
            value={formDetails.phone}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                phone: e.target.value,
              }));
            }}
            type="text"
          />
          {formErrors.phone && (
            <span className="input-err input-err--half">
              {formErrors.phone}
            </span>
          )}
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="terms-checkbox"
            name="terms-checkbox"
            value={isTermsChecked}
            onChange={(e) => setIsTermsChecked(e.target.checked)}
          />
          <label for="terms-checkbox">
            I read and agree Terms and Conditions
          </label>
          {formErrors.checked && (
            <span className="input-err">{formErrors.checked}</span>
          )}
        </div>
        <div className="button-wrapper">
          <button>Create account</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
