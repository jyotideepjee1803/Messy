import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Card, CardHeader } from '@mui/material';

interface MessTableProps {
  data: {
    day?: string;
    breakfast: string;
    lunch: string;
    dinner: string;
  }[];
  taken?: {
    [key: number]: boolean[];
  };
  title: string;
}

const MessTable = ({ data, taken, title} : MessTableProps) => {
  const dayIdx = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mp:Record<string, number> = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}

  return (
    <Card sx={{p:1}}>
    <CardHeader title={title}/>
    <Box sx={{ p: 3, pb: 1, mb:2}}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{backgroundColor: "lightgray", boxShadow: "1"}}>
              <TableCell>Day</TableCell>
              <TableCell>Breakfast</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell>Dinner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            (data.map((rowData, index) => (
              <TableRow key={index}>
                <TableCell>{rowData.day ? rowData.day : dayIdx[index]}</TableCell>
                <TableCell sx={taken?.[mp['breakfast']]?.[index] ? { backgroundColor: "#ceface" } : undefined}>{rowData.breakfast}</TableCell>
                <TableCell sx={taken?.[mp['lunch']]?.[index]? {backgroundColor : "#ceface"}: undefined}>{rowData.lunch}</TableCell>
                <TableCell sx={taken?.[mp['dinner']]?.[index]? {backgroundColor : "#ceface"}: undefined}>{rowData.dinner}</TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Card>
  );
}

export default MessTable;