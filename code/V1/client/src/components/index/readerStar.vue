<template>
    <!-- **********阅读之星********** -->
    <div>
        <div class="reading-area">
            <div class="left-text">
                阅读之星
            </div>
            <div class="center-area" >
                <div class="title">
                    <div>排名</div>
                    <div>姓名</div>
                    <div>借阅量</div>
                </div>
                <ul> 
                    <li v-for="(item,index) of rankList" :key="index" class="rankList">
                        <div class="rank">
                            <!-- <span v-if="index==0"><img src="@/assets/index/first.png"></span>
                            <span v-if="index==1"><img src="@/assets/index/second.png"></span>
                            <span v-if="index==2"><img src="@/assets/index/third.png"></span> -->
                           No.{{++index | numberFilter}}
                        </div>
                        <div>{{item.borrow_name}}</div>
                        <div>{{item.borrower_number}}</div>
                    </li>
                </ul>
            </div>
            <div class="right-button">
                <el-button class="btn">借阅数量</el-button>
            </div>
        </div> 
    </div>
</template>

<script>
    import{toNumber} from '@/filter/numberFilter.js'
    export default {
        data() {
            return {
                rankList: [],
            }
        },
        filters:{  //过滤数字   例如：1→01
            numberFilter(number){
                return toNumber(number)
            }
        }, 
        mounted(){
            this.getData()
        },
        methods: {
            getData(){
                var url="reader-star/borrower-count"
                this.axios.get(url)
                .then(res=>{
                    // console.log(res)
                    if(res.data.code==200){
                        this.rankList=res.data.data
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
           
        },
    }
</script>

<style scoped>
    .reading-area{
        width:442rem;
        height:200rem;
        background:#f0f1f1;
        display: flex;
        border-radius: 20rem;
        padding:10rem 12rem;
        box-sizing: border-box;
        margin-left: -2rem;
    }
    .left-text{
        display:flex;
        align-items: center;
        justify-content: center;
        color:#2e936a;
        font-size: 30rem;
        font-weight: bold;
        margin-right:29rem;
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
    }
    .center-area{
        width:100%;
        clear:both;
        padding-top:6rem;
    }
    .title{
        width:100%;
        display:flex;
        flex-wrap: nowrap;
        color:#FC7C47;
        font-size: 15rem;
    }
    .title div{
        flex:1;
        text-align: center
    }
    ul{
        padding-left:0
    }
    .rankList{
        width:100%;
        flex-wrap: nowrap;
        display: flex;
        height: 14rem;
        font-size: 2.5rem;
    }
    .rankList div{
        flex:1;
        text-align: center;
        border-bottom:3rem dotted #a5e7cd;
    }
    .rank{
        display:flex;
        justify-content: center;
    }
    /* .rank span{
        margin-left:-20px;
    } */
    .right-button{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size:5rem;
    }
    .btn{
        background:#8ee2c1;
        border-radius: 0;
        color:#fff;
        width:100rem;
        font-size:14rem;
    }  
</style>