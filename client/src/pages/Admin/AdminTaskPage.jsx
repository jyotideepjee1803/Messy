/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios,{getAxiosConfig} from '../../utils/axios'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  Container,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
} from '@mui/material';
import Toast from '../../components/Toast/index';
import NotAdmin from './PageComponent/NotAdmin';
import TableRowsLoader from '../../components/Loaders/TableLoader';

    
const AdminTaskPage = () => {
    const [menuData, setMenuData] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [loadingMenu , setloadingMenu] = useState(false);
    const [loadingMeal , setloadingMeal] = useState(false);
    
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const handleToastOpen = (message, severity) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
      };
    
    const handleToastClose = () => {
        setToastOpen(false);
    };

    const isMenuValid = () => {
        // Check if any field is empty
        return menuData.every(field => (field.breakfast  !== '' && field.lunch  !== '' && field.dinner  !== ''));
    };

    const isMealValid = () => {
        // Check if any field is empty
        return mealData.every(field => (field.time !== '' && (field.cost !== '' || field.cost > 0)));
    };

    const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}
    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const handleMenuInputChange = (event, day, mealType) => {
        const updatedMenu = [...menuData];
        updatedMenu[day][mealType] = event.target.value;

        setMenuData(updatedMenu);
    }

    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config);

        //sort according to day name : 
        let data = response.data;
        data.sort((a,b)=> {return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);
        setloadingMenu(false);
       

        } catch (error) {
            handleToastOpen('Error fetching menu data : ', error);
            setloadingMeal(false);
        }
    };

    const updateMenuData = async() => {
        try{
            await axios.post('api/admin/setmenu', {menuData}, config);
            handleToastOpen('Menu changes saved', 'success');
        }catch(error){
            handleToastOpen('Error saving changes. Please try again.', 'error');
        }
        // console.log({menuData});
    }

    useEffect(() => {
        setloadingMenu(true);
        fetchMenuData();
    }, []);
   

    const handleMealCostChange = (event,index) =>{
        console.log(event.target.value)
        const newMeal = [...mealData];
        newMeal[index]['cost'] = event.target.value;

        setMealData(newMeal);
    }

    const handleMealTimeChange = (time,index) =>{
        console.log(time.$d)
        const newMeal = [...mealData];
        newMeal[index]['time'] = time;

        setMealData(newMeal);
    }

    const fetchMealData = async()=>{
        try{
            const response = await axios.get('api/user/getmeal', config);
            let data = response.data;
            data.sort((a,b)=>{return mp[a.mealName] - mp[b.mealName]})
             setMealData(data);
             setloadingMeal(false);
            
        }catch(error){
            handleToastOpen('Error fetching menu data:', error);
            setloadingMeal(false);
        }
    }

    const updateMealData = async() => {
        try{
            await axios.post('api/admin/setmeal', {mealData}, config);
            handleToastOpen('Meal changes saved', 'success');
        }catch(error){
            handleToastOpen('Error saving changes. Please try again.', 'error');
        }
    }

    useEffect(()=>{
        setloadingMeal(true);
        fetchMealData();
    },[])

    return (
        <Container maxWidth="xl">
        {loggedInUser.isAdmin ? (
        <Box>
        <Toast
            open={toastOpen}
            severity={toastSeverity}
            message={toastMessage}
            onClose={handleToastClose}
        />
         <Grid item>
         <Card sx={{ p: 3, pb: 1, mb:3}}>
            <Typography variant='h4' sx={{alignSelf:'center' , textAlign: 'center' , marginBottom: '25px'}}>Mess Timing</Typography>
            {/* Mess Meals */}
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{backgroundColor: "lightgray", boxShadow: "1"}}>
                    <TableCell>Meal</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {loadingMeal === true ?(
                    <TableRowsLoader rowsNum={3} />
                ) : 
                    (mealData.map((item, index) => (
                    < TableRow key={index}>
                        < TableCell>{item.mealName}</ TableCell>
                        < TableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                            id={`time${index}`}
                            size="small" // Set the size to small
                            defaultValue={dayjs(item.time)}
                            onChange={(time) => handleMealTimeChange(time, index)}
                        />
                        </LocalizationProvider>
                        </ TableCell>
                        < TableCell>
                        <FormControl sx={{ m: 1 }} error={item.cost === '' || item.cost <= 0}>
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                label="Amount"
                                value={item.cost}
                                onChange={(event) => handleMealCostChange(event, index)}
                            />
                        </FormControl>
                        </ TableCell>
                    </ TableRow>
                    )))}
                </TableBody>
                </Table> 
            </TableContainer>
            <Box ml={2} mt={2} textAlign="right" alignSelf={'right'}>
                <Button
                    variant="contained"
                    onClick={updateMealData}
                    className="MuiButton-root MuiButton-contained"
                    disabled={!isMealValid()}
                    >
                    Save
                </Button>
            </Box>
        </Card>
        </Grid>
        <Grid item>
        <Card sx={{ p: 3, pb: 1 }}>
            {/* Mess Menu */}
            <Typography variant='h4' sx={{alignSelf:'center' , marginBottom: '25px' , textAlign: 'center'}}>Mess Menu</Typography>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{backgroundColor: "lightgray", boxShadow: "1"}}>
                    <TableCell>Day</TableCell>
                    <TableCell>Breakfast</TableCell>
                    <TableCell>Lunch</TableCell>
                    <TableCell>Dinner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { (loadingMenu === true)  ? 
                ( <TableRowsLoader rowsNum={7} />)
                :(
                  menuData.map((menu, index) => (
                      <TableRow key={index}>
                        <TableCell>{menu.day}</TableCell>
                        <TableCell>
                        <TextField
                            id={`breakfastCheck${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={menu.breakfast}
                            error={menu.breakfast === ''}
                            helperText={menu.breakfast === '' ? 'Field cannot be empty' : ''}
                            onChange={(event) => handleMenuInputChange(event, index, 'breakfast')}
                        />
                         
                        </TableCell>
                        <TableCell>
                        <TextField
                            id={`lunchCheck${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={menu.lunch}
                            error={menu.lunch === ''}
                            helperText={menu.lunch === '' ? 'Field cannot be empty' : ''}
                            onChange={(event) => handleMenuInputChange(event, index, 'lunch')}
                        />
                        </TableCell>
                        <TableCell>
                        <TextField
                            id={`dinnerCheck${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={menu.dinner}
                            error={menu.dinner === ''}
                            helperText={menu.dinner === '' ? 'Field cannot be empty' : ''}
                            onChange={(event) => handleMenuInputChange(event, index, 'dinner')}
                        />
                        </TableCell>
                      </TableRow>
                  ))
                )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box ml={2} mt={2} textAlign="right"  alignSelf={'right'}>
                <Button
                variant="contained"
                onClick={updateMenuData}
                className="MuiButton-root MuiButton-contained"
                style={{ marginLeft: 'auto', marginTop: 2}}
                disabled={!isMenuValid()}
                >
                Save Menu
                </Button>
            </Box>
        </Card>
        </Grid>
        </Box>
          ) : (
            <NotAdmin/>
          )}
        </Container>
      );
}

export default AdminTaskPage