import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from '@material-ui/core'
import Icon from '@mdi/react'
import { ToastContainer } from 'react-toastify';

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
//User
import User from "../../pages/user/UserManagement";
import CreateUser from "../../pages/user/CreateUser";
import UserDetails from "../../pages/user/UserDetails";
import EditUser from "../../pages/user/EditUser";
//Center
import Center from "../../pages/Admin/center/CenterManagement";
import CreateCenter from "../../pages/Admin/center/CreateCenter";
import EditCenter from "../../pages/Admin/center/EditCenter";
import CenterDetails from "../../pages/Admin/center/CenterDetails";
//Permission
import Permission from "../../pages/Admin/permission/PermissionManagement";
import CreatePermission from "../../pages/Admin/permission/CreatePermission";
import EditPermission from "../../pages/Admin/permission/EditPermission";
import PermissionDetails from "../../pages/Admin/permission/PermissionDetails";
//Course
import Course from "../../pages/CentralAdmin/Course/CourseManagement";
import CreateCourse from "../../pages/CentralAdmin/Course/CreateCourse";
import EditCourse from "../../pages/CentralAdmin/Course/EditCourse";
import CourseDetails from "../../pages/CentralAdmin/Course/CourseDetails";
//
import Dashboard from "../../pages/dashboard/Dashboard";
import Typography from "../../pages/typography/Typography";
import Notifications from "../../pages/notifications/Notifications";
import Maps from "../../pages/maps/Maps";
import Tables from "../../pages/tables/Tables";
import Icons from "../../pages/icons/Icons";
import Charts from "../../pages/charts/Charts";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <ToastContainer autoClose={4000} />
          <Switch>
            <Route path="/app/user/edit/:id" component={EditUser} />
            <Route path="/app/user/detail/:id" component={UserDetails} />
            <Route path="/app/user/create" component={CreateUser} />
            <Route path="/app/user" component={User} />

            <Route path ="/app/center/detail/:id" component={CenterDetails}/>
            <Route path ="/app/center/edit/:id" component={EditCenter}/>
            <Route path ="/app/center/create" component={CreateCenter}/>
            <Route path="/app/center" component={Center} />

            <Route path="/app/permission/detail/:id" component={PermissionDetails} />
            <Route path="/app/permission/edit/:id" component={EditPermission} />
            <Route path="/app/permission/create" component={CreatePermission} />
            <Route path="/app/permission" component={Permission} />

            <Route path="/app/course/detail/:id" component={CourseDetails} />
            <Route path="/app/course/edit/:id" component={EditCourse} />
            <Route path="/app/course/create" component={CreateCourse} />
            <Route path="/app/course" component={Course} />

            <Route path="/app/dashboard" component={UserDetails} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
          {/* <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/about'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/blog'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box> */}
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
