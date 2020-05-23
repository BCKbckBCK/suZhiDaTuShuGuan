<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <div>
                <img src="@/assets/admin/logo.png">
                <span>图书馆大数据展示系统</span>
            </div>
            <div class="userinfo">
                <div class="userinfo-inner">
                    <span @click="logout()">注销</span>
                </div>
            </div>
        </el-col>
        <!-- 主体区域 -->
        <el-col :span="24" class="main">
            <aside>
                <!--导航菜单-->
                <el-menu class="el-menu-vertical-demo">
                    <el-menu-item v-for="(item,index) of menuData" :key="index" index="index" :class="[isActive == index?'active':'']" class="menu" @click="tab(index)">
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </el-menu>
            </aside>
            <section>
                <router-view></router-view>
            </section>
        </el-col>

    </el-row>
</template>

<script>
export default {
    data() {
        return {
            menuData: [
                {name:"管理员列表"},
                {name:"本馆风采"},
                {name:"今日推荐"},
                {name:"通知公告"},
                {name:"阅读之星"},
                {name:"图书借阅排行"},
                {name:"到馆人数统计"},
                {name:"借阅量数据"},
                {name:"角色权限"},
                {name:"操作日志"},
                {name:"系统访问日志"}
            ], //后台管理左边菜单
            isActive:0,  //接收菜单的下标,默认是第一个  用于判断激活哪一个菜单
        }
    },
    created () {
        this.$router.push({name:'管理员列表'})
    },
    methods: {
        tab(index){
            // console.log(index)
            this.isActive=index
            switch(this.isActive){
                case 0:
                    this.$router.push({name:'管理员列表'})
                    break;
                case 1:
                    this.$router.push({name:'本馆风采'})
                    break;
                case 2:
                    this.$router.push({name:'今日推荐'})    
                    break;
                case 3:
                    this.$router.push({name:'通知公告'})
                    break;
                case 4:
                    this.$router.push({name:'阅读之星'})                  
                    break;
                case 5:
                    this.$router.push({name:'图书借阅排行'})
                    break;
                case 6:
                    this.$router.push({name:'到馆人数统计'})
                    break;
                case 7:
                    this.$router.push({name:'借阅量数据'})
                    break;
                case 8:
                    this.$router.push({name:'角色权限'})
                    break;
                case 9:
                    this.$router.push({name:'操作日志'})
                    break;
                case 10:
                    this.$router.push({name:'系统访问日志'})
                    break;
            }
        },
        // 注销
        async logout(){
            var url="users/logout"
            const {data:res} = await this.axios.get(url)
            // console.log(res)
            if(res.code==200){
                sessionStorage.removeItem('adminInfo')
                this.$router.push({name:'登录页面'})
            }else{
                this.$message.error(`${res.data}`)
            }  
        }
    },
}
</script>


<style scoped>
    /* 网页样式 */
    .container{
        position: absolute;
        top: 0;
        bottom: 0;
        left:0;
        width: 100%; 
    }
    /* 顶部区域样式 */
    .header{
        width:100%;
        height: 5rem;
        line-height: 5rem;
        background: rgba(255, 255, 255, 1);
        border:1px solid rgba(121, 121, 121, 1);
        font-weight: bold;  
    }
    .header>div>img{
        display:block;
        float:left;
        margin-left: 1.25rem;
        margin-right: 1.25rem;      
    }
    .header>div>span{
        display:block;
        float:left;
        color: #00ac97;
        font-size:1.75rem;
    }
    .header .userinfo{
        text-align: right;
        padding-right:.5rem;
        float: right;
    }
    .header .userinfo .userinfo-inner{
        text-align:center;
    }
    .header .userinfo .userinfo-inner span{
        font-size: 1rem;
        color: #a1a1a1;
    }
    .header .userinfo .userinfo-inner img{
        width: 1.5rem;
    }
    /* 主体*/
    .main{
        display: flex;
        position: absolute;
        top: 5rem;
        bottom: 0;
        overflow: hidden;
        border-top: 1px solid white;
    }
    .el-menu{
        width:12.5rem;
        height: 100%;
        background-color:#00ac97;
    } 
    .menu{
        font-size: 1.25rem;
        font-weight: bold;
        color:#fff;
        border:1px solid #94cac3;
    }
    .active{
        color:#00ac97;
        background-color:#fff;
        border:0;
    }
    section{
        width:100%;
        padding-left:1rem;
        overflow: auto;
    }
</style>
    
