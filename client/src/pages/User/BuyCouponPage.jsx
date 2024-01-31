/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { getAxiosConfig } from '../../utils/axios';

const BuyCouponPage = () => {
    
    const [menuData, setMenuData] = useState([]);

    const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}
    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config);

        //sort according to day name : 
        let data = response.data;
        data.sort((a,b)=>{return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);

        } catch (error) {
        console.error('Error fetching menu data:', error);
        }
    };

    useEffect(() => {
        fetchMenuData();
    }, []);


    const [selectedItems, setSelectedItems] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        navigate("/");
    };

    const handleCheckboxChange = (meal, dayIndex)=>{
        let mealIndex = mp[meal];
        const newSelected = [...selectedItems];
        newSelected[mealIndex][dayIndex] = !newSelected[mealIndex][dayIndex];
        setSelectedItems(newSelected);
    }
    
    const handleBuy = async()=>{
        const response = await axios.post("/api/user/buyCoupon", {email : loggedInUser.email, selected : selectedItems}, config)
        console.log(response);
    }
    return (
        <div>
        <div>
            {/* Mess Menu */}
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
                        
                        <label htmlFor={`breakfastCheck${index}`}>
                            <input
                            id={`breakfastCheck${index}`}
                            type="checkbox"
                            checked={selectedItems[mp['breakfast'][index]]}
                            onChange={() => handleCheckboxChange('breakfast', index)}
                            />
                            {menu.breakfast}
                        </label>
                        
                    </td>
                    <td>
                       
                        <label htmlFor={`lunchCheck${index}`}>
                            <input
                            id={`lunchCheck${index}`}
                            type="checkbox"
                            checked={selectedItems[mp['lunch'][index]]}
                            onChange={() => handleCheckboxChange('lunch', index)}
                            />
                            {menu.lunch}
                        </label>
                        
                    </td>
                    <td>
                       
                        <label htmlFor={`dinnerCheck${index}`}>
                            <input
                            id={`dinnerCheck${index}`}
                            type="checkbox"
                            checked={selectedItems[mp['dinner'][index]]}
                            onChange={() => handleCheckboxChange('dinner', index)}
                            />
                            {menu.dinner}
                        </label>
                    </td>
                    </tr>
                })}
                </tbody>
            </table>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
        <div>
        
        <button onClick={handleBuy}>
            buy
        </button>
      </div>
      </div>
    );
};

export default BuyCouponPage;
