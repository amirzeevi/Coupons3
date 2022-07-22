import { Box, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../model/customer";
import { deleteCustomer, downloadCustomers } from "../../../redux/customerState";
import { store } from "../../../redux/store";
import globals from "../../../utils/globals";
import { jwtAxios } from "../../../utils/jwtAxios";
import notify from "../../../utils/notify";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

function GetAllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>(store.getState().customerState.customers);

    useEffect(() => {
        if (customers.length === 0) {
            jwtAxios.get<Customer[]>(globals.urls.allCustomers)
                .then(response => {
                    setCustomers(response.data);
                    store.dispatch(downloadCustomers(response.data));
                })
                .catch(err => {
                    notify.error(err.data.response.description)
                })
        }
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button onClick={() => { navigate("/admin/addCustomer") }}> + Add Customer </Button>
            </Box> <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#bdbdbd" }}>
                            <TableCell ><b>#</b></TableCell>
                            <TableCell ><b>Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((item) => (
                            <CustomerRow key={item.id} row={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    function CustomerRow(props: { row: Customer }) {
        const customer = props.row;
        const [model, setModel] = useState(false)
        const [open, setOpen] = useState(false);
        const navigate = useNavigate();

        const handleDelete = (id: number) => {
            jwtAxios.delete(globals.urls.deleteCustomer + id)
                .then(() => {
                    store.dispatch(deleteCustomer(id))
                    setCustomers(store.getState().customerState.customers)
                    setModel(false)
                })
                .catch(err => {
                    console.log(err)
                    notify.error(err.response.data.description)
                    setModel(false)

                })
        }
        return (
            <>
                <TableRow>
                    <TableCell>{customer.id} </TableCell>
                    <TableCell>{customer.name} </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                        <Button variant="primary" onClick={() => setOpen(!open)}>Coupons</Button>
                    </TableCell>
                    <TableCell>
                        <IconButton aria-label="update" onClick={() => navigate("/admin/updateCustomer", { state: { customer: customer } })}>
                            <ModeIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => { setModel(true) }}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    <Dialog
                        open={model}
                    >
                        <DialogTitle>
                            {"Delete Customer"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You are about to delete this customer. Are you sure?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { handleDelete(customer.id) }}> Yes</Button>
                            <Button onClick={() => { setModel(false) }}> No</Button>
                        </DialogActions>
                    </Dialog>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Coupons
                                </Typography>
                                <Table size="small">
                                    <TableHead className="tableH">
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>StartDate</TableCell>
                                            <TableCell>EndDate</TableCell>
                                            <TableCell>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {customer.coupons?.map((couponsRow) => (
                                            <TableRow key={couponsRow.id}>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.title}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.description}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.category}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.startDate}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.endDate}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {couponsRow.price}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

export default GetAllCustomers;
