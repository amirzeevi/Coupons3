import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { category } from "../../../model/category";
import { updateCoupon } from '../../../redux/couponState';
import { store } from "../../../redux/store";
import globals from "../../../utils/globals";
import { jwtAxios } from "../../../utils/jwtAxios";
import notify from "../../../utils/notify";
import { Coupon } from '../../../model/coupon';

function UpdateCoupon(): JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const categories = Object.keys(category).filter(item => isNaN(Number(item)))
    const { register, handleSubmit, formState: { errors } } = useForm<Coupon>();
    const [coupon, setCoupon] = useState<Coupon>((location.state as any).coupon);
    const [categ, setCateg] = useState(coupon.category)

    useEffect(() => {
        if (!location.state) {
            navigate("/company")
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCateg(event.target.value);
    };

    const send = (couponToUpdate: Coupon) => {
        couponToUpdate.id = coupon.id
        jwtAxios.put(globals.urls.updateCoupon, couponToUpdate)
            .then(() => {
                store.dispatch(updateCoupon(couponToUpdate))
                notify.success("Coupon updated")
                navigate("/company/getCompanyCoupons")
            })
            .catch(err => {
                console.log(err)
                notify.error(err.response.data.description)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    sx={{ minWidth: 360 }}
                    name="Title"
                    defaultValue={coupon.title}
                    label="Title"
                    variant="outlined"
                    required
                    fullWidth

                    {...register("title", {
                        required: {
                            value: true,
                            message: "missing title"
                        }
                    })}

                />  <br />
                {errors.title && <span>{errors.title.message}</span>}
                <br />
                <TextField
                    name="Description"
                    label="Description"
                    variant="outlined"
                    defaultValue={coupon.description}
                    required
                    fullWidth
                    {...register("description", {
                        required: {
                            value: true,
                            message: "missing description"
                        }
                    })}
                /> <br />
                {errors.description && <span>{errors.description.message}</span>}
                <br />
                <TextField
                    select
                    label="Category"
                    variant="outlined"
                    required
                    fullWidth
                    value={categ}
                    onChange={handleChange}
                    inputProps={register('category', {
                        required: 'Missing category'
                    })}
                >
                    {categories.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>
                <br />
                {errors.description && <span>{errors.description.message}</span>}
                <br />
                <TextField
                    label="Start Date"
                    defaultValue={coupon.startDate}
                    variant="outlined"
                    type={"date"}
                    required
                    fullWidth
                    {...register("startDate", {
                        required: {
                            value: true,
                            message: "missing Start Date"
                        }
                    })}
                /> <br />
                {errors.startDate && <span>{errors.startDate.message}</span>}
                <br />
                <TextField
                    label="Expiration Date"
                    defaultValue={coupon.endDate}
                    variant="outlined"
                    required
                    type={"date"}
                    fullWidth
                    {...register("endDate", {
                        required: {
                            value: true,
                            message: "missing Expiration Date"
                        }
                    })}
                /> <br />
                {errors.endDate && <span>{errors.endDate.message}</span>}
                <br />
                <TextField
                    name="Amount"
                    defaultValue={coupon.amount}
                    label="Amount"
                    variant="outlined"
                    required
                    fullWidth
                    {...register("amount", {
                        required: {
                            value: true,
                            message: "missing amount"
                        }
                    })}
                /> <br />
                {errors.amount && <span>{errors.amount.message}</span>}
                <br />
                <TextField
                    name="Price"
                    defaultValue={coupon.price}
                    label="Price"
                    variant="outlined"
                    required
                    fullWidth
                    {...register("price", {
                        required: {
                            value: true,
                            message: "missing price"
                        }
                    })}
                /> <br />
                <br />
                {errors.price && <span>{errors.price.message}</span>}
                <TextField
                    name="Image"
                    defaultValue={coupon.image}
                    label="Image"
                    variant="outlined"
                    required
                    fullWidth
                    {...register("image", {
                        required: {
                            value: true,
                            message: "missing image"
                        }
                    })}
                /> <br />
                {errors.image && <span>{errors.image.message}</span>}
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ mt: 2, fontWeight: 600 }}
                    >
                        UPDATE
                    </Button>
                </Box><br />
            </form>
        </>
    );
}

export default UpdateCoupon;
