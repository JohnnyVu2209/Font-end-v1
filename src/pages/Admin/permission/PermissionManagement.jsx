import React, { useEffect, useMemo, useState } from 'react'
import {
  AddCircleOutline as AddIcon, Visibility,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Search from "../../../components/Search/Search";
import { retrieveRoles, deleteRole } from "../../../features/permission/permissionSlice";
import TableComponent from '../../dashboard/components/Table/Table';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { Typography } from '../../../components/Wrappers/Wrappers';
import ConfirmDialog from "../../../components/Dialog/Dialog";
import ERRORS from '../../../constants/ErrorCode';
import SUCCESSES from '../../../constants/SuccessCode';

const defaultRole = [
  "ADMIN",
  "CENTRAL_ADMIN",
  "CENTRAL ADMIN",
  "PARENT",
  "TEACHER",
  "STUDENT"
];

const permissionManagement = () => {
  //Global
  const dispatch = useDispatch();
  const history = useHistory();
  const { CurrentPage, TotalItems, Items } = useSelector((state) => state.permission.roles);
  const { t } = useTranslation();

  //local
  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'Id',
    },
    {
      Header: t('User.FirstName'),
      accessor: 'Name',
    },
    {
      id: "Detail",
      Header: t('Action.Detail'),
      Cell: ({ row }) => (
        <IconButton aria-label="detail" size="large" onClick={() => history.push(`/app/permission/detail/${row.values.Id}`)}>
          <Visibility fontSize="inherit" />
        </IconButton>
      )
    },
    {
      id: "Edit",
      Header: t('Action.Update'),
      Cell: ({ row }) => defaultRole.includes(row.original.Name) ?
        null
        :
        (
          <IconButton aria-label="edit" size="large" onClick={() => history.push(`/app/permission/edit/${row.values.Id}`)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        )
    },
  ], [t]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const[rowSelect, setRowSelect] = useState(0);
  const [selectList, setSelectList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchRoles = (page) => {
    setLoading(true);
    dispatch(retrieveRoles({ perPage, page }))
      .then(() => setLoading(false))
      .catch(() => toast.error("Loading Failed"));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
    fetchRoles(page);
  };
  const handlePerRowsChange = event => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
    fetchRoles(page)
  };
  const defaultRoleCheck = (id) => {
    const role = Items.find((element) => {
      return element.Id === id;
    });
    if(defaultRole.includes(role.Name))
      return true;
    else
      return false;
  }
  const handleDelete = () => {
    selectList.forEach(element => {
      if(!defaultRoleCheck(element))
      {
        dispatch(deleteRole(element))
          .then(() => toast.success(t(SUCCESSES.DELETE_USER_SUCCESS)))
          .catch(() => toast.error(t(ERRORS.DELETE_USER_FAIL)))
      }
      else{
        toast.error(t(ERRORS.NOT_ALLOW_DELETE_DEFAULT_ROLE));
      }
    });
    setDeleteModal(false);
    setRowSelect(0);
    fetchCenters(page);
  }
  useEffect(() => {
    fetchRoles(page);
  }, [dispatch, page, perPage]);

  return (
    <>
      <PageTitle title="Permission Management" button={
        <div style={{
          display: "flex",
          alignItems: "center"
        }}>
          {rowSelect > 0 ? (
            <>
              <Typography variant="h3" >
                {rowSelect} selected
              </Typography>
              <IconButton aria-label="edit" size="large" onClick={() => setDeleteModal(true)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </>
          ) : (<>
            <Search />
            <IconButton color="primary" aria-label="upload picture" size="large" onClick={() => history.push("/app/permission/create")}>
              <AddIcon fontSize="inherit" />
            </IconButton>
          </>)}
        </div>
      } />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {loading ? (<CircularProgress />) : (
            <TableComponent data={Items} columns={columns} PerPage={perPage} TotalItems={TotalItems} CurrentPage={CurrentPage}
              PageChangeHandler={handlePageChange}
              PerRowChangeHandler={handlePerRowsChange}
              numRowSelect={(num, row) => { setRowSelect(num); setSelectList(row); }}
              />
          )}
        </Grid>
        <ConfirmDialog
          title={t('Title.Confirmation')}
          Show={deleteModal}
          HandleSave={handleDelete}
          HandleClose={() => { setDeleteModal(false); }}
          CancelTitle={t('Action.No')}
          SaveTitle={t('Action.Yes')}
        // SaveVariant='danger'
        >
          {t('Confirmation.Delete') + '?'}
        </ConfirmDialog>
      </Grid>
    </>
  )
}

export default permissionManagement