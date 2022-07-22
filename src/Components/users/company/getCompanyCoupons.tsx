import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { category } from "../../../model/category";
import { Coupon } from "../../../model/coupon";
import { deleteCoupon, downloadCoupons } from '../../../redux/couponState';
import { store } from "../../../redux/store";
import globals from '../../../utils/globals';
import { jwtAxios } from '../../../utils/jwtAxios';
import notify from '../../../utils/notify';

function GetAllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponState.coupons)
    const [categ, setCateg] = useState("")
    const [price, setPrice] = useState(0)
    const categories = Object.keys(category).filter(item => isNaN(Number(item)))
    const navigate = useNavigate();

    useEffect(() => {
        if (coupons.length === 0) {
            jwtAxios.get(globals.urls.getCompanyCoupons)
                .then(response => {
                    setCoupons(response.data)
                    store.dispatch(downloadCoupons(response.data))
                })
                .catch(err => { notify.error(err); console.log(err) })
        }
    }, [])

    return (
        <>
            <Typography variant='h5' align='center'>Coupons</Typography>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <TextField
                        sx={{ minWidth: 240, paddingRight: 3 }}
                        size='small'
                        label="Serach Category..."
                        variant="outlined"
                        select
                        value={categ}
                        onChange={(event=>setCateg(event.target.value))} >
                        <MenuItem key={"All"} value={"All"}>ALL</MenuItem>
                        {categories.map(item => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>))}
                    </TextField>
                    <TextField
                        size='small'
                        label="Filter max price..."
                        variant="outlined"
                        onChange={event=>setPrice(Number(event.target.value))} >
                        <MenuItem key={"All"} value={"All"}>ALL</MenuItem>
                        {categories.map(item => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Button variant='contained' onClick={() => { navigate("/company/addCoupon") }}> + Add Coupon </Button>
            </Box>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#bdbdbd" }}>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>Category</b></TableCell>
                            <TableCell><b>Start Date</b></TableCell>
                            <TableCell><b>Expiration Date</b></TableCell>
                            <TableCell><b>Amount</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coupons
                         .filter(categ === "All" || categ === "" ? c => true : c => c.category === categ)
                         .filter(price === 0 ? c => true : c => c.price <= price)
                        .map(item => (
                            <CouponRow key={item.id} coupon={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    function CouponRow(props: { coupon: Coupon }): JSX.Element {
        const coupon = props.coupon
        const navigate = useNavigate();
        const [open, setOpen] = useState(false)

        const handleDelete = (id: number) => {
            jwtAxios.delete(globals.urls.deleteCoupon + id)
                .then(() => {
                    store.dispatch(deleteCoupon(id))
                    setCoupons(store.getState().couponState.coupons)
                    notify.success("Coupon Deleted")
                })
                .catch(err => { notify.error(err) })
            setOpen(false)
        }

        return (
            <>
                <TableRow key={coupon.id}>
                    <TableCell width={300}>
                        <img src={coupon.image} width="50" />
                        {coupon.title}
                    </TableCell>
                    <TableCell>
                        {coupon.description}
                    </TableCell>
                    <TableCell>
                        {coupon.category}
                    </TableCell>
                    <TableCell>
                        {coupon.startDate}
                    </TableCell>
                    <TableCell>
                        {coupon.endDate}
                    </TableCell>
                    <TableCell>
                        {coupon.amount}
                    </TableCell>
                    <TableCell>
                        {coupon.price}
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => navigate("/company/updateCoupon", { state: { coupon: coupon } })}>
                            <ModeIcon />
                        </IconButton>
                        <IconButton onClick={() => { setOpen(true) }}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    <Dialog
                        open={open}>
                        <DialogTitle>
                            Delete Coupon
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You are about to delete this coupon. Are you sure?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { handleDelete(coupon.id) }}> Yes</Button>
                            <Button onClick={() => { setOpen(false) }}> No</Button>
                        </DialogActions>
                    </Dialog>
                </TableRow>
            </>
        );
    }
}

export default GetAllCoupons;
