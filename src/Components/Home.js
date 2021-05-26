import { Button, Card,Grid,Typography } from '@material-ui/core'
import React,{useState} from 'react'
import { Alert } from '@material-ui/lab';
import {useAuth} from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'



export default function Home() {
const [error, setError] = useState("")
const {currentUser, logout} = useAuth()
const history = useHistory()

async function handleLogout(){
    setError("")

    try{
        await logout()
        history.push("/login")
    }
    catch{
        setError("Failed to logout")
    }

}



    return (
        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
            <Grid item>
                Welcome to the promised land
            </Grid>
            <Grid item >
                <Card elevation={5} style={{height:'400px', width:'400px'}}>
                    <Grid container direction='column' justify='center' alignItems='center' spacing={1}>
                        <Grid item >
                            < Typography variant='h5' style={{textAlign:'center'}}> 
                                Profile
                            </Typography >
                        </Grid>

                        <Grid item >
                            {/* Error Alert */}
                            {error &&
                                <Alert severity='error'>
                                    {error}
                                </Alert>}
                        </Grid>

                        <Grid item >
                            <strong> Email: </strong>{currentUser.email}
                        </Grid>
                        <Grid item >
                            <Link to="/updateProfile">
                                <Button variant='outlined'>
                                    Update Profile
                                </Button>
                            </Link> 
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item>
                <Button variant='outlined' onClick={handleLogout}>
                    Logout
                </Button>
            </Grid>
        </Grid>
    )
}
