import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab'
import { Add } from '@mui/icons-material';
import { Avatar, Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, styled, Switch, TextField } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import PageTitle from '../../../components/PageTitle/PageTitle'
import ERRORS from '../../../constants/ErrorCode';
import SUCCESSES from "../../../constants/SuccessCode";
import { createCenter, createCenterForm } from '../../../features/center/centerSlice';

const InputAvatar = styled('input')({
    display: 'none',
});

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="#00 000 0000"
            definitions={{
                '#': /[0]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});
const FaxCustom = React.forwardRef(function FaxCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="+### 000 000 0000"
            definitions={{
                '#': /[0-9]{1,3}/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const CreateCenter = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const SUPPORTED_FORMAT = ["image/jpg", "image/jpeg", "image/png"];

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required(ERRORS.REQUIRED_CENTERNAME),
        avatarFile: Yup
            .mixed()
            .nullable()
            .test(
                "FiLE_SIZE",
                ERRORS.MAX_AVATAR,
                (value) => !value || (value && Math.round(value.size / 1024) <= 2048)
            )
            .test(
                "FILE_FORMAT",
                ERRORS.AVATAR_FORMAT,
                (value) => !value || (value && SUPPORTED_FORMAT.includes(value?.type))
            ),
        Email: Yup.string()
            .email(ERRORS.EMAIL_FORMAT)
            .max(100, ERRORS.MAX_EMAIL),
        Website: Yup.string().url(ERRORS.URL_FORMAT)
    });

    const getFormData = (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key => {
            if (typeof object[key] !== 'object') formData.append(key, object[key]);
            else formData.append(key, JSON.stringify(object[key]));
        });
        return formData;
    };
    return (
        <>
            <Formik
                initialValues={{
                    Status: true,
                    Name: "",
                    Code: "",
                    Address: "",
                    Phone: "",
                    Fax: "",
                    Email: "",
                    Website: "",
                    avatarFile: "",
                    previewFile: undefined
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                   // console.log(values);
                    setSubmitting(true);
                    const waitTime = 100000;
                    const timer = new Promise((_, reject) => setTimeout(reject, waitTime, { timedout: "request taking a long time" }));

                    let body = {
                        Name: values.Name,
                        Code: values.Code,
                        Address: values.Address,
                        ContactPhone: values.Phone,
                        CenterMail: values.Email,
                        Url: values.Website,
                        Fax: values.Fax,
                        Status: values.Status,
                    };

                    let myRequest = "";

                    if (values.avatarFile) {
                        body = getFormData(body);
                        body.append("AvatarFile",values.avatarFile);
                        myRequest = dispatch(createCenterForm(body));
                    } 
                    else{
                       myRequest=dispatch(createCenter(body));
                    }
                    myRequest.then(() => {
                        toast.success(t(SUCCESSES.CREATE_CENTER_SUCCESS));
                        setSubmitting(false);
                        resetForm();
                        history.push("/app/center");
                    }).catch((error) => {
                        console.log("from catch: " , error);
                        setSubmitting(false);
                        toast.error(t(ERRORS.CREATE_CENTER_FAIL));
                    });
                    
                    return Promise.race([myRequest, timer]).catch((err) => toast.error(t(ERRORS.CREATE_CENTER_FAIL)));

                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                    isSubmitting }) => (
                    <>
                        <PageTitle title="Create center" button={
                            <LoadingButton variant="contained" endIcon={<Add />} loadingPosition="end" onClick={handleSubmit} loading={isSubmitting} >
                                {t("Action.Save")}
                            </LoadingButton>} />
                        <Box component="form" >
                            <Grid container spacing={2}  >
                                <Grid item xs={4} />
                                <Grid item xs={3}>

                                    <FormControl error={(values.avatarFile !== null) && errors.avatarFile ? true : false} fullWidth variant="standard" margin="dense">
                                        <Avatar alt="Avatar"
                                            src={values.previewFile ? values.previewFile : ""}
                                            variant="square" sx={{ width: 400, height: 200 }} />
                                        <label htmlFor="contained-button-file">
                                            <InputAvatar accept="image/*" id="contained-button-file" multiple type="file"
                                                onChange={(e) => {
                                                    if (e.target.length != 0) {
                                                        setFieldValue("avatarFile", e.target.files[0]);
                                                        setFieldValue("previewFile", URL.createObjectURL(e.target.files[0]));
                                                    }
                                                }}
                                            />
                                            <Button style={{ marginLeft: "130px", marginTop: "10px" }} variant="contained" component="span">
                                                Upload
                                            </Button>
                                        </label>
                                        {(values.avatarFile !== null) && errors.avatarFile ? (
                                            <FormHelperText id="component-error-text">
                                                {errors.avatarFile}
                                            </FormHelperText>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} />
                                <Grid item xs={5} />
                                <Grid item xs={3}>
                                    <FormControl component="fieldset">
                                        <FormControlLabel
                                            control={
                                                <Switch name="Status" checked={values.Status} value={values.Status} onChange={handleChange} />
                                            }
                                            label={values.Status ? t("Center.Enable") : t("Center.Disable")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label={t("Center.Name")}
                                            name="Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Name}
                                            error={touched.Name && errors.Name ? true : false}
                                            helperText={touched.Name && errors.Name ? t(errors.Name) : null}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <TextField
                                            id="standard-required"
                                            label={t("Center.Code")}
                                            name="Code"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Code}
                                            error={touched.Code && errors.Code ? true : false}
                                            helperText={touched.Code && errors.Code ? t(errors.Code) : null}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <TextField
                                            id="standard-required"
                                            label={t("Center.Address")}
                                            name="Address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Address}
                                            error={touched.Address && errors.Address ? true : false}
                                            helperText={touched.Address && errors.Address ? t(errors.Address) : null}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <TextField
                                            label={t("Center.ContactPhone")}
                                            name="Phone"
                                            value={values.Phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="formatted-text-mask-input"
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                            }}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <TextField
                                            label={t("Center.Fax")}
                                            name="Fax"
                                            value={values.Fax}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="formatted-text-mask-input"
                                            InputProps={{
                                                inputComponent: FaxCustom,
                                            }}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <TextField
                                            id="standard-required"
                                            label={t("User.Email")}
                                            name="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Email}
                                            error={touched.Email && errors.Email ? true : false}
                                            helperText={touched.Email && errors.Email ? t(errors.Email) : null}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <TextField
                                            id="standard-required"
                                            label={t("Center.Website")}
                                            name="Website"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Website}
                                            error={touched.Website && errors.Website ? true : false}
                                            helperText={touched.Website && errors.Website ? t(errors.Website) : null}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
            </Formik>
        </>
    )
}

export default CreateCenter