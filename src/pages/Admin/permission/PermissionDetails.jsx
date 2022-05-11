import { Grid } from '@material-ui/core';
import { Edit, KeyboardReturn } from '@mui/icons-material';
import { Button, Divider, FormControl, Checkbox } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import PageTitle from '../../../components/PageTitle/PageTitle';
import Widget from '../../../components/Widget/Widget';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { getRoleDetails, removeRoleDetail } from "../../../features/permission/permissionSlice";
import { ViewTable } from '../../dashboard/components/Table/Table';

const defaultRole = [
  "ADMIN",
  "CENTRAL_ADMIN",
  "CENTRAL ADMIN",
  "PARENT",
  "TEACHER",
  "STUDENT"
];

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
  },{
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

const PermissionDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
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
      id: 'View',
      Header: 'View',
      accessor: 'View',
      disableFilters: true,
      Cell: ({ row }) => <Checkbox key={`${row.values.Name}_View`} name={row.values.View} checked={row.values.View} disabled />
    },
    {
      id: 'Create',
      Header: 'Create',
      accessor: 'Create',
      disableFilters: true,
      Cell: ({ row }) => <Checkbox  key={`${row.values.Name}_Create`} name={'Create'} checked={row.values.Create} disabled />
    },
    {
      id: 'Edit',
      Header: 'Edit',
      accessor: 'Edit',
      disableFilters: true,
      Cell: ({ row }) => <Checkbox key={`${row.values.Name}_Edit`} name={'Edit'} checked={row.values.Edit} disabled />
    },
    {
      id: 'Delete',
      Header: 'Delete',
      accessor: 'Delete',
      disableFilters: true,
      Cell: ({ row }) => <Checkbox key={`${row.values.Name}_Delete`} name={'Delete'} checked={row.values.Delete} disabled />
    },
  ], []);

  return (
    <>
      {Object.keys(role).length === 0 ? <div>...Loading</div> : (
        <>
          <PageTitle title="Permission detail" button={
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              {defaultRole.includes(role.Name) ? null : (
                <Button variant="contained" onClick={() => history.push(`/app/permission/edit/${id}`)} style={{ marginRight: "10px" }} startIcon={<Edit />}>
                  {t("Action.Update")}
                </Button>
              )}
              <Button variant="outlined" onClick={() => history.push('/app/permission')} startIcon={<KeyboardReturn />}>
                {t("Action.Back")}
              </Button>
            </div>
          } />
          <Widget disableWidgetMenu>
            <Grid container spacing={2}  >
              <Grid item xs={6}>
                <FormControl fullWidth variant="standard" margin="dense">
                  <Typography variant="h6">{t("Permission.Name")}: {role.Name}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="standard" margin="dense">
                  <Typography variant="h6">{t("Permission.Code")}: {role.Code}</Typography>
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
                    columns={columns}
                    data={data}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Widget>
        </>
      )}
    </>
  )
}

export default PermissionDetails