import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Company } from "../../../model/company";
import { jwtAxios } from '../../../utils/jwtAxios';
import globals from '../../../utils/globals';
import { store } from '../../../redux/store';
import { addCompany } from '../../../redux/companyState';
import notify from '../../../utils/notify';
import { useNavigate } from 'react-router-dom';

function AddCompany(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<Company>();
    const navigate = useNavigate();

    const send = (companyToAdd: Company) => {
        jwtAxios.post(globals.urls.addCompany, companyToAdd)
            .then(response => {
                companyToAdd.id = response.data;
                companyToAdd.coupons = [];
                store.dispatch(addCompany(companyToAdd))
                navigate("/admin/allCompanies")
            })
            .catch(err => { notify.error(err.response.data.description) })
    }

    return (
        <div className="addCompany">
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    sx={{ minWidth: 360 }}
                    label={"Company Name"}
                    fullWidth
                    {...register("name", {
                        required: {
                            value: true,
                            message: "missing name"
                        }
                    })}
                /><br />
                {errors.name && <span>{errors.name.message}</span>}
                <br />
                <TextField
                    sx={{ minWidth: 360 }}
                    label={"Email Address "}
                    fullWidth
                    type="email"
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
                    label="Password"
                    variant="outlined"
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
                </Box>
            </form>
        </div>
    );
}

export default AddCompany;
