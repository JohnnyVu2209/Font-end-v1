import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { CheckBox, Add } from '@mui/icons-material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, Divider, FormControl, Grid, TextField } from "@mui/material";

import { editRole, getRoleDetails, removeRoleDetail } from '../../../features/permission/permissionSlice';
import PageTitle from '../../../components/PageTitle/PageTitle';
import ERRORS from '../../../constants/ErrorCode';
import SUCCESSES from '../../../constants/SuccessCode';
import { ViewTable } from '../../dashboard/components/Table/Table';

const initialPermission = [
  {
    Name: 'User',
    FullControl: false,
    View: false,
    Create: false,
    Edit: false,
    Delete: false
  },
  {
    Name: 'Center',
    FullControl: false,
    View: false,
    Create: false,
    Edit: false,
    Delete: false
  },
  {
    Name: 'Course',
    FullControl: false,
    View: false,
    Create: false,
    Edit: false,
    Delete: false
  },
  {
    Name: 'Class',
    FullControl: false,
    View: false,
    Create: false,
    Edit: false,
    Delete: false
  },

];

const EditPermission = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { role } = useSelector((state) => state.permission);

  const [data, setData] = useState(initialPermission);

  useEffect(() => {
    dispatch(getRoleDetails(id));
    return () => {
      dispatch(removeRoleDetail());
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(role).length !== 0)
      setData(prevState => prevState.map(x => {
        const index = role.Permissions.findIndex(y => y.Name === x.Name);
        if (index !== -1)
          return {
            Name: x.Name,
            FullControl: false,
            View: role.Permissions[index].View,
            Create: role.Permissions[index].Create,
            Edit: role.Permissions[index].Edit,
            Delete: role.Permissions[index].Delete
          }
        return x;
      }));
  }, [role]);

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required(ERRORS.REQUIRED_ROLE),
    Code: Yup.string().required(ERRORS.REQUIRED_CODE)
  });

  const handleCheckbox = (e, permission) => {
    setData(prevStates =>
      prevStates.map((item => {
        return (item.Name === permission.Name) ?
          (e.target.name === 'FullControl' ?
            {
              ...item,
              [e.target.name]: e.target.checked,
              View: e.target.checked,
              Create: e.target.checked,
              Edit: e.target.checked,
              Delete: e.target.checked
            } :
            (item.FullControl ?
              { ...item, FullControl: false, [e.target.name]: e.target.checked }
              : { ...item, [e.target.name]: e.target.checked })
          ) : item;
      }))
    );
  }

  const columns = useMemo(() => [
    {
      id: 'Id',
      Header: 'Id',
      accessor: 'Id'
    },
    {
      id: 'Module',
      Header: 'Module',
      accessor: 'Name'
    },
    {
      id: 'FullControl',
      Header: 'Full Control',
      accessor: 'FullControl',
      disableFilters: true,
      Cell: ({ row, value }) => <Checkbox name={'FullControl'} key={`${value}_FullControl`} checked={value} type="checkbox" onChange={(e) => handleCheckbox(e, row.original)} />
    },
    {
      id: 'View',
      Header: 'View',
      accessor: 'View',
      disableFilters: true,
      Cell: ({ row, value }) => <Checkbox type="checkbox" key={`${value}_View`} name={'View'} checked={value} onChange={(e) => handleCheckbox(e, row.original)} />
    },
    {
      id: 'Create',
      Header: 'Create',
      accessor: 'Create',
      disableFilters: true,
      Cell: ({ row, value }) => <Checkbox type="checkbox" key={`${value}_Create`} name={'Create'} checked={value} onChange={(e) => handleCheckbox(e, row.original)} />
    },
    {
      id: 'Edit',
      Header: 'Edit',
      accessor: 'Edit',
      disableFilters: true,
      Cell: ({ row, value }) => <Checkbox type="checkbox" key={`${value}_Edit`} name={'Edit'} checked={value} onChange={(e) => handleCheckbox(e, row.original)} />
    },
    {
      id: 'Delete',
      Header: 'Delete',
      accessor: 'Delete',
      disableFilters: true,
      Cell: ({ row, value }) => <Checkbox type="checkbox" key={`${value}_Delete`} name={'Delete'} checked={value} onChange={(e) => handleCheckbox(e, row.original)} />
    },
  ], []);

  return (
    <>
      {Object.keys(role).length === 0 ? <div>...Loading</div> : (
        <>
          <Formik
            initialValues={{
              Name: role.Name,
              Code: role.Code
            }}
            validationSchema={validationSchema}

            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              const waitTime = 5000;
              const timer = new Promise((_, reject) => setTimeout(reject, waitTime, { timedout: "request taking a long time" }));

              const body = {
                  Name: values.Name,
                  Code: values.Code,
                  Permission: data
              }

              dispatch(editRole(id, body)).then(() => {
                  toast.success(t(SUCCESSES.EDIT_ROLE_SUCCESS));
                  setSubmitting(false);
                  history.push(`/app/permission/detail/${id}`);
              }).catch((err) => {
                console.log(err)
                  toast.error(t(ERRORS.EDIT_ROLE_FAIL));
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
              handleSubmit,
              isSubmitting
            }) => (
              <>
                <PageTitle title="Edit permission" button={
                  <LoadingButton variant="contained" endIcon={<Add />} loadingPosition="end" onClick={handleSubmit} loading={isSubmitting} >
                    {t("Action.Save")}
                  </LoadingButton>} />
                <Box component="form" >
                  <Grid container spacing={2}  >
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <TextField
                          required
                          id="standard-required"
                          label={t("Permission.Name")}
                          name="Name"
                          value={values.Name}
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          label={t("Permission.Code")}
                          name="Code"
                          value={values.Code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.Code && errors.Code ? true : false}
                          helperText={touched.Code && errors.Code ? t(errors.Code) : null}
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
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="standard" margin="dense">
                        <ViewTable
                          data={data}
                          columns={columns}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                </Box>
              </>
            )}
          </Formik>
        </>
      )}
    </>
  )
}

export default EditPermission