import { Box, Button, Card, CardActions, CardContent, CardMedia, styled, Typography } from "@mui/material";
import { Coupon } from "../../model/coupon";
import { addCouponToCart } from "../../redux/cartState";
import { store } from "../../redux/store";


function CouponCard(props: { coupon: Coupon }): JSX.Element {

    const addToCart = () => {
        store.dispatch(addCouponToCart(props.coupon))
    }
    
    return (
        <>
            <Card style={{ borderRadius: 6, boxShadow: "0 2px 2px #9e9e9e", maxWidth: 304, fontFamily: "Roboto" }}>
                <CardMedia component="img" height="140"
                    image={props.coupon.image} />
                <CardContent style={{ padding: 24 }}>

                    <Typography variant="subtitle1" fontWeight={600}>
                        {props.coupon.title}
                    </Typography>

                    <Typography variant="subtitle2" minHeight={80}>
                        {props.coupon.description}
                    </Typography>

                    <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{"Only " + props.coupon.amount + " left!"}</span>
                        <span> {props.coupon.price + "$"}</span>
                    </Typography>

                </CardContent>
                <CardActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={() => addToCart()} style={{ backgroundColor: "#039be5", boxShadow: "0 1px 2px #757575" }}>
                        ADD TO CART
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default CouponCard;
