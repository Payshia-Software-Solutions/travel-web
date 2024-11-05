import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// icons
import { IoMdEye, IoMdEyeOff, IoIosClose } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
// styles
import "./signin-model.css";

const SignInModal = ({ showSignInModal, handleCloseSignInModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Modal
  show={showSignInModal}
  onHide={handleCloseSignInModal}
  backdrop="static"
  size="lg"
  keyboard={false}
  style={{ borderRadius: 0 }}
>
  <Modal.Body className="custom-modal-body z-40">
    <div className="main-form relative flex">
      <div className="close-btn-div absolute">
        <button className="close-btn" onClick={handleCloseSignInModal}>
          <IoIosClose />
        </button>
      </div>

      {/* Right Div */}
      <div className="right-div relative">
        <img
          className="login-right"
          src="/images/login-image.png"
          alt="Ceylon Odyssey"
        />
        <div className="right-div-text absolute">
          <div className="right-div-content">
            <p className="have-acc">
              Already have an account?{" "}
              <span className="cursor-pointer font-bold">Sign In</span>
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

      {/* Left Div */}
      <div className="left-div">
        <div className="flex justify-end">
          <img
            className="login-logo"
            src="/images/Logo.png"
            alt="Ceylon Odyssey"
          />
        </div>
        <p className="text-3xl font-medium mb-4">Sign In</p>
        <div className="formfield">
          <Form className="w-full max-w-sm">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <div className="flex items-center border-b border-black-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  placeholder="Email address"
                  aria-label="Email-address"
                  autoFocus
                />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="flex items-center border-b border-black-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
          </Form>
        </div>
        <div className="bottom-div flex justify-between">
          <div
            className="remember flex cursor-pointer"
            onClick={toggleRememberMe}
          >
            {rememberMe ? (
              <MdCheckBox className="mt-1 rem-icon" />
            ) : (
              <MdCheckBoxOutlineBlank className="mt-1 rem-icon" />
            )}
            <span className="ml-1 mt-1 text-gray-500 text-sm">
              Remember me
            </span>
          </div>
          <div className="forget mt-1 cursor-pointer text-gray-500 text-sm">
            Forget Password?
          </div>
        </div>
        <div className="formbtn flex justify-end mt-5">
          <button variant="primary" className="signin-btn">
            Sign In
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

export default SignInModal;
