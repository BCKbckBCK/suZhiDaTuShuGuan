<template>
    <!-- **********今日推荐********** -->
    <div class="today-recommend">
        <div class="title">今日推荐</div>
        <div class="content">
            <div class="left-content"> 
                <div class="subtitle">
                    <img src="@/assets/index/hot.png" width="2%"> {{leftName}}
                </div>
                <div class="leftbook">
                    <div class="book-information" v-for="(item,index) of leftbookList" :key="index" @click="show1(index)">
                        <div class="book-title">
                            <div class="book-name">《{{item.book_name}}》</div>
                            <div class="customize-download-count">总下载量：
                                <span>
                                    {{item.customize_download_count}}
                                </span>
                            </div>
                        </div>
                        <div class="easy-introduce" v-show="item.is_show!=1">
                            <div class="introduce-image">
                                <img :src="item.book_cover_url" width="100%">
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <div class="right-content"> 
                <div class="subtitle">
                    <img src="@/assets/index/electron.png"  width="2%"> {{rightName}}
                </div>
                <div class="leftbook">
                    <div class="book-information" v-for="(item,index) of rightbookList" :key="index" @click="show2(index)">
                        <div class="book-title">
                            <div class="book-name">《{{item.book_name}}》</div>
                            <div class="customize-download-count">总下载量：
                                <span>
                                    {{item.customize_download_count}}
                                </span>
                            </div>
                        </div>
                        <div class="easy-introduce" v-show="item.is_show!=1">
                            <div class="introduce-image">
                                <img :src="item.book_qrcode_url" width="100%">
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                leftbookList:[],  //热门图书的数据
                rightbookList:[],   //电子图书的数据
                leftName:"",  //热门图书标题
                rightName:""    //电子书
            };
        },
        mounted(){
            var url="today-recommend"
            this.axios.get(url)
            .then(res=>{
                //console.log(res)
                if(res.data.code==200){
                    this.leftbookList=res.data.data[0].list
                    this.leftName=res.data.data[0].name
                    this.rightbookList=res.data.data[1].list
                    this.rightName=res.data.data[1].name
                }  
            })
            .catch(err=>{
                console.log(err)
            })
        },
        methods:{
            show1(index){
                for(var i=0;i<this.leftbookList.length;i++){
                    if(i==index){
                        this.leftbookList[i].is_show=!this.leftbookList[i].is_show;
                    }else{
                        this.leftbookList[i].is_show=1;                
                    }
                }
            },
            show2(index){
                for(var i=0;i<this.rightbookList.length;i++){
                    if(i==index){
                        this.rightbookList[i].is_show=!this.rightbookList[i].is_show;
                    }else{
                        this.rightbookList[i].is_show=1;                
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .today-recommend{
        width:480rem;
        height:166rem;
        background:#f0f1f1;
        display: flex;
        flex-direction: column;
        border-radius: 20rem;
        overflow:hidden;
    }
    .title{
        text-align: center;
        font-weight: bold;
        font-size: 24rem;
        margin-top:2rem;
        margin-bottom:0rem;
    }
    .content{
        display:flex;
        height: 120rem;
    }
    .content .left-content{
        border-right:3rem solid #2e936a;
        flex:1;
      
    }
    .content .right-content{
        flex:1;
    }
    .subtitle{
        text-align: center;
        margin-bottom:16rem;
    }
    .book-information{
        border-bottom:1rem dotted #2e936a;
        margin-left:11rem;
        margin-right:11rem; 
        margin-top:0rem;
    }
    .book-title{
        display:flex;
        justify-content: space-between;  
        font-size: 1rem;
    } 
    .book-name{
        flex:1;
        font-size: 1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }  
    .customize-download-count{
        font-size: 1rem;
        margin-left:11rem;
    }
    .customize-download-count span{
        color:#FC7C47;
    }
    .easy-introduce{
        display:flex;
        padding-left:21rem;
        padding-right:21rem;
        justify-content: space-between;
        align-items: center;
    }
    .easy-introduce .introduce-image{
        width: 80rem;
        height: 82rem;
        margin-right: 80rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>