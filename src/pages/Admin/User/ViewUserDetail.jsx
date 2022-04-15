import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Col, Row, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { getFormattedDate, handleError } from '../../../helpers/ultilities';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../actions/users';

import Loader from '../../../components/Loader/Loader';
import tokenService from '../../../services/token.service';

const ViewUserDetail = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.users)
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useHistory();
    const dispatch = useDispatch();

    const current = tokenService.getUserInfo();

    useEffect(() => {
        dispatch(GetUser(id)).then(() => setLoading(false));
    }, [dispatch, id])
    return (
        <div className='content-wrapper'>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{t("User.Management")}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <Card>
                <Card.Header style={{ textAlign: 'end' }}>
                    {current.Role.Name === "ADMIN" ? ((user.Role.Name === "ADMIN" || user.Role.Name === "CENTRAL ADMIN" ? (
                        <Button variant="outline-primary" onClick={() => navigate(`/User/edit/${id}`)}>{t("Action.Update")}</Button>
                    ) : null)) : (user.Role.Name !== "CENTRAL ADMIN" ? (
                        <Button variant="outline-primary" onClick={() => navigate(`/User/edit/${id}`)}>{t("Action.Update")}</Button>
                    ) : null)}
                    {' '}<Button variant="outline-secondary" onClick={() => { navigate('/User') }}>{t("Action.Back")}</Button>
                </Card.Header>
                {loading ? (
                    <div style={{ marginLeft: '500px', marginTop: '150px' }}>
                        <Loader />
                    </div>
                ) : (
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{t("User.Avatar")}:</Form.Label>{' '}
                                        <Image className='preview' src={user.ImageSrc} alt="Avatar" rounded />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formUsername">
                                        <Form.Label>{t("Login.Username")}: </Form.Label>
                                        <Form.Label className='display-label'>{user.UserName}</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>{t("Login.Password")}: </Form.Label>
                                        <Form.Label className='display-label'>**********</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formRole">
                                                <Form.Label>{t("Role.Role")}: </Form.Label>
                                                <Form.Label className='display-label'>{user.Role.Name}</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formFirstname">
                                                <Form.Label>{t("User.FirstName")}: </Form.Label>
                                                <Form.Label className='display-label'>{user.FirstName}</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formdob">
                                                <Form.Label>{t("User.DateOfBirth")}: </Form.Label>
                                                <Form.Label className='display-label'>{getFormattedDate(user.DateOfBirth)}</Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formCenter">
                                                <Form.Label>{t("Center.Center")}: </Form.Label>
                                                <Form.Label className='display-label'>{(user.Center && user.Center.Name === 'UNAVAILABLE') ? 'Chưa thuộc trung tâm' : user.Center.Name}</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formLastname">
                                                <Form.Label>{t("User.LastName")}: </Form.Label>
                                                <Form.Label className='display-label'>{user.LastName}</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGender">
                                                <Form.Label>{t("User.Gender")}: </Form.Label>
                                                <Form.Label className='display-label'>{user.Gender ? t('User.Male') : t('User.Female')}</Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formPhone">
                                        <Form.Label>{t("User.Phone")}:</Form.Label>
                                        <Form.Label className='display-label'>{user.PhoneNumber}</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>{t("User.Email")}:</Form.Label>
                                        <Form.Label className='display-label'>{user.Email}</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formAddress">
                                        <Form.Label>{t("User.Address")}:</Form.Label>
                                        <Form.Label className='display-label'>{user.Address}</Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                )}
            </Card>
        </div>
    )
}

export default ViewUserDetail
