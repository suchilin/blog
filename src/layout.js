import React, { Component } from 'react';
import { BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import {Grid,
    Cell, Drawer, Navigation,
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
    DrawerHeader, DrawerHeaderContent} from 'react-mdc-web';
import ListAllPosts from './posts/list';
import CreateOnePost from './posts/create';
import ReadOnePost from './posts/read';
import UpdateOnePost from './posts/update';
import DeleteOnePost from './posts/delete';
import Login from './login';
import "./index.scss";
var auth = require('./auth')

class Home extends Component{
    render(){
        return(<h1>Home</h1>)
    }
}

class Header extends Component{
    render(){
        return(
            <div className="dashbar">
                Dashboard
            </div>
            )
    }
}

class Footer extends Component{
    render(){
        return(<div className="footer">copyright</div>)
    }
}

class Logout extends Component{
    componentDidMount(){
        auth.logout()
    }
    render(){
        return(
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
                  }}/>
        )
    }
}

class NavBar extends Component{
  render() {
    return (
        <Drawer className="sideBar" permanent>
            <DrawerHeader>
                <DrawerHeaderContent>
                    Directions
                </DrawerHeaderContent>
            </DrawerHeader>
            <Navigation>
                <Link to='/'><i className='mdi mdi-home'/>Home</Link>
                <Link to='/admin/posts'><i className="mdi mdi-book" />Posts</Link>
                {auth.loggedIn() ? <Link to="/logout"><i className="mdi mdi-logout" />Logout</Link>:<Link to="/login/"><i className="mdi mdi-login" />Sign In</Link>}
            </Navigation>
        </Drawer>
    );
  }
};

class MainLayout extends Component{
  render() {
    return (
        <Router>
            <div>
                <Grid>
                    <Cell col={2}>
                        <NavBar />
                    </Cell>
                    <Cell col={10}>
                        <Header />
                        <div className="mainContent">
                            <main>
                                <Route exact path="/" component={Home} />
                                <PrivateRoute exact path="/admin/posts" component={ListAllPosts}/>
                                <PrivateRoute exact path="/admin/posts/create" component={CreateOnePost} />
                                <PrivateRoute path="/admin/posts/read/:slug" component={ReadOnePost} />
                                <PrivateRoute path="/admin/posts/update/:slug" component={UpdateOnePost} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/logout" component={Logout} />
                            </main>
                        </div>
                    </Cell>
                </Grid>
                <Grid>
                    <Cell col={12}>
                        <Footer />
                </Cell>
            </Grid>
            </div>
        </Router>
    );
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default MainLayout;
