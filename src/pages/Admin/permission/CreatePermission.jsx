import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Checkbox, Divider, FormControl, Grid, TextField } from "@mui/material";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { Add } from '@mui/icons-material';

import PageTitle from '../../../components/PageTitle/PageTitle';
import ERRORS from '../../../constants/ErrorCode';
import { ViewTable } from '../../dashboard/components/Table/Table';
import { createRole } from '../../../features/permission/permissionSlice';
import SUCCESSES from '../../../constants/SuccessCode';

const initialPermission = [
  {
    Name: 'Center',
    FullControl: false,
    View: false,
    Create: false,
    Edit: false,
    Delete: false
  },
  {
    Name: 'User',
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

const CreatePermission = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const [data, setData] = useState(initialPermission);

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

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required(ERRORS.REQUIRED_ROLE),
    Code: Yup.string().required(ERRORS.REQUIRED_CODE)
  });

  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          Code: "",
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

          dispatch(createRole(body)).then(() => {
              toast.success(t(SUCCESSES.CREATE_ROLE_SUCCESS));
              setData(initialPermission);
              setSubmitting(false);
              resetForm();
              history.push("/app/permission");
          }).catch((err) => {
              console.log(err);
              toast.error(t(ERRORS.CREATE_ROLE_FAIL));
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
            <PageTitle title="Create permission" button={
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
                      label={t("Permission.Code")}
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
  )
}

export default CreatePermission