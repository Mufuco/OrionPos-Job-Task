import React, { useState, useEffect } from 'react';
import "./Card.css";
import apiService from '../services/apiService';
import userService from '../services/userService';
import { FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TfiTrash } from "react-icons/tfi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastrService from '../services/toastrService';

const Card = ({ selectedItem }) => {
  const initialFormData = {
    ad: '',
    soyad: '',
    telefon: '',
    id: '0'
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isCardVisible, setIsCardVisible] = useState(false); // Set initial visibility to true

  useEffect(() => {
    if (selectedItem) {
      const [firstName, surName] = selectedItem.name.split(' ');

      setFormData({
        ad: firstName,
        soyad: surName,
        telefon: selectedItem.phoneNumber,
        id: `${selectedItem.id ?? 0}`
      });
    }
  }, [selectedItem]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async () => {  
      const requestData = {
        id: formData.id,
        name: `${formData.ad} ${formData.soyad}`,
        phoneNumber: formData.telefon,
        createdBy: userService.getUserId(),
      };
    
      const response = await apiService.createOrUpdate(requestData, "/PhoneDirectory", "Put");

      if (response) {
       toastrService.succesNotification("Ekleme/güncelleme başarılı.");
      } else {
        toastrService.errorNotification("Ekleme/güncelleme başarısız!");
      }
  
      setTimeout(() => {
        window.location.reload();
      }, 2000);
     
    }
  

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div className="col-md-5 my-5 d-flex flex-column cardDiv vh-100">
      <div className="row h-100">
        <div className="col-md-12 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <input type="text" className="form-control mx-2" placeholder="Search" />     
            <div
              className="logo-container showCard"
              style={{ background: '#F7F7FA', padding: '0.5rem', borderRadius: '5px' }}
              onClick={toggleCardVisibility}
            >
              <FaPlusCircle size={20} />
            </div>
            <div  onClick={toggleCardVisibility} className="logo-container" style={{ background: '#F7F7FA', padding: '0.5rem', borderRadius: '5px' }}>
              <FaPencil size={20} />
            </div>
            <div className="logo-container" id="delete" style={{ background: 'red', padding: '0.5rem', borderRadius: '5px' }}>
              <TfiTrash size={20} />
            </div>
          </div>
        
          {isCardVisible && (
            <div className="d-flex align-items-center justify-content-center flex-grow-1">
              <div className="card" style={{ width: '60%', aspectRatio: '1/1', backgroundColor: 'black', color: 'white' }}>
                <div className="card-body p-0 position-relative">
                  <h2 className="card-title">Yeni Kayıt Ekle</h2>
                  <input
                    type="hidden"
                    value={formData.id}
                    id="DirectoryId"
                  />
                  <div className="d-flex mt-5">
                    <span style={{ margin: '10px 10px 2px 139px', fontSize: '1.2rem', color: '#B5B5B6' }}>Ad</span>
                    <input
                      type="text"
                      className="form-control"
                      id="Name"
                      style={{ width: '55%', marginRight: '1rem', fontSize: '1.2rem' }}
                      value={formData.ad}
                      onChange={(e) => handleInputChange('ad', e.target.value)}
                    />
                  </div>
                  <div className="d-flex mt-5">
                    <span style={{ margin: '10px 15px 2px 98px', fontSize: '1.2rem', color: '#B5B5B6' }}>Soy Ad</span>
                    <input
                      type="text"
                      className="form-control"
                      id="Surname"
                      style={{ width: '55%', marginRight: '1rem', fontSize: '1.2rem', color: '#B5B5B6' }}
                      value={formData.soyad}
                      onChange={(e) => handleInputChange('soyad', e.target.value)}
                    />
                  </div>
                  <div className="d-flex mt-5">
                    <span style={{ margin: '10px 15px 2px 10px', fontSize: '1.2rem', color: '#B5B5B6' }}>Telefon Numarası</span>
                    <input
                      type="text"
                      id="PhoneNumber"
                      className="form-control"
                      style={{ width: '55%', fontSize: '1.2rem' }}
                      value={formData.telefon}
                      onChange={(e) => handleInputChange('telefon', e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-end mt-5" style={{ marginRight: '30px' }}>
                    <button
                      className="btn btn-success rounded-pill me-2"
                      style={{ width: '125px' }}
                      onClick={handleSave}
                    >
                      Kaydet
                    </button>
                    <button
                      className="btn btn-danger rounded-pill"
                      style={{ width: '125px' }}
                      onClick={handleCancel}
                    >
                      Vazgeç
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Card;
