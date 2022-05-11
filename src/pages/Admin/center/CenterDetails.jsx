import React, { useEffect, useMemo } from 'react';
import { Grid, Avatar, FormControl, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { KeyboardReturn, Edit } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';

import PageTitle from '../../../components/PageTitle/PageTitle';
import { centerDetail } from "../../../features/center/centerSlice";
import Widget from "../../../components/Widget/Widget";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { ViewTable } from "../../dashboard/components/Table/Table";
import { getFormattedDate } from '../../../helpers/ultilities';
const CenterDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { center } = useSelector((state) => state.center);

  useEffect(() => {
    dispatch(centerDetail(id));
  }, [id])

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
      }
    ],
    [t]
  );

  return (
    <>
      {Object.keys(center).length === 0 ? <div>...Loading</div> : (
        <>
          <PageTitle title="Center detail" button={
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <Button variant="contained" onClick={() => history.push(`/app/center/edit/${id}`)} style={{ marginRight: "10px" }} startIcon={<Edit />}>
                {t("Action.Update")}
              </Button>
              <Button variant="outlined" onClick={() => history.push('/app/center')} startIcon={<KeyboardReturn />}>
                {t("Action.Back")}
              </Button>
            </div>
          } />
          <Widget disableWidgetMenu>
            <Grid container spacing={2}  >
              <Grid item xs={4} />
              <Grid item xs={3}>
                <Avatar alt="Avatar"
                  src={center.ImageSrc ? center.ImageSrc : "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"}
                  variant="square" sx={{ width: 400, height: 200 }} />
                <Typography style={{ marginLeft: "130px", marginTop: "10px" }} variant="h6">Avatar</Typography>
              </Grid>
              <Grid item xs={5} />
              <Grid item xs={12}>
                <FormControl margin="dense">
                  <Typography variant="h6"><b>{t("Center.Status")}: {center.Status ? t("Center.Enable") : t("Center.Disable")}</b></Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Center.Name")}: {center.Name}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Center.Code")}: {center.Code}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Center.ContactPhone")}: {center.ContactPhone ? center.ContactPhone : <i>{t("NotFIlled")}</i>}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Center.Fax")}: {center.Fax ? center.Fax : <i>{t("NotFIlled")}</i>}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("User.Email")}: {center.CenterMail ? center.CenterMail : <i>{t("NotFIlled")}</i>}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Center.Website")}: {center.Url ? center.Url : <i>{t("NotFIlled")}</i>}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="dense">
                  <Typography variant="h6">{t("Center.Address")}: {center.Address ? center.Address : <i>{t("NotFIlled")}</i>}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">{t('Title.MemberList')}: {center.Users.length === 0 ? 0 : ""} </Typography>
              </Grid>
            </Grid>
            {center.Users.length !== 0 ?
              <ViewTable columns={columns} data={center.Users} pagination />
              :
              null
            }

          </Widget>
        </>
      )}
    </>
  )
}

export default CenterDetails