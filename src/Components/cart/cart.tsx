import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Coupon } from "../../model/coupon";
import globals from "../../utils/globals";
import { jwtAxios } from "../../utils/jwtAxios";
import notify from "../../utils/notify";
import { clearCart, removeCouponFromCart } from './../../redux/cartState';
import { addCoupon, purchaseCoupon, updateCoupon } from './../../redux/couponState';
import { store } from './../../redux/store';

function Cart(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().cartState.couponsInCart)

    const getTotal = () => {
        let sum = 0
        coupons.map(item => sum += Number(item.price))
        return sum.toFixed(2)
    }

    const handleRemove = (couponID: number) => {
        setCoupons(coupons.filter(c => c.id !== couponID))
        store.dispatch(removeCouponFromCart(couponID))
    }

    const handleCheckout = () => {
        if (store.getState().authState.userType !== "CUSTOMER") {
            notify.error("You need to sign in as a customer")
            return
        }
        coupons.map(item => (
            jwtAxios.post(globals.urls.customerPurchase, item)
                .then(() => {
                    item.amount = item.amount - 1
                    store.dispatch(updateCoupon(item))
                    store.dispatch(purchaseCoupon(item))
                    notify.success(item.title + " purchased")
                })
                .catch(err => {
                    notify.error(err.response.data.description)

                })
        ))
        setCoupons([])
        store.dispatch(clearCart())
    }

    return (
        <div className="text-center">
            <TableContainer
                style={{  margin: "auto" }} component={Paper}>
                <Table >
                    <TableBody>
                        {coupons.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <img src={item.image} width="60" />
                                    {item.title}
                                </TableCell>
                                <TableCell>
                                    {item.price + "$"}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => { handleRemove(item.id) }}>
                                        < ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <b> Total Price:</b>
                            </TableCell>
                            <TableCell><b> {getTotal() + "$"}</b></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Button
                variant="success" onClick={() => { handleCheckout() }}>
                Checkout
            </Button>
        </div>
    );
}

export default Cart;
