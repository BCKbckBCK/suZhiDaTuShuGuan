<template>
  <!-- **********今日推荐********** -->
  <div class="content">
    <h2>今日推荐</h2>
    <!-- 切换按钮 -->
    <el-button-group>
      <el-button v-for="(item,index) of category" :key="index" class="btn" :class="[isActive == index?'active':'']" @click="clickCategory(index,item.id)">{{item.name}}</el-button>
    </el-button-group>
    <!-- 添加按钮 -->
    <el-button type="primary" class="add" @click="addDialogVisible=true">添加</el-button>
    
    <!-- 表格 -->
    <el-table :data="tableData" border stripe :header-cell-style="{background:'#409EFF',color:'white'}" :cell-style="{padding:'5px 0'}" class="recommend_table">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="book_name" label="书名" width="200" align="center"></el-table-column>
      <el-table-column prop="book_cover_url" label="封面" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.book_cover_url" height="50"/>
        </template>
      </el-table-column>
      <el-table-column prop="real_download_count" label="实际下载量" width="100" align="center"></el-table-column>
      <el-table-column prop="customize_download_count" label="展示下载量" width="100" align="center"></el-table-column>
      <el-table-column prop="time_to_market" label="上市日期" width="120" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 显示功能 -->
          <el-button v-if="scope.row.is_show=='0'" @click="show(scope.row.id)" size="mini" type="success">显示</el-button>
          <!-- 隐藏功能 -->
          <el-button v-else @click="hidden(scope.row.id)" size="mini" type="info">隐藏</el-button>
          <!-- 上移功能 -->
          <el-button @click="upmove(scope.$index,scope.row.id)" size="mini" icon="el-icon-top" v-if="scope.$index!=0" type="warning"></el-button>
          <!-- 下移功能 -->
          <el-button @click="downmove(scope.$index,scope.row.id)" size="mini" icon="el-icon-bottom" v-if="scope.$index!=currentLength-1" type="warning"></el-button>
          <!-- 编辑功能 -->
          <el-button @click="showEditDialog(scope.row)" size="mini" type="primary">编辑</el-button>
          <!-- 删除功能 -->
          <el-button @click="deleteBook(scope.row.id)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes,prev,pager,next,jumper" :total="totalCount" :current-page="page" :page-sizes="[5,10,15,20]" :page-size="page_size"></el-pagination>
    </div>

    <!-- 添加书籍的界面 -->
    <el-dialog title="添加图书" :visible.sync="addDialogVisible" style="width:80%" @close="addDialogClosed">
      <el-form :model="addForm" :inline="true" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="书籍编号" prop="book_id">
          <el-input v-model="addForm.book_id" placeholder="请输入书籍编号"></el-input>
        </el-form-item>
        <el-form-item label="书籍名称" prop="book_name">
          <el-input v-model="addForm.book_name" placeholder="请输入书籍名称"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="书籍封面图">
          <el-upload :limit="1" :action="serverUrl" list-type="picture-card" :file-list="addCoverImageList" :on-preview="handleAddCoverPreview" :on-remove="handleAddCoverRemove" :on-success="handleAddCoverSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog title="封面预览" :visible.sync="addCoverPreviewVisible" width="50%">
            <img width="100%" :src="addCoverPreviewPath"/>
          </el-dialog>
        </el-form-item>
        <br />
        <el-form-item label="书籍二维码">
          <el-upload :limit="1" :action="serverUrl" list-type="picture-card" :file-list="addQrcodeImageList" :on-preview="handleAddQrcodePreview" :on-remove="handleAddQrcodeRemove" :on-success="handleAddQrcodeSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog title="书籍二维码" :visible.sync="addQrcodePreviewVisible" width="50%">
            <img width="100%" :src="addQrcodePreviewPath"/>
          </el-dialog>
        </el-form-item>
        <br>
        <el-form-item label="自定义下载量" prop="customize_download_count">
          <el-input v-model="addForm.customize_download_count" type="number" placeholder="请输入下载量"></el-input>
        </el-form-item>
        <el-form-item label="真实下载量" prop="real_download_count">
          <el-input v-model="addForm.real_download_count" type="number" placeholder="请输入下载量"></el-input>
        </el-form-item>
        <el-form-item label="上市时间" prop="time_to_market">
          <el-date-picker v-model="addForm.time_to_market" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="书籍类型" prop="book_type"> 
          <el-select v-model="addForm.book_type" placeholder="请选择">
            <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 取消  确认 -->
      <div slot="footer">
        <el-button @click="addDialogVisible= false">取消</el-button>
        <el-button type="primary" @click="add()">确定</el-button>
      </div>
    </el-dialog>


    <!-- 编辑弹出界面 -->
    <el-dialog title="编辑" :visible.sync="editDialogVisible" style="width:80%" @close="editDialogClosed">
      <el-form :model="editForm" :inline="true" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="书籍名称" prop="book_name">
          <el-input v-model="editForm.book_name" placeholder="请输入书籍名称"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="书籍封面图">
          <el-upload :limit="1" :action="serverUrl" list-type="picture-card" :file-list="editCoverImageList" :on-remove="handleEditCoverRemove" :on-success="handleEditCoverSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog title="封面预览" :visible.sync="editCoverPreviewVisible" width="50%">
            <img width="100%" :src="editCoverPreviewPath"/>
          </el-dialog> -->
        </el-form-item> 
        <br />
        <el-form-item label="书籍二维码">
          <el-upload :limit="1" :action="serverUrl" list-type="picture-card" :file-list="editQrcodeImageList" :on-remove="handleEditQrcodeRemove" :on-success="handleEditQrcodeSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="editQrcodePreviewVisible" width="50%">
            <img width="100%" :src="editQrcodePreviewPath">
          </el-dialog> -->
        </el-form-item>
        <br>
        <el-form-item label="自定义下载量" prop="customize_download_count">
          <el-input v-model="editForm.customize_download_count" type="number" placeholder="请输入下载量"></el-input>
        </el-form-item>
        <el-form-item label="真实下载量" prop="real_download_count">
          <el-input v-model="editForm.real_download_count" type="number" placeholder="请输入下载量"></el-input>
        </el-form-item>
        <el-form-item label="上市时间" prop="time_to_market">
          <el-date-picker v-model="editForm.time_to_market" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 取消  确认 -->
      <div slot="footer">
        <el-button @click="editDialogVisible= false">取消</el-button>
        <el-button type="primary" @click="edit()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {toDate} from '@/filter/timeFilter.js'
