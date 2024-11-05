import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const NormalViewPayment = () => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [uploadedDocument, setUploadedDocument] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setUploadedDocument(file);
  };

  const handlePayment = () => {
    // Handle payment based on selected option
  };

  return (
    <div>
      <div class="container max-w-8xl px-4 mx-auto sm:px-8">
        <div class="py-8">
          <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Tour
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      People
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Distance
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Vehicle
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Accomodation
                    </th>
                    <th
                      scope="col"
                      class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div class="flex items-center">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">1</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p class="text-gray-900 whitespace-no-wrap">Acrylic</p>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p class="text-gray-900 whitespace-no-wrap">5</p>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p class="text-gray-900 whitespace-no-wrap">160KM</p>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p class="text-gray-900 whitespace-no-wrap">Car</p>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p class="text-gray-900 whitespace-no-wrap">3 Star</p>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div
                        className="w-20 h-8 pl-[15px] pr-4 py-[9px] bg-[#ff6e05] justify-center items-center inline-flex cursor-pointer"
                        onClick={handleShow}
                      >
                        <div className="w-20 h-8 text-center text-white text-xs font-semibold font-['Open Sans'] leading-9 tracking-tight">
                          Pay Now
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Popup View ======================= */}
      <div>
        <button type="button">Pay Now</button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="lg"
          keyboard={false}
        >
          <Modal.Body>
            <h1 className="mb-4 font-semibold text-2xl">
              Select a Payment Method
            </h1>
            <div className="flex">
              <div className="w-[60%]">
                <input
                  type="radio"
                  id="bankCards"
                  name="paymentOption"
                  value="bankCards"
                  onChange={() => handleOptionChange("bankCards")}
                />
                <label className="ml-2" htmlFor="bankCards">
                  Bank Cards
                </label>
                <br />
                {selectedOption === "bankCards" && (
                  <>
                    <input
                      type="text"
                      className="bg-[#eef2f7] py-3 w-full rounded pl-3"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                    <div className="flex mt-3">
                      <input
                        type="text"
                        className="bg-[#eef2f7] py-3 w-full rounded pl-3 mr-2"
                        placeholder="Expiry Date (MM/YY)"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                      />
                      <input
                        type="text"
                        className="bg-[#eef2f7] py-3 w-full rounded pl-3 ml-2"
                        placeholder="CVV"
                        value={cvv}
                        onChange={handleCvvChange}
                      />
                    </div>
                  </>
                )}
                <br />
                <input
                  type="radio"
                  id="bankTransfer"
                  name="paymentOption"
                  value="bankTransfer"
                  onChange={() => handleOptionChange("bankTransfer")}
                />
                <label className="ml-2" htmlFor="bankTransfer">
                  Bank Transfer
                </label>
                <br />
                {selectedOption === "bankTransfer" && (
                  <input type="file" onChange={handleDocumentUpload} />
                )}
                <div className="mt-4">
                  <button className="py-3 px-5 bg-[#06377b] text-white">
                    Pay
                  </button>
                </div>
              </div>
              <div className="payment-info w-[40%] ml-3">
                <div className="flex">
                  <img src="/images/payment.png" alt="payment" />
                  <div className="ml-2">
                    <h4 className="text-[#06377b] text-sm font-semibold">
                      Experience the natural beauty of island
                    </h4>
                    <h4 className="text-[#000] text-sm font-semibold">
                      7D / 6D
                    </h4>
                  </div>
                </div>
                <div className="div shadow rounded mt-5 w-[75%] ml-5 h-[5rem]">
                  <h3 className="font-medium flex justify-center">
                    Your Estimated Budget
                  </h3>
                  <h1 className="font-bold text-4xl text-[#06377b] flex justify-center mt-2">
                    $927
                  </h1>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="text-sm text-[#06377b]"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default NormalViewPayment;
