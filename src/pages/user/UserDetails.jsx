import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Box, Grid, Avatar, Button, styled, FormControl } from '@mui/material'
import { KeyboardReturn, Edit } from "@mui/icons-material";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncUser, removeUser } from '../../features/user/userSlice';
import { getFormattedDate } from '../../helpers/ultilities';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const UserDetails = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const { isAdmin } = useSelector((state) => state.auth);
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(fetchAsyncUser(id));
        return () => {
            dispatch(removeUser());
        }
    }, [dispatch, id]);

    return (
        <>
            {Object.keys(user).length === 0 ? <div>...Loading</div> : (
                <>
                    <PageTitle title="User info"
                        button={
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                {isAdmin ? ((user.Role.Name === "ADMIN" || user.Role.Name === "CENTRAL ADMIN" ? (
                                    <Button variant="contained" onClick={() => history.push(`/app/user/edit/${id}`)} style={{ marginRight: "10px" }} startIcon={<Edit />}>
                                        {t("Action.Update")}
                                    </Button>
                                ) : null)) : (user.Role.Name !== "CENTRAL ADMIN" ? (
                                    <Button variant="contained" onClick={() => history.push(`/app/user/edit/${id}`)} style={{ marginRight: "10px" }} startIcon={<Edit />}>
                                        {t("Action.Update")}
                                    </Button>
                                ) : null)}
                                <Button variant="outlined" onClick={() => history.push('/app/user')} startIcon={<KeyboardReturn />}>
                                    {t("Action.Back")}
                                </Button>
                            </div>
                        } />
                    <Widget disableWidgetMenu>
                        <Grid container spacing={2}  >
                            <Grid item xs={5} />
                            <Grid item xs={3} direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Avatar alt="Avatar"
                                    src={user.ImageSrc ? user.ImageSrc : "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"}
                                    variant="square" sx={{ width: 200, height: 200 }} />
                                <Typography style={{ marginLeft: "70px", marginTop: "10px" }} variant="h6">Avatar</Typography>
                            </Grid>
                            <Grid item xs={4} />
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("User.FirstName")}: {user.FirstName}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("User.LastName")}: {user.LastName}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("User.DateOfBirth")}: {getFormattedDate(user.DateOfBirth)}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("User.Gender")}: {user.Gender ? t('User.Male') : t('User.Female')}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("User.Phone")}: {user.PhoneNumber ? user.PhoneNumber : (<i>haven't filled</i>)}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("User.Email")}: {user.Email ? user.Email : (<i>haven't filled</i>)}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("User.Address")}: {user.Address ? user.Address : (<i>haven't filled</i>)}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("Role.Role")}: {user.Role.Name}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("Center.Center")}: {(user.Center && user.Center.Name === 'UNAVAILABLE') ? 'Chưa thuộc trung tâm' : user.Center.Name}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("Login.Username")}: {user.UserName}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense">
                                    <Typography variant="h6">{t("Login.Password")}: **********</Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Widget>
                </>
            )}
        </>
    )
}

export default UserDetails