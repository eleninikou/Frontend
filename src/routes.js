import Dashboard from "./views/Dashboard"
import Projects from "./views/Projects"
import Tickets from "./views/Tickets"
import Invite from "./views/Invite"
import UserProfile from "./views/UserProfile"
import Milestones from "./views/Milestones"

import DashboardIcon from "@material-ui/icons/Dashboard"
import LibraryBooks from "@material-ui/icons/LibraryBooks"
import Note from "@material-ui/icons/Note"
import ContactMail from "@material-ui/icons/ContactMail"
import Person from "@material-ui/icons/Person"
import Timeline from "@material-ui/icons/Timeline"
import NotInterested from "@material-ui/icons/NotInterested"


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
      icon: ContactMail,
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
    {
      path: "/logout",
      name: "Log out",
      icon: NotInterested,
      layout: "/home"
    },
];

export default dashboardRoutes;