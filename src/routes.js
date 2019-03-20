import Dashboard from "./views/Dashboard";
import Projects from "./views/Projects";
import Tickets from "./views/Tickets";
import Invite from "./views/Invite";
import UserProfile from "./views/UserProfile";

import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Note from "@material-ui/icons/Note";
import Message from "@material-ui/icons/Message";
import Person from "@material-ui/icons/Person";


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
      icon: LibraryBooks,
      component: Projects,
      layout: "/home"
    },
    {
      path: "/tickets",
      name: "Tickets",
      icon: Note,
      component: Tickets,
      layout: "/home"
    },
    {
      path: "/invite",
      name: "Invite",
      icon: Message,
      component: Invite,
      layout: "/home"
    },
    {
      path: "/user",
      name: "User Profile",
      icon: Person,
      component: UserProfile,
      layout: "/home"
    },
];

export default dashboardRoutes;