import React, { useMemo, memo} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Card, CardHeader } from '@mui/material';

const MessTable = memo(({ data, taken, title }) => {
  const dayIdx = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], []);
  const mp = useMemo(() => ({ 'breakfast': 0, 'lunch': 1, 'dinner': 2 }), []);

  const renderTableBody = useMemo(() => {
    return data.map((rowData, index) => (
      <TableRow key={index}>
        <TableCell>{rowData.day ? rowData.day : dayIdx[index]}</TableCell>
        <TableCell sx={taken?.[mp['breakfast']][index] ? { backgroundColor: "#ceface" } : {}}>{rowData.breakfast}</TableCell>
        <TableCell sx={taken?.[mp['lunch']][index] ? { backgroundColor: "#ceface" } : {}}>{rowData.lunch}</TableCell>
        <TableCell sx={taken?.[mp['dinner']][index] ? { backgroundColor: "#ceface" } : {}}>{rowData.dinner}</TableCell>
      </TableRow>
    ));
  }, [data, taken, dayIdx, mp]);

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader title={title} />
      <Box sx={{ p: 3, pb: 1, mb: 2 }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "lightgray", boxShadow: "1" }}>
                <TableCell>Day</TableCell>
                <TableCell>Breakfast</TableCell>
                <TableCell>Lunch</TableCell>
                <TableCell>Dinner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableBody}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
});

export default MessTable;
