import React, { Component } from 'react'
import { Table } from 'antd'

export default class ETable extends Component {
    onRowClick = (record, index) => {
        let row_selection = this.props.rowSelection;
        if (row_selection.type == "checkbox") {
            //多选表格的封装真你妈麻烦，不想写了，给爷爬！
        } else if (row_selection.type == "radio") {
            let selectedRowKeys = [index];
            let selectedItem = record;
            console.log(selectedRowKeys,selectedItem)
            this.props.updateParamsToState(selectedRowKeys,selectedItem)
        }
    }
    initTabel = () => {
        let { selectedRowKeys } = this.props;
        let row_selection = this.props.rowSelection;
        let rowSelection = {
            type: "radio",
            selectedRowKeys
        }
        if (row_selection === false || row_selection === undefined) {
            rowSelection = false
        } else if (row_selection.type == "checkbox") {
            // 多选行的封装我写到这里了
            rowSelection.type = "checkbox";
            rowSelection.onChange=(selectedRowKeys,selectedItem) => {
                console.log(selectedItem)
                this.props.updateParamsToState(selectedRowKeys)
            }
        }
        return (
            <Table
                {...this.props}
                bordered
                rowSelection={rowSelection}
                onRow={(record, index) => {
                    // record是以对象的形式，返回当前行中的数据
                    return {
                        onClick: () => {
                            if (!rowSelection) {
                                return
                            }
                            this.onRowClick(record, index)
                        }
                    }
                }}
            />
        )
    }
    render() {
        return (
            <div>
                {this.initTabel()}
            </div>
        )
    }
}
