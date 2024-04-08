import { createSlice } from "@reduxjs/toolkit";

//User state
const AppSlice = createSlice({
    name: "AppState",
    initialState:{
        loggedInUser : null,
        clientSocket : null,
        isSocketConnected : false,
        newNotifications : [],
    },

    reducers:{
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
        },
        setClientSocket: (state, action) => {
            state.clientSocket = action.payload;
        },
        setSocketConnected: (state, action) => {
            state.isSocketConnected = action.payload;
        },
        setNewNotifications: (state,action)=>{
            state.newNotifications = action.payload;
        }
    }
});

export const {setClientSocket, setSocketConnected, setNewNotifications, setLoggedInUser} = AppSlice.actions;
export const selectAppState = (state) => state.AppData;

export default AppSlice.reducer;