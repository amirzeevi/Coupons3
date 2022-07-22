import { Tab, Tabs } from "@mui/material";
import GetAllCompanies from "./getAllCompanies";
import GetAllCustomers from "./getAllCustomers";
import { useState } from 'react';

function Admin(): JSX.Element {
    const [value, setValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number)=>{
        setValue(newValue)
    }
    
    return (
        <>
            <Tabs
                centered
                value={value}
                onChange={handleChange}
                scrollButtons="auto">

                <Tab label="All Companies" />
                <Tab label="All Customers" />
            </Tabs><br /> <br />

            {value == 0 && <GetAllCompanies />}
            {value == 1 && <GetAllCustomers/>}

        </>
    );
}

export default Admin;
