<template>
  <div class="content">
    <h2>角色权限</h2>
    <!-- 添加角色按钮 -->
    <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
    
    <!-- 角色列表 -->
    <el-table :data="roleList" border stripe :header-cell-style="{background:'#409EFF',color:'white'}" :cell-style="{padding:'5px 0'}" class="role_table">
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="name" label="角色" align="center" width="200px"></el-table-column>
      <el-table-column label="权限" align="center">
        <template slot-scope="scope">
          <!-- 分配按钮 -->
          <el-button @click="showEditDialog(scope.row)" size="mini" type="warning">分配</el-button>
          <!-- 查看按钮 -->
          <el-button @click="query(scope.row)" size="mini" type="info">查看</el-button>
          <!-- 删除按钮 -->
          <el-button @click="deleteRole(scope.row.id)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色界面 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" style="width:80%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" :inline="true">
        <el-form-item label="角色名" prop="role_name">
          <el-input v-model="addForm.role_name" placeholder="请输入角色"></el-input>
        </el-form-item> 
        <el-form-item> 
          <el-col :span="3">&nbsp;&nbsp;权限</el-col>
          <el-col :span="21">
            <el-checkbox :indeterminate="isAddIndeterminate" v-model="checkAllAdd" @change="addAll">全选</el-checkbox>
            <el-checkbox-group v-model="addForm.permissions_ids" @change="addCheckedChange">
              <el-checkbox v-for="item in permissionList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限弹出框 -->
    <el-dialog title="分配权限" :visible.sync="editDialogVisible" style="width:80%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" :inline="true">
        <el-form-item prop="permissions_ids"> 
          <el-col :span="3">权限列表</el-col>
          <el-col :span="21">
            <el-checkbox :indeterminate="isEditIndeterminate" v-model="checkAllEdit" @change="editAll">全选</el-checkbox>
            <el-checkbox-group v-model="editForm.permissions_ids" @change="editCheckedChange">
              <el-checkbox v-for="item in permissionList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="edit()">确定</el-button>
      </span>
    </el-dialog>

    <!-- 查看弹出界面 -->
    <el-dialog title="该角色拥有权限" :visible.sync="queryDialogVisible" style="width:50%">
      <ul>
        <li v-for="(item,index) of queryForm.permissions_ids" :key="index">{{item.name}}</li>
      </ul>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        roleList:[],  //角色列表
        permissionList:[],    //权限列表
        permissionIdList:[],  //权限的所有id
        addDialogVisible:false,  //添加 表单对话框默认关闭
        addForm:{
          role_name:'', //角色名称
          permissions_ids:[], //选中的权限
        },
        addFormRules:{
          role_name:[{required:true,message:'请输入角色',trigger:'blur'}]
        },
        isAddIndeterminate:false, //添加的全选不确定性
        checkAllAdd:false,  //添加 默认不全选
        editDialogVisible:false,  //分配 表单对话框默认关闭    
        editForm:{
          role_id:'', //角色id
          permissions_ids:[], //选中的权限
        },  
        editFormRules:{
          permissions_ids:[{type:'array',required:true,message:'请至少选择一个权限',trigger:'change'}]
        },   
        isEditIndeterminate:false, //分配的全选不确定性
        checkAllEdit:false,  //分配 默认不全选
        queryDialogVisible:false, //查看 表单对话框默认关闭
        queryForm:{
          permissions_ids:[]
        },
      }
    },
    mounted () {
      this.getRole();
      this.getPermissions()
    },
    methods: {
      // 获取角色
      async getRole() {
        var url="permissions/roles_list"
        const {data:res}=await this.axios.get(url)
        // console.log(res)
        if(res.code==200){
          this.roleList=res.data
        }else{
          this.$message.error('数据获取失败！')
        }
      },
      //获取全部权限
      async getPermissions(){
        var url="permissions/permissions_list"
        const {data:res}=await this.axios.get(url)
        // console.log(res)
        if(res.code==200){
          this.permissionList=res.data
          this.permissionList.forEach(item=>{
            this.permissionIdList.push(item.id)
          })
        }else{
          this.$message.error('数据获取失败！')
        }
        // console.log(this.permissionIdList)
      },
      //监听【添加】对话框的关闭事件
      addDialogClosed(){
        this.addForm.role_name=''
        this.addForm.permissions_ids=[]
        this.isAddIndeterminate=false
        this.checkAllAdd=false
      },
      //监听【添加-全选】状态
      addAll(val){
        this.addForm.permissions_ids = val ? this.permissionIdList : [];
        this.isAddIndeterminate = false;
      },
      //监听【添加-多选】
      addCheckedChange(value){
        let checkedCount = value.length;
        this.checkAllAdd = checkedCount === this.permissionList.length;
        this.isAddIndeterminate = checkedCount > 0 && checkedCount < this.permissionList.length;
      },
      // 添加角色
      add(){  
        this.$refs.addFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.addForm)
          var url="permissions/add_role"
          const { data:res } = await this.axios.post(url,this.addForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('添加成功')
            this.addDialogVisible = false
            this.getRole();
          }else{
            this.$message.error(`${res.data}`)
          }
        })
      },
      //显示【分配】对话框
      async showEditDialog(row){
        this.editForm.role_id=row.id
        var url='permissions/role_has_permissions'
        var role_id=row.id
        var obj={role_id}
        const {data:res} =await this.axios.get(url,{params:obj})
        // console.log(res) 
        if(res.code==200){
          res.data.forEach(item=>{
            this.editForm.permissions_ids.push(item.id)
          })
          this.editDialogVisible=true
        }else{
          this.$message.error('数据获取失败！')
        }
      },
      //监听【分配】对话框的关闭事件
      editDialogClosed(){
        this.editForm.permissions_ids=[]
        this.isEditIndeterminate=false
        this.checkAllEdit=false
      },
      //监听【分配-全选】状态
      editAll(val){
        this.editForm.permissions_ids = val ? this.permissionIdList : [];
        this.isEditIndeterminate = false;
      },
      //监听【分配-多选】
      editCheckedChange(value){
        let checkedCount = value.length;
        this.checkAllEdit = checkedCount === this.permissionList.length;
        this.isEditIndeterminate = checkedCount > 0 && checkedCount < this.permissionList.length;
      },
      //分配角色的权限
      edit(){
        this.$refs.editFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.editForm)
          var url="permissions/sync_permission_to_role"
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
      //查看
      async query(row){
        var url='permissions/role_has_permissions'
        var role_id=row.id
        var obj={role_id}
        // console.log(obj)
        const {data:res} =await this.axios.get(url,{params:obj})
        // console.log(res) 
        if(res.code==200){
          this.queryForm.permissions_ids=res.data 
          this.queryDialogVisible=true
        }else{
          this.$message.error('数据获取失败！')
        }
      },
      //根据id删除角色
      async deleteRole(id){
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
        var url="permissions/delete_role"
        var role_id=id
        var obj={role_id}
        // console.log(obj)  
        const {data:res} =await this.axios.post(url,obj)
        // console.log(res)
        if(res.code==200){
          this.$message.success('删除成功')
          this.getRole();
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
  .role_table{
    width:500px;
    min-width:500px;
  }
  ul{
    text-align:left
  }
</style>