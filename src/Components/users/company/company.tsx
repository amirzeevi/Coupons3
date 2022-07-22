import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import UserDetails from "../userDetails";
import GetAllCoupons from "./getCompanyCoupons";

function Company(): JSX.Element {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <Tabs
                centered
                value={value}
                onChange={handleChange}
                scrollButtons="auto">

                <Tab label="All Coupons" />
                <Tab label="My Details" />
            </Tabs><br /> <br />

            {value == 0 && <GetAllCoupons />}
            {value == 1 && <UserDetails />}
        </>
    );
}

export default Company;
