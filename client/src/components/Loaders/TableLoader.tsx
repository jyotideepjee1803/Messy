import React from 'react';
import { TableRow, Skeleton, TableCell } from "@mui/material";

interface TableRowsLoaderProps{
    rowsNum : number;
}

const TableRowsLoader = ({ rowsNum } : TableRowsLoaderProps) => {
    return [...Array(rowsNum)].map((row, index) => (
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
    ));
};

export default TableRowsLoader;
