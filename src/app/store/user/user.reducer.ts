import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.action';
import { IUser } from '../../models/user.model';
import { IPackage } from '../../interfaces/package.interface';
import { DiscountType, ICoupon } from '../../interfaces/coupon.interface';

export interface UserState {
  user: IUser | null;
  coupons: ICoupon[] | null;
  error: string;
  success: boolean;
  package: IPackage | null;
  loading: boolean;
  renderOtp: boolean;
  price: number;
  amount: number;
  currency: string;
  orderId: string;
  message: string;
}

export const initialUserState: UserState = {
  user: null,
  coupons: null,
  error: '',
  renderOtp: false,
  loading: false,
  success: false,
  package: null,
  price: 0,
  amount: 0,
  currency: '',
  orderId: '',
  message: '',
};

export const UserReducer = createReducer(
  initialUserState,
  on(userActions.userLoginSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false,
    };
  }),
  on(userActions.userLoginError, (state, error) => {
    return {
      ...state,
      error: error.error,
    };
  }),
  on(userActions.otpRender, (state, error) => {
    return {
      ...state,
      renderOtp: true,
      user: error.user,
    };
  }),
  on(userActions.otpRenderFromSignup, (state, { user }) => {
    return {
      ...state,
      renderOtp: true,
      user: user,
    };
  }),
  on(userActions.userSignupSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
    };
  }),
  on(userActions.userSignupError, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(userActions.submitOtpError, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(userActions.resendOtpSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      renderOtp: true,
    };
  }),
  on(userActions.resendOtpError, (state, { error }) => {
    return {
      ...state,
      error: error,
      renderOtp: true,
    };
  }),
  on(userActions.logoutSuccess, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(
    userActions.showSinglePackageSuccess,
    (state, { success, singlePackage }) => {
      return {
        ...state,
        success,
        package: singlePackage,
      };
    }
  ),
  on(userActions.showSinglePackageError, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(userActions.bookingPageSuccess, (state, { success, selectedPackage }) => {
    return {
      ...state,
      success,
      package: selectedPackage,
    };
  }),
  on(userActions.bookingPageError, (state, { error }) => {
    return {
      ...state,
      success: false,
      error,
    };
  }),
  on(userActions.getAllCouponSuccess, (state, { success, coupons }) => {
    return {
      ...state,
      success,
      coupons,
    };
  }),
  on(userActions.getAllCouponError, (state, { error }) => {
    return {
      ...state,
      success: false,
      error,
    };
  }),
  on(userActions.applyCoupon, (state, { id, packagePrice }) => {
    let price = packagePrice + 50;

    if (state.coupons) {
      const coupon = state.coupons.find((coupon) => coupon._id === id);

      if (coupon) {
        if (coupon.discount_type === DiscountType.FIXED && coupon.discount_value) {
          price = packagePrice - coupon.discount_value;
        } else if (coupon.discount_type === DiscountType.PERCENTAGE && coupon.percentage) {
          let discount = (packagePrice * coupon.percentage) / 100;
          if (coupon.maxAmt && discount > coupon.maxAmt) {
            discount = coupon.maxAmt;
          }
          price = packagePrice - discount;
        }
        price = Math.max(price, 0);
      }
    }

    return {
      ...state,
      price: price,
      coupons: [],
    };
  }),
  on(userActions.cancelCoupon, (state) => {
    return {
      ...state,
      price: 0,
    };
  }),
 
  on(userActions.initiatePayment, (state) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(
    userActions.initiatePaymentSuccess,
    (state, { success, amount, currency, orderId }) => {
      return {
        ...state,
        success,
        amount,
        currency,
        orderId,
        message: ''
      };
    }
  ),
  on(userActions.initiatePaymentFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(userActions.verifyPayment, (state) => {
    return {
      ...state,
      success: false,
    };
  }),
  on(userActions.verifyPaymentSuccess, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(userActions.verifyPaymentFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);
