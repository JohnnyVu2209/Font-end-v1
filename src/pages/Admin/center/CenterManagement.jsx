import React, { useEffect, useMemo, useState } from 'react'
import { CircularProgress, Grid, IconButton } from '@mui/material';
import {
  AddCircleOutline as AddIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { retrieveCenters } from '../../../features/center/centerSlice';
import centerService from "../../../services/center.service";
import Search from "../../../components/Search/Search";
import TableComponent from '../../dashboard/components/Table/Table';

const centerManagement = () => {
  //Global
  const dispatch = useDispatch();
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
    // {
    //     id: "Detail",
    //     Header: t('Action.Detail'),
    //     Cell: ({ row }) => (
    //       <Button onClick={() => navigate(`/Center/detail/${row.values.Id}`)}>
    //         <i className="bx bx-show-alt" style={{ color: '#ffffff' }} />
    //       </Button>
    //     )
    //   },
    //   {
    //     id: "Edit",
    //     Header: t('Action.Update'),
    //     Cell: ({ row }) => (
    //       <Button onClick={() => navigate(`/Center/edit/${row.values.Id}`)}>
    //         <i className="bx bx-edit" style={{ color: '#ffffff' }} />
    //       </Button>
    //     ) 
    //   },
  ], [t]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchCenters = (page) => {
    centerService.getListCenters(perPage, page)
    .then(({ data }) => {
      dispatch(retrieveCenters(data.Data))
      setLoading(false);
    }).catch((err) => toast.error("Loading Failed"));
  }
  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setPage(newPage+1);
    fetchCenters(page);
  };
  const handlePerRowsChange = event => {
    setLoading(true);
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
    fetchCenters(page)
  };
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

export default centerManagement