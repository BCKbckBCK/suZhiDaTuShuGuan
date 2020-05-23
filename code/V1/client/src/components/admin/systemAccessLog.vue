<template>
  <div class="content">
    <h2>系统访问日志</h2>
    <el-table :data="logList" border stripe :header-cell-style="{background:'#409EFF',color:'white'}" :cell-style="{padding:'5px 0'}" class="system_table">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="ip" label="访问ip" align="center" width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="url" label="访问url" align="center" width="300px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="备注" align="center" width="350px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="created_time" label="访问时间" align="center"></el-table-column> -->
    </el-table>
    <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes,prev,pager,next,jumper" :total="totalCount" :current-page="page" :page-sizes="[5,10,15,20]" :page-size="page_size"></el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logList:[], //日志数据
        totalCount:0, //数据条数
        page:1, //默认显示第一页
        page_size:10, //默认每页显示10条
      }
    },
    created () {
      this.getLog();
    },
    methods: {
      // 获取操作日志内容
      async getLog() {
        var url="log/system"
        var page=this.page
        var page_size=this.page_size
        var obj={page,page_size}
        // console.log(obj)
        const {data:res} = await this.axios.get(url,{params:obj})      
        // console.log(res)
        if(res.code==200){
          this.logList=res.data.list
          this.totalCount=res.data.totalCount
        }  
      },
      //显示第几页数据
      handleCurrentChange(value) {
        this.page=value;
        this.getLog();
        // console.log(this.page)
      },
      //每页显示多少条数据
      handleSizeChange(value) {
        this.page_size=value;
        this.getLog()
        // console.log(this.page_size)
      },

    },
  }
</script>

<style scoped>
  .content{
    font-size:16px
  }
  .system_table{
    width:1000px;
    min-width:1000px;
  }
</style>
