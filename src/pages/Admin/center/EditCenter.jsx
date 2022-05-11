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
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import ERRORS from '../../../constants/ErrorCode';
import SUCCESSES from "../../../constants/SuccessCode";
import PageTitle from '../../../components/PageTitle/PageTitle';
import { centerDetail, addCentralAdmin, removeCentralAdmin, removeCenterDetail, updateCenter, updateCenterForm } from "../../../features/center/centerSlice";
import { getUnvCentralAdmin } from "../../../features/user/userSlice";
import { EditTable } from "../../dashboard/components/Table/Table";
import { getFormattedDate } from '../../../helpers/ultilities';
import MyDialog from "../../../components/Dialog/Dialog";

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
const FaxCustom = React.forwardRef(function FaxCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+### 000 000 0000"
      definitions={{
        '#': /[0-9]{1,3}/,
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


const EditCenter = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { center } = useSelector((state) => state.center);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(centerDetail(id));
    dispatch(getUnvCentralAdmin());
    return () => {
      dispatch(removeCenterDetail());
    }
  }, [id])

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
    Name: Yup.string().required(ERRORS.REQUIRED_CENTERNAME),
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
    Email: Yup.string()
      .email(ERRORS.EMAIL_FORMAT)
      .max(100, ERRORS.MAX_EMAIL),
    Website: Yup.string().url(ERRORS.URL_FORMAT)
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
      dispatch(addCentralAdmin({ centerId: id, userId: element.Id }))
        .then(() => {
          toast.success(t(SUCCESSES.ADD_MEMBER_SUCCESS));
          dispatch(getUnvCentralAdmin());
        })
        .catch(() => { toast.error(t(ERRORS.ADD_MEMBER_FAIL)) });
    });
    handleAddClose();
  };
  const handleRemoveMember = () => {
    memberData.forEach(element => {
      dispatch(removeCentralAdmin({ centerId: id, userId: element.Id }))
        .then(() => {
          toast.success(t(SUCCESSES.REMOVE_MEMBER_SUCCESS));
          dispatch(getUnvCentralAdmin());
        })
        .catch(() => { toast.error(t(ERRORS.REMOVE_MEMBER_FAIL)) });
    });
    handleRemoveClose();
  }
  return (
    <>
      {Object.keys(center).length === 0 ? <div>...Loading</div> : (
        <>
          <Formik
            initialValues={{
              Status: center.Status,
              Name: center.Name,
              Code: center.Code,
              Address: center.Address,
              Phone: center.ContactPhone,
              Fax: center.Fax,
              Email: center.CenterMail,
              Website: center.Url ? center.Url : "",
              avatarFile: "",
              avatarName: center.AvatarName,
              previewFile: center.ImageSrc,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              
              let body = {
                Name: values.Name,
                Code: values.Code,
                Address: values.Address,
                ContactPhone: values.Phone,
                CenterMail: values.Email,
                Url: values.Website,
                Fax: values.Fax,
                Status: values.Status,
                AvatarName: values.avatarName
              };

              let myRequest = "";

              if (values.avatarFile) {
                body = getFormData(body);
                body.append("AvatarName", center.AvatarName);
                myRequest = dispatch(updateCenterForm({id,data:body}));
              }
              else {
                myRequest = dispatch(updateCenter({id,data: body}))
              }
              myRequest.then(() => {
                toast.success(t(SUCCESSES.UPDATE_CENTER_SUCCESS));
                setSubmitting(false);
                history.push(`/app/center/detail/${id}`);
              }).catch((error) => {
                setSubmitting(false);
                toast.error(t(ERRORS.UPDATE_CENTER_FAIL));
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
                <PageTitle title="Edit center" button={
                  <LoadingButton variant="contained" endIcon={<Add />} loadingPosition="end" onClick={handleSubmit} loading={isSubmitting} >
                    {t("Action.Save")}
                  </LoadingButton>} />
                <Box component="form" >
                  <Grid container spacing={2}  >
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
                    <Grid item xs={5} />
                    <Grid item xs={5} />
                    <Grid item xs={3}>
                      <FormControl component="fieldset">
                        <FormControlLabel
                          control={
                            <Switch name="Status" checked={values.Status} value={values.Status} onChange={handleChange} />
                          }
                          label={values.Status ? t("Center.Enable") : t("Center.Disable")}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <TextField
                          required
                          id="standard-required"
                          label={t("Center.Name")}
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
                          id="standard-required"
                          label={t("Center.Code")}
                          name="Code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.Code}
                          error={touched.Code && errors.Code ? true : false}
                          helperText={touched.Code && errors.Code ? t(errors.Code) : null}
                          variant="standard"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <TextField
                          id="standard-required"
                          label={t("Center.Address")}
                          name="Address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.Address}
                          error={touched.Address && errors.Address ? true : false}
                          helperText={touched.Address && errors.Address ? t(errors.Address) : null}
                          variant="standard"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <TextField
                          label={t("Center.ContactPhone")}
                          name="Phone"
                          value={values.Phone}
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
                          label={t("Center.Fax")}
                          name="Fax"
                          value={values.Fax}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="formatted-text-mask-input"
                          InputProps={{
                            inputComponent: FaxCustom,
                          }}
                          variant="standard"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <TextField
                          id="standard-required"
                          label={t("User.Email")}
                          name="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.Email}
                          error={touched.Email && errors.Email ? true : false}
                          helperText={touched.Email && errors.Email ? t(errors.Email) : null}
                          variant="standard"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <TextField
                          id="standard-required"
                          label={t("Center.Website")}
                          name="Website"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.Website}
                          error={touched.Website && errors.Website ? true : false}
                          helperText={touched.Website && errors.Website ? t(errors.Website) : null}
                          variant="standard"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={5}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <Divider />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} />
                  </Grid>
                  <EditTable
                    columns={columns}
                    data={center.Users}
                    title={t('Title.MemberList')}
                    addHandler={handleOpenAddUserModal}
                    removeHandler={handleOpenConfirmModal}
                    onSelectedRowChange={setMemberData}
                    addRemoveAction
                  />
                </Box>
              </>
            )}
          </Formik>
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
            ) : t('Confirmation.NoUnvCA')}
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
      )}
    </>
  )
}

export default EditCenter