import React, { useRef, useState } from 'react'
import { Button, TextField, Card, Grid, Typography } from '@material-ui/core';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useAuth } from '../Context/AuthContext'
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom'

const colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#000000'
        },
        default: {
            main: '#e0e0e0'
        }
    }
});

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '15px',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    Link:{
        textDecoration:'none'
    }

}));

export default function ForgotPassword() {
    const classes = useStyles()
    const emailRef = useRef()
    const { resetPwd } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()



    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPwd(emailRef.current.value)
            setMessage("Check your email for further instructions")

        }
        catch
        {
            setError("Failed to reset password")
        }
        setLoading(false)
    }


    return (
        <MuiThemeProvider theme={colortheme}>
            {/* Card */}
            < Card component="main" elevation={5}>
                <Grid container direction='column' justify='center' alignItems='center'>


                    {/* Title */}
                    < Typography variant='h2' style={{ textAlign: 'center' }}> Reset Password</Typography >
                    <br />

                    {/* Error Alert */}
                    {error &&
                        <Alert severity='error'>
                            {error}
                        </Alert>}

                    {/* Success Alert */}
                    {message &&
                        <Alert severity='success'>
                            {message}
                        </Alert>}

                    {/* Text Fields */}
                    < div className={classes.paper} >
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="email"
                                fullWidth
                                inputRef={emailRef}
                                label="Email Address"
                                name="email"
                                type ="email"
                                
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                            >
                                Reset Password
                        </Button>
                            <Grid container direction='column' justify='space-between' alignItems='flex-start' spacing={1}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Typography variant="body2" className={classes.forgot} >
                                        Don't have an account?<Link to="/signup" style={{ textDecoration: 'none' }}> Sign Up</Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Typography variant="body2" className={classes.forgot} > Remember password?
                                        <Link to="/login" style={{ textDecoration: 'none' }}>  <strong>Login</strong></Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </div >
                </Grid>
            </Card >
        </MuiThemeProvider>
    )
}
