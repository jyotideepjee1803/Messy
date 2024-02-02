import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const MessTable = ({ data, taken}) => {
  console.log(taken);
  const dayIdx = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}

  return (
    <Box>
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
            {data.map((rowData, index) => (
              <TableRow key={index}>
                <TableCell>{rowData.day ? rowData.day : dayIdx[index]}</TableCell>
                <TableCell sx={taken?.[mp['breakfast']][index] && {backgroundColor : "#ceface"}}>{rowData.breakfast}</TableCell>
                <TableCell sx={taken?.[mp['lunch']][index] && {backgroundColor : "#ceface"}}>{rowData.lunch}</TableCell>
                <TableCell sx={taken?.[mp['dinner']][index] && {backgroundColor : "#ceface"}}>{rowData.dinner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MessTable;
