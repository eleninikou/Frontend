import Dashboard from "./views/Dashboard";
import Projects from "./views/Projects";
import Tickets from "./views/Tickets";
import Invite from "./views/Invite";
import UserProfile from "./views/UserProfile";
import Milestones from "./views/Milestones";

import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Note from "@material-ui/icons/Note";
import Message from "@material-ui/icons/Message";
import Person from "@material-ui/icons/Person";
import Timeline from "@material-ui/icons/Timeline";


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
      path: "/milestones",
      name: "Milestones",
      icon: Timeline,
      component: Milestones,
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