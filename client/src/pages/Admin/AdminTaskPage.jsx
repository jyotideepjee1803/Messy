/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import axios,{getAxiosConfig} from '../../utils/axios'

import { DataGrid } from '@mui/x-data-grid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Grid } from '@mui/material';

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
        <>
            {loggedInUser.isAdmin ? (
            <div>
            <Grid justifyContent={'center'} alignItems={'center'}>
                {/* Mess Meals */}
                <TableContainer>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Meal</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mealData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.mealName}</TableCell>
                            <TableCell>
                            <TextField
                                id={`time${index}`}
                                type="input"
                                value={item.time}
                                onChange={(event) => handleMealChange(event, index, 'time')}
                            />
                            </TableCell>
                            <TableCell>
                            <TextField
                                id={`cost${index}`}
                                type="input"
                                value={item.cost}
                                onChange={(event) => handleMealChange(event, index, 'cost')}
                            />
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                {/* <DataGrid
                    rows={mealData}
                    getRowId={(row) => mp[row.mealName]}
                    columns={[
                    { field: 'mealName', headerName: 'Meal', flex: 1, editable: false },
                    { field: 'time', headerName: 'Time', flex: 1, editable: true },
                    { field: 'cost', headerName: 'Cost', flex: 1, editable: true },
                    ]}
                    editRowsModel={editRowsModel}
                    onCellEditCommit={handleCellEditCommit}
                    onEditRowsModelChange={(newModel) => setEditRowsModel(newModel)}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    hideFooter={true}
                    hideFooterPagination={true}
                /> */}
                <Button variant="contained" onClick={updateMealData}>Save time</Button>
            </Grid>
            <div>
                {/* Mess Menu */}
                <h2>Mess Menu</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menuData.map((menu, index) => {
                        return <tr key={index}>
                        <td>{menu.day}</td>
                        <td>
                            
                            <label htmlFor={`breakfastCheck${index}`}>
                                <input
                                id={`breakfastCheck${index}`}
                                type="input"
                                value={menu.breakfast}
                                onChange={(event) => handleMenuInputChange(event,index,'breakfast')}
                                />
                            </label>
                            
                        </td>
                        <td>
                        
                            <label htmlFor={`lunchCheck${index}`}>
                                <input
                                id={`lunchCheck${index}`}
                                type="input"
                                value={menu.lunch}
                                onChange={(event) => handleMenuInputChange(event,index,'lunch')}
                                />
                            </label>
                            
                        </td>
                        <td>
                            <label htmlFor={`dinnerCheck${index}`}>
                                <input
                                id={`dinnerCheck${index}`}
                                type="input"
                                value={menu.dinner}
                                onChange={(event) => handleMenuInputChange(event,index,'dinner')}
                                />
                            </label>
                        </td>
                        </tr>
                    })}
                    </tbody>
                </table>
                <button onClick={updateMenuData}>Save Menu</button>
            </div>
            </div>
            ) : (
                <div>
                    You're not admin
                </div>
            )}
        </>
    )
}

export default AdminTaskPage