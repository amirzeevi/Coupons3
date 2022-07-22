import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Coupon } from "../../../model/coupon";
import { downloadCoupons } from "../../../redux/couponState";
import { store } from "../../../redux/store";
import globals from '../../../utils/globals';
import { jwtAxios } from '../../../utils/jwtAxios';
import CouponsGrid from './../../coupons/couponsGrid';


function PurchaseCoupon(): JSX.Element {
    const [allCoupons] = useState<Coupon[]>(store.getState().guestState.allCoupons)
    const [customerCoupons] = useState<Coupon[]>(store.getState().couponState.coupons)
    const [couponsToBuy, setCouponsToBuy] = useState<Coupon[]>([])

    useEffect(() => {
        if (customerCoupons.length === 0) {
            jwtAxios.get(globals.urls.getCustomerCoupons)
                .then(response => {
                    store.dispatch(downloadCoupons(response.data))
                    const res = response.data as Coupon[]
                    setCouponsToBuy(allCoupons.filter(c1 => (!(res.find(c2 => c2.id === c1.id)))))
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setCouponsToBuy(allCoupons.filter(c1 => (!(customerCoupons.find(c2 => c2.id === c1.id)))))
        }
    }, [])

    return (
        <>
            <Typography variant="h5" textAlign={"center"}>Available Coupons for you</Typography> <br /> <br />
            <CouponsGrid coupons={couponsToBuy} />
        </>
    );
}

export default PurchaseCoupon;