export default {
  data() {
    return {
      category: [], //分类
      isActive: 0, //选中值
      book_type: "", //当前书籍类型id
      type: "", //默认选中的类型
      tableData: [], //当前列表数据
      page: 1, //默认显示第一页
      page_size: 5, //默认每页显示3条
      totalCount: 0, //总条数
      currentLength: 0, //当前页面数据条数  用于做上移下移设置
      serverUrl: "http://47.101.204.69:3000/upload/post-resource", //接收文件的服务器地址
      addDialogVisible: false, //添加 表单对话框默认关闭
      addForm: {
        book_id: "",  //书籍id
        book_name: "",  //书籍名称
        book_cover_url: "",  //书籍封面地址
        book_qrcode_url: "",  //二维码地址
        customize_download_count: "", //自定义下载量
        real_download_count: "",  //真实下载量
        time_to_market:'',  //上市时间
        book_type:'', //书籍类型
      },
      addFormRules:{
        book_id:[{required:true,message:'请输入书籍id',trigger:'blur'}],
        book_name:[{required:true,message:'请输入书籍名称',trigger:'blur'}],
        book_type:[{required:true,message:'请选择书籍类型',trigger:'change'}]
      },
      addCoverImageList: [], //【添加】封面上传的文件列表
      addCoverPreviewPath:'',  //【添加】封面预览地址
      addCoverPreviewVisible:false, //【添加】封面预览对话框默认关闭
      addQrcodeImageList: [], //【添加】二维码上传的文件列表
      addQrcodePreviewPath:'',  //【添加】封面预览地址
      addQrcodePreviewVisible:false, //【添加】封面预览对话框默认关闭
      editDialogVisible: false, //添加 表单对话框默认关闭
      editForm: {
        book_id:'',
        book_name:'',
        book_cover_url:'',  
        book_qrcode_url:'',  
        customize_download_count:'',
        real_download_count:'',
        time_to_market:'',  
        book_type:''
      },
      editFormRules:{
        book_name:[{required:true,message:'请输入书籍名称',trigger:'blur'}]
      },
      editCoverImageList: [], //【编辑】封面上传的文件列表
      // editCoverPreviewPath:'',  //【编辑】封面预览地址
      // editCoverPreviewVisible:false, //【编辑】封面预览对话框默认关闭
      editQrcodeImageList: [], //【编辑】二维码上传的文件列表
      // editQrcodePreviewPath:'',  //【编辑】封面预览地址
      // editQrcodePreviewVisible:false, //【编辑】封面预览对话框默认关闭
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    //获取分类
    async getCategory() {
      // this.serverUrl=`${this.apiUrl}upload/post-resource`
      var url = "today-recommend/types";
      const {data:res}=await this.axios.get(url)
      // console.log(res)
      if (res.code == 200) {
        this.category = res.data;
        this.book_type = this.category[0].id;
        this.getDataBycategoryId(this.book_type);
      } else {
        this.$message.error(`${res.data}`);
      }
      // console.log(this.book_type)
    },
    //点击分类
    clickCategory(index, book_type) {
      this.isActive = index;
      this.book_type = this.category[index].id;
      this.getDataBycategoryId(book_type);
      // console.log(this.book_type)
    },
    //点击分类获取数据
    async getDataBycategoryId(book_type) {
      var url = "today-recommend/all";
      var type = this.book_type;
      var page = this.page;
      var page_size = this.page_size;
      var obj = { type, page, page_size };
      // console.log(obj)
      const {data:res}=await this.axios.get(url, { params: obj })
      // console.log(res)
      if(res.code==200){
        this.tableData = res.data.list;
        this.totalCount = res.data.totalCount;
        this.currentLength = this.tableData.length;
      }else{
        this.$message.error(`${res.data}`)
      }   
    },
    //显示第几页数据
    handleCurrentChange(value) {
      this.page = value;
      this.getDataBycategoryId(this.book_type);
      // console.log(this.page)
    },
    //每页显示多少条数据
    handleSizeChange(value) {
      this.page_size = value;
      this.getDataBycategoryId(this.book_type);
      // console.log(this.page_size)
    },
    //监听【添加】对话框的关闭事件
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
      this.addCoverImageList=[]
      this.addQrcodeImageList=[]
    },
    // 处理【添加】封面上传成功
    handleAddCoverSuccess(res) {
      // console.log(res)
      if(res.code==200){
        this.addForm.book_cover_url=res.data
      }
    },
    // 处理【添加】封面预览效果
    handleAddCoverPreview(file) {
      // console.log(file)
      this.addCoverPreviewPath=file.response.data
      this.addCoverPreviewVisible = true
    },
    // 处理【添加】移除封面的操作
    handleAddCoverRemove(file, fileList) {
      // console.log(file, fileList)
      this.addForm.book_cover_url = ""
    },
    // 处理【添加】二维码上传成功
    handleAddQrcodeSuccess(res){
      // console.log(res)
      if(res.code==200){
        this.addForm.book_qrcode_url=res.data
      }
    },
    // 处理【添加】二维码预览效果
    handleAddQrcodePreview(file){
      // console.log(file)
      this.addQrcodePreviewPath=file.response.data
      this.addQrcodePreviewVisible = true
    },
    // 处理【添加】移除二维码的操作
    handleAddQrcodeRemove(file, fileList){
      // console.log(file, fileList)
      this.addForm.book_qrcode_url=""
    },
    // 添加
    add(){
      this.$refs.addFormRef.validate(async valid=>{
        if(!valid) return
        // console.log(this.addForm)
        var url="today-recommend/upload"
        const { data:res } = await this.axios.post(url,this.addForm)
        // console.log(res)
        if(res.code==200){
          this.$message.success('添加成功')
          this.addDialogVisible = false
          this.getCategory()
        }else{
          this.$message.error(`${res.data}`)
        }
      })
    },
    // 显示
    async show(id) {
      var url = "today-recommend/add";
      var book_id = id;
      var obj = { book_id };
      const {data:res}=await this.axios.post(url, obj)
      // console.log(res)
      if (res.code == 200) {
        this.$message.success("设置成功");
        this.getDataBycategoryId(this.book_type);
      } else {
        this.$message.error(`${res.data}`);
      }
    },
    // 隐藏
    async hidden(id) {
      var url = "today-recommend/delete";
      var book_id = id;
      var obj = { book_id };
      const {data:res}=await this.axios.post(url, obj)
      // console.log(res)
      if (res.code == 200) {
        this.$message.success("设置成功");
        this.getDataBycategoryId(this.book_type);
      } else {
        this.$message.error(`${res.data}`);
      }
    },
    // 上移
    async upmove(index, id) {
      var url = "today-recommend/sort"
      var book1_id = id
      var book2_id = this.tableData[index - 1].id //当前行的上一行id
      var obj = { book1_id, book2_id }
      // console.log(obj)
      const {data:res}=await this.axios.post(url, obj)
      // console.log(res)
      if (res.code == 200) {
        this.getDataBycategoryId(this.book_type)
      } else {
        this.$message.error(`${res.data}`)
      }   
    },
    // 下移
    async downmove(index,id) {
      var url = "today-recommend/sort"
      var book1_id = id;
      var book2_id = this.tableData[index + 1].id; //当前行的下一行id
      var obj = { book1_id, book2_id }
      // console.log(obj)
      const {data:res} =await this.axios.post(url, obj) 
      // console.log(res)
      if (res.code == 200) {
        this.getDataBycategoryId(this.book_type)
      } else {
        this.$message.error(`${res.data}`)
      } 
    },
    //显示【编辑】对话框
    showEditDialog(row){
      this.editDialogVisible = true
      this.editForm.book_id = row.id
      this.editForm.book_name=row.book_name
      let obj1={};obj1.url=row.book_cover_url
      this.editCoverImageList.push(obj1)
      this.editForm.book_cover_url=this.editCoverImageList[0].url
      let obj2=new Object();obj2.url=row.book_qrcode_url
      this.editQrcodeImageList.push(obj2)
      this.editForm.book_qrcode_url=this.editQrcodeImageList[0].url
      this.editForm.customize_download_count=row.customize_download_count
      this.editForm.real_download_count=row.real_download_count
      this.editForm.time_to_market=row.time_to_market
      this.editForm.book_type=this.book_type
    },
    //监听【编辑】对话框的关闭事件
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
      this.editCoverImageList=[]
      this.editQrcodeImageList=[]
    },
    // 处理【编辑】封面上传成功
    handleEditCoverSuccess(res) {
      // console.log(res)
      if(res.code==200){
        this.editForm.book_cover_url=res.data
      }
    },
    // 处理【编辑】封面预览效果
    // handleEditCoverPreview(file) {
    //   // console.log(file)
    //   this.editCoverPreviewPath=file.response.data
    //   this.editCoverPreviewVisible = true
    // },
    // 处理【编辑】移除封面的操作
    handleEditCoverRemove(file, fileList) {
      // console.log(file, fileList)
      this.editForm.book_cover_url = ""
    },
    // 处理【编辑】二维码上传成功
    handleEditQrcodeSuccess(res){
      // console.log(res)
      if(res.code==200){
        this.editForm.book_qrcode_url=res.data
      }
    },
    // 处理【编辑】二维码预览效果
    // handleEditQrcodePreview(file){
    //   // console.log(file)
    //   this.editQrcodePreviewPath=file.response.data
    //   this.editQrcodePreviewVisible = true
    // },
    // 处理【编辑】移除二维码的操作
    handleEditQrcodeRemove(file, fileList){
      // console.log(file, fileList)
      this.editForm.book_qrcode_url=""
    },
    //编辑
    edit(){
      this.$refs.editFormRef.validate(async valid=>{
        if(!valid) return
        // console.log(this.editForm)
        var url="today-recommend/update"
        const { data:res } = await this.axios.post(url,this.editForm)
        // console.log(res)
        if(res.code==200){
          this.$message.success('编辑成功')
          this.editDialogVisible = false
          this.getDataBycategoryId(this.book_type)
        }else{
          this.$message.error(`${res.data}`)
        }
      })
    },
    //删除 
    async deleteBook(id){
      //弹框确认是否删除数据
      const confirmResult = await this.$confirm('是否删除这条数据','提示',
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
      var url="today-recommend/force-delete"
      var book_id=id
      var obj={book_id}
      // console.log(obj)
      const {data:res}=await this.axios.post(url,obj)
      // console.log(res)
      if(res.code==200){
        this.$message.success('删除成功')
        this.getDataBycategoryId(this.book_type)
      }else{
        this.$message.error(`${res.data}`)
      }
    },
  }
};
</script>

<style scoped>
.content{
  font-size:16px
}
.recommend_table{
  width: 1100px;
  min-width: 1100px;
}
.btn {
  width: 9rem;
  height: 2.5rem;
  border: 1px solid #c3c3c3;
  border-radius: 0;
  color: #333;
  cursor: pointer;
}
.active {
  background-color: #00ac97;
  color: #fff;
}
.add {
  width: 8.75rem;
  height: 2.5rem;
  margin-left: 1rem;
}
</style>
