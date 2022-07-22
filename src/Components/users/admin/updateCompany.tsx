import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCompany } from "../../../redux/companyState";
import { store } from "../../../redux/store";
import globals from "../../../utils/globals";
import { jwtAxios } from "../../../utils/jwtAxios";
import notify from "../../../utils/notify";
import { Company } from '../../../model/company';

export default function UpdateCompany(): JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<Company>();
    const [company] = useState<Company>((location.state as any).company);


    const send = (companyToUpdate: Company) => {
        company.email = companyToUpdate.email;
        jwtAxios.put(globals.urls.updateCompany, company)
            .then(() => {
                store.dispatch(updateCompany(company));
                navigate("/admin/allCompanies")
            })
            .catch(err => {
                notify.error(err.response.data.description)
            })

    }

    return (
        <>
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    sx={{ minWidth: 360 }}
                    label={"ID"}
                    value={company.id}
                    disabled
                    fullWidth
                /><br /><br />
                <TextField
                    sx={{ minWidth: 360 }}
                    label={"Name"}
                    value={company.name}
                    disabled
                    fullWidth
                />  <br />
                <br />
                <TextField
                    name="Email Address"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    defaultValue={company.email}
                    type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "missing email"
                        }
                    })}
                /> <br />
                {errors.email && <span>{errors.email.message}</span>}
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
        </>
    );
}