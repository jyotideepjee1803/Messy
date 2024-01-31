import React, { useState, useEffect } from 'react';
import axios, { getAxiosConfig } from '../../utils/axios';

const MessMenu = ({ route }) => {
  const [menuData, setMenuData] = useState([]);

  
  const fetchMenuData = async () => {
    const loggedInUser = await JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    try {
      const response = await axios.get('api/user/getmenu', config);
      setMenuData(response.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <div>
      <h2>Mess Menu</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((menu, index) => {
            return <tr key={index}>
              <td>{menu.day}</td>
              <td>
                    {menu.breakfast}
              </td>
              <td>
                    {menu.lunch}
              </td>
              <td>
                    {menu.dinner}
  
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MessMenu;
