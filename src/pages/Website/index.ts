/**
 * صفحات الموقع العام (Website)
 * الراوتات العامة: الرئيسية، عنا، تواصل، سياسة الخصوصية، المدونة، العروض، الكروت، الكوبونز، الحجوزات، تسجيل الدخول، التسجيل
 */

import HomePage from "../home";
import AboutPage from "../about";
import ContactPage from "../contact";
import PrivacyPolicyPage from "../privacy_policy";
import TermsConditionsPage from "../terms_conditions";
import BlogsPage from "../blogs";
import BlogArticlePage from "../blogs/[slug]";
import OffersPage from "../offers";
import CategoryOffersPage from "../offers/[category]";
import RestaurantDetailsPage from "../offers/[category]/[restaurantId]";
import OfferDetailPage from "../offers/[category]/[restaurantId]/offer/[offerId]";
import OffersPaymentPage from "../offers/[category]/[restaurantId]/payment";
import OffersSuccessPage from "../offers/[category]/[restaurantId]/success";
import CardsPage from "../cards";
import CompanyDetailsPage from "../cards/[companyId]";
import CardOfferDetailPage from "../cards/[companyId]/offer/[offerId]";
import PaymentPage from "../cards/[companyId]/payment";
import SuccessPage from "../cards/[companyId]/success";
import CouponsPage from "../coupons";
import BookingsPage from "../bookings";
import BookingsPaymentPage from "../bookings/payment";
import BookingsSuccessPage from "../bookings/success";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";
import NotFoundPage from "../not_found";
import {
  SubscriptionPlansPage,
  SubscriptionSuccessPage,
  SubscriptionFailedPage,
} from "../subscription";

export {
  HomePage,
  AboutPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
  BlogsPage,
  BlogArticlePage,
  OffersPage,
  CategoryOffersPage,
  RestaurantDetailsPage,
  OfferDetailPage,
  OffersPaymentPage,
  OffersSuccessPage,
  CardsPage,
  CompanyDetailsPage,
  CardOfferDetailPage,
  PaymentPage,
  SuccessPage,
  CouponsPage,
  BookingsPage,
  BookingsPaymentPage,
  BookingsSuccessPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  SubscriptionPlansPage,
  SubscriptionSuccessPage,
  SubscriptionFailedPage,
};
