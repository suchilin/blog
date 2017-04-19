import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ListAllPosts from './posts/list'
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
   constructor(props) {
      super(props);
       this.logout = this.logout.bind(this);
    };
    logout(e){
        e.preventDefault();
        auth.logout();
        console.log('loged out');
        browserHistory.push('/login/');
    }
    render(){
        return(<a href="#" onClick={this.logout}>Log Out</a>)
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
                    <li>{auth.loggedIn() ? <Logout />:<Link to="/login/">Sign In</Link>}</li>
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
                    <Route path="/admin/posts" component={ListAllPosts} />
                </main>
                <Footer />
            </div>
        </Router>
    );
  }
};

export default MainLayout;
