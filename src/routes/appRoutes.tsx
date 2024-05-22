import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
import InstallationPage from "../pages/installation/InstallationPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";
import CreateCampignPage from "../pages/campign/CreateCampignPage";
import CampignOverviewPage from "../pages/campign/CampignOverviewPage";
import UserComponent from "../pages/user/UserComponent";
import PersonIcon from "@mui/icons-material/Person";
import Searchfile from "../assets/images/PNGs_white/Mask group-18.png";
import UserOverview from "../pages/user/UserOverview";
import AddUser from "../pages/user/AddUser";

// import ViewUser from "../pages/user/ViewUser";
import CampaignViewDetails from "../components/details/CampaignViewDetails";
import OfferSection from "../pages/offer-section/OfferSection";
import OfferDetails from "../pages/offer-section/OfferDetails";
import Permission from "../components/configure/Permission";
import ViewDetails from "../pages/user/ViewDetails";
import person1 from '../assets/images/PNGs_white/Mask group-11.png';
import addphoto from '../assets/images/PNGs_white/Mask group.png'
import listsearch from '../assets/images/PNGs_white/Mask group-16.png'
import store1 from '../assets/images/PNGs_white/Mask group-17.png'
import addstore from '../assets/images/PNG/Add Store.png'
import marketing from '../assets/images/PNGs_white/Mask group-2.png'
import offer from '../assets/images/PNGs_white/Mask group-13.png'
import setting from '../assets/images/PNGs_white/Mask group-6.png'
import createcampign from "../assets/images/PNG/Create campaign.png";
import campaignoverview from '../assets/images/PNG/Campaign Overview.png'
import project from '../assets/images/PNGs_white/Mask group-15.png'
import CreateOffer from '../pages/offer-section/CreateOffer'
import OfferOverview from "../pages/offer-section/OfferOverview";
import createofferimg from '../assets/images/PNG/create offer.png';
import offerOverviewimg from '../assets/images/PNG/offer overview.png'
import StoreDetails from "../components/storeForm/StoreDetails";
import StoreEdit from "../components/storeForm/StoreEdit";
//import StoreDetails from "../pages/component/StoreDetails";
import dashboard from '../assets/images/PNGs_white/Mask group-3.png'
import EditUser from "../pages/user/EditUser";
import EditOffer from "../pages/offer-section/EditOffer";
const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/campaign/view-details", 
    element: <CampaignViewDetails />, 
    state: "view-details", 
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <img src={dashboard} alt="User Icon"  width="24" height="24" />,
    },
  },
  {
    path: "/user",
    element: <UserComponent />,
    state: "User",
    sidebarProps: {
      displayText: "User",
      icon:  <img src={person1} alt="User Icon"  width="24" height="24" />,
    },
    child: [
      {
        path: "/user/user-overview",
        element: <UserOverview />,
        state: "component.userOverView",
        sidebarProps: {
          displayText: "User Overview",
          icon:  <img src={Searchfile} alt="User Icon"  width="24" height="24" />,
        },
      },
      {
        path: "/user/add-user",
        element: <AddUser />,
        state: "component.adduser",
        sidebarProps: {
          displayText: "Add User",
          icon:  <img src={addphoto} alt="User Icon"  width="24" height="24" />,
        },
      },
      {
        path: "/user/user-details/:id",
        element: <ViewDetails/>,
        state: "view User",
      },
      {
        path: "/user/edit-user-details/:id",
        element: <EditUser/>,
        state: "Edit User",
      },
    ],
  },

  {
    path: "/store",
    element: <ComponentPageLayout />,
    state: "Store",
    sidebarProps: {
      displayText: "Store",
      icon:  <img src={store1} alt="User Icon"  width="24" height="24" />,
    },
    child: [
      {
        path: "/store/store-overview",
        element: <AlertPage />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Store Overview",
          icon:  <img src={listsearch} alt="User Icon"  width="24" height="24" />,
        },
      },
      {
        path: "/store/add-store",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Add Store",
          icon:  <img src={addstore} alt="User Icon"  width="24" height="24" />,
        },
      },
     
    ],
  },
  {
    path: "/store/store-details",
    element: <StoreDetails />,
    state: "view store",   
  },

  {
    path: "/store/store-edit",
    element: <StoreEdit />,
    state: "view edit",   
  },
  {
    path: "/campaign",
    element: <DocumentationPage />,
    state: "campaign",
    sidebarProps: {
      displayText: "Campaign",
      icon:  <img src={marketing} alt="User Icon"  width="24" height="24" />,
    },


    child: [
      {
        path: "/campaign/campaign-overview",
        element: <CampignOverviewPage />,
        state: "component.campaignOverview",
        sidebarProps: {
          displayText: "Campaign Overview",
          icon:  <img src={campaignoverview} alt="User Icon"  width="24" height="24" />,
        },
      },
      {
        path: "/campaign/create-campaign",
        element: <CreateCampignPage />,
        state: "component.campaignCreate",
        sidebarProps: {
          displayText: "Create Campaign",
          icon:  <img src={createcampign} alt="User Icon"  width="24" height="24" />,
        },
      },
    ],
  },
 
  {
    path: "/offer",
    element: <OfferSection/>,
    state: "offer",
    sidebarProps: {
      displayText: "Offer",
      icon:  <img src={offer} alt="User Icon"  width="24" height="24" />,
    },
    child: [
      {
        path: "/offer/offer-overview",
        element: <OfferOverview />,
        state: "component.offerOverview",
        sidebarProps: {
          displayText: "Offer Overview",
          icon:  <img src={offerOverviewimg} alt="User Icon"  width="24" height="24" />,
        },
      },
      {
        path: "/offer/create-offer",
        element: <CreateOffer />,
        state: "component.createoffer",
        sidebarProps: {
          displayText: "Create Offer",
          icon: <img src={createofferimg} alt="User Icon"  width="24" height="24" />,
        },
       
      },
    ],
  },
  {
    path: "/offer-details/:id",
    element: <OfferDetails />,
    state: "offer",   
  },
  {
    path: "/edit-offer-details/:id",
    element: <EditOffer />,
    state: "editoffer",   
  },
  {
    path: "/configure",
    element: <UserComponent />,
    state: "configure",
    sidebarProps: {
      displayText: "Configure",
      icon: <img src={setting} alt="User Icon"  width="24" height="24" />, 
    },
    child: [
      {
        path: "/configure/permission",
        element: <Permission />,
        state: "component.permission",
        sidebarProps: {
          displayText: "Permissions",
          icon:  <img src={project} alt="User Icon"  width="24" height="24" />,
        },
      },
    ],
  },
  // {
  //   path: "/changelog",
  //   element: <ChangelogPage />,
  //   state: "changelog",
  //   sidebarProps: {
  //     displayText: "Changelog",
  //     icon: <FormatListBulletedOutlinedIcon />
  //   }
  // }
];

export default appRoutes;
