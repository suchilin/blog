import React, {Component} from 'react'
import {observer} from 'mobx-react'
import PostStore from '../stores/post'
import {Link} from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardActions,
    Button, Checkbox } from 'react-mdc-web';
import Switch from 'react-mdc-web'
import { Redirect } from 'react-router-dom';

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
    updatePost(slug){
        this.props.history.push('/admin/posts/update/'+slug);
    }
    readPost(slug){
        this.props.history.push('/admin/posts/read/'+slug)
    }
    render(){
        return(
            <div id="dtposts">
                <i className="mdi mdi-note-plus-outline" onClick={(event)=>{ this.props.history.push('/admin/posts/create') }} />
                <i className="mdi mdi-delete" />
                <table className="tposts">
                    <tr>
                        <th>
                            <Checkbox />
                        </th>
                        <th>
                            Title
                        </th>
                        <th></th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                {
                    this.props.store.objects.map((post,i)=>{
                        return(
                        <tr key={i}>
                            <td><Checkbox /></td>
                            <td>
                                {post.title}
                            </td>
                            <td>
                            </td>
                            <td>
                                <i className="mdi mdi-arrow-right-bold-circle" onClick={this.readPost.bind(this, post.slug)} />
                            </td>
                            <td>
                                <i className="mdi mdi-lead-pencil" onClick={this.updatePost.bind(this, post.slug)} />
                            </td>
                            <td>
                                <i className="mdi mdi-delete" onClick={this.deletePost.bind(this, post.slug)} />
                            </td>
                        </tr>
                        )
                        })
                        }
                    </table>


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
                <PostList store={PostStore} history={this.props.history} />
            )
    }
}

export default ListAllPosts
