import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { courseDetails, removeCourseDetail } from '../../../features/course/courseSlice';
import { getTeachersNotInCourse, removeListUsers } from '../../../features/user/userSlice';
import Widget from "../../../components/Widget/Widget";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { ViewTable } from "../../dashboard/components/Table/Table";
import { getFormattedDate } from '../../../helpers/ultilities';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { Avatar, Button, FormControl, Grid } from '@mui/material';
import { Edit, KeyboardReturn } from '@mui/icons-material';

const CourseDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(courseDetails(id));
    return () => {
      dispatch(removeCourseDetail());
    }
  }, [id]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'Id',
      },
      {
        Header: t('User.FirstName'),
        accessor: 'FirstName',
      },
      {
        Header: t('User.LastName'),
        accessor: 'LastName'
      },
      {
        Header: t('User.Gender'),
        accessor: d => d.Gender ? t('User.Male') : t('User.Female')
      },
      {
        Header: 'Email',
        accessor: 'Email'
      },
      {
        Header: t('User.DateOfBirth'),
        accessor: d => getFormattedDate(d.DateOfBirth)
      },
      {
        Header: t('User.Address'),
        accessor: 'Address'
      },
      {
        Header: t('User.Role'),
        accessor: 'Role.Name'
      }
    ],
    [t]
  );

  return (
    <>
      {Object.keys(course).length === 0 ? <div>...Loading</div> : (
        <>
          <PageTitle title="Course detail" button={
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <Button variant="contained" onClick={() => history.push(`/app/course/edit/${id}`)} style={{ marginRight: "10px" }} startIcon={<Edit />}>
                {t("Action.Update")}
              </Button>
              <Button variant="outlined" onClick={() => history.push('/app/course')} startIcon={<KeyboardReturn />}>
                {t("Action.Back")}
              </Button>
            </div>
          } />
          <Widget disableWidgetMenu>
            <Grid container spacing={2}  >
              <Grid item xs={4} />
              <Grid item xs={3}>
                <Avatar alt="Avatar"
                  src={course.ImageSrc ? course.ImageSrc : "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"}
                  variant="square" sx={{ width: 400, height: 200 }} />
                <Typography style={{ marginLeft: "150px", marginTop: "10px" }} variant="h6">Avatar</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Course.CourseName")}: {course.Name}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Course.TotalSessions")}: {course.TotalSessions}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Course.Description")}: {course.Description ? course.Description : <i>{t("NotFIlled")}</i>}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t('Course.TeacherList')}: {course.Teachers.length === 0 ? 0 : ""} </Typography>
                </FormControl>
              </Grid>
            </Grid>
            {course.Teachers.length !== 0 ?
              <ViewTable columns={columns} data={course.Teachers} pagination /> :
              null}
          </Widget>
        </>
      )}
    </>
  )
}

export default CourseDetails