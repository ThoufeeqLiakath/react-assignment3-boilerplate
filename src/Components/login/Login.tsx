import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { FormControl, Input, Button, Grid, FormHelperText } from '@material-ui/core';
import AuthService from '../../services/auth.service';
import User from '../../model/User';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
// import { Redirect } from 'react-router-dom'

export default function Login() {

    // const history=useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorText,setErrorText]=useState('');

    const onChangeUserName = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setUserName(value);
    };
    const onChangePassword = (e: any) => {
        e.preventDefault();
        // let name=e.target.name;
        let value = e.target.value;
        setPassword(value);
    };
    const onClickLogin = (e: any) => {
        e.preventDefault();
        let user = new User(userName, password);
        const authService = new AuthService().getToken(user);
        authService.then((data: any) => {
            setErrorText('');
            console.info(data.status);
            if (data.status!==undefined&&data.status !== 201&&data.status !== 200) {
                setErrorText(data.statusText);
            }
            else {
                console.info(data);
                var parsedData = JSON.parse(data);
                if (parsedData.Token !== undefined) {
                    localStorage.setItem("token", parsedData.Token);                    
                    console.info(localStorage.getItem("token"));
                    // history.push('/dashboard');
                    window.location.replace('/dashboard');
                    // return <Redirect to='/dashboard' />
                }
                else {
                    localStorage.removeItem("token");
                }
            }

        });
    };
    return <div style={{ paddingTop: 80, paddingBottom:120 }}>
        <Grid container direction="column"
            alignItems="center"
            justify="center">
            <Grid item>
            <form onSubmit={onClickLogin}> 
                <FormControl>
                    <Input
                        type="text"
                        id="UserName"
                        placeholder="User Name"
                        name="UserName"
                        required
                        value={userName}
                        onChange={onChangeUserName}
                        style={{ textAlign: "center" }} />
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        onChange={onChangePassword} />
                        <FormHelperText style={{color:'red',textAlign:'left'}}>{errorText}</FormHelperText>
                    <Button variant="outlined"  id="login" type="submit">Log In <VpnKeyRoundedIcon/></Button>
                    <Button variant="outlined"  id="register"
                        onClick={() => {
                            // history.push("/register")
                            window.location.replace("/register")
                        }}>Register <LockOpenRoundedIcon/></Button>                    
                    
                </FormControl>
                </form>
            </Grid>

        </Grid>

    </div>
};

