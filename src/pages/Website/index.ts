/**
 * صفحات الموقع العام (Website)
 * الراوتات العامة: الرئيسية، عنا، تواصل، سياسة الخصوصية، المدونة، العروض، الكروت، الكوبونات، الحجوزات، تسجيل الدخول، التسجيل
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
import OffersPaymentPage from "../offers/[category]/[restaurantId]/payment";
import OffersSuccessPage from "../offers/[category]/[restaurantId]/success";
import CardsPage from "../cards";
import CompanyDetailsPage from "../cards/[companyId]";
import PaymentPage from "../cards/[companyId]/payment";
import SuccessPage from "../cards/[companyId]/success";
import CouponsPage from "../coupons";
import BookingsPage from "../bookings";
import BookingsPaymentPage from "../bookings/payment";
import BookingsSuccessPage from "../bookings/success";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";
import NotFoundPage from "../not_found";

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
  OffersPaymentPage,
  OffersSuccessPage,
  CardsPage,
  CompanyDetailsPage,
  PaymentPage,
  SuccessPage,
  CouponsPage,
  BookingsPage,
  BookingsPaymentPage,
  BookingsSuccessPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
};
