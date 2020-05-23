<template>
  <div class="content">
    <h2>通知公告</h2>

    <!-- 添加通告 -->
    <el-button type="primary" @click="addDialogVisible=true">添加通知公告</el-button>

    <!-- 通告列表 -->
    <el-table :data="noticeList" border stripe :header-cell-style="{background:'#409EFF',color:'white'}" :cell-style="{padding:'5px 0'}" class="notice_table">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="300" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否显示" width="100" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" @change="set(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button size="mini" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
          <!-- 查看按钮 -->
          <el-button size="mini" type="info" @click="query(scope.row)">查看</el-button>
          <!-- 删除按钮 -->
          <el-button size="mini" type="danger" @click="removeNoticeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total,sizes,prev,pager,next,jumper"
        :total="totalCount"
        :current-page="page"
        :page-sizes="[5,10,15,20]"
        :page-size="page_size"
      ></el-pagination> 
    </div>

    <!-- 【添加通告】对话框 -->
    <el-dialog title="通知公告" :visible.sync="addDialogVisible" style="width:1000" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" :inline="true">
        <el-form-item label="标题">
          <el-input v-model="addForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="通告内容" prop="content">
          <quill-editor v-model="addForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="addForm.display"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑通告" :visible.sync="editDialogVisible" style="width:1000;text-align:left" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" :inline="true" >
        <el-form-item label="标题" prop="notice_title">
          <el-input v-model="editForm.notice_title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="通告内容" prop="notice_content">
          <quill-editor v-model="editForm.notice_content" placeholder="请输入通告内容"></quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="edit()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看对话框 -->
    <el-dialog :title="queryForm.title" :visible.sync="queryDialogVisible" style="width:80%" center>
      <div v-html="queryForm.content"></div>
    </el-dialog>
    
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        noticeList:[],  //通告列表
        page: 1, //默认显示第一页
        page_size: 10, //默认每页显示3条
        totalCount: 0, //总条数
        addDialogVisible:false,  //添加 表单对话框默认关闭
        //【添加通告】表单
        addForm:{
          title:'',
          content:'',
          display:true
        }, 
        //【添加通告】表单验证规则对象
        addFormRules:{
          content:[{required:true,message:'请输入通知公告内容',trigger:'blur'}]
        },
        editDialogVisible:false, //编辑 表单对话框默认关闭
        editForm:{
          notice_id:'',
          notice_title:'',
          notice_content:''
        },
        editFormRules:{
          notice_title:[{required:true,message:'请输入标题',trigger:'blur'}],
          notice_content:[{required:true,message:'请输入通知公告内容',trigger:'blur'}]
        },
        queryDialogVisible:false, //查看 表单对话框默认关闭
        //【查看】表单
        queryForm:{
          title:'',
          content:''
        }
      }
    },
   
    mounted () {
      this.getNotice();
    },
    methods: {
      // 获取通告数据
      async getNotice() {
        var url="notice"
        var page=this.page
        var page_size=this.page_size
        var obj={page,page_size}
        // console.log(obj)
        const {data:res}=await this.axios.get(url,{params:obj})
        // console.log(res)
        if(res.code==200){
          this.totalCount=res.data.totalCount
          this.noticeList=res.data.list
        }else{
          this.$message.error('通知公告列表获取失败')
        }
      },
      handleCurrentChange(value) {
        this.page = value;
        // console.log(this.page)
        this.getNotice();
      },
      handleSizeChange(value) {
        this.page_size = value;
        // console.log(this.page_size)
        this.getNotice();
      },
      //监听【添加通告】对话框的关闭事件
      addDialogClosed(){
        this.addForm.title='',
        this.addForm.content='',
        this.addForm.display=false
      },
      //添加通告
      add(){ 
        this.$refs.addFormRef.validate(async valid=>{
          if(!valid) return
          var url="notice/add"
          // console.log(this.addForm)
          const { data:res } = await this.axios.post(url,this.addForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('通告添加成功')
            this.addDialogVisible = false
            this.getNotice();
          }else{
            this.$message.error(`${res.data}`)
          }
        })
      },
      //设置是否显示
      async set(row){
        var url="notice/display"
        var notice_id=row.id
        var display=row.enable
        var obj={notice_id,display}
        // console.log(obj)
        const {data:res}=await this.axios.post(url,obj)
        // console.log(res)
        if(res.code==200){
          this.$message.success('设置成功')
          this.getNotice();
        }else{
          row.enable = !row.enable
          this.$message.error(`${res.data}`) 
        }   
      },
      //监听【编辑】对话框的关闭事件
      editDialogClosed(){
        this.editForm.notice_title='',
        this.editForm.notice_content=''
      },
      //展示【编辑】对话框
      showEditDialog(row){
        this.editDialogVisible=true
        this.editForm.notice_id=row.id
        this.editForm.notice_title=row.title,
        this.editForm.notice_content=row.content
      },
      // 编辑
      edit(){
        this.$refs.editFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.editForm)
          var url="notice/edit"
          const { data:res } = await this.axios.post(url,this.editForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('编辑成功')
            this.editDialogVisible = false
            this.getNotice()
          }else{
            this.$message.error(`${res.data}`)
          }
        })
      },
      //查看
      query(row){
        this.queryDialogVisible=true
        this.queryForm.title=row.title
        this.queryForm.content=row.content
      },
      //根据id删除通告
      async removeNoticeById(id){
        //弹框确认是否删除数据
        const confirmResult = await this.$confirm('是否删除此通告','提示',
          {
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }
        ).catch(err=>err)
        //确认 => confirm   取消 => cancel
        // console.log(confirmResult)
        if(confirmResult!=='confirm') return this.$message.info('已取消删除')
        //发起删除请求
        var url="notice/delete"
        var notice_id=id
        var obj={notice_id}
        // console.log(obj)
        const {data:res}=await this.axios.post(url,obj)
        // console.log(res)
        if(res.code==200){
          this.$message.success('删除成功')
          this.getNotice();
        }else{
          this.$message.error(`${res.data}`)
        }
      },
    },
  }
</script>
<style>
  .content{
    font-size:16px
  }
  .notice_table{
    width:800px;
    min-width:750px;
  }
</style>

