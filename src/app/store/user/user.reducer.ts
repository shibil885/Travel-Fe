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
  on(userActions.applyCoupon, (state, { id, packagePrice, offer }) => {
    let price = packagePrice;
    if (offer) {
      if (offer.discount_type === DiscountType.FIXED) {
        price = price - Number(offer.discount_value);
      } else if (offer.discount_type === DiscountType.PERCENTAGE) {
        price = price * (Number(offer.percentage) / 100);
      }
    }
    console.log('price after reduce offer price', price);
    if (state.coupons) {
      const coupon = state.coupons.find((coupon) => coupon._id === id);

      if (coupon) {
        if (
          coupon.discount_type === DiscountType.FIXED &&
          coupon.discount_value
        ) {
          price = price - coupon.discount_value;
          console.log('price after reduce fixed coupon price', price);
        } else if (
          coupon.discount_type === DiscountType.PERCENTAGE &&
          coupon.percentage
        ) {
          let discount = (price * coupon.percentage) / 100;
          console.log('dicount', discount);
          console.log('max', coupon.maxAmt);
          if (coupon.maxAmt && discount > coupon.maxAmt) {
            price = price - coupon.maxAmt;
          } else {
            price = price - discount;
          }
          console.log('price after reduce percentage coupon price', price);
        }
      }
    }
    console.log('last price', price);
    return {
      ...state,
      price: price <= 50 ? 50 : price,
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
        message: '',
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
