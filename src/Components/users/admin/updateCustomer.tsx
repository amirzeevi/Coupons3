import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Customer } from "../../../model/customer";
import { updateCustomer } from "../../../redux/customerState";
import { store } from "../../../redux/store";
import globals from "../../../utils/globals";
import { jwtAxios } from "../../../utils/jwtAxios";
import notify from "../../../utils/notify";

function UpdateCustomer(): JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();
    const [customer] = useState<Customer>((location.state as any).customer);


    const send = (customerToUpdate: Customer) => {
        customer.name = customerToUpdate.name;
        customer.email = customerToUpdate.email;
        customer.password = customerToUpdate.password
        jwtAxios.put(globals.urls.updateCustomer, customer)
            .then(() => {
                store.dispatch(updateCustomer(customer))
                navigate("/admin/allCustomers")
            })
            .catch(err => { notify.error(err.response.data.description) })
    }

    return (
        <div className="updateCustomer">
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    sx={{ minWidth: 360 }}
                    label={"ID"}
                    value={customer.id}
                    disabled
                    fullWidth
                /><br /><br />
                <TextField
                    defaultValue={customer.name}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("name", {
                        required: {
                            value: true,
                            message: "missing name"
                        }
                    })} />
                <br /> <br />
                <TextField
                    defaultValue={customer.email}
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "missing email"
                        }
                    })}

                /> <br /> <br />
                {errors.email && <span>{errors.email.message}</span>}
                <TextField
                    defaultValue={customer.password}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    {...register("password", {
                        required: {
                            value: true,
                            message: "missing password"
                        }
                    })}

                />
                <br />
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
                </Box>
            </form>
        </div>
    );
}

export default UpdateCustomer;
