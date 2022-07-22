import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Customer } from "../../../model/customer";
import { jwtAxios } from '../../../utils/jwtAxios';
import globals from '../../../utils/globals';
import { store } from '../../../redux/store';
import notify from '../../../utils/notify';
import { addCustomer } from "../../../redux/customerState";
import { useNavigate } from 'react-router-dom';

function AddCustomer(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();
    const navigate = useNavigate();

    const send = (customerToAdd: Customer) => {
        jwtAxios.post(globals.urls.addCustomer, customerToAdd)
            .then(resposne => {
                customerToAdd.id = resposne.data;
                customerToAdd.coupons = [];
                store.dispatch(addCustomer(customerToAdd))
                navigate("/admin/allCustomers")
            })
            .catch(err => { notify.error(err.response.data.description) })
    }

    return (
        <>
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    label={"Name"}
                    fullWidth
                    required
                    {...register("name", {
                        required: {
                            value: true,
                            message: "missing name"
                        }
                    })}
                /><br /> <br />
                <TextField
                    label={"Email Address"}
                    fullWidth
                    required
                    {...register("email", {
                        required: {
                            value: true,
                            message: "missing email"
                        }
                    })}
                /><br />
                {errors.email && <span>{errors.email.message}</span>}
                <br />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "missing password"
                        }
                    })}
                /> <br />
                {errors.password && <span>{errors.password.message}</span>}
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ mt: 2, fontWeight: 600 }}
                    >
                        ADD
                    </Button>
                </Box>
            </form>
        </>
    );
}

export default AddCustomer;
