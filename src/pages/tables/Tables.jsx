import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import {getFormattedDate} from "../../helpers/ultilities";
// data
import mock from "../dashboard/mock";
import userService from "../../services/user.service";
import { retrieveUsers } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const {CurrentPage, TotalItems, Items} = useSelector((state) => state.user.users);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'Id',
      },
      {
        Header: 'User.FirstName',
        accessor: 'FirstName',
      },
      {
        Header: 'User.LastName',
        accessor: 'LastName'
      },
      {
        Header: 'User.Gender',
        accessor: d => d.Gender ? 'User.Male' : 'User.Female'
      },
      {
        Header: 'Email',
        accessor: 'Email'
      },
      {
        Header: 'User.DateOfBirth',
        accessor: d => getFormattedDate(d.DateOfBirth)
      },
      {
        Header: 'User.Address',
        accessor: 'Address'
      },
      {
        Header: 'User.Role',
        accessor: 'Role.Name'
      },
      // {
      //   id: "Detail",
      //   Header: 'Action.Detail,
      //   Cell: ({ row }) => (
      //     <Button onClick={() => navigate(`/User/detail/${row.values.Id}`)}>
      //       <i className="bx bx-show-alt" style={{ color: '#ffffff' }} />
      //     </Button>
      //   )
      // },
      // {
      //   id: "Edit",
      //   Header: 'Action.Update,
      //   Cell: ({ row }) => current.Role.Name === 'ADMIN' ? (['ADMIN', 'CENTRAL ADMIN'].includes(row.original.Role.Name) ? (
      //     <Button onClick={() => navigate(`/User/edit/${row.values.Id}`)}>
      //       <i className="bx bx-edit" style={{ color: '#ffffff' }} />
      //     </Button>
      //   ) : null) : (['TEACHER', 'PARENT', 'STUDENT'].includes(row.original.Role.Name) ? (
      //     <Button onClick={() => navigate(`/User/edit/${row.values.Id}`)}>
      //       <i className="bx bx-edit" style={{ color: '#ffffff' }} />
      //     </Button>
      //   ) : null)

      // },
    ],
    []
  );

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getListUser(perPage, page)
      .then(({data}) => {
        dispatch(retrieveUsers(data.Data))
        setLoading(false);
      });
  }, []);


  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Name", "Company", "City", "State"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        {loading ? "Loading..." : (
          <Grid item xs={12}>
            <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
              <Table data={Items} columns={columns} PerPage={perPage} TotalItems={TotalItems} CurrentPage = {CurrentPage} />
              {console.log(Items)}
            </Widget>
          </Grid>
        )}
      </Grid>
    </>
  );
}
