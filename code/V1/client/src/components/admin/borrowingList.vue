<template>
  <div class="content">
    <h2>图书借阅排行</h2>
    <!-- <timeSelectComponent v-on:selectDa="selectDa"></timeSelectComponent> -->
    <span>图书借阅排行显示数量：</span>
    <el-input v-model="count" placeholder="输入数量" style="width:100px"></el-input>
    <el-button type="primary" @click="set()">确定</el-button>
   <!-- <el-table :data="borrowingList" style="width:500px;border:1px solid #000;margin-top:10px">
      <el-table-column type="index" label="排行" width="100" align="center"></el-table-column>
      <el-table-column prop="book_name" label="书名" width="200" align="center"></el-table-column>
      <el-table-column prop="book_borrow_count" label="借阅数" align="center"></el-table-column>
    </el-table> -->
  </div>
</template>

<script>
  import {toDate} from '@/filter/timeFilter.js'
  // import timeSelectComponent from './category/timeSelect.vue'
  export default {
    data() {
      return {
        count: 10,  //默认显示10数量值
        borrowingList:[{book_name:'你好',book_borrow_count:'20'},{book_name:'你asd好',book_borrow_count:'220'}],
        timeValue:'',
      }
    },
    created () {
      this.timeValue=toDate(new Date())
      // console.log(this.timeValue)
    },
    methods: {
      //设置
      set(){
        var url="borrowing-list/set-show-count"
        var display_count=this.count
        var obj={display_count}
        // console.log(obj)
        this.axios.post(url,this.qs.stringify(obj))
        .then(res=>{
          // console.log(res)
          if(res.data.code==200){
            this.$message.success('设置成功')
          }else{
            this.$message.error(`${res.data.data}`)
          }
        })
        .catch(err=>{
          this.$message.error('服务器出现错误')
        })
      },
      // selectDa(e){
      //   let value=e.vlaue;
      //   let defaultValue=e.defaultValue
      //   if(value === ''){
      //     value=defaultValue
      //   }
      //   console.log(value)
      // },
    },
  }
</script>

<style scoped>
  .content{
    font-size:16px
  }
</style>
