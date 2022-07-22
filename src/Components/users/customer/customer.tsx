import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import UserDetails from './../userDetails';
import GetAllCoupons from "./getCustomerCoupons";
import PurchaseCoupon from "./purchaseCoupon";


function Customer(): JSX.Element {
    const [value, setValue] = useState(0)
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

                <Tab label="My Coupons" />
                <Tab label="Purchase Coupon" />
                <Tab label="My Details" />
            </Tabs> <br /> <br />

            {value == 0 && <GetAllCoupons />}
            {value == 1 && <PurchaseCoupon />}
            {value == 2 && <UserDetails />}

        </>
    );
}

export default Customer;
