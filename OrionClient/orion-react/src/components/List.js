import React, { useState, useEffect } from 'react';
import './List.css';
import apiService from '../services/apiService';
import userService from '../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import toastrService from '../services/toastrService';

const List = ({ onItemSelected }) => {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  

  const requestData = {
    UserId: userService.getUserId(),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.fetchData(requestData, "/PhoneDirectory", "Post");
        const itemsWithSelected = response.map(item => ({ ...item, selected: false }));
        setData(itemsWithSelected);
      } catch (error) {
       
      }
    };

    fetchData();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedData = data.map(item => ({
      ...item,
      selected: !selectAll,
    }));
    setData(updatedData);
  };

  const handleCheckboxChange = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });

    setData(updatedData);
  };

  const handleDeleteClick =  () => { 
    const selectedItems = data.filter(item => item.selected);

    if (selectedItems.length === 0) {
      return;
    }

    const dataArray = selectedItems.map((item) => item.id);  
      const response =  apiService.createOrUpdate(dataArray, "/PhoneDirectory", "DELETE");
    if(response){
     toastrService.succesNotification("Silme işlemi başarılı.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    else{
    toastrService.errorNotification("Silme işlemi başarısız!");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
     
  };

  useEffect(() => {
    const deleteDiv = document.querySelector('#delete');
    if (deleteDiv) {
      deleteDiv.addEventListener('click', handleDeleteClick);
    }

    return () => {
      deleteDiv.removeEventListener('click', handleDeleteClick);
    };
  }, [data]);

  return (
    <div className="col-md-4 my-5 vh-100 listDiv">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check mr-2 form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <label className="form-check-label"></label>
              </div>
            </th>
            <th className="font-weight-bold">Ad Soyad</th>
            <th className="font-weight-bold">Telefon Numarası</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => onItemSelected(item)}>
              <td>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`${item.id}`}
                    checked={item.selected || false}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <label className="form-check-label" htmlFor={`${item.id}`}></label>
                </div>
              </td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
  );
}

export default List;
