import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Alert } from 'reactstrap';
import UseLogin from './UseLogin';

const Login = () => {
    const {setLogin, bind, error} = UseLogin();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLogin(e);
    };

    return (
        <Card className="login-card">
            <CardBody>
            <CardTitle tag="h5">Login</CardTitle>
            <Form onSubmit={e => handleOnSubmit(e)}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-input">
                    <Label for="email" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Email" {...bind} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-input">
                    <Label for="password" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" id="password" {...bind} />
                </FormGroup>
                {error ? 
                <Alert color="danger">
                    Incorrect email or password.
                </Alert>
                : <div></div>}
                <Input type="submit" value="Submit" className="login-submit" />
            </Form>
            </CardBody>
        </Card>
    );
};

export default Login;
