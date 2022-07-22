import { Avatar, Box, Divider, Paper, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { Company } from '../../model/company';
import { Customer } from '../../model/customer';
import { store } from "../../redux/store";
import globals from "../../utils/globals";
import { jwtAxios } from '../../utils/jwtAxios';
import notify from '../../utils/notify';

function UserDetails(): JSX.Element {

    const userType = store.getState().authState.userType
    const [user, setUser] = useState(null)

    useEffect(() => {
        switch (userType) {
            case "COMPANY":
                jwtAxios.get(globals.urls.getCompanyDetails)
                    .then(response => {
                        setUser(response.data as Company)
                    })
                    .catch(err => { notify.error(err) })
                break;
            case "CUSTOMER":
                jwtAxios.get(globals.urls.getCustomerDetails)
                    .then(response => {
                        setUser(response.data as Customer)
                    })
                    .catch(err => { notify.error(err) })
                break;
        }
    }, [])

    return (
        <>
            <Typography variant='h5' align='center'>My Details</Typography>
            <br />
            <Box display={"flex"} margin={"auto"} justifyContent={"space-between"} maxWidth={550} component={Paper} sx={{ p: 5 }}>
                <Avatar sx={{ mr: 2 }}>
                    <AccountCircleIcon />
                </Avatar>
                <Box>
                    <Typography sx={{ color: "gray" }} variant='body2'>Name</Typography>
                    <Typography >{user && user.name}</Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: "gray" }} variant='body2'>Email</Typography>
                    <Typography >{user && user.email}</Typography>
                </Box>
                <Box >
                    <Typography sx={{ color: "gray" }} variant='body2'>Password</Typography>
                    <Typography >{user && user.password}</Typography>
                </Box>
            </Box>
        </>
    );
}

export default UserDetails;
