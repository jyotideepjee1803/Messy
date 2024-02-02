/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios,{getAxiosConfig} from '../../utils/axios'

import {   } from '@mui/system';
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
  Paper,
  Box,
} from '@mui/material';
    

const AdminTaskPage = () => {
    const [menuData, setMenuData] = useState([]);
    const [mealData, setMealData] = useState([]);

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

        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    const updateMenuData = async() => {
        try{
            await axios.post('api/admin/setmenu', {menuData}, config);
            alert('Menu changes saved')
        }catch(error){
            console.error('Error while saving changes : ',error);
        }
        // console.log({menuData});
    }

    useEffect(() => {
        fetchMenuData();
    }, []);

    const handleMealChange = (event,index,prop) =>{
        const newMeal = [...mealData];
        newMeal[index][prop] = event.target.value;

        setMealData(newMeal);
    }

    const fetchMealData = async()=>{
        try{
            const response = await axios.get('api/user/getmeal', config);
            let data = response.data;
            data.sort((a,b)=>{return mp[a.mealName] - mp[b.mealName]})
            setMealData(data);
        }catch(error){
            console.error('Error fetching menu data:', error);
        }
    }

    const updateMealData = async() => {
        try{
            await axios.post('api/admin/setmeal', {mealData}, config);
            alert('Meal changes saved')
        }catch(error){
            console.error('Error while saving changes : ',error);
        }
    }

    useEffect(()=>{
        fetchMealData();
    },[])

    const [editRowsModel, setEditRowsModel] = useState({});

    const handleCellEditCommit = ({ id, field, props }) => {
        const updatedData = [...mealData];
        const rowIndex = updatedData.findIndex((item) => item.id === id);
        updatedData[rowIndex][field] = props.value;
        console.log(updatedData);
        setMealData(updatedData);
    };

    return (
        <Grid 
            marginTop={5}
            container 
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
          {loggedInUser.isAdmin ? (
            <div>
            <Typography variant='h4' sx={{alignSelf:'center' , textAlign: 'center' , marginBottom: '25px'}}>Mess Timing</Typography>
            <Grid justifyContent={'center'} alignItems={'center'}>
            {/* Mess Meals */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{backgroundColor: "lightgray", boxShadow: "1"}}>
                    <TableCell>Meal</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mealData.map((item, index) => (
                    < TableRow key={index}>
                        < TableCell>{item.mealName}</ TableCell>
                        < TableCell>
                        <TextField
                            id={`time${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={item.time}
                            onChange={(event) => handleMealChange(event, index, 'time')}
                        />
                        </ TableCell>
                        < TableCell>
                        <TextField
                            id={`cost${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={item.cost}
                            onChange={(event) => handleMealChange(event, index, 'cost')}
                        />
                        </ TableCell>
                    </ TableRow>
                    ))}
                </TableBody>
                </Table> 
            </TableContainer>
            <Button
                variant="contained"
                onClick={updateMealData}
                className="MuiButton-root MuiButton-contained"
                >
                Save time
            </Button>
            </Grid>


        <Box mt={2}>
            {/* Mess Menu */}
            <Typography variant='h4' sx={{alignSelf:'center' , marginBottom: '25px' , textAlign: 'center'}}>Mess Menu</Typography>
            <TableContainer component={Paper}>
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
                  {menuData.map((menu, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell>{menu.day}</TableCell>
                        <TableCell>
                        <TextField
                            id={`breakfastCheck${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={menu.breakfast}
                            onChange={(event) => handleMenuInputChange(event, index, 'breakfast')}
                        />
                         
                        </TableCell>
                        <TableCell>
                        <TextField
                            id={`lunchCheck${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={menu.lunch}
                            onChange={(event) => handleMenuInputChange(event, index, 'lunch')}
                        />
                        </TableCell>
                        <TableCell>
                        <TextField
                            id={`dinnerCheck${index}`}
                            type="input"
                            size="small" // Set the size to small
                            value={menu.dinner}
                            onChange={(event) => handleMenuInputChange(event, index, 'dinner')}
                        />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={updateMenuData}
              className="MuiButton-root MuiButton-contained"
              style={{ marginLeft: 'auto', marginTop: 2}}
            >
              Save Menu
            </Button>
        </Box>

            </div>
          ) : (
            <div>You're not admin</div>
          )}
        </Grid>
      );
}

export default AdminTaskPage