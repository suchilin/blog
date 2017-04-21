import React, { Component } from 'react';
import { BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import ListAllPosts from './posts/list'
import CreateOnePost from './posts/create'
import ReadOnePost from './posts/read'
import UpdateOnePost from './posts/update'
import DeleteOnePost from './posts/delete'
import Login from './login'
var auth = require('./auth')

class Home extends Component{
    render(){
        return(<h1>Home</h1>)
    }
}

class Header extends Component{
    render(){
        return(<header className="primary-header">This is the header</header>)
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
      <div className="search">
        <aside>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/admin/posts">Posts</Link></li>
                    <li>{auth.loggedIn() ? <Link to="/logout">Logout</Link>:<Link to="/login/">Sign In</Link>}</li>
                </ul>
            </nav>
        </aside>
      </div>
    );
  }
};

class MainLayout extends Component{
  render() {
    return (
        <Router>
            <div className="app">
                <Header />
                <NavBar />
                <main>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/admin/posts" component={ListAllPosts}/>
                    <PrivateRoute exact path="/admin/posts/create" component={CreateOnePost} />
                    <PrivateRoute path="/admin/posts/read/:slug" component={ReadOnePost} />
                    <PrivateRoute path="/admin/posts/update/:slug" component={UpdateOnePost} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                </main>
                <Footer />
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
