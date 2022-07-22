import { Coupon } from './coupon';

export class Company {
    id: number;
    name: string;
    email: string;
    password: string;
    coupons: Coupon[]
}