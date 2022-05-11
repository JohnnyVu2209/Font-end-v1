import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress, Grid, IconButton } from '@mui/material';
import {
    AddCircleOutline as AddIcon,
    Delete as DeleteIcon,
    Visibility,
    Edit as EditIcon,
} from '@mui/icons-material';

import { retrieveCourses } from '../../../features/course/courseSlice';
import PageTitle from '../../../components/PageTitle/PageTitle';
import Search from "../../../components/Search/Search";
import TableComponent from '../../dashboard/components/Table/Table';
import { Typography } from "../../../components/Wrappers/Wrappers";

const CourseManagement = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const { CurrentPage, TotalItems, Items } = useSelector((state) => state.course.courses);

    const columns = useMemo(() => [
        {
            Header: 'Id',
            accessor: 'Id',
        },
        {
            Header: t('Course.CourseName'),
            accessor: 'Name',
        },
        {
            Header: t('Course.TotalSessions'),
            accessor: 'TotalSessions',
        },
        {
            id: "Detail",
            Header: t('Action.Detail'),
            Cell: ({ row }) => (
                <IconButton aria-label="detail" size="large" onClick={() => history.push(`/app/course/detail/${row.values.Id}`)}>
                    <Visibility fontSize="inherit" />
                </IconButton>
            )
        },
        {
            id: "Edit",
            Header: t('Action.Update'),
            Cell: ({ row }) => (
                <IconButton aria-label="edit" size="large" onClick={() => history.push(`/app/course/edit/${row.values.Id}`)}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
            )
        },
    ], [t]
    );

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [rowSelect, setRowSelect] = useState(0);
    const [selectList, setSelectList] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);

    const fetchCourse = (page) => {
        setLoading(true);
        dispatch(retrieveCourses({ perPage, page }))
            .then(() => setLoading(false))
            .catch(() => toast.error("Loading Failed"));
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage + 1);
        fetchCourse(page);
    };
    const handlePerRowsChange = event => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(1);
        fetchCourse(page)
    };

    useEffect(() => {
        fetchCourse(page);
    }, [dispatch, page, perPage]);

    return (
        <>
            <PageTitle title={t('Course.Management')} button={
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
                        <IconButton color="primary" aria-label="upload picture" size="large" onClick={() => history.push("/app/course/create")}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                    </>)}
                </div>
            }
            />
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
                {/* <ConfirmDialog
                    title={t('Title.Confirmation')}
                    Show={deleteModal}
                    HandleSave={handleDelete}
                    HandleClose={() => { setDeleteModal(false); }}
                    CancelTitle={t('Action.No')}
                    SaveTitle={t('Action.Yes')}
                // SaveVariant='danger'
                >
                    {t('Confirmation.Diable') + '?'}
                </ConfirmDialog> */}
            </Grid>
        </>
    )
}

export default CourseManagement