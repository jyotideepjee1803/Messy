/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, {getAxiosConfig} from '../../utils/axios'
import Table from '../../components/Menu/Table';
import { Box, Grid, Typography } from '@mui/material';

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
        <Grid
            marginTop={5}
            container 
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            {loggedInUser.isAdmin ? (
                <Box sx={{backgroundColor:'white', borderRadius:1, padding:3, boxShadow:1}}>
                    <Typography variant='h4' sx={{alignSelf:'center' , textAlign: 'center' , marginBottom: '25px'}}>Total Meals</Typography>
                    <Table data={mealCount}/>
                </Box>
            ):( 
                <div>You're not admin</div>
            )}
        </Grid>
    )
}

export default MealCountPage