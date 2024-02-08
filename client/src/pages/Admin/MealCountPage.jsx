/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, {getAxiosConfig} from '../../utils/axios'
import Table from '../../components/table/Table';
import NotAdmin from './PageComponent/NotAdmin';
import { Grid } from '@mui/material';

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
                <Grid 
                marginTop={2}
                alignItems="center"
                justifyContent="center"
                >
                    <Table data={mealCount} title='Total Meals'/>
                </Grid>
            ):( 
                <NotAdmin/>
            )}
        </>
    )
}

export default MealCountPage