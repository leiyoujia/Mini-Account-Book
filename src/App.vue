<template>
<div>
    <!-- <div>mini-account</div> -->

    <!-- <a-button @click='category'>查看数据</a-button> -->

    <!-- <v-table
        :columns = 'columns'
        :table-data = 'tableData'
        :show-vertical-border = 'false'
        :filter-method = 'filterMethod'
        :cell-edit-done='cellEditDone'>
    </v-table> -->
    <!-- <vue-snotify></vue-snotify> -->
    <a-table :columns="columns" :dataSource="billArr" class="table" bordered :pagination= 'false'>
        <span slot="customTitle">Type</span>
    </a-table>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    data: () => ({
        billData: '',
        billArr: [],
        billCategory: [],
        tableData: [],
        columns: [
            {
                dataIndex: 'type',
                key: 'type',
                slots: { title: 'customTitle' },
                width: 50
                // scopedSlots: { customRender: 'type' },
            },
            {
                dataIndex: 'time',
                title: 'time',
                width: 50,
                // key: 'time',
                // slots: { title: 'customTitle' },
                // scopedSlots: { customRender: 'type' },
                filters: [
                    {
                        text: '1月',
                        value: '1',
                    },
                    {
                        text: '2月',
                        value: '2',
                    },
                    {
                        text: '3月',
                        value: '3',
                    }],
                onfilter:(value, record)=>{
                    console.log('value',value)
                    console.log('record',record)

                    return record.time.split('/')[1].indexOf(value) === 0
                }
            },
            {
                dataIndex: 'category',
                title: 'category',
                width: 50
            },
            {
                dataIndex: 'amount',
                title: 'amount',
                width: 50
            },
        ],
    }),
    created() {
        axios.all([this.data(), this.category()])
            .then(axios.spread((bills, categories) => {
                this.show(bills,categories)
            }));
        // this.Alert1()
        //this.$snotify.success('Example body content');        
    },
    methods: {
        data: function(){
            return axios.get('bill.csv')
        },
        category: function(){
            return axios.get('categories.csv')
        },
        show: function(bills, categories){
            var that = this;
            that.billData = bills.data.split('\r\n');
            this.billCategory = categories.data.split('\r\n')
            // this.billData[0].remove(0)
            console.log("billData: ", this.billData)
            that.billArr = that.billData.map((item, index) => {
                const rowArray = item.split(',');
                if(index !== 0){
                    const localDate = new Date(parseInt(rowArray[1]));
                    rowArray[1] = localDate.toLocaleDateString();
                    rowArray[4] = localDate.getMonth() + 1;
                    rowArray[5] = Math.abs(index)
                    // rowArray[1] = that.formatDate(rowArray[1]);
                    const matchedCategory = this.billCategory.map(item => {
                        return item.split(',');
                    }).find(arr=>arr[0] === rowArray[2]);
                    // const category = billCategoryArr.find(item=>item.id === rowArray[2])
                    // console.log(this.billCategory)
                    // console.log("category:", matchedCategory)
                    rowArray[2] = matchedCategory[2];
                    // rowArray[2] = that.replaceCate(rowArray[2]);
                    if(rowArray[0] ==0){
                        rowArray[0] = '支出'
                    }else{
                        rowArray[0] = '收入'
                    }
                    // const str = rowArray.join();
                    // console.log('str',rowArray[0])
                    // str.replace('0', '1')
            
                    // rowArray.splice(0,0,'"type":')
                    // rowArray.splice(2, 0, '"time":')
                    // rowArray.splice(4, 0, '"category":')
                    // rowArray.splice(6, 0, '"amount":')
                    // console.log('billArr',this.billArr)
                }
                return{
                    type: rowArray[0],
                    time: rowArray[1],
                    category: rowArray[2],
                    amount: rowArray[3],
                    month: rowArray[4],
                    key: rowArray[5]
                }
            });
            that.billArr.shift();
            this.tableData = that.billArr            
            console.log('billArr: ',this.billArr)
        },
        formatDate(date){
            const localDate = new Date(parseInt(date));
            return localDate.toLocaleDateString();
        },
        replaceCate(id){
            return this.billCategory.find(item=>item.id === id)
        },
        // filterMethod(value){
        //     console.log('bill',value)
        //     let data = this.billArr;
            
        //     data = data.filter(item => {
        //         // console.log(item);
        //         // item.time.split('/')[1]
        //         return item.time.split('/')[1] === value
        //     })
                

            
        //     console.log(data)
        //     this.tableData = data
        // },
    }
    
    
}
</script>

<style>
    .table{
        width: 400px;
        
    }
</style>


