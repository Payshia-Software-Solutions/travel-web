"use client";
import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
//components
import DetailsTable from "../Components/user-dashboard/table/user-dashboard";
import userSettings from "../Components/user-dashboard/user-settings/userSettings";
//icons
import { MdHomeFilled } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

//style-sheet
import "./user-dashboard.css";
import NormalViewPayment from "../Components/payment/normal-view/normal-view";

export default function TravelPlan() {

  return (
    <div>
      <div className="side-nav-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="tab-board">
            <Col>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="nav-item">
                  <Nav.Link
                    className="nav-link flex"
                    eventKey="first"
                    style={{
                      fontWeight: "100",
                      fontFamily: "Lucida Sans",
                      fontSize: "15px"
                    }}
                  >
                    <MdHomeFilled className="mt-[3px] mr-2" />
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="nav-link flex"
                    eventKey="second"
                    style={{
                      fontWeight: "100",
                      fontFamily: "Lucida Sans",
                      fontSize: "15px"
                    }}
                  >
                    <FaCreditCard className="mt-[3px] mr-2" />
                    Payments
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="nav-link flex"
                    eventKey="third"
                    style={{
                      fontWeight: "100",
                      fontFamily: "Lucida Sans",
                      fontSize: "15px"
                    }}
                  >
                    <IoSettingsSharp className="mt-[3px] mr-2" />
                    Settings
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            {/* =============================== Content ================================= */}
            <Col sm={9}>
              <Tab.Content className="tab-content">
                <Tab.Pane
                  eventKey="first"
                  style={{
                    fontWeight: "100",
                    fontFamily: "Lucida Sans",
                    fontSize: "15px"
                  }}
                >
                  <DetailsTable />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="second"
                  style={{
                    fontWeight: "100",
                    fontFamily: "Lucida Sans",
                    fontSize: "15px"
                  }}
                >
                  <NormalViewPayment />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="third"
                  style={{
                    fontWeight: "100",
                    fontFamily: "Lucida Sans",
                    fontSize: "15px"
                  }}
                >
                  <userSettings />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
