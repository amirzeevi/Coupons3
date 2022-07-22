import { Box, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { category } from "../../../model/category";
import { Coupon } from "../../../model/coupon";
import { downloadCoupons } from "../../../redux/couponState";
import { store } from "../../../redux/store";
import globals from "../../../utils/globals";
import { jwtAxios } from "../../../utils/jwtAxios";
import notify from "../../../utils/notify";

function GetAllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponState.coupons)
    const [categ, setCateg] = useState("")
    const [price, setPrice] = useState(0)
    const categories = Object.keys(category).filter(item => isNaN(Number(item)))

    useEffect(() => {
        if (coupons.length === 0) {
            jwtAxios.get(globals.urls.getCustomerCoupons)
                .then(response => {
                    setCoupons(response.data)
                    store.dispatch(downloadCoupons(response.data))
                })
                .catch(err => { notify.error(err); console.log(err) })
        }
    }, [])

    return (
        <>
            <Typography variant="h5" align="center" marginBottom={2}>
                My Coupons
            </Typography> <br />
            <Box sx={{ display: "inline" }}>
                <TextField
                    size='small'
                    sx={{ minWidth: 240, paddingRight: 3 }}
                    label="Search Category..."
                    variant="outlined"
                    select
                    value={categ}
                    onChange={event=>setCateg(event.target.value)}
                >
                    <MenuItem key={"All"} value={"All"}>ALL</MenuItem>
                    {categories.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    size='small'
                    label="Filter max price..."
                    variant="outlined"
                    onChange={event=>setPrice(Number(event.target.value))}
                >
                    <MenuItem key={"All"} value={"All"}>ALL</MenuItem>
                    {categories.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField> <br />
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
                            <TableCell><b>End Date</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coupons
                        .filter(categ === "All" || categ === "" ? c => true : c => c.category === categ)
                        .filter(price === 0 ? c => true : c => c.price <= price)
                        .map(item => (
                            <TableRow key={item.id}>
                                <TableCell width={300}>
                                    <img src={item.image} width="20%" />
                                    {item.title}
                                </TableCell>
                                <TableCell>
                                    {item.description}
                                </TableCell>
                                <TableCell>
                                    {item.category}
                                </TableCell>
                                <TableCell>
                                    {item.startDate}
                                </TableCell>
                                <TableCell>
                                    {item.endDate}
                                </TableCell>
                                <TableCell>
                                    {item.price + "$"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default GetAllCoupons;
