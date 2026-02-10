import { APP_ROUTES } from "@constants";
// راوتات الموقع العام (Website)
import {
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
} from "@pages/Website";
// لوحة المستخدم (App / الموبايل)
import {
  ProfilePage,
  SavedPage,
  CartPage,
  OrdersPage,
  WalletPage,
} from "@pages/App";

export interface AppRouter {
  path: string;
  element: React.ComponentType;
  inLayout: boolean;
}

export const routes: AppRouter[] = [
  // ========== Website — الراوتات العامة ==========
  {
    path: APP_ROUTES.home,
    element: HomePage,
    inLayout: true,
  },
  {
    path: APP_ROUTES.about,
    element: AboutPage,
    inLayout: true,
  },
  // {
  //   path: `${APP_ROUTES.services}/:serviceSlug`,
  //   element: ServiceDetailsByIdPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.services,
  //   element: ServiceDetailsPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.careers,
  //   element: CareersPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.job_details,
  //   element: JobDetailsPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.job_application_thanks,
  //   element: ThanksPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.job_application,
  //   element: JobApplication,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.talent_application,
  //   element: TalentApplicationPage,
  //   inLayout: true,
  // },
  {
    path: APP_ROUTES.contact,
    element: ContactPage,
    inLayout: true,
  },
  {
    path: APP_ROUTES.privacy_policy,
    element: PrivacyPolicyPage,
    inLayout: true,
  },
  {
    path: APP_ROUTES.terms_conditions,
    element: TermsConditionsPage,
    inLayout: true,
  },
  // {
  //   path: APP_ROUTES.confirmEmail,
  //   element: ConfrimEmailPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.companiesApplication,
  //   element: BusinessRegistrationPage,
  //   inLayout: false,
  // },
  // {
  //   path: APP_ROUTES.companiesApplicationSuccess,
  //   element: CompanyApplicationSuccessPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.signContract,
  //   element: ConrtactPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.ratingUser,
  //   element: RatingPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.downloadApp,
  //   element: DownloadAppPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.projects,
  //   element: ProjectsPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.request_service,
  //   element: RequestServicePage,
  //   inLayout: true,
  // },
  // {
  //   path: "/jobs",
  //   element: JobsPage,
  //   inLayout: true,
  // },
  // {
  //   path: `${APP_ROUTES.portfolio}/:slug`,
  //   element: PortfolioDetailsPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.portfolio,
  //   element: PortfolioPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.upload_intro_video,
  //   element: UploadIntroVideo,
  //   inLayout: true,
  // },
  // {
  //   path: "/gallery",
  //   element: GalleryPage,
  //   inLayout: true,
  // },
  // {
  //   path: "/search",
  //   element: SearchPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.properties,
  //   element: PropertiesPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.property,
  //   element: PropertyPage,
  //   inLayout: true,
  // },
  // {
  //   path: APP_ROUTES.propertyProduct,
  //   element: PropertyProductPage,
  //   inLayout: true,
  // },
  // {
  //   path: "/investments",
  //   element: InvestmentsPage,
  //   inLayout: true,
  // },
  {
    path: "/blogs",
    element: BlogsPage,
    inLayout: true,
  },
  {
    path: "/blogs/:slug",
    element: BlogArticlePage,
    inLayout: true,
  },
  {
    path: "/cards",
    element: CardsPage,
    inLayout: true,
  },
  {
    path: "/bookings",
    element: BookingsPage,
    inLayout: true,
  },
  {
    path: "/cards/:companyId",
    element: CompanyDetailsPage,
    inLayout: true,
  },
  {
    path: "/cards/:companyId/payment",
    element: PaymentPage,
    inLayout: true,
  },
  {
    path: "/cards/:companyId/success",
    element: SuccessPage,
    inLayout: false,
  },
  {
    path: "/offers",
    element: OffersPage,
    inLayout: true,
  },
  {
    path: "/offers/:category",
    element: CategoryOffersPage,
    inLayout: true,
  },
  {
    path: "/offers/:category/:restaurantId",
    element: RestaurantDetailsPage,
    inLayout: true,
  },
  {
    path: "/offers/:category/:restaurantId/payment",
    element: OffersPaymentPage,
    inLayout: true,
  },
  {
    path: "/offers/:category/:restaurantId/success",
    element: OffersSuccessPage,
    inLayout: true,
  },
  {
    path: "/bookings/:type/payment",
    element: BookingsPaymentPage,
    inLayout: true,
  },
  {
    path: "/bookings/:type/success",
    element: BookingsSuccessPage,
    inLayout: true,
  },
  {
    path: "/login",
    element: LoginPage,
    inLayout: false,
  },
  {
    path: "/register",
    element: RegisterPage,
    inLayout: false,
  },
  // ========== App — لوحة المستخدم (موبايل) ==========
  {
    path: "/profile",
    element: ProfilePage,
    inLayout: true,
  },
  {
    path: "/saved",
    element: SavedPage,
    inLayout: true,
  },
  {
    path: "/cart",
    element: CartPage,
    inLayout: true,
  },
  {
    path: "/orders",
    element: OrdersPage,
    inLayout: true,
  },
  {
    path: "/wallet",
    element: WalletPage,
    inLayout: true,
  },
  {
    path: "/coupons",
    element: CouponsPage,
    inLayout: true,
  },
  {
    path: APP_ROUTES.not_found,
    element: NotFoundPage,
    inLayout: true,
  },
];
