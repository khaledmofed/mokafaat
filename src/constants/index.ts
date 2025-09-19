import { AboutFeaturesProps } from "@interfaces";
import People from "@assets/images/people.svg";
import Passion from "@assets/images/passion.svg";
import Place from "@assets/images/place.svg";

export const APP_ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  portfolio: "/portfolio",
  clients: "clients",
  careers: "/jops",
  job_details: "/jop/:id",
  job_application: "/jop/:id/application",
  job_application_thanks: "/jop/:id/application/thanks",
  talent_application: "/freelancer-application",
  contact: "/contact",
  privacy_policy: "/privacy-policy",
  terms_conditions: "/terms-and-conditions",
  confirmEmail: "/confirmEmail/:email/:code",
  companiesApplication: "/business-registration",
  companiesApplicationSuccess: "/companies-application/success",
  request_service: "/request-service",
  signContract: "/contract/:contractId",
  ratingUser: "/rating/:userId",
  downloadApp: "/download-app",
  projects: "/projects",
  upload_intro_video: "/upload-intro-video",
  properties: "/properties",
  property: "/properties/:slug",
  propertyProduct: "/properties/:propertySlug/:productSlug",
  not_found: "*",
};

export const NavLinks = [
  {
    path: APP_ROUTES.home,
    title: "home",
    scroll: false,
    newTab: false,
  },
  {
    path: APP_ROUTES.about,
    title: "about",
    scroll: false,
    newTab: false,
  },
  {
    path: "/offers",
    title: "offers",
    scroll: false,
    newTab: false,
  },
  {
    path: "/cards",
    title: "cards",
    scroll: false,
    newTab: false,
  },
  {
    path: "/coupons",
    title: "coupons",
    scroll: false,
    newTab: false,
  },
  {
    path: "/bookings",
    title: "bookings",
    scroll: false,
    newTab: false,
  },
  {
    path: "/blogs",
    title: "blogs",
    scroll: false,
    newTab: false,
  },
  {
    path: APP_ROUTES.contact,
    title: "contact",
    scroll: false,
    newTab: false,
  },
];
export const portfolioCarouselResponsive = {
  0: {
    items: 1,
  },
  500: {
    items: 2,
  },
  800: {
    items: 3,
  },
  1200: {
    items: 3.5,
  },
};

export const galleryCarouselResponsive = {
  0: {
    items: 1,
  },
  500: {
    items: 2,
  },
  800: {
    items: 3,
  },
  1200: {
    items: 4.5,
  },
};

export const clientsCarouselResponsive = {
  0: {
    items: 1,
  },
  500: {
    items: 2,
  },
  800: {
    items: 4,
  },
  1200: {
    items: 6,
  },
};

export const FooterGroups = [
  {
    title: "home.navbar.careers",
    urls: [
      {
        to: APP_ROUTES.careers,
        text: "home.footer.jobs",
      },
      {
        to: APP_ROUTES.talent_application,
        text: "home.footer.talentApplication",
      },
      {
        to: APP_ROUTES.projects,
        text: "home.navbar.upcoming_projects",
      },
    ],
  },
  {
    title: "home.footer.support",
    urls: [
      {
        to: APP_ROUTES.about,
        text: "home.navbar.about",
      },
      {
        to: APP_ROUTES.privacy_policy,
        text: "home.footer.privacy",
      },
      {
        to: APP_ROUTES.terms_conditions,
        text: "home.footer.terms",
      },
    ],
  },
];

export const AboutFeatures: AboutFeaturesProps[] = [
  {
    icon: People,
    title: "about.featuers.people",
    description: "about.featuers.people-description",
  },
  {
    icon: Passion,
    title: "about.featuers.passion",
    description: "about.featuers.passion-description",
  },
  {
    icon: Place,
    title: "about.featuers.place",
    description: "about.featuers.place-description",
  },
];
