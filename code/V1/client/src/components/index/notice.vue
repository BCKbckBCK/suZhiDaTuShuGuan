<template>
    <!-- **********通告********** -->
    <div class="notice-area">
        <el-carousel  height="367rem" trigger="click" direction="vertical" :interval="3000" arrow="always">
            <el-carousel-item v-for="(item,index) of noticeContent" :key="index" style="margin-left:50rempx;margin-right:50rem;">
                <div class="notice-title">{{item.title}}</div>  
                <div class="notice-detail" v-html="item.content"></div>
            </el-carousel-item>
        </el-carousel> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
                noticeContent:[]  //通告数据
            }
        },
        created(){
            var url='notice/enable'
            this.axios.get(url)
            .then(res=>{
                // console.log(res)
                if(res.data.code==200){
                    this.noticeContent=res.data.data
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .notice-area{
        width:300rem;
        height:367rem;
        background:#f0f1f1;
        border-radius:20rem;
       
        text-align:center;
    }
    .notice-title{
        color:#DA4943;
        font-weight:bold;
        font-size: 20rem;
        margin-left: 0px;
        padding-top:16rem;
        margin-bottom:26rem;
    }
    .notice-detail{
        text-align:left;
        margin-bottom:1rem;
        font-size: 10rem;
    }
   
</style>