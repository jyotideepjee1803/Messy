/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, { getAxiosConfig } from '../../utils/axios';
import Table from '../../components/table/Table';
import { Container, Grid, Typography } from '@mui/material';
import AppWidget from './PageComponent/AppWidget';
import AppLoader from '../../components/Loaders/AppLoader';

const MessMenuPage = () => {
 
    const [menuData, setMenuData] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [loadingMenu , setloadingMenu] = useState(false);
    const [loadingMeal , setloadingMeal] = useState(false);
    


    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2};

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config);

        //sort according to day name : 
        let data = response.data;
        data.sort((a, b) => {return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);
        setloadingMenu(false);
        

        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    const fetchMealData = async()=>{
        try{
            const response = await axios.get('api/user/getmeal', config);
            let data = response.data;
            data.sort((a,b)=>{return mp[a.mealName] - mp[b.mealName]})
            setMealData(data);
            setloadingMeal(false);
        }catch(error){
            console.error('Error fetching menu data:', error);
        }
    }

    useEffect(()=>{
        setloadingMenu(true);
        fetchMenuData();
    },[])

    useEffect(()=>{
        setloadingMeal(true);
        fetchMealData();
    },[])

    return (
        <>
        {loadingMeal || loadingMenu ? <AppLoader/> : 
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back 👋
            </Typography>
            <Grid container justifyContent="center" spacing={3} mb={3}>
 
            {mealData.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <AppWidget
                        loading = {loadingMeal}
                        title={item.mealName}
                        time={item?.time}
                        color="success"
                        icon={<img alt="icon" src={`/assets/icons/glass/ic_${item.mealName}.jpg`} />}
                    />
                </Grid>
            ))}
    
            </Grid>
            <Table data={menuData} loading={loadingMenu} title='Mess Menu' />

        </Container>
    }
    </>
)}

export default MessMenuPage