import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from 'react';
import { category } from "../../model/category";
import { Coupon } from "../../model/coupon";
import CouponCard from "./couponCard";


function CouponsGrid(props: { coupons: Coupon[] }): JSX.Element {
    const [categ, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const categories = Object.keys(category).filter(item => isNaN(Number(item)))

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"}>
                <TextField
                    label="Categories"
                    sx={{ minWidth: 240 }}
                    size='small'
                    select
                    value={categ}
                    onChange={event => setCategory(event.target.value)}>
                    <MenuItem key={"All"} value={"All"}>ALL</MenuItem>
                    {categories.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>))}
                </TextField>
                <TextField
                    size='small'
                    label="Filter max price"
                    onChange={event => setPrice(Number(event.target.value))}
                >
                    <MenuItem key={"All"} value={"All"}>ALL</MenuItem>
                    {categories.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>
            </Box>
            <br />
            <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {props.coupons
                    .filter(categ === "All" || categ === "" ? c => true : c => c.category === categ)
                    .filter(price === 0 ? c => true : c => c.price <= price)
                    .map((item) => (
                        <Grid item xs={2} sm={3} md={3} key={item.id}>
                            <CouponCard coupon={item} />
                        </Grid>
                    ))}
            </Grid>

        </>
    );
}

export default CouponsGrid;


