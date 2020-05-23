<template>
  <div class="content">
    <h2>管理员列表</h2>
    <!-- 添加用户按钮 -->
    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
    
    <!-- 管理员列表 -->
    <el-table :data="adminInfo" border stripe :header-cell-style="{background:'#409EFF',color:'white'}" :cell-style="{padding:'5px 0'}" class="user_table">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="140" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 重置按钮 -->
          <el-button @click="showResetDialog(scope.row)" size="mini" type="primary">重置</el-button>
          <!-- 分配角色按钮 -->
          <el-button @click="showEditDialog(scope.row)" size="mini" type="warning">分配</el-button>
          <!-- 查看角色按钮 -->
          <el-button @click="query(scope.row)" size="mini" type="info">查看</el-button>
          <!-- 删除按钮 -->
          <el-button @click="deleteUser(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 【添加】对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" style="width:80%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" :inline="true" ref="addFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password" type="password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="add()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 【重置】对话框 -->
    <el-dialog title="重置密码" :visible.sync="resetDialogVisible" style="width:80%" @close="resetDialogClosed">
      <el-form :model="resetForm" :inline="true" :rules="resetFormRules" ref="resetFormRef">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="resetForm.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="resetDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="resetPassword()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 【分配】对话框-->
    <el-dialog title="分配角色" :visible.sync="editDialogVisible" style="width:80%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" :inline="true">
        <el-form-item prop="roles_ids"> 
          <el-col :span="3">角色列表</el-col>
          <el-col :span="21">
            <el-checkbox :indeterminate="isEditIndeterminate" v-model="checkAllEdit" @change="editAll">全选</el-checkbox>
            <el-checkbox-group v-model="editForm.roles_ids" @change="editCheckedChange">
              <el-checkbox v-for="item in roleList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="edit()">确定</el-button>
      </span>
    </el-dialog>

    <!-- 【查看】对话框 -->
    <el-dialog title="该用户拥有角色" :visible.sync="queryDialogVisible" style="width:50%">
      <ul>
        <li v-for="(item,index) of queryForm.roles_ids" :key="index">{{item.name}}</li>
      </ul>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        adminInfo: [],  //管理员信息
        roleList:[], //角色列表
        roleIdList:[], //角色的所有id
        addDialogVisible:false,  //添加 表单对话框默认关闭
        addForm:{
          username:'',
          password:'',
        },
        addFormRules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'},
            {min:3,max:10,message:'长度在3-10个字符',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            {min:6,max:16,message:'长度在6-16个字符',trigger:'blur'}
          ]
        },
        resetDialogVisible:false,  //重置 表单对话框默认关闭
        resetForm:{
          user_id:'',
          password:'',
        },
        resetFormRules:{
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            {min:6,max:16,message:'长度在6-16个字符',trigger:'blur'}
          ]
        },
        editDialogVisible:false,  //分配 表单对话框默认关闭
        editForm:{
          user_id:'',
          roles_ids:[]
        },
        editFormRules:{
          roles_ids:[{type:'array',required:true,message:'请至少选择一个角色',trigger:'change'}]
        }, 
        isEditIndeterminate:false, //分配的全选不确定性
        checkAllEdit:false,  //分配 默认不全选
        queryDialogVisible:false, //查看  表单对话框默认关闭
        queryForm:{
          roles_ids:[]
        },
      }
    },
    mounted () {
      this.getAdminInfo();
      this.getRole()
    },
    methods: {
      //获取管理员列表信息
      async getAdminInfo() {
        var url="users"
        const {data:res}=await this.axios.get(url)
        // console.log(res)
        if(res.code==200){
          this.adminInfo=res.data
        }else{
          this.$message.error('数据获取失败！')
        }
     
      },
       //获取所有的角色
      async getRole(){
        var url="permissions/roles_list"
        const {data:res} =await this.axios.get(url)
        // console.log(res) 
        if(res.code==200){
          this.roleList=res.data
          this.roleList.forEach(item=>{
            this.roleIdList.push(item.id)
          })
        }else{
          this.$message.error('数据获取失败！')
        }
      },
      //监听【添加】对话框的关闭事件
      addDialogClosed(){
        this.$refs.addFormRef.resetFields()
      },
      //添加管理员账号
      add(){
        this.$refs.addFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.addForm)
          var url="users/add"
          const { data:res } = await this.axios.post(url,this.addForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('添加成功')
            this.addDialogVisible = false
            this.getAdminInfo()
          }else{
            this.$message.error(`${res.data}`)
          }
        }) 
      },
      //显示【重置】对话框
      showResetDialog(row){
        this.resetDialogVisible = true
        this.resetForm.user_id=row.id
      },
      //监听【重置】对话框的关闭事件
      resetDialogClosed(){
        this.resetForm.password=""
      },
      //重置密码
      resetPassword(){
        this.$refs.resetFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.resetForm)
          var url="users/reset_password" 
          const { data:res } = await this.axios.post(url,this.resetForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('密码已重置')
            this.resetDialogVisible = false
            this.getAdminInfo()
          }else{
            this.$message.error(`${res.data}`)
          }
        })
      },
      //显示【分配】对话框
      async showEditDialog(row){
        this.editForm.user_id=row.id
        var url='permissions/user_has_roles'
        var user_id=row.id
        var obj={user_id}
        // console.log(obj)
        const {data:res} =await this.axios.get(url,{params:obj})
        // console.log(res)
        if(res.code==200){
          res.data.forEach(item=>{
            this.editForm.roles_ids.push(item.id)
          })
          this.editDialogVisible = true
        }else{
          this.$message.error('数据获取失败！')
        }
      },
      //监听【分配】对话框的关闭事件
      editDialogClosed(){
        this.editForm.roles_ids=[]
        this.isEditIndeterminate=false
        this.checkAllEdit=false
      },
       //监听【分配-全选】状态
      editAll(val){
        this.editForm.roles_ids = val ? this.roleIdList : [];
        this.isEditIndeterminate = false;
      },
      //监听【分配-多选】
      editCheckedChange(value){
        let checkedCount = value.length;
        this.checkAllEdit = checkedCount === this.roleList.length;
        this.isEditIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length;
      },
      //分配用户的角色
      edit(){
        this.$refs.editFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.editForm)
          var url="permissions/sync_role_to_user"
          const { data:res } = await this.axios.post(url,this.editForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('分配成功')
            this.editDialogVisible=false
          }else{
            this.$message.error(`${res.data}`)
          }
        }) 
      },
      //查看角色
      async query(row){
        var url='permissions/user_has_roles'
        var user_id=row.id
        var obj={user_id}
        // console.log(obj)
        const {data:res} =await this.axios.get(url,{params:obj})
        // console.log(res)
        if(res.code==200){
          this.queryForm.roles_ids=res.data
          this.queryDialogVisible=true
        }else{
          this.$message.error('数据获取失败！')
        }
      },
      //根据id删除
      async deleteUser(row){
        //弹框确认是否删除数据
        const confirmResult = await this.$confirm('是否删除此角色','提示',
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
        var url="users/delete"
        var user_id=row.id 
        var obj={user_id}
        const {data:res} =await this.axios.post(url,obj)
        // console.log(res)
        if(res.code==200){
          this.$message.success('删除成功')
          this.getAdminInfo();
        }else{
          this.$message.error(`${res.data}`)
        }
      },
    },
  }
</script>
<style scoped>
  .content{
    font-size:16px
  }
  .user_table{
    width:600px;
    min-width:600px;
  }
  ul{
    text-align:left
  }
</style>