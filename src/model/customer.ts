import { Coupon } from './coupon';

export class Customer{
    id: number;
    email: string;
    name: string;
    password: string;
    coupons: Coupon[];
}