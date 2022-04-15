import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
//import Table from '../../../components/Tables/Table';
import { Button } from 'react-bootstrap'
import FilterTableComponent from '../../../components/Tables/filter.table'
import { useToast } from '../../../hooks/useToast';
import SUCCESSES from '../../../constants/SuccessCode';
import ERRORS from '../../../constants/ErrorCode';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, retrieveUsers } from '../../../actions/users';
import MyModal from '../../../components/Modal/index';
import Loader from '../../../components/Loader/Loader';
import { getFormattedDate } from '../../../helpers/ultilities';
import { useHistory } from 'react-router-dom';
import tokenService from '../../../services/token.service';

const UserManage = () => {
  const { t } = useTranslation();
  const navigate = useHistory();

  const current = tokenService.getUserInfo();


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
          <Button onClick={() => navigate(`/User/detail/${row.values.Id}`)}>
            <i className="bx bx-show-alt" style={{ color: '#ffffff' }} />
          </Button>
        )
      },
      {
        id: "Edit",
        Header: t('Action.Update'),
        Cell: ({ row }) => current.Role.Name === 'ADMIN' ? (['ADMIN', 'CENTRAL ADMIN'].includes(row.original.Role.Name) ? (
          <Button onClick={() => navigate(`/User/edit/${row.values.Id}`)}>
            <i className="bx bx-edit" style={{ color: '#ffffff' }} />
          </Button>
        ) : null) : (['TEACHER', 'PARENT', 'STUDENT'].includes(row.original.Role.Name) ? (
          <Button onClick={() => navigate(`/User/edit/${row.values.Id}`)}>
            <i className="bx bx-edit" style={{ color: '#ffffff' }} />
          </Button>
        ) : null)
        
      },
    ],
    [navigate, t]
  )
  const toast = useToast(5000);
  const dispatch = useDispatch();

  const { users } = useSelector(state => state.users)
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const handlePageChange = page => {
    setPending(true);
    fetchUsers(page);
    setPage(page);
  };
  const handlePerRowsChange = (newPerPage, page) => {
    setPending(true);
    dispatch(retrieveUsers(newPerPage, page)).then(() => setPending(false));
    setPerPage(newPerPage);
  };
  const fetchUsers = page => {
    dispatch(retrieveUsers(perPage, page)).then(() => setPending(false));
  };
  const handleConfirm = (list) => {
    setDeleteData(list);
    setDeleteModal(true);
  };
  const handleDelete = () => {
    deleteData.forEach(element => {
      dispatch(deleteUser(element.Id))
        .then(() => { toast(SUCCESSES.SUCCESS, SUCCESSES.DELETE_USER_SUCCESS); setPending(true); fetchUsers(page); })
        .catch(() => { toast(ERRORS.DANGER, ERRORS.DELETE_USER_FAIL); });
    });
    setDeleteModal(false);
    setToggleCleared(!toggleCleared);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [dispatch, page, perPage]);
  useEffect(() => {
    setData(users.Items);
  }, [users])

  return (
    <div className='content-wrapper'>
      <FilterTableComponent
        data={data}
        columns={columns}
        component='User'
        CurrentPage={users.CurrentPage}
        PerPage={perPage}
        TotalPages={users.TotalPages}
        PageChangeHandler={handlePageChange}
        PerRowChangeHandler={handlePerRowsChange}
        isLoading={pending}
        LoadingComponent={<Loader />}
        DeleteHandler={handleConfirm} />
      {/* <Table
                Header={HeaderData}
                Data={data}
                Component="User"
                Pending={pending}
                TotalRows={totalRows}
                HandlePageChange={handlePageChange}
                HandlePerRowsChange={handlePerRowsChange}
                HandleDelete={handleConfirm}
                HandleToggleClear={toggleCleared}
                isPaginate={paginate} /> */}

      <MyModal
        title={t('Title.Confirmation')}
        Show={deleteModal}
        HandleSave={handleDelete}
        HandleClose={() => { setDeleteModal(false); setToggleCleared(!toggleCleared); }}
        CancelTitle={t('Action.No')}
        SaveTitle={t('Action.Yes')}
        SaveVariant='danger'
      >
        {t('Confirmation.Delete') + '?'}
      </MyModal>
    </div>
  )
}

export default UserManage;

