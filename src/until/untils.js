export default{
    formatDate(time){
        let date=new Date(time);
        return `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
        `;
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.current,
            total:data.total,
            pageSize:data.pageSize,
            showTotal:()=>{
                return `共有${data.total}条数据`
            },
            showQuickJumper:true
        }
    },
    updateParamsToState(selectedRowKeys,selectedItem){
        // 封装一个能将子组件传递过来的参数，更新到父组件state里面的方法
        // 为了能让this.setState()正常调用，在父组件传递这个方法给子组件的时候需要bind(this)
        this.setState({
            selectedItem,
            selectedRowKeys
        })
    }
}