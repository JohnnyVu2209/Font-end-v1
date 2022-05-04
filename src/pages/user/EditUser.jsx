import { Box, Grid, TextField, FormControl, Avatar, Button, styled, InputLabel, Select, MenuItem, InputAdornment, IconButton, Input, ButtonBase, FormHelperText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageTitle from "../../components/PageTitle/PageTitle";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { Formik } from "formik";
import SUCCESSES from "../../constants/SuccessCode";
import ERRORS from '../../constants/ErrorCode';
import tokenService from "../../services/token.service";
import { differenceInYears, format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GetSelectRole, removeSelectRole } from '../../features/permission/permissionSlice';
import { GetSelectCenter, removeSelectCenter } from '../../features/center/centerSlice';
import { fetchAsyncUser, removeUser } from "../../features/user/userSlice";
import { LoadingButton } from '@mui/lab';
import userService from '../../services/user.service';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getFormattedDate } from '../../helpers/ultilities';

const InputAvatar = styled('input')({
  display: 'none',
});

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#00 000 0000"
      definitions={{
        '#': /[0]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const EditUser = () => {
  const current = tokenService.getUserInfo();
  const localUser = JSON.parse(localStorage.getItem('user'));

  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const selectRoles = useSelector((state) => state.permission.seletecRoles);
  const selectCenters = useSelector((state) => state.center.selectCenter);

  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    dispatch(fetchAsyncUser(id));
    dispatch(GetSelectRole());
    dispatch(GetSelectCenter());
    return () => {
      dispatch(removeUser());
      dispatch(removeSelectRole());
      dispatch(removeSelectCenter());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(user).length !== 0)
      setDisable(user.Role.Name === 'ADMIN' || current.Role.Name === 'CENTRAL ADMIN' || user.Id === current.Id ? true : false);
  }, [user]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const AdminSelected = (id) => {
    if (id !== '') {
      const role = selectRoles.find((element) => {
        return element.Id === id;
      })
      console.log(selectRoles.find(e => e.Id === id).Name)
      if (role.Name === "ADMIN")
        setDisable(true);
      else
        setDisable(false);
    }
    console.log(disable);
  };



  const SUPPORTED_FORMAT = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(ERRORS.REQUIRED_USERNAME)
      .min(6, ERRORS.MIN_USERNAME),
    firstName: Yup.string().required(ERRORS.REQUIRED_FIRSTNAME),
    lastName: Yup.string().required(ERRORS.REQUIRED_LASTNAME),
    gender: Yup.bool().nullable().required(ERRORS.REQUIRED_GENDER),
    email: Yup.string()
      .email(ERRORS.EMAIL_FORMAT)
      .max(100, ERRORS.MAX_EMAIL),
    dateOfBirth: Yup.date()
      .nullable()
      .test("dob", ERRORS.MIN_DOB, value => {
        return differenceInYears(new Date(), value) >= 6;
      }),
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
    role: Yup.string().required(ERRORS.REQUIRED_ROLE),
    center: Yup.string().when("role", {
      is: value => (value && selectRoles.find(e => e.Id === value).Name !== "ADMIN") || !value,
      then: Yup.string().required(ERRORS.REQUIRED_CENTER),
      otherwise: Yup.string()
    })
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
      {Object.keys(user).length === 0 || Object.keys(selectRoles).length === 0 || Object.keys(selectCenters).length === 0 ? <div>...Loading</div> : (
        <Formik
          initialValues={{
            firstName: user.FirstName,
            lastName: user.LastName,
            dateOfBirth: getFormattedDate(user.DateOfBirth),
            gender: user.Gender,
            phone: user.PhoneNumber,
            email: user.Email,
            address: user.Address,
            role: user.Role.Id,
            center: user.Center.Id,
            username: user.UserName,
            password: "",
            avatarFile: "",
            avatarName: user.AvatarName,
            previewFile: user.ImageSrc
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const waitTime = 10000;
            const timer = new Promise((_, reject) => setTimeout(reject, waitTime, { timedout: "request taking a long time" }));
            let body = {
              FirstName: values.firstName,
              LastName: values.lastName,
              Email: values.email,
              PhoneNumber: values.phone,
              Address: values.address,
              DateOfBirth: values.dateOfBirth,
              Gender: values.gender,
              CenterId: values.center,
              Username: values.username,
              RoleId: values.role,
              AvatarName: values.avatarName
            };
            let myRequest = "";
            if (values.avatarFile) {
              body = getFormData(body);
              body.append("AvatarFile", values.avatarFile);
              myRequest = userService.updateUserForm(id, body);
            }
            else {
              myRequest = userService.updateUser(id, body);
            }
            myRequest
              .then((res) => {
                toast.success(t(SUCCESSES.UPDATE_USER_SUCCESS));
                setSubmitting(false);
                resetForm();
                history.push(`/app/user/detail/${id}`);
                if (id === current.Id) {
                  localUser.Information = res.data.Data;
                  localStorage.setItem('user', JSON.stringify(localUser));
                  window.location.reload();
                }
              }).catch((err) => {
                toast.error(err);
                toast.error(t(ERRORS.UPDATE_USER_FAIL));
                setSubmitting(false);
              });
            return Promise.race([myRequest, timer]).catch(() => {
              setSubmitting(false);
              toast.error(t(ERRORS.UPDATE_USER_FAIL));
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
            setFieldTouched,
            handleSubmit,
            isSubmitting
          }) => (
            <>
              {/* {console.log(errors)}
              {console.log(values.dateOfBirth)} */}
              <PageTitle title="Edit user" button={
                <LoadingButton variant="contained" onClick={handleSubmit} loading={isSubmitting} endIcon={<Add />} loadingPosition="end">
                  {t("Action.Save")}
                </LoadingButton>} />
              <Box component="form" >
                <Grid container spacing={2}  >
                  <Grid item xs={5} />
                  <Grid item xs={3}>
                    <FormControl error={(values.avatarFile !== null) && errors.avatarFile ? true : false} fullWidth variant="standard" margin="dense">
                      <Avatar alt="Avatar"
                        src={values.previewFile !== undefined ? values.previewFile : ""}
                        variant="square" sx={{ width: 200, height: 200 }} />
                      <label htmlFor="contained-button-file">
                        <InputAvatar accept="image/*" id="contained-button-file" multiple type="file"
                          onChange={(e) => {
                            if (e.target.length != 0) {
                              setFieldValue("avatarFile", e.target.files[0]);
                              setFieldValue("previewFile", URL.createObjectURL(e.target.files[0]));
                            }
                          }} />
                        <Button style={{ marginLeft: "44px", marginTop: "10px" }} variant="contained" component="span">
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
                  <Grid item xs={4} />
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        required
                        id="standard-required"
                        label={t("User.FirstName")}
                        name="firstName"
                        onBlur={handleBlur}
                        value={values.firstName}
                        onChange={handleChange}
                        error={touched.firstName && errors.firstName ? true : false}
                        helperText={touched.firstName && errors.firstName ? t(errors.firstName) : null}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        required
                        id="standard-last-name-required"
                        label={t("User.LastName")}
                        name="lastName"
                        onBlur={handleBlur}
                        value={values.lastName}
                        onChange={handleChange}
                        error={touched.lastName && errors.lastName ? true : false}
                        helperText={touched.lastName && errors.lastName ? t(errors.lastName) : null}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <DatePicker
                        label={t("User.DateOfBirth")}
                        value={values.dateOfBirth}
                        onChange={date => setFieldValue('dateOfBirth', date)}
                        onOpen={e => setFieldTouched('dateOfBirth', true, true)}
                        renderInput={(params) =>
                          <TextField {...params}
                            onBlur={handleBlur}
                            error={touched.dateOfBirth && errors.dateOfBirth ? true : false}
                            helperText={touched.dateOfBirth && errors.dateOfBirth ? t(errors.dateOfBirth) : null}
                            variant="standard" />}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense" error={Boolean(touched.gender && errors.gender)}>
                      <InputLabel id="demo-simple-select-label">{t("User.Gender")}</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="gender"
                        value={values.gender}
                        label={t("User.Gender")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value={true}>{t("User.Male")}</MenuItem>
                        <MenuItem value={false}>{t("User.Female")}</MenuItem>
                      </Select>
                      {touched.gender && errors.gender ?
                        (<FormHelperText>{t(errors.gender)}</FormHelperText>) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        label={t("User.Phone")}
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="formatted-text-mask-input"
                        InputProps={{
                          inputComponent: TextMaskCustom,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        label={t("User.Email")}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        id="formatted-email-input"
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email ? t(errors.email) : null}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        label={t("User.Address")}
                        name="address"
                        id="formatted-Address-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required={!disable} fullWidth variant="standard" margin="dense" disabled={user.Id === current.Id ? disable : false}>
                      <InputLabel id="select-label-role">{t("Role.Role")}</InputLabel>
                      <Select

                        labelId="select-label-role"
                        id="select-role"
                        value={values.role}
                        name="role"
                        onChange={(e) => {
                          setFieldValue('role', e.target.value);
                          AdminSelected(e.target.value);
                        }}
                        onBlur={handleBlur}
                      >
                        {selectRoles && selectRoles.map((role, index) => (
                          <MenuItem key={index} value={role.Id}>{role.Name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required={!disable} fullWidth variant="standard" margin="dense" disabled={disable}>
                      <InputLabel id="select-label-center">{t("Center.Center")}</InputLabel>
                      <Select
                        labelId="select-label-center"
                        id="select-center"
                        name="center"
                        value={disable && current.Role.Name === 'ADMIN' ? '' : values.center}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {selectCenters && selectCenters.map((center, index) => (
                          <MenuItem key={index} value={center.Id}>{center.Name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense">
                      <TextField
                        required
                        id="standard-required"
                        label={t("Login.Username")}
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username ? t(errors.username) : null}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={6}>
                    <FormControl fullWidth variant="standard" margin="dense" error={touched.password && errors.password}>
                      <InputLabel htmlFor="standard-adornment-password">{t("Login.Password")} *</InputLabel>
                      <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        // {...register('password')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}

                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {
                        touched.password && errors.password ? (<FormHelperText id="component-error-text">{t(errors.password)}</FormHelperText>) : null
                      }

                    </FormControl>
                  </Grid> */}
                </Grid>
              </Box>
            </>
          )}
        </Formik>
      )}
    </>
  )
}

export default EditUser