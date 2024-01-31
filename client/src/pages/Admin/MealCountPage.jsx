/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, {getAxiosConfig} from '../../utils/axios'
import Table from '../../components/Menu/Table';

const MealCountPage = () => {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const [mealCount, setMealCount] = useState([]);

    const fetchMealCount = async () => {      
        try {
        const response = await axios.get('api/admin/totalmeal', config);
        setMealCount(response.data)
        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    useEffect(()=>{
        fetchMealCount();
    },[])

    return (
        <>
            {loggedInUser.isAdmin ? (
                // <>
                //     <MessMenu count={mealCount}/>
                // </>
                <Table data={mealCount}/>
            ):( 
                <div>You're not admin</div>
            )}
        </>
    )
}

export default MealCountPage