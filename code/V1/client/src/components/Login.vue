<template>
  <div class="container">
    <!-- 头部区域 -->
    <div class="header">
      <img src="@/assets/admin/logo.png">
      <span>图书馆大数据展示系统</span>
    </div>
    <!-- 登录区域 -->
    <div class="loginArea">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"  placeholder="请输入用户名" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btn" @click="login()">登录</el-button>
    </div>
  </div>
</template> 

<script> 
  export default {
    data() {
      return {
        form:{
          username:'admin',  //用户名
          password:'123456',  //密码
        }
      }
    },
    created () {
      if(sessionStorage.getItem('adminInfo')){
        this.$router.push("/admin")
      };
    },
    methods: {
      //登录 
      login() {
        var url="users/login"
        var username=this.form.username
        var password=this.form.password
        var obj={username,password}
        // console.log(obj)
        this.axios.post(url,this.qs.stringify(obj))
        .then(res=>{
          // console.log(res)
          if(res.data.code==200){
            new Promise((resolve,reject)=>{
              sessionStorage.setItem("adminInfo",JSON.stringify(obj))  //保存用户信息 用于判断是否登录
              setTimeout(()=>{resolve()},0)
            }).then(()=>{
              this.$router.push("/admin") //登录成功后跳转到管理后台系统
              this.$message.success('登录成功')
            }).catch(err=>{
              this.$message.error('服务器出现错误')
            })
          }else{
            this.$message.error(`${res.data.data}`)
          }
        })
        .catch(err=>{
          this.$message.error('服务器出现错误')
        })
      }
    },
  }
</script>

<style scoped>
  .container{
    position: absolute;
    top: 0;
    bottom: 0;
    left:0;
    width: 100%; 
  }
  .header{
    width:100%;
    height: 5rem;
    line-height: 5rem;
    background: rgba(255, 255, 255, 1);
    border:1px solid rgba(121, 121, 121, 1);
    font-weight: bold;  
  }
  .header>img{
    display:block;
    float:left;
    margin-left: 1.25rem;
    margin-right: 1.25rem;      
  }
  .header>span{
    display:block;
    float:left;
    color: #00ac97;
    font-size:2.25rem;
  }
  .loginArea{
    position: absolute;
    margin-top:10rem;
    margin-left:50%;
    transform: translate(-50%) scale(1.3)
  }
  .loginArea .btn{
    position: absolute;
    width:140px;
    margin-left:50%;
    transform: translate(-50%)
  }
</style>