/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { alpha } from '@mui/material/styles';
import {Box, Container, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, TablePagination } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios, { getAxiosConfig } from '../../utils/axios';
import TableRowsLoader from '../../components/Loaders/TableLoader';
import { AppContext } from '../../context/AppProvider';

function Row({ subject, body }) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
    
    return (
      <>
        <TableRow>
          <TableCell 
            onClick={() => setOpen(!open)} 
            sx={{
              cursor:'pointer',
              bgcolor: (theme) => alpha(theme.palette.grey[0], 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16),
              },
            }}
          >
            <Typography variant="h6">{subject}</Typography>
            <Typography variant="body1">
                    {body.slice(0, 200)} 
                    {
                        body.length > 200 &&
                        <Typography 
                          variant="span" 
                          onClick={() => setOpen(!open)} 
                          style={{ fontWeight: 'normal', transition: 'font-weight 0.3s' }}
                          onMouseEnter={(e) => e.target.style.fontWeight = 'bold'}
                          onMouseLeave={(e) => e.target.style.fontWeight = 'normal'}
                        >
                           ...
                        </Typography>
                    }
            </Typography>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
              >
                <DialogTitle id="scroll-dialog-title">{subject}</DialogTitle>
                <DialogContent dividers={true}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                  {body}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      </>
    );
  }
  
const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [loadingNotice , setloadingNotice] = useState(false);
  
    const {loggedInUser} = useContext(AppContext)
    const config = getAxiosConfig({ loggedInUser });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rowsPerPageOptions = [5, 10, 15];


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchNotices = async () => {      
        try {
        const response = await axios.get('api/user/getnotices', config);
        const data = response.data;

        data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setNotices(data);
        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
        finally{
            setloadingNotice(false);
        }
    };

    useEffect(()=>{
        setloadingNotice(true);
        fetchNotices();
    },[])

    return (
        <Container maxWidth="xl">
            <Card sx={{p:1}}>
            <CardHeader title="Notices"/>
                <Box sx={{ p: 3, pb: 1, mb:2}}>
                    <TableContainer component={Paper}>
                      {loadingNotice ?
                        (
                          <Table>
                            <TableRowsLoader rowsNum={3} />
                          </Table>
                        ) : 
                        (
                          <>
                          <Table>
                              <TableBody>
                                {  notices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <Row key={index} {...row} />
                                  ))
                                
                                }
                              </TableBody>
                          </Table>
                          <TablePagination
                              rowsPerPageOptions={rowsPerPageOptions}
                              component="div"
                              count={notices.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                          </>
                        )
                      }
                    </TableContainer>
                </Box>
            </Card>
        </Container>
    )
}

export default NoticeBoard;