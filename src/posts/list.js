import React, {Component} from 'react'
import {observer} from 'mobx-react'
import PostStore from '../stores/post'
import {Link} from 'react-router-dom'
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
    deletePost(slug, title){
        this.props.AdminInterface.deleteWarningMessage = "This action will delete post, are you sure?"
        this.props.AdminInterface.deletePostSlug = slug;
        this.props.AdminInterface.deletePostTitle = title;
        this.props.AdminInterface.deleteDialogOpen=true;
    }
    updatePost(slug){
        this.props.history.push('/admin/posts/update/'+slug);
    }
    readPost(slug){
        this.props.history.push('/admin/posts/read/'+slug)
    }
    aSelection(e){
        this.props.AdminInterface.select(e.target.id)
        console.log( Array.from(this.props.AdminInterface.selecteds) )
    }
    selectAll(e){
        //var value = e.target.checked;
        //var selecteds = []
        //for(var i=0; i<10; i++){
            //selecteds.push("check"+i)
        //}
        //if(value){
            //this.props.AdminInterface.selecteds=selecteds
            //console.log(selecteds)
        //}else{
            //this.props.AdminInterface.selecteds=[]
        //}
        this.props.AdminInterface.selecteds.map((ojt_)=>{
            console.log(ojt_)
        })
    }

    render(){
        this.props.store.objects.map((ojt_)=>{
            console.log(ojt_.slug)
        })
            return(
            <div id="dtposts">
                <button className="lposts_buttons" onClick={(event)=>{ this.props.history.push('/admin/posts/create') }} >
                    <i className="mdi mdi-note-plus-outline" /> New
                </button>

                { this.props.AdminInterface.selecteds.length>0 ?
                    <button className="lposts_buttons">
                        <i className="mdi mdi-delete" /> Delete
                    </button> : ""
                }
                <table className="tposts">
                    <tbody>
                    <tr>
                        <th>
                            <checkbox onChange={this.selectAll.bind(this)} />
                        </th>
                        <th>
                            Title
                        </th>
                        <th>Publicate</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {
                        this.props.store.objects.map((post, i)=>{
                            return(
                                <tr key={post.slug}>
                                    <td>
                                        <checkbox
                                            id={"check"+i}
                                            checked={this.props.AdminInterface.isCheck("check"+i)}
                                            onChange={this.aSelection.bind(this)}
                                        />
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
                                        <i className="mdi mdi-delete" onClick={this.deletePost.bind(this, post.slug, post.title)} />
                                    </td>
                                </tr>
                            )
                            })
                    }
                        </tbody>
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
