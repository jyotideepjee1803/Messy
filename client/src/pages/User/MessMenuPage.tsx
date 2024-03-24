/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, { getAxiosConfig } from '../../utils/axios';
import Table from '../../components/table/Table';
import { Container, Grid, Typography } from '@mui/material';
import AppWidget from './PageComponent/AppWidget';
import AppLoader from '../../components/Loaders/AppLoader';
import { AxiosRequestConfig } from 'axios';

interface MenuData {
    day : string;
    breakfast : string;
    lunch : string;
    dinner : string;
  }
  
interface MealData {
    mealName: string;
    time: string;
    cost : number;
}

const MessMenuPage = () => {
 
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const [mealData, setMealData] = useState<MealData[]>([]);
    const [loadingMenu , setloadingMenu] = useState<boolean>(false);
    const [loadingMeal , setloadingMeal] = useState<boolean>(false);
    
    const sortIdx: Record<string, number> = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const mp: Record<string, number> = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2};

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") as string);
    const config = getAxiosConfig({ loggedInUser });

    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config as AxiosRequestConfig);

        //sort according to day name : 
        let data: MenuData[] = response.data;
        data.sort((a, b) => {return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);
        setloadingMenu(false);
        

        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    const fetchMealData = async()=>{
        try{
            const response = await axios.get('api/user/getmeal', config as AxiosRequestConfig);
            let data : MealData[] = response.data;
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
            <Table data={menuData} title='Mess Menu' />

        </Container>
    }
    </>
)}

export default MessMenuPage