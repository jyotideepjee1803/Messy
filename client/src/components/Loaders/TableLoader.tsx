import React from 'react';
import { TableBody, TableRow, TableCell, Skeleton } from '@mui/material';

interface TableRowsLoaderProps {
  rowsNum: number;
}

const TableRowsLoader = ({ rowsNum }: TableRowsLoaderProps) => {
  return (
    <TableBody>
      {[...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableRowsLoader;
