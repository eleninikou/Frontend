import Dashboard from "./views/Dashboard";
import DashboardIcon from "@material-ui/icons/Dashboard";


const dashboardRoutes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: DashboardIcon,
      component: Dashboard,
      layout: "/home"
    },
    {
      path: "/projects",
      name: "Projects",
      icon: DashboardIcon,
      component: '',
      layout: "/home"
    },
    {
      path: "/tickets",
      name: "Tickets",
      icon: DashboardIcon,
      component: '',
      layout: "/home"
    }
];

export default dashboardRoutes;