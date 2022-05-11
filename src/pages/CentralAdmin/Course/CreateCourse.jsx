import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab'
import { Add } from '@mui/icons-material';
import { Avatar, Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, styled, Switch, TextField } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import PageTitle from '../../../components/PageTitle/PageTitle'
import ERRORS from '../../../constants/ErrorCode';
import SUCCESSES from "../../../constants/SuccessCode";
import { createCourseForm, createCourse } from "../../../features/course/courseSlice";

const InputAvatar = styled('input')({
  display: 'none',
});

const CreateCourse = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          avatarFile: "",
          totalSessions: 0,
          description: "",
          previewFile: undefined
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // console.log(values);
          setSubmitting(true);
          const waitTime = 100000;
          const timer = new Promise((_, reject) => setTimeout(reject, waitTime, { timedout: "request taking a long time" }));

          let body = {
            Name: values.Name,
            TotalSessions: values.totalSessions,
            Description: values.description,
            Duration: 0
          };

          let myRequest = "";

          if (values.avatarFile) {
            body = getFormData(body);
            body.append("AvatarFile", values.avatarFile);
            myRequest = dispatch(createCourseForm(body));
          }
          else {
            myRequest = dispatch(createCourse(body));
          }
          myRequest.then(() => {
            toast.success(t(SUCCESSES.CREATE_COURSE_SUCCESS));
            setSubmitting(false);
            resetForm();
            history.push("/app/course");
          }).catch((error) => {
            console.log("from catch: ", error);
            setSubmitting(false);
            toast.error(t(ERRORS.CREATE_COURSE_FAIL));
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
            <PageTitle title="Create course" button={
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
                        {errors.avatarFile}
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
              </Grid>
            </Box>
          </>
        )}
      </Formik>
    </>
  )
}

export default CreateCourse