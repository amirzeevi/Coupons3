import { Avatar, Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as React from 'react';
import { useForm } from "react-hook-form";
import userDetails from '../../model/userDetails';
import { useNavigate } from "react-router-dom";
import notify from '../../utils/notify';
import LockIcon from '@mui/icons-material/Lock';
import { userLogin } from '../../redux/authState';
import { jwtAxios } from '../../utils/jwtAxios';
import { store } from '../../redux/store';
import globals from './../../utils/globals';
import { useState } from 'react';


export default function Login(): JSX.Element {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<userDetails>();
    const [type, setType] = useState("")

    const send = (creds: userDetails) => {
        if (!type) {
            notify.error("missing type")
            return
        }
        creds.clientType = type
        jwtAxios.post(globals.urls.login, creds)
            .then((response) => {
                store.dispatch(userLogin(response.headers.authorization))
                notify.success("log in succesful")
                switch (creds.clientType) {
                    case "CUSTOMER":
                        navigate("/customer")
                        break;
                    case "COMPANY":
                        navigate("/company")
                        break;
                    case "ADMINISTRATOR":
                        navigate("/admin")
                        break;
                }
            })
            .catch(err => {
                notify.error(err.response.data.description)
            })
    }

    const handleChoise = (event: React.MouseEvent<HTMLElement>, choise: string) => {
        setType(choise)
    }

    return (
        <div className="login text-center">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Avatar sx={{ m: 1 }}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <br />
                <form onSubmit={handleSubmit(send)}>
                    <TextField
                        sx={{ minWidth: 360 }}
                        name="Email Address"
                        label="Email Address"
                        variant="outlined"
                        required
                        fullWidth
                        {...register("email", {
                            required: {
                                value: true,
                                message: "missing email"
                            }
                        })}
                    />  <br />
                    {errors.email && <span>{errors.email.message}</span>}
                    <br />
                    <TextField
                        name="Password"
                        label="Password"
                        variant="outlined"
                        required
                        fullWidth
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
                    <ToggleButtonGroup
                        fullWidth
                        style={{ backgroundColor: "#e3f2fd" }}
                        exclusive
                        value={type}
                        onChange={handleChoise}>
                        <ToggleButton value={"ADMINISTRATOR"}>ADMIN</ToggleButton>
                        <ToggleButton value={"COMPANY"} >COMPANY</ToggleButton>
                        <ToggleButton value={"CUSTOMER"}>CUSTOMER</ToggleButton>

                    </ToggleButtonGroup>
                    {errors.clientType && <span>{errors.clientType.message}</span>}
                    <br />
                    <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ mt: 2, fontWeight: 600 }}>
                        SIGN IN
                    </Button>
                </form>
            </Box>
        </div>
    );
}