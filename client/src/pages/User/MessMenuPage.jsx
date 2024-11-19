/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import axios, { getAxiosConfig } from '../../utils/axios';
import Table from '../../components/table/Table';
import { Container, Grid, Typography } from '@mui/material';
import AppWidget from './PageComponent/AppWidget';
import AppLoader from '../../components/Loaders/AppLoader';

// import {io} from "socket.io-client"
// import { useDispatch, useSelector } from "react-redux";
// import { setClientSocket, selectAppState, setSocketConnected, setNewNotifications } from '../../store/AppSlice';

// const SOCKET_ENDPOINT = process.env.REACT_APP_SERVER_BASE_URL;

const MessMenuPage = () => {
    // const {clientSocket, isSocketConnected, newNotifications} = useSelector(selectAppState);
    // const dispatch = useDispatch();

    const [menuData, setMenuData] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [loading , setLoading] = useState(false);
    // const [notif, setNotif] = useState("some");
    // const [socket, setSocket] = useState(null);
    // const apiUrl = process.env.REACT_APP_SERVER_BASE_URL;

    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2};

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const fetchMenuData = async () => {      
        try {
            const response = await axios.get('api/user/getmenu', config);
            return response.data;
        } catch (error) {
            console.error('Error fetching menu data:', error);
            return [];
        }
    };

    const fetchMealData = async () => {
        try {
            const response = await axios.get('api/user/getmeal', config);
            return response.data;
        } catch (error) {
            console.error('Error fetching meal data:', error);
            return [];
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [menuResponse, mealResponse] = await Promise.all([fetchMenuData(), fetchMealData()]);
            setMenuData(menuResponse);
            setMealData(mealResponse);
            setLoading(false);
        };

        fetchData();
    }, []);

    const sortedMenuData = useMemo(() => {
        return menuData.sort((a, b) => sortIdx[a.day] - sortIdx[b.day]);
    }, [menuData, sortIdx]);

    const sortedMealData = useMemo(() => {
        return mealData.sort((a, b) => mp[a.mealName] - mp[b.mealName]);
    }, [mealData, mp]);


    // useEffect(() => {
    //     const newSocket = io(`${apiUrl}`);
    //     setSocket(newSocket);
    //     console.log("Socket connected.")
    // }, [apiUrl]);

    // useEffect(() => {

    //     if (loggedInUser) {
    //       socket?.emit("init_user", loggedInUser?._id);
    //     }
    // }, [socket, loggedInUser]);

    // useEffect(()=>{
    //     dispatch(
    //         setClientSocket(io(SOCKET_ENDPOINT, {transports:["websocket"]}))
    //     )
    // },[]);

    // const newNotificationHandler = () =>{
    //     clientSocket.off("recieveNotification")
    //     .on("recieveNotification", (content) => {
    //        console.log(content);
    //        setNewNotifications([...newNotifications, content])
    //     //    console.log(notif);
    //     });
    // }

    // useEffect(() => {
    //     if (!clientSocket) return;
    
    //     if (!isSocketConnected && clientSocket) {
    //       clientSocket.emit("init_user", loggedInUser?._id);
    //       clientSocket.on("user_connected", () => {
    //         // console.log("socket connected");
    //         dispatch(setSocketConnected(true));
    //       });
    //     }
    //     newNotificationHandler();
    //   });
    console.log(sortedMenuData);
    return (
        <>
        {loading ? <AppLoader/> : 
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back 👋
            </Typography>
            <Grid container justifyContent="center" spacing={3} mb={3}>
 
            {sortedMealData.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <AppWidget
                        title={item.mealName}
                        time={item?.StartTime}
                        color="success"
                        icon={<img alt="icon" src={`/assets/icons/glass/ic_${item.mealName}.jpg`} />}
                    />
                </Grid>
            ))}
    
            </Grid>
            <Table data={sortedMenuData} title='Mess Menu' />

        </Container>
    }
    </>
)}

export default MessMenuPage