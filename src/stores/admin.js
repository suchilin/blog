import { observable } from 'mobx'

class AdminInterface{
    @observable selecteds = [];
    @observable selectAll = false;

    addSelect(id, status){
        var idx = this.selecteds.indexOf([id,status])
        if(idx>-1){
            this.selecteds.splice(idx,1)
        }else{
            this.selecteds.push([id,status])
        }
    }
}

export default new AdminInterface();
