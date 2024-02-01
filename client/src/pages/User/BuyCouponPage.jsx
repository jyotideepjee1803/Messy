/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { getAxiosConfig } from '../../utils/axios';

const BuyCouponPage = () => {
    
    const [menuData, setMenuData] = useState([]);
    const [coupon, setCoupon] = useState();
    // const [loading, setLoading] = useState(false);
    const [mealCost, setMealCost] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0
    });
    const [total , setTotal] = useState();



    var date = new Date();
    var currentDateTime = date.toISOString(); 

    const getDayDifference = (dateString1, dateString2) => {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);

        const timeDifference = Math.abs(date2.getTime() - date1.getTime());

        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return daysDifference;
    }



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



    const fetchCoupon = async()=>{
        try{
            const couponRes = await axios.post('api/user/getcoupon', {email : loggedInUser.email}, config);
            setCoupon(couponRes.data);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        fetchCoupon();
    },[])

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

        handleCost();
    }
    

    const handleBuy = async()=>{
        const response = await axios.post("/api/user/buyCoupon", {email : loggedInUser.email, selected : selectedItems}, config)
        // console.log(response);
        navigate('/pay', { state: { total } });
    }



    const check = async()=>{
        const response = await axios.get("api/user/getmeal" , config);
        // console.log(res);
        const breakfastCost = response.data.find(meal => meal.mealName === 'breakfast').cost;
        const lunchCost = response.data.find(meal => meal.mealName === 'lunch').cost;
        const dinnerCost = response.data.find(meal => meal.mealName === 'dinner').cost;
        setMealCost({
            breakfast: breakfastCost,
            lunch: lunchCost,
            dinner: dinnerCost
        });
    }



    const handleCost = () => {

       check();
        
        let totalCost = 0;

        // Calculate total cost based on selected checkboxes
        selectedItems[mp['breakfast']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost +=mealCost.breakfast; 
            }
        });

        selectedItems[mp['lunch']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost += mealCost.lunch;
            }
        });

        selectedItems[mp['dinner']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost += mealCost.dinner; 
            }
        });
        setTotal(totalCost);
    };



    return (
        <div>
            {!coupon || ((coupon.taken===true && getDayDifference(currentDateTime, coupon.updatedAt) >=5) || coupon.taken===false) ? 
            (
            <>
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
                <button onClick={handleBuy}>
                    buy
                </button>

                <div>
            </div>
            <div>
                <p>Total Cost: ${total}</p>
                <p>Breakfast: ${mealCost.breakfast}</p>
                <p>Lunch: ${mealCost.lunch}</p>
                <p>Dinner: ${mealCost.dinner}</p>
            </div>
            </>
            ) : (
                <div>
                    You've already bought coupon
                </div>
            )}
        </div>
    );
};

export default BuyCouponPage;
