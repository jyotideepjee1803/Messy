import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import MessMenu from '../components/Menu/messMenu';
import axios, { getAxiosConfig } from '../utils/axios';

const BuyCouponPage = () => {
    const [menu, setMenu] = useState([]);
    const [meals, setMeals] = useState([]);

    const [menuData, setMenuData] = useState([]);

    const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}

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
        console.log(newSelected);
        setSelectedItems(newSelected);
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
        
        <button onClick={()=>{
            console.log(selectedItems);
        }}>
            buy
        </button>
      </div>
      </div>
    );
};

export default BuyCouponPage;
