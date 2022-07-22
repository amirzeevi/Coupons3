import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Company } from '../../model/company';
import { Coupon } from '../../model/coupon';
import { downloadAllCoupons } from '../../redux/guestState';
import { store } from '../../redux/store';
import globals from '../../utils/globals';
import { jwtAxios } from '../../utils/jwtAxios';
import CouponCard from '../coupons/couponCard';
import { Typography } from '@mui/material';
import CouponsGrid from './../coupons/couponsGrid';


function Main(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().guestState.allCoupons)

    useEffect(() => {
        if (coupons.length === 0) {
            jwtAxios.get(globals.urls.allCoupons)
                .then(response => {
                    store.dispatch(downloadAllCoupons(response.data))
                    setCoupons(response.data)
                })
                .catch(err => { console.log(err) })
        }
    }, [])

    return (
        <>
            <CouponsGrid coupons={coupons}/>
        </>
    );
}

export default Main;
