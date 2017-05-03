import React, {Component} from 'react'
import {observer} from 'mobx-react'
import PostStore from '../stores/post'
import {Link} from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardActions,
    Button, Checkbox } from 'react-mdc-web';
import Switch from 'react-mdc-web'
import { Redirect } from 'react-router-dom';
import AdminInterface from '../stores/admin';

@observer
class PostList extends Component{
    componentDidMount(){
        this.props.store.all(1);
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
    aSelection(e){
        var id = e.target.id;
        this.props.AdminInterface.addSelect(id)
        console.log(Array.from(this.props.AdminInterface.selecteds))
    }
    selectAll(e){
        console.log(this.refs)
    }

    render(){
        const tableItems = this.props.store.objects.map((post,i)=>{
            return(
            <tr key={i}>
                <td>
                    <Checkbox id={"check"+i} onChange={this.aSelection.bind(this)} />
                </td>
                <td>
                    {post.title}
                </td>
                <td>
                    <div className="mdc-switch">    
                      <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" />
                      <div className="mdc-switch__background">
                        <div className="mdc-switch__knob"></div>
                      </div>
                    </div>
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
            });
        return(
            <div id="dtposts">
                <Button className="lposts_buttons" onClick={(event)=>{ this.props.history.push('/admin/posts/create') }} >
                    <i className="mdi mdi-note-plus-outline" /> New
                </Button>

                { this.props.AdminInterface.selecteds.length>0 ? 
                    <Button className="lposts_buttons">
                        <i className="mdi mdi-delete" /> Delete
                    </Button> : ""
                }
                <table className="tposts">
                    <tr>
                        <th>
                            <Checkbox onChange={this.selectAll.bind(this)} />
                        </th>
                        <th>
                            Title
                        </th>
                        <th>Publicate</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                        {tableItems}
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
            <PostList 
                store={PostStore}
                history={this.props.history}
                AdminInterface={AdminInterface}
            />
            )
    }
}

export default ListAllPosts
