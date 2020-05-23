<template>
    <!-- **********本馆风采展示********** -->
    <div class="carousel-area">
        <div class="left-text">
            本馆风采展示
        </div>
        <div class="right-carousel">
            <el-carousel :interval="3000" arrow="always">
                <el-carousel-item v-for="(item,index) of bannerArray" :key="index">
                    <video v-if="item.source_type == 'video'" width="100%" :src="item.source_url" controls='controls' muted="muted" loop="loop" autoPlay="autoPlay"></video>
                    <img class="img1"  v-else :src="item.source_url" width="100%"> 
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bannerArray: [],  //轮播图数据
            }
        },
        created(){
            this.getData()
        },
        methods: {
            async getData() {
                var url="about-library"
                const { data:res }= await this.axios.get(url)
                // console.log(res)
                if(res.code==200){
                    this.bannerArray=res.data
                }else{
                    this.$message.error('数据获取失败！')
                }
            }
        },
    }
</script>
<style>
    .right-carousel .el-carousel__container{
        height:200rem;
        border-radius: 20rem;
    }
</style>
<style scoped>

    .carousel-area{
        width:795rem;
        height:200rem;
        background:#f0f1f1;
        display: flex;
        border-radius:20rem;
    } 
    .left-text{
        display:flex;
        align-items: center;
        justify-content: center;
        color:#2e936a;
        font-size:30rem;
        font-family:Source Han Sans CN;
        font-weight: bold;
        margin-left:71rem;
        margin-right:92remx;
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
    }
    .right-carousel{
        width:100%;
        overflow: hidden;
    }
    .right-carousel video{
        height:200rem;
        border-top-right-radius:20rem;
        border-bottom-right-radius:20rem;
    }
    .right-carousel img{
        height:200rem;
        border-top-right-radius:20rem;
      border-bottom-right-radius:20rem;
    }  
</style>