import React, {Component} from 'react'
import {observer} from 'mobx-react'
import PostStore from '../stores/post'
import {Link} from 'react-router-dom'

@observer
class PostList extends Component{
    componentDidMount(){
        this.props.store.all(1)
    }
    handlePosts(page){
        this.props.store.all(page)
    }
    deletePost(slug){
        this.props.store.delete(slug)
    }
    render(){
        return(
            <div>
            <Link to="/admin/posts/create/" >Create</Link>
                <ul>
                {
                    this.props.store.objects.map((post,i)=>{
                        return <li key={i}><Link to={'/admin/posts/read/'+post.slug}>{post.title}</Link>
                            {" "} - <Link to={'/admin/posts/update/'+post.slug}>Update</Link>
                            {" "} - <a href='#' onClick={this.deletePost.bind(this, post.slug)}>Delete</a></li>
                    })
                }
                </ul>
                    {!!this.props.store.previous?<button onClick={this.handlePosts.bind(this, this.props.store.previous)}> { "<<" } </button>:'' }
                    <span>pagina {this.props.store.page} of {this.props.store.pages}</span>
                    {!!this.props.store.next?<button onClick={this.handlePosts.bind(this, this.props.store.next)}> { ">>" } </button>:''}
            </div>
        )
    }
}

class ListAllPosts extends Component{
    render(){
        return(
                <PostList store={PostStore} params={this.props.params} />
            )
    }
}

export default ListAllPosts
