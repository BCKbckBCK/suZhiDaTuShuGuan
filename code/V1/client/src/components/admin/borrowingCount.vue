<template>
  <div class="content">
    <h2>借阅量数据</h2>
    <!--<timeSelectComponent></timeSelectComponent>
    <el-table :data="borrowingCount" style="width:500px;border:1px solid #000;margin-top:10px" show-summary>
      <el-table-column prop="time_value" label="时间段" width="200" align="center"></el-table-column>
      <el-table-column prop="book_borrow_count" label="借阅数" align="center"></el-table-column>
    </el-table>-->
    <span>时间类型</span>
    <el-select v-model="value1" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <br>
    <span style="margin-top:100px;">时间区间</span>
    <el-date-picker v-model="value2" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
    </el-date-picker>
    <br>
    <!--<span>显示数量</span>
    <el-input v-model="value3" placeholder="输入数量" style="width:100px;"></el-input>-->
    <br>
    <el-button type="primary" @click="set()">确定</el-button>
  </div>
</template>

<script>
  import timeSelectComponent from './category/timeSelect.vue'
  export default {
    data() {
      return {
        borrowingCount:[{time_value:'8:00-9:00',book_borrow_count:198},{time_value:'9:00-10:00',book_borrow_count:199}],
        value1:"",  //时间类型
        options: [{value:'hour',label:'hour'},{value:'day',label:'day'},{value:'week',label:'week'},{value:'month',label:'month'},{value:'year',label:'year'}], //时间类型下拉选项
        value2:'',  //时间区间值
        value3:'',  //显示数量
      }
    },
    components:{timeSelectComponent},
    methods: {
      //设置
      set() {
        var url="borrowing-count/set-type"
        var time_type=this.value1
        var time_value=this.value2[0]+'@'+this.value2[1]
        var display_count=this.value3
        var obj={time_type,time_value,display_count}
        // console.log(obj)
        this.axios.post(url,this.qs.stringify(obj))
        .then(res=>{
          // console.log(res)
          if(res.data.code==200){
            this.$message.success('设置成功')
          }else{
            this.$message.error('设置失败')
          }
        })
        .catch(err=>{
          this.$message.error('服务器发生错误')
        })
      }
    },
  }
</script>

<style scoped>
  .content{
    font-size:16px
  }
</style>
