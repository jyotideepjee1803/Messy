import { createSlice } from "@reduxjs/toolkit";

//User state
const AppSlice = createSlice({
    name: "AppState",
    initialState:{
        // loggedInUser : null,
        clientSocket : null,
        isSocketConnected : false,
        newNotifications : [{
            _id: "66102d1201b4681ab35de187",
            subject: "Dummy",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            createdAt: "2024-04-05T16:55:46.695Z",
          }],
    },

    reducers:{
        // setLoggedInUser: (state, action) => {
        //     state.loggedInUser = action.payload;
        // },
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

export const {setClientSocket, setSocketConnected, setNewNotifications} = AppSlice.actions;
export const selectAppState = (state) => state.AppData;

export default AppSlice.reducer;