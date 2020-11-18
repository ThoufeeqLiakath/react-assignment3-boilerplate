import React, { useState } from 'react';
import { TextField, Button, Grid, FormHelperText } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
// import User from '../../model/User';
import AuthService from '../../services/auth.service';
import RegisterApiModel from '../../model/RegisterApiModel';
import LoginApiModel from '../../model/LoginApiModel';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// import Alert from '@material-ui/lab/Alert';


export default function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [pwdMismatchErrorText, setPwdMismatchErrorText] = useState('');
    const [contactErrorText, setcontactErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [buttonName, setbuttonName] = useState('');
    const inUpdate = (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined);
    if (buttonName === '') {
        if (inUpdate) {
            setbuttonName('Update');
            var aythService = new AuthService().getUser();
            aythService.then((data: any) => {
                console.info('inside success', data);
                setUserName(data.userId);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setContact(data.contact);
                // setPassword(data.password);
                // setConfirmPassword(data.password);
                setEmail(data.email);
            })
        }
        else {
            setbuttonName('Register');
        }
    }

    // const history=useHistory();
    const onChangeUserName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setUserName(value);
    };
    const onChangeFirstName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setFirstName(value);

    };
    const onChangeLastName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setLastName(value);
    };
    const onChangeContact = (e: any) => {
        e.preventDefault();
        console.info(e.target.value);

        if ((e.target.value.length > 10)) {
            return false;
        }
        // let name=e.target.name;
        let value = e.target.value;
        setContact(value);
    };
    const onChangeEmail = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setEmail(value);
    };

    const onChangePassword = (e: any) => {
        setPwdMismatchErrorText('');
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setPassword(value);

    };
    const onChangeConfirmPassword = (e: any) => {
        e.preventDefault();
        setPwdMismatchErrorText('');
        // let name=e.target.name;
        let value = e.target.value;
        setConfirmPassword(value);

    };
    const onClickRegister = (e: any) => {
        console.info('onClickRegister');
        console.info('update', inUpdate);
        console.info(email);
        e.preventDefault();
        var isnum = /^\d+$/.test(contact);
        if (password !== confirmPassword && !inUpdate) {
            setPwdMismatchErrorText('Password & Confirm password not matching');
        }
        else if (!isnum || contact.length !== 10) {
            setPwdMismatchErrorText('');
            setcontactErrorText('Contact number is not valid');
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setcontactErrorText('');
            setEmailErrorText('Email is not valid');
        }
        else {
            console.info('validation passed');
            setEmailErrorText('');
            setPwdMismatchErrorText('');
            setcontactErrorText('');
            // e.preventDefault();
            // history.push('/dashboard');        
            console.log(userName);
            console.log(password);
            let userUser = new RegisterApiModel(userName, password, firstName, lastName, email, contact);
            let userAuth = new LoginApiModel(userName, password);
            const authServiceRegister = new AuthService().register(userAuth);
            if (!inUpdate) {
                authServiceRegister.then((data: any) => {
                    console.info(data.status);
                    if (data.status !== undefined && data.status !== 201 && data.status !== 200) {
                        setPwdMismatchErrorText(data.statusText);
                    }
                    else {
                        console.info('registered');
                        console.info(data);
                        var parsedData = JSON.parse(data);
                        console.info(parsedData);
                        if (parsedData !== undefined && parsedData.Token !== undefined) {
                            // localStorage.setItem("token", parsedData.Token);
                            // history.push('/dashboard');
                            const authServiceCreateUser = new AuthService().createUser(userUser, parsedData.Token, inUpdate);
                            authServiceCreateUser.then((data1: any) => {
                                console.info(data1.status);
                                if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
                                    setPwdMismatchErrorText(data1.statusText);
                                }
                                else {
                                    console.info(data1);
                                    var parsedData = JSON.parse(data1);
                                    console.info(parsedData);
                                    if (parsedData !== undefined && parsedData === true) {
                                        // localStorage.setItem("token", parsedData.Token);
                                        // history.push('/dashboard');

                                        window.location.replace('/login');
                                        // return <Redirect to='/dashboard' />
                                    }
                                }

                            });

                            // return <Redirect to='/dashboard' />
                        }
                    }

                });
            }
            else {
                const authServiceUpdateUser = new AuthService().createUser(userUser, '', inUpdate);
                authServiceUpdateUser.then((data1: any) => {
                    console.info(data1.status);
                    if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
                        setPwdMismatchErrorText(data1.statusText);
                    }
                    else {
                        console.info(data1);
                        var parsedData = JSON.parse(data1);
                        console.info(parsedData);
                        if (parsedData !== undefined && parsedData === true) {
                            // localStorage.setItem("token", parsedData.Token);
                            window.location.replace('/dashboard');
                            // console.info('Beffore Alert');
                        }
                    }

                });
            }




        }
    };

    return <div style={{ paddingTop: 80, paddingBottom: 120 }}>

        <Grid container direction="column"
            alignItems="center"
            justify="center"
            style={{padding:8}}>
            <form onSubmit={onClickRegister}>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <TextField
                            type="text"
                            placeholder="User Id"
                            name="RegisterUserName"
                            required
                            disabled={inUpdate}
                            value={userName}
                            onChange={onChangeUserName} />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <TextField
                            type="password"
                            placeholder="Password"
                            name="Registerpassword"
                            value={password}
                            hidden={inUpdate}
                            required={!inUpdate}
                            onChange={onChangePassword} />
                    </Grid>
                    <Grid item xs>

                        <TextField
                            type="password"
                            placeholder="Confirm Password"
                            name="RegisterconfirmPassword"
                            required={!inUpdate}
                            hidden={inUpdate}
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword} />
                        <FormHelperText style={{ color: 'red', textAlign: 'left' }}>{pwdMismatchErrorText}</FormHelperText>

                    </Grid>

                </Grid>
                {/* <FormControl> */}

                <Grid container spacing={1}>
                    <Grid item xs>

                        <TextField
                            type="text"
                            placeholder="First Name"
                            name="RegisterFirstName"
                            value={firstName}
                            required
                            onChange={onChangeFirstName} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            type="text"
                            placeholder="Last Name"
                            name="RegisterLastName"
                            value={lastName}
                            required
                            onChange={onChangeLastName} />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <TextField
                            type="number"
                            placeholder="Contact"
                            name="RegisterContact"
                            value={contact}
                            required
                            onChange={onChangeContact} />
                        <FormHelperText style={{ color: 'red', textAlign: 'left' }}>{contactErrorText}</FormHelperText>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            type="email"
                            required
                            placeholder="Email"
                            name="RegisterEmail"
                            value={email}
                            onChange={onChangeEmail} />

                        <FormHelperText style={{ color: 'red', textAlign: 'left' }}>{emailErrorText}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs><Button type="submit" variant="outlined">{buttonName} <LockOpenRoundedIcon/></Button></Grid>
                    <Grid item xs><Button href="/login" variant="outlined"><ArrowBackIcon/> Login <VpnKeyRoundedIcon/></Button></Grid>
                </Grid>

                {/* </FormControl> */}
            </form>
        </Grid>
    </div >
};