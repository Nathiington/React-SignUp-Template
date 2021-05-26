import React,{useRef,useState} from 'react'
import { Button, TextField, Card, Grid, Typography } from '@material-ui/core';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {useAuth} from '../Context/AuthContext'
import { Alert } from '@material-ui/lab';
import { Link,useHistory } from 'react-router-dom'
import '../CSS/App.css' 



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

}));

export default function SignUp() {
    const classes = useStyles()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const { signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()




    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmationRef.current.value){
            return setError("Passwords do not match")
        }

        try
        {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")
        } 
        catch 
        {
            setError("Failed to create an account")
            console.log("")
        }
        setLoading(false)
    }


    return (
        <MuiThemeProvider theme={colortheme}>
            {/* Card */}
            < Card component="main" elevation={5}>
                <Grid container direction='column' justify='center' alignItems='center'>


                {/* Title */}
                < Typography variant='h2' style={{ textAlign: 'center' }}> Sign Up</Typography >
                <br/>

                {/* Error Alert */}
                    {error && 
                        <Alert severity='error'>
                        {error}
                    </Alert>}

                {/* Text Fields */}
                < div className={classes.paper} >
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            id="email"
                            fullWidth
                            inputRef={emailRef}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="password"
                            fullWidth
                            inputRef={passwordRef}
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="confirmPassword"
                            fullWidth
                            inputRef={passwordConfirmationRef}
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            className={classes.submit}
                            disabled = {loading}
                        >
                            Sign Up 
                        </Button>
                        <Grid container direction='column' justify='space-between' alignItems='flex-start' spacing={1}> 
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                               <Typography variant="body2" className={classes.forgot} >
                                        <Link to="/login">  Already have an account? Log in</Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography variant="body2" className={classes.forgot} >
                                        <Link to="/forgotPassword"> Forgot password?</Link>
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
