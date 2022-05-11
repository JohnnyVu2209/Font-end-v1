import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LoadingButton } from '@mui/lab'
import { Add } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, styled, Switch, TextField } from '@mui/material';
import { toast } from 'react-toastify';

import ERRORS from '../../../constants/ErrorCode';
import SUCCESSES from "../../../constants/SuccessCode";
import PageTitle from '../../../components/PageTitle/PageTitle';
import { courseDetails, removeCourseDetail, addTeacher, removeTeacher, updateCourse, updateCourseForm } from '../../../features/course/courseSlice';
import { getTeachersNotInCourse, removeListUsers } from '../../../features/user/userSlice';
import { EditTable } from "../../dashboard/components/Table/Table";
import { getFormattedDate } from '../../../helpers/ultilities';
import MyDialog from "../../../components/Dialog/Dialog";

const InputAvatar = styled('input')({
  display: 'none',
});

const EditCourse = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(courseDetails(id));
    dispatch(getTeachersNotInCourse(id));
    return () => {
      dispatch(removeCourseDetail());
      dispatch(removeListUsers());
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

  const modalTableColumns = useMemo(
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
        Header: t('User.Role'),
        accessor: 'Role.Name'
      },
    ],
    [t]
  );

  const SUPPORTED_FORMAT = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .required(ERRORS.REQUIRED_COURSENAME)
      .min(6, ERRORS.RANGE_COURSENAME)
      .max(24, ERRORS.RANGE_COURSENAME),
    avatarFile: Yup
      .mixed()
      .nullable()
      .test(
        "FiLE_SIZE",
        ERRORS.MAX_AVATAR,
        (value) => !value || (value && Math.round(value.size / 1024) <= 2048)
      )
      .test(
        "FILE_FORMAT",
        ERRORS.AVATAR_FORMAT,
        (value) => !value || (value && SUPPORTED_FORMAT.includes(value?.type))
      ),
    totalSessions: Yup.number()
      .typeError(ERRORS.FORMAT_TOTALSESSIONS)
      .required(ERRORS.REQUIRED_TOTALSESSIONS)
      .min(1, ERRORS.RANGE_TOTALSESSIONS)
      .max(999, ERRORS.RANGE_TOTALSESSIONS),
  });

  const getFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') formData.append(key, object[key]);
      else formData.append(key, JSON.stringify(object[key]));
    });
    return formData;
  };

  const [removeModalShow, setRemoveModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false)
  const [memberData, setMemberData] = useState([]);

  //Handle modal open
  const handleOpenAddUserModal = () => setAddModalShow(true);

  const handleOpenConfirmModal = () => setRemoveModalShow(true);
  //Handle modal close
  const handleAddClose = () => setAddModalShow(false);

  const handleRemoveClose = () => setRemoveModalShow(false);

  //Handle action
  const handleAddMember = () => {
    memberData.forEach(element => {
      dispatch(addTeacher({ courseId: id, teacherId: element.Id }))
        .then(() => {
          toast.success(t(SUCCESSES.ADD_TEACHER_SUCCESS));
          dispatch(getTeachersNotInCourse(id));
        })
        .catch(() => { toast.error(t(ERRORS.ADD_TEACHER_FAIL)) });
    });
    handleAddClose();
  };
  const handleRemoveMember = () => {
    memberData.forEach(element => {
      dispatch(removeTeacher({ courseId: id, teacherId: element.Id }))
        .then(() => {
          toast.success(t(SUCCESSES.REMOVE_TEACHER_SUCCESS));
          dispatch(getTeachersNotInCourse(id));
        })
        .catch(() => { toast.error(t(ERRORS.REMOVE_TEACHER_FAIL)) });
    });
    handleRemoveClose();
  }
  return (
    <>
      {Object.keys(course).length === 0 || users.length === 0 ? <div>...Loading</div> : (
        <Formik
          initialValues={{
            Name: course.Name,
            totalSessions: course.TotalSessions,
            description: course.Description,
            avatarFile: "",
            avatarName: course.AvatarName,
            previewFile: course.ImageSrc
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const waitTime = 100000;
            const timer = new Promise((_, reject) => setTimeout(reject, waitTime, { timedout: "request taking a long time" }));

            let body = {
              Name: values.Name,
              TotalSessions: values.totalSessions,
              Description: values.description,
              Duration: 0,
              AvatarName: values.avatarName
            };
            let myRequest = "";

            if (values.avatarFile) {
              body = getFormData(body);
              body.append("AvatarFile", values.avatarFile);
              myRequest = dispatch(updateCourseForm({ id, data: body }));
            }
            else {
              myRequest = dispatch(updateCourse({ id, data: body }));
            }

            myRequest.then(() => {
              toast.success(t(SUCCESSES.UPDATE_COURSE_SUCCESS));
              setSubmitting(false);
              history.push(`/app/course/detail/${id}`);
            }).catch((err) => {
               console.log(err)
              toast.error(t(ERRORS.UPDATE_COURSE_FAIL));
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isSubmitting }) => (
            <>
              <PageTitle title="Edit course" button={
                <LoadingButton variant="contained" endIcon={<Add />} loadingPosition="end" onClick={handleSubmit} loading={isSubmitting} >
                  {t("Action.Save")}
                </LoadingButton>} />
              <Box component="form" >
                <Grid container spacing={2}>
                  <Grid item xs={4} />
                  <Grid item xs={3}>

                    <FormControl error={(values.avatarFile !== null) && errors.avatarFile ? true : false} fullWidth variant="standard" margin="dense">
                      <Avatar alt="Avatar"
                        src={values.previewFile ? values.previewFile : ""}
                        variant="square" sx={{ width: 400, height: 200 }} />
                      <label htmlFor="contained-button-file">
                        <InputAvatar accept="image/*" id="contained-button-file" multiple type="file"
                          onChange={(e) => {
                            if (e.target.length != 0) {
                              setFieldValue("avatarFile", e.target.files[0]);
                              setFieldValue("previewFile", URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                        <Button style={{ marginLeft: "130px", marginTop: "10px" }} variant="contained" component="span">
                          Upload
                        </Button>
                      </label>
                      {(values.avatarFile !== null) && errors.avatarFile ? (
                        <FormHelperText id="component-error-text">
                          {t(errors.avatarFile)}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        required
                        id="standard-required"
                        label={t("Course.CourseName")}
                        name="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Name}
                        error={touched.Name && errors.Name ? true : false}
                        helperText={touched.Name && errors.Name ? t(errors.Name) : null}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        required
                        id="standard-required"
                        label={t("Course.TotalSessions")}
                        name="totalSessions"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.totalSessions}
                        error={touched.totalSessions && errors.totalSessions ? true : false}
                        helperText={touched.totalSessions && errors.totalSessions ? t(errors.totalSessions) : null}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        id="standard-required"
                        label={t("Course.Description")}
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        error={touched.description && errors.description ? true : false}
                        helperText={touched.description && errors.description ? t(errors.description) : null}
                        variant="standard"
                        multiline
                        rows={6}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <Divider />
                    </FormControl>
                  </Grid>
                </Grid>
                <EditTable
                  columns={columns}
                  data={course.Teachers}
                  title={t('Course.TeacherList')}
                  addHandler={handleOpenAddUserModal}
                  removeHandler={handleOpenConfirmModal}
                  onSelectedRowChange={setMemberData}
                  addRemoveAction
                />
              </Box>
            </>
          )}
        </Formik>

      )}
      <MyDialog
        Show={addModalShow}
        HandleClose={handleAddClose}
        title={t('Title.AddMember')}
        SaveTitle={t('Action.Add')}
        CancelTitle={t('Action.Cancel')}
        Size="lg"
        HandleSave={handleAddMember}
      >
        {users.length > 0 ? (
          <EditTable
            columns={modalTableColumns}
            data={users}
            onSelectedRowChange={setMemberData}
          />
        ) : t('Confirmation.NoTeacher')}
      </MyDialog>

      <MyDialog
        Show={removeModalShow}
        HandleClose={handleRemoveClose}
        HandleSave={handleRemoveMember}
        title={t('Title.Confirmation')}
        SaveTitle={t('Action.Yes')}
        CancelTitle={t('Action.No')}>
        {t('Confirmation.Remove') + '?'}
      </MyDialog>
    </>
  )
}

export default EditCourse