import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import "./Leftbar.css";
import { TfiViewList } from "react-icons/tfi";
function Leftbar() {
  return (
    <div className="col-md-3 my-5 vh-100">
      <DropdownButton id="split-button" title="Kişiler" variant="dark" className="text-left">
        <Dropdown.Item href="#/action-1" className="my-dropdown-item">
        <TfiViewList size= {20} /> Telefon Rehberi
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default Leftbar;
