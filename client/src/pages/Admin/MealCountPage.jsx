/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, {getAxiosConfig} from '../../utils/axios'
import Table from '../../components/table/Table';
import NotAdmin from './PageComponent/NotAdmin';
import { Grid } from '@mui/material';
import AppLoader from '../../components/Loaders/AppLoader';

const MealCountPage = () => {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const [mealCount, setMealCount] = useState([]);
    const [loadingMeal , setloadingMeal] = useState(false);

    const fetchMealCount = async () => {      
        try {
        const response = await axios.get('api/admin/totalmeal', config);
        setMealCount(response.data)
        setloadingMeal(false);
        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    useEffect(()=>{
        setloadingMeal(true);
        fetchMealCount();
    },[])

    return (
        <>
        {loadingMeal ? <AppLoader/> : 
            <Grid 
            marginTop={2}
            alignItems="center"
            justifyContent="center"
            pb={5}
        >
            {loggedInUser.isAdmin ? (
             <Table data={mealCount} title='Total Meals'/>
            ):( 
                <NotAdmin/>
            )}
            </Grid>
        }
        </>
    )
}

export default MealCountPage