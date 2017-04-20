import React, {Component} from 'react'
import {observer} from 'mobx-react'
import PostStore from '../stores/post'

@observer
class ReadPost extends Component{
    componentDidMount(){
        //console.log(this.props)
        var slug = this.props.params.slug
        this.props.store.get(slug)
    }
    render(){
        return(
            <form>
            <div>
                <h1>{this.props.store.title}</h1>
            </div>
            <div>
                <p>{this.props.store.body}</p>
            </div>
            </form>
        )
    }
}


class ReadOnePost extends Component{
    render(){
        console.log(this.props.match.params);
            return(
                <ReadPost store={PostStore} params={this.props.match.params} />
            )
    }
}

export default ReadOnePost
