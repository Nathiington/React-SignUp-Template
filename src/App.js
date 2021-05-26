import {Grid} from '@material-ui/core';
import SignUp from './Components/SignUp'
import { AuthProvider } from './Context/AuthContext';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import PrivateRoute from "./Components/PrivateRoute"
import Home from './Components/Home'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'
import UpdateProfile from './Components/UpdateProfile'




export default function App() {
    return (
        <Grid container direction='row' alignContent='center' justify='center'>
            <Grid item xs={11} sm={8} md={6} lg={4}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={Home}/>
                            <PrivateRoute exact path="/updateProfile" component={UpdateProfile} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgotPassword" component={ForgotPassword} />
                        </Switch>
                    </AuthProvider>
                </Router>
            </Grid>
        </Grid>
    );
}
