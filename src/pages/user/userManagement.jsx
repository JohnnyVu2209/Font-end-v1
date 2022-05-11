import React, { useEffect, useMemo, useState } from 'react'
import PageTitle from '../../components/PageTitle/PageTitle';
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchAsyncUsers, deleteUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import userService from '../../services/user.service';
import TableComponent from '../dashboard/components/Table/Table';
import { CircularProgress, IconButton, InputBase } from '@mui/material';
import { getFormattedDate } from '../../helpers/ultilities';
import {
  AddCircleOutline as AddIcon,
  Delete as DeleteIcon,
  Visibility,
  Edit as EditIcon,
} from '@mui/icons-material';
import Search from "../../components/Search/Search";
import { Typography } from "../../components/Wrappers/Wrappers";
import { useHistory } from 'react-router-dom';
import ConfirmDialog from "../../components/Dialog/Dialog";
import ERRORS from '../../../../../../CAPSTONE - LMS/SourceCode/FrontEnd/Front-end/src/constants/ErrorCode';
import SUCCESSES from '../../../../../../CAPSTONE - LMS/SourceCode/FrontEnd/Front-end/src/constants/SuccessCode';
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));
// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

const userManagement = () => {
  //Global
  const dispatch = useDispatch();
  const history = useHistory();
  const { CurrentPage, TotalItems, Items } = useSelector((state) => state.user.users);
  const { isAdmin } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  //Local
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
      },
      {
        id: "Detail",
        Header: t('Action.Detail'),
        Cell: ({ row }) => (
          <IconButton aria-label="detail" size="large" onClick={() => history.push(`/app/user/detail/${row.values.Id}`)}>
            <Visibility fontSize="inherit" />
          </IconButton>
        )
      },
      {
        id: "Edit",
        Header: t('Action.Update'),
        Cell: ({ row }) => isAdmin ? (['ADMIN', 'CENTRAL ADMIN'].includes(row.original.Role.Name) ? (
          <IconButton aria-label="edit" size="large" onClick={() => history.push(`/app/user/edit/${row.values.Id}`)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        ) : null) : (['TEACHER', 'PARENT', 'STUDENT'].includes(row.original.Role.Name) ? (
          <IconButton aria-label="edit" size="large" onClick={() => history.push(`/app/user/edit/${row.values.Id}`)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        ) : null)

      },
    ],
    [t]
  );

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [rowSelect, setRowSelect] = useState(0);
  const [selectList, setSelectList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchUsers = (page) => {
    setLoading(true);
    dispatch(fetchAsyncUsers({ perPage, page }))
      .then(() => setLoading(false))
      .catch(() => toast.error("Loading Failed"));
  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
    fetchUsers(page);
  };
  const handlePerRowsChange = event => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
    fetchUsers(page)
  };

  const handleDelete = () => {
    selectList.forEach(element => {
      dispatch(deleteUser({ id: element }))
        .then(() => toast.success(t(SUCCESSES.DELETE_USER_SUCCESS)))
        .catch(() => toast.error(t(ERRORS.DELETE_USER_FAIL)))
    });
    if (Items.length === 0)
      fetchUsers(page);
    setDeleteModal(false);
    setRowSelect(0);
  }
  useEffect(() => {
    fetchUsers(page);
  }, [dispatch, page, perPage]);

  return (
    <>
      <PageTitle title="User Management" button={
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
            <IconButton color="primary" aria-label="upload picture" size="large" onClick={() => history.push("/app/user/create")}>
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
              numRowSelect={(num, row) => { setRowSelect(num); setSelectList(row); }} />
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

export default userManagement