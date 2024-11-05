import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { IoMdEye, IoMdEyeOff, IoIosClose } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import "./signup-modal.css";

const SignUpModal = ({ showSignUpModal, handleCloseSignUpModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConPasswordVisibility = () => {
    setShowConPassword(!showConPassword);
  };

  return (
    <Modal
      show={showSignUpModal}
      onHide={handleCloseSignUpModal}
      backdrop="static"
      size="lg"
      keyboard={false}
      style={{ borderRadius: 0 }}
    >
      <Modal.Body className="custom-modal-body z-40">
        <div className="main-form relative flex">
          <div className="close-btn-div absolute">
            <button className="close-btn" onClick={handleCloseSignUpModal}>
              <IoIosClose />
            </button>
          </div>

          <div className="right-div relative">
            <img
              className="login-right-s"
              src="/images/register-image.png"
              alt="Ceylon Odyssey"
            />
            <div className="right-div-text absolute">
              <div className="right-div-content">
                <p className="have-acc">
                  Already have an account?{" "}
                  <span className="cursor-pointer font-bold">Sign Up</span>
                </p>
                <div className="right-div-buttons">
                  <button className="social-google-btn flex">
                    <FcGoogle className="social-icon mt-1 mr-2" />
                    <span className="text-md">Google</span>
                  </button>
                  <button className="social-facebook-btn flex">
                    <MdFacebook className="social-icon social-icon-fb mt-1 mr-2" />
                    <span className="text-md">Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="left-div">
            <div className="flex justify-end">
              <img
                className="login-logo"
                src="/images/Logo.png"
                alt="Ceylon Odyssey"
              />
            </div>
            <p className="text-3xl font-medium lg:mb-5">Sign Up</p>
            <div className="formfield">
              <Form className="w-full max-w-sm">
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <div className="flex items-center border-b border-black-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none input-field-ph"
                          type="text"
                          placeholder="First Name"
                          aria-label="First-name"
                          autoFocus
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="exampleForm.ControlInput2">
                      <div className="flex items-center border-b border-black-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none input-field-ph"
                          type="text"
                          placeholder="Last Name"
                          aria-label="Last-name"
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <Form.Group controlId="exampleForm.ControlInput3">
                      <div className="flex items-center border-b border-black-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none input-field-ph"
                          type="email"
                          placeholder="Email"
                          aria-label="email"                          
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="exampleForm.ControlInput4">
                      <div className="flex items-center border-b border-black-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none input-field-ph"
                          type="text"
                          placeholder="Phone Number"
                          aria-label="Phone-number"                          
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <div className="flex items-center border-b border-black-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none input-field-ph"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="outline-none focus:outline-none"
                        >
                          {showPassword ? (
                            <IoMdEyeOff className="text-gray-400" />
                          ) : (
                            <IoMdEye className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="exampleForm.ControlTextarea2">
                      <div className="flex items-center border-b border-black-500 py-2">
                        <input
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none input-field-ph"
                          type={showConPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          aria-label="Confirm-Password"
                        />
                        <button
                          type="button"
                          onClick={toggleConPasswordVisibility}
                          className="outline-none focus:outline-none"
                        >
                          {showConPassword ? (
                            <IoMdEyeOff className="text-gray-400" />
                          ) : (
                            <IoMdEye className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </div>
            <div className="formbtn flex justify-end mt-5">
              <button variant="primary" className="signin-btn">
                Sign Up
              </button>
            </div>
            <div className="bottom-text">
              Protected by reCAPTCHA and subject to the{" "}
              <span className="bottom-text-color">
                {" "}
                Ceylon odyssey Privacy Policy{" "}
              </span>{" "}
              and <span className="bottom-text-color"> Terms of Service.</span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
