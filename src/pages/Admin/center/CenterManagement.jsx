import React, { useEffect, useMemo, useState } from 'react'
import { CircularProgress, Grid, IconButton } from '@mui/material';
import {
  AddCircleOutline as AddIcon,
  Delete as DeleteIcon,
  Visibility,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import PageTitle from '../../../components/PageTitle/PageTitle';
import { retrieveCenters, disableCenter } from '../../../features/center/centerSlice';
import Search from "../../../components/Search/Search";
import TableComponent from '../../dashboard/components/Table/Table';
import { Typography } from "../../../components/Wrappers/Wrappers";
import ConfirmDialog from "../../../components/Dialog/Dialog";
import ERRORS from '../../../constants/ErrorCode';
import SUCCESSES from '../../../constants/SuccessCode';
const centerManagement = () => {
  //Global
  const dispatch = useDispatch();
  const history = useHistory();
  const { CurrentPage, TotalItems, Items } = useSelector((state) => state.center.centers);
  const { t } = useTranslation();

  //local
  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'Id',
    },
    {
      Header: t('Center.Code'),
      accessor: 'Code',
    },
    {
      Header: t('Center.Name'),
      accessor: 'Name',
    },
    {
      Header: t('Center.ContactPhone'),
      accessor: 'ContactPhone',
    },
    {
      Header: t('Center.Address'),
      accessor: 'Address',
    },
    {
      id: "Detail",
      Header: t('Action.Detail'),
      Cell: ({ row }) => (
        <IconButton aria-label="detail" size="large" onClick={() => history.push(`/app/center/detail/${row.values.Id}`)}>
          <Visibility fontSize="inherit" />
        </IconButton>
      )
    },
    {
      id: "Edit",
      Header: t('Action.Update'),
      Cell: ({ row }) => (
        <IconButton aria-label="edit" size="large" onClick={() => history.push(`/app/center/edit/${row.values.Id}`)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
      )
    },
  ], [t]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [rowSelect, setRowSelect] = useState(0);
  const [selectList, setSelectList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchCenters = (page) => {
    setLoading(true);
    dispatch(retrieveCenters({ perPage, page }))
      .then(() => setLoading(false))
      .catch(() => toast.error("Loading Failed"));
  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
    fetchCenters(page);
  };
  const handlePerRowsChange = event => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
    fetchCenters(page)
  };

  const handleDelete = () => {
    selectList.forEach(element => {
      dispatch(disableCenter(element))
        .then(() => toast.success(t(SUCCESSES.DELETE_USER_SUCCESS)))
        .catch(() => toast.error(t(ERRORS.DELETE_USER_FAIL)))
    });
    setDeleteModal(false);
    setRowSelect(0);
    fetchCenters(page);
  }

  useEffect(() => {
    fetchCenters(page);
  }, [dispatch, page, perPage]);
  return (
    <>
      <PageTitle title="Center Management" button={
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
            <IconButton color="primary" aria-label="upload picture" size="large" onClick={() => history.push("/app/center/create")}>
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
              getRowProps={row => ({
                style: {
                  background: row.original.Status ? 'white' : 'gray',
                },
              })} />
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
          {t('Confirmation.Diable') + '?'}
        </ConfirmDialog>
      </Grid>
    </>
  )
}

export default centerManagement