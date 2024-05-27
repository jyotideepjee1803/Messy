/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { useEffect } from 'react';

import {io} from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";
import { setClientSocket, selectAppState, setSocketConnected, setNewNotifications} from '../../store/AppSlice';
import axios, { getAxiosConfig } from '../../utils/axios';

const SOCKET_ENDPOINT = process.env.REACT_APP_SERVER_BASE_URL;

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const config = getAxiosConfig({loggedInUser});

  const {clientSocket, isSocketConnected, newNotifications} = useSelector(selectAppState);
  const dispatch = useDispatch();


  // const persistUpdatedUser = (updatedUser) => {
  //   // localStorage persists updated user even after page refresh
  //   localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
  // };

  const fetchNotifs = async()=>{
    const unseenNotifs = await Promise.all(loggedInUser.notifications.map(async(id)=>{
      const notice = await axios.get(`/api/user/getnotice/${id}`,config);
      return notice.data;
    }))
    dispatch(setNewNotifications(unseenNotifs));
  }

  // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  useEffect(()=>{
      dispatch(
          setClientSocket(io(SOCKET_ENDPOINT, {transports:["websocket"]}))
      )
      fetchNotifs();
  },[]);

    const newNotificationHandler = () =>{
        clientSocket.off("recieveNotification")
        .on("recieveNotification", (content) => {
          dispatch(setNewNotifications([...newNotifications, content]))
        });
    }

  useEffect(() => {
      if (!clientSocket) return;

      if (!isSocketConnected && clientSocket) {
        clientSocket.emit("init_user", loggedInUser?._id);
        clientSocket.on("user_connected", () => {
          dispatch(setSocketConnected(true));
        });
      }
      newNotificationHandler();
    });

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
