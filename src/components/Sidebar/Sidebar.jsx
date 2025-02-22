import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  Person as UserIcon,
  Domain as CenterIcon,
  VerifiedUser as PermissionIcon,
  Book as CourseIcon,
  MenuBook as ClassIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useSelector } from "react-redux"



const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Typography",
    link: "/app/typography",
    icon: <TypographyIcon />,
  },
  { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  {
    id: 3,
    label: "Notifications",
    link: "/app/notifications",
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: "UI Elements",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Icons", link: "/app/ui/icons" },
      { label: "Charts", link: "/app/ui/charts" },
      { label: "Maps", link: "/app/ui/maps" },
    ],
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "PROJECTS" },
  {
    id: 12,
    label: "My recent",
    link: "",
    icon: <Dot size="small" color="warning" />,
  },
  {
    id: 13,
    label: "Starred",
    link: "",
    icon: <Dot size="small" color="primary" />,
  },
  {
    id: 14,
    label: "Background",
    link: "",
    icon: <Dot size="small" color="secondary" />,
  },
  { id: 15, label: 'User', link: '/app/user', icon: <UserIcon /> },
  { id: 16, label: 'Center', link: '/app/center', icon: <CenterIcon /> },
  { id: 17, label: 'Permission', link: '/app/permission', icon: <PermissionIcon /> },
];


function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  const { isAdmin, isCAdmin } = useSelector((state) => state.auth);

  // local
  var [isPermanent, setPermanent] = useState(true);

  const myStructure = isAdmin ?
    [
      { id: 1, label: 'User', link: '/app/user', icon: <UserIcon /> },
      { id: 2, label: 'Center', link: '/app/center', icon: <CenterIcon /> },
      { id: 3, label: 'Permission', link: '/app/permission', icon: <PermissionIcon /> },
      //{ id: 4, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
    ]
    : (isCAdmin ? [
      { id: 1, label: 'User', link: '/app/user', icon: <UserIcon /> },
      { id: 2, label: 'Course', link: '/app/course', icon: <CourseIcon /> },
      { id: 3, label: 'Class', link: '/app/class', icon: <ClassIcon /> },
    ] :
      [
        { id: 0, label: 'User', link: '/app/user', icon: <UserIcon /> },
        {
          id: 1,
          label: "Typography",
          link: "/app/typography",
          icon: <TypographyIcon />,
        },
        { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
        {
          id: 3,
          label: "Notifications",
          link: "/app/notifications",
          icon: <NotificationsIcon />,
        },
        {
          id: 4,
          label: "UI Elements",
          link: "/app/ui",
          icon: <UIElementsIcon />,
          children: [
            { label: "Icons", link: "/app/ui/icons" },
            { label: "Charts", link: "/app/ui/charts" },
            { label: "Maps", link: "/app/ui/maps" },
          ],
        },
        { id: 5, type: "divider" },
        { id: 6, type: "title", label: "HELP" },
        { id: 7, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
        { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
        { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
        { id: 10, type: "divider" },
        { id: 11, type: "title", label: "PROJECTS" },
        {
          id: 12,
          label: "My recent",
          link: "",
          icon: <Dot size="small" color="warning" />,
        },
        {
          id: 13,
          label: "Starred",
          link: "",
          icon: <Dot size="small" color="primary" />,
        },
        {
          id: 14,
          label: "Background",
          link: "",
          icon: <Dot size="small" color="secondary" />,
        },]

    )
    ;

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {myStructure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
