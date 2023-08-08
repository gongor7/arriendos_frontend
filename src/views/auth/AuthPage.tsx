import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './AuthPage.css';
import { Button, Grid, IconButton } from "@mui/material"
import { Box } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import imagelogo from './../../../assets/images/no-image.webp';
import { useAuthStore, useForm } from '../../hooks';
import { ComponentInput } from '../../components';

const loginFormFields = {
    loginUser: '',
    loginPassword: '',
}

export const AuthPage = () => {
    const { startLogin, errorMessage } = useAuthStore();

    const { loginUser, loginPassword, onInputChange } = useForm(loginFormFields);

    const loginSubmit = (event: any) => {
        event.preventDefault();
        startLogin({ username: loginUser, password: loginPassword });
    }


    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage])

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                <Box display="flex" justifyContent="center">
                    {/* <img src={imagelogo} alt="Descripción de la imagen" style={{ maxHeight: '80%', maxWidth: '80%' }} /> */}
                </Box>
            </Grid>
            <Grid item sx={{ padding: '20px' }} xs={12} sm={6} container justifyContent="center" alignItems="center">
                <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3>AUTH </h3>
                    <form onSubmit={loginSubmit}>
                        <ComponentInput
                            type="text"
                            label="Cuenta"
                            name="loginUser"
                            value={loginUser}
                            onChange={onInputChange}
                        />
                        <ComponentInput
                            type={showPassword ? 'text' : 'password'}
                            label="Contraseña"
                            name="loginPassword"
                            value={loginPassword}
                            onChange={onInputChange}
                            endAdornment={(
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )}
                        />
                        <Button
                            type="submit"
                            className='mt-2'
                            variant="contained"
                            disableElevation
                            disableRipple
                            sx={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '8px 0', width: '100%' }}
                        >
                            INGRESAR
                        </Button>
                    </form>
                </Box>
            </Grid>
        </Grid >
    )
}
