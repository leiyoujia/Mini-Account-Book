<template>
<div>
    <div>mini-account</div>

    <a-button @click='category'>查看数据</a-button>

    <v-table
        :columns = 'columns'
        :table-data = 'billArr'
        :show-vertical-border = 'false'>
    </v-table>
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
            {field: 'type', title: 'type', width: 100},
            {field: 'time', title: 'time', width: 100},
            {field: 'category', title: 'category', width: 100},
            {field: 'amount', title: 'amount', width: 100}
        ],
    }),
    created() {
        axios.all([this.data(), this.category()])
            .then(axios.spread((bills, categories) => {
                this.show(bills,categories)
            }));
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
                        rowArray[0] = 1
                    }else{
                        rowArray[0] = 0
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
                    month: rowArray[4]
                }
            });
            that.billArr.shift();
            console.log('billArr: ',this.billArr)
        }
    },
    formatDate(date){
        const localDate = new Date(parseInt(date));
        return localDate.toLocaleDateString();
    },
    replaceCate(id){
        return this.billCategory.find(item=>item.id === id)
    },
}
</script>
