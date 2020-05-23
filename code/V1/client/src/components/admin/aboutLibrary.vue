<template>
  <div class="content">
    <h2>本馆风采</h2>
    <!-- 上传按钮 -->
    <el-button type="primary" @click="addDialogVisible=true">上传资源</el-button>
    
    <!-- 资源列表 -->
    <el-table :data="bannerArray" border stripe :header-cell-style="{background:'#409EFF',color:'white'}" :cell-style="{padding:'5px 0'}" class="library_table">
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="source_type" label="类型" width="100" align="center"></el-table-column>
      <el-table-column prop="source_url" label="预览" width="140" align="center" >
        <template slot-scope="scope">
          <img v-if="scope.row.source_type=='图片'" :src="scope.row.source_url" height="80">
          <video v-else :src="scope.row.source_url" controls='controls' height="80"></video>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" @change="set(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="最后修改人" width="100" align="center"></el-table-column>
      <el-table-column prop="updated_at" label="最后修改时间" width="200" align="center"></el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button @click="showEditDialog(scope.row)" size="mini" type="primary">编辑</el-button>
          <!-- 删除按钮 -->
          <el-button @click="deleteBanner(scope.row.id)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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

    <!-- 上传资源弹出界面 -->
    <el-dialog title="上传展示资源" :visible.sync="addDialogVisible" style="width:80%" center @close="addDialogClosed">
      <el-form :model="addForm" :inline="true" :rules="addFormRules" ref="addFormRef"  label-width="100px">
        <el-form-item label="资源类型"  prop="resource_type">
          <el-select v-model="addForm.resource_type" placeholder="请选择资源类型" @change="selectType()"> 
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="资源地址" prop="resource_url">
          <el-upload :limit="1" :action="serverUrl" list-type="picture-card" :file-list="addResource_list" :on-preview="handleAddPreview" :on-remove="handleAddRemove" :on-success="handleAddSuccess" :disabled="isDisabled">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog title="文件预览" :visible.sync="addPreviewVisible" width="50%">
            <img v-if="previewResourceType=='picture'" width="100%" :src="addPreviewPath">
            <video v-else width="100%" :src="addPreviewPath"></video>
          </el-dialog>  
        </el-form-item>
        <br>
        <el-form-item label="建议尺寸:">
          <span>1000*300</span>
        </el-form-item> 
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹出界面 -->
    <el-dialog title="上传展示资源" :visible.sync="editDialogVisible" style="width:80%" center @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" :inline="true" label-width="100px">
        <el-form-item label="资源地址" prop="resource_url">
          <el-upload :limit="1" :action="serverUrl" list-type="picture-card" :file-list="editResource_list" :on-remove="handleEditRemove" :on-success="handleEditSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="editPreviewVisible" width="50%">
            <img v-if="editForm.resource_type=='picture'" width="100%" :src="editPreviewPath">
            <video v-else width="100%" :src="editPreviewPath"></video>
          </el-dialog>   -->
        </el-form-item>
        <br>
        <el-form-item label="建议尺寸:">
          <span>1000*300</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="edit()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        bannerArray:[],//轮播图
        page: 1, //默认显示第一页
        page_size: 5, //默认每页显示10条
        totalCount: 0, //总条数
        serverUrl:"http://47.101.204.69:3000/upload/post-resource", //接收文件的服务器地址
        typeOptions:[
          {value:'picture',label: 'picture'},
          {value:'video',label: 'video'}
        ],  //资源类型选项
        previewResourceType:'', //预览的文件类型
        addDialogVisible:false,  //添加 弹出界面的默认状态
        addForm:{
          resource_type:'', //资源类型值
          resource_url:'',  //资源地址
        },
        addFormRules:{
          resource_type:[{required:true,message:'请选择资源类型',trigger:'change'}],
          resource_url:[{required:true,message:'请上传文件',trigger:'change'}]
        },
        addResource_list:[],   //【添加】文件上传的文件列表
        isDisabled:true,  //【添加】文件上传默认禁止
        addPreviewPath:'',  //【添加】文件预览地址
        addPreviewVisible:false, //【添加】文件预览对话框默认关闭  
        editDialogVisible:false,  //编辑 对话框默认状态
        editForm:{
          resource_id:'', //此条数据的id
          resource_url:'', //资源地址
          resource_type:''
        },
        editFormRules:{
          resource_url:[{required:true,message:'请上传文件',trigger:'change'}]
        },
        editResource_list:[],   //【编辑】文件上传的文件列表
        // editPreviewPath:'',  //【编辑】文件预览地址
        // editPreviewVisible:false, //【编辑】文件预览对话框默认关闭 
      }
    },
    created () {
      this.getBanner();
    },
    methods: {
      //获取本馆风采的详情列表
      async getBanner() {
        var url="about-library/all"
        var page=this.page
        var page_size=this.page_size
        var obj={page,page_size}
        // console.log(obj)
        const {data:res}=await this.axios.get(url,{params:obj})
        // console.log(res)
        if(res.code==200){
          this.bannerArray=res.data.list 
          this.totalCount=res.data.totalCount
          this.bannerArray.forEach(item=>{
            if(item.source_type==="video"){
              item.source_type="视频"
            }else if(item.source_type==="picture"){
              item.source_type="图片"
            }
          }) 
        }else{
          this.$message.error('数据获取失败！')
        }
      },
      handleCurrentChange(value) {
        this.page = value;
        this.getBanner();
      },
      handleSizeChange(value) {
        this.page_size = value;
        this.getBanner();
      },
      //设置是否显示
      async set(row){
        var url="about-library/set-resource"
        var resource_id=row.id
        var enable=row.enable
        var obj={resource_id,enable}
        // console.log(obj)
        const {data:res}=await this.axios.post(url,obj)
        // console.log(res)
        if(res.code==200){
          this.$message.success('设置成功')
          this.getBanner();
        }else{
          row.enable = !row.enable
          this.$message.error(`${res.data}`)
        }
      },
      //监听【文件类型】
      selectType(){
        // console.log(this.addForm.resource_type)
        this.previewResourceType=this.addForm.resource_type
        if(this.previewResourceType){
          this.isDisabled=false
        }
      },
      //监听【添加】对话框的关闭事件
      addDialogClosed(){
        this.addForm.resource_type=""
        this.addResource_list=[]
      },
      // 处理【添加】上传成功
      handleAddSuccess(res){
        console.log(res)
        if(res.code==200){
          this.addForm.resource_url=res.data
        }
      },
      // 处理【添加】预览效果
      handleAddPreview(file) {
        // console.log(file)
        this.addPreviewPath=file.response.data
        this.addPreviewVisible = true
      },
      // 处理【添加】移除的操作
      handleAddRemove(file, fileList) {
        // console.log(file, fileList)
        this.addForm.resource_url = ""
      },
      //添加
      add(){
        this.$refs.addFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.addForm)
          var url="about-library/post-resource"
          const { data:res } = await this.axios.post(url, this.addForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('添加成功')
            this.addDialogVisible = false
            this.getBanner()
          }else{
            this.$message.error(`${res.data}`)
          }
        })
      },
      //显示【编辑】对话框
      showEditDialog(row){
        this.editDialogVisible=true
        this.editForm.resource_id=row.id
        let obj={};obj.url=row.source_url
        this.editResource_list.push(obj)
        this.editForm.resource_type=row.source_type
      },
      //监听【编辑】对话框的关闭事件
      editDialogClosed(){
        this.editResource_list=[]
      },
      // 处理【编辑】上传成功
      handleEditSuccess(res){
        // console.log(res)
        if(res.code==200){
          this.editForm.resource_url=res.data
        }
      },
      // 处理【编辑】预览效果
      // handleEditPreview(file) {
      //   console.log(file)
      //   this.editPreviewPath=file.response.data
      //   this.editPreviewVisible = true
      // },
      // 处理【编辑】移除的操作
      handleEditRemove(file, fileList) {
        // console.log(file, fileList)
        this.editForm.resource_url = ""
      },
      //编辑
      edit(){
        this.$refs.editFormRef.validate(async valid=>{
          if(!valid) return
          // console.log(this.editForm)
          var url="about-library/update-resource"
          const { data:res } = await this.axios.post(url,this.editForm)
          // console.log(res)
          if(res.code==200){
            this.$message.success('编辑成功')
            this.editDialogVisible = false
            this.getBanner()
          }else{
            this.$message.error(`${res.data}`)
          }
        })
      },
      //删除
      async deleteBanner(id){
        //弹框确认是否删除数据
        const confirmResult = await this.$confirm('是否删除此数据','提示',
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
        var url="about-library/delete-resource"
        var resource_id=id
        var obj={resource_id}
        // console.log(obj)
        const {data:res}=await this.axios.post(url,obj)
        // console.log(res)
          if(res.code==200){
            this.$message.success('删除成功')
            this.getBanner();
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
  .library_table{
    width:900px;
    min-width:900px;
  }
</style>
