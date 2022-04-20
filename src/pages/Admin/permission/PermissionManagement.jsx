import React, { useEffect, useMemo, useState } from 'react'
import {
  AddCircleOutline as AddIcon,
} from '@mui/icons-material';
import Search from "../../../components/Search/Search";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import permissionService from "../../../services/permission.service";
import { toast } from 'react-toastify';
import {retrieveRoles} from "../../../features/permission/permissionSlice";
import { CircularProgress, Grid, IconButton } from '@mui/material';
import TableComponent from '../../dashboard/components/Table/Table';
import PageTitle from '../../../components/PageTitle/PageTitle';
const permissionManagement = () => {
  //Global
  const dispatch = useDispatch();
  const { CurrentPage, TotalItems, Items } = useSelector((state) => state.permission.roles);
  const { t } = useTranslation();

  //local
  const columns = useMemo(() =>[
    {
        Header: 'Id',
        accessor: 'Id',
      },
      {
        Header: t('User.FirstName'),
        accessor: 'Name',
      },
      // {
      //   id: "Detail",
      //   Header: t('Action.Detail'),
      //   Cell: ({ row }) => (
      //     <Button onClick={() => navigate(`/Permission/detail/${row.values.Id}`)}>
      //       <i className="bx bx-show-alt" style={{ color: '#ffffff' }} />
      //     </Button>
      //   )
      // },
      // {
      //   id: "Edit",
      //   Header: t('Action.Update'),
      //   Cell: ({ row }) => defaultRole.includes(row.original.Name) ? 
      //   null
      //   : 
      //   (
      //     <Button onClick={() => navigate(`/Permission/edit/${row.values.Id}`)}>
      //       <i className="bx bx-edit" style={{ color: '#ffffff' }} />
      //     </Button>
      //   ) 
      // },
],[t]);

const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchRoles = (page) => {
    permissionService.getListRoles(perPage, page)
    .then(({ data }) => {
      dispatch(retrieveRoles(data.Data))
      setLoading(false);
    }).catch((err) => toast.error("Loading Failed"));
  };

  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setPage(newPage+1);
    fetchRoles(page);
  };
  const handlePerRowsChange = event => {
    setLoading(true);
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
    fetchRoles(page)
  };
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
          <Search />
          <IconButton color="primary" aria-label="upload picture" size="large">
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>
      } />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {loading ? (<CircularProgress />) : (
            <TableComponent data={Items} columns={columns} PerPage={perPage} TotalItems={TotalItems} CurrentPage={CurrentPage} 
            PageChangeHandler={handlePageChange}
            PerRowChangeHandler = {handlePerRowsChange} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default permissionManagement