import { observable } from 'mobx'
import BaseStore from './base'

class PostStore extends BaseStore{
    @observable title = '';
    @observable slug = '';
    @observable body = '';
    @observable autor = '';

}

export default new PostStore();
