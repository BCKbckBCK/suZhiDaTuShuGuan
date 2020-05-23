<template>
  <div class="content">
    <!--<timeSelectComponent></timeSelectComponent>
    <el-table :data="libraryPeopleCount" style="width:500px;border:1px solid #000;margin-top:10px" show-summary>
      <el-table-column prop="time_value" label="时间段" width="200" align="center"></el-table-column>
      <el-table-column prop="count" label="到馆人数" align="center"></el-table-column>
    </el-table>-->
    <h2>到馆人数统计</h2>
    <span>开馆时间</span>
    <el-time-picker v-model="value1" :picker-options="{selectableRange: '0:0:00 - 23:59:59'}" placeholder="任意时间点">
    </el-time-picker>
    <span style="margin-left:20px;">闭馆时间</span>
    <el-time-picker v-model="value2" :picker-options="{selectableRange: '0:0:00 - 23:59:59'}" placeholder="任意时间点">
    </el-time-picker>
    <el-button type="primary" @click="set()">保存设置</el-button>
  </div>
</template>

<script>
  import timeSelectComponent from './category/timeSelect.vue'
  export default {
    data() {
      return {
        libraryPeopleCount:[{time_value:'8:00-9:00',count:150},{time_value:'9:00-10:00',count:166}],
        value1:'',
        value2:''
      }
    },
    components:{timeSelectComponent},
    methods: {
      //设置
      set() {
        var url="library-people-count/set-closed-time"
        var open_time=this.value1
        var close_time=this.value2
        var obj={open_time,close_time}
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
