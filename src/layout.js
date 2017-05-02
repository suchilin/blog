import React, { Component } from 'react';
import { BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import ListAllPosts from './posts/list';
import CreateOnePost from './posts/create';
import ReadOnePost from './posts/read';
import UpdateOnePost from './posts/update';
import DeleteOnePost from './posts/delete';
import Login from './login';
import { Grid, Cell, Drawer, DrawerSpacer, Navigation, Icon } from 'react-mdc-web';
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
            <div id="mainHeader">
                <input type="text"placeholder="&#xF349; search"/>
                <i className="mdi mdi-account" />
            </div>
            )
    }
}

class Footer extends Component{
    render(){
        return(<div className="search-footer pagination"></div>)
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
        <Drawer id="leftNav" permanent>
            <DrawerSpacer>
                Awesome Blog
            </DrawerSpacer>
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
            <Grid className="grid_margins">
                <Cell col={2}>
                    <NavBar />
                </Cell>
                <Cell col={10}>
                    <Grid>
                        <Cell col={12}>
                            <Header />
                        </Cell>
                        <Cell col={10}>
                            <main>
                                <Route exact path="/" component={Home} />
                                <PrivateRoute exact path="/admin/posts" component={ListAllPosts}/>
                                <PrivateRoute exact path="/admin/posts/create" component={CreateOnePost} />
                                <PrivateRoute path="/admin/posts/read/:slug" component={ReadOnePost} />
                                <PrivateRoute path="/admin/posts/update/:slug" component={UpdateOnePost} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/logout" component={Logout} />
                            </main>
                        </Cell>
                        <Cell>
                            <Footer />
                        </Cell>
                    </Grid>
                </Cell>
            </Grid>
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
