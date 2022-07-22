import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { category } from "../../../model/category";
import { Coupon } from "../../../model/coupon";
import { jwtAxios } from "../../../utils/jwtAxios";
import globals from '../../../utils/globals';
import { useState } from "react";
import { store } from "../../../redux/store";
import { addCoupon } from '../../../redux/couponState';
import notify from '../../../utils/notify';
import { useNavigate } from "react-router-dom";

function AddCoupon(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<Coupon>();
    const categories = Object.keys(category).filter(item => isNaN(Number(item)))
    const navigate = useNavigate()
    const [categ, setCateg] = useState("")

    const send = (coupon: Coupon) => {
        jwtAxios.post(globals.urls.addCoupon, coupon)
            .then(response => {
                coupon.id = response.data
                store.dispatch(addCoupon(coupon))
                notify.success("Coupon " + coupon.title + " added")
                navigate("/company")
            })
            .catch(err => { notify.error(err); console.log(err) })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCateg(event.target.value);
    };

    return (
        <div className="addCoupon">
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    sx={{ minWidth: 360 }}
                    name="Title"
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

                    label="Category"
                    variant="outlined"
                    select
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
                <br />
                <TextField
                    label="Start Date"
                    variant="outlined"
                    required
                    defaultValue={new Date().getDate}
                    type={"date"}
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
                        ADD
                    </Button>
                </Box><br />
            </form>
        </div>
    );
}

export default AddCoupon;
