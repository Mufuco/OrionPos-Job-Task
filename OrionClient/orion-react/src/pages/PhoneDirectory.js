import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from '../components/List.js';
import Card from '../components/Card.js';
import Leftbar from '../components/Leftbar.js';
import "./PhoneDirectory.css"

const PhoneDirectory = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelected = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <Leftbar />
        <List onItemSelected={handleItemSelected} />
        <Card selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default PhoneDirectory;
