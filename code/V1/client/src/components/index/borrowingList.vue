<template>
  <!-- **********图书借阅排行展示********** -->
  <div class="rank-area">
    <!-- 左边区域 -->
    <div class="left-area">
      <div class="title" v-if="isActive==0">图书借阅排行展示（本周）</div>
      <div class="title" v-if="isActive==1">图书借阅排行展示（本月）</div>
      <div class="title" v-if="isActive==2">图书借阅排行展示（本年）</div>
      <div class="sub-title">
        <div>书籍名称</div>
        <div class="count">借阅量</div>
      </div>
      <div v-for="(item,index) of rankList" :key="index" class="rank-detail">
        <div>{{item.book_name}}</div>
        <div>{{item.book_borrow_count}}</div>
      </div>
    </div>
    <!-- 右边分类按钮 -->
    <div class="right-button">
      <el-button
        v-for="(item,index) of category"
        :key="index"
        :class="[isActive == index?'active':'']"
        @click="getData(index)"
        class="btn"
      >{{item}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rankList: [], //数据内容
      category: ["本周", "本月", "本年"],
      isActive: 0,
    };
  },
  mounted() {
    this.getData(1)
  },
  methods: {
    //根据激活的按钮获取相应的数据
    getData(index) {
      this.isActive = index;
      var url="borrowing-list"
      if(index==0){
        var obj={show_type:'week'}
        this.isActive=0
      }
      if(index==1){
        var obj={show_type:'month'}
        this.isActive=1
      }
      if(index==2){
        var obj={show_type:'year'}
        this.isActive=2
      }
      this.axios.get(url,{params:obj})
      .then(res=>{
        //console.log(res)
        if(res.data.code==200){
          this.rankList=res.data.data
          //console.log(this.rankList)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
    
  }
};
</script>

<style scoped>
.rank-area {
  width:480rem;
  height:190rem;
  background: #f0f1f1;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-radius: 20rem;
  padding: 21rem 16rem;
  box-sizing: border-box;
  overflow: hidden;
}
.left-area {
  width: 90%;
}
.title {
  text-align: center;
  font-size: 24rem;
  font-weight: bold;
  margin-bottom: 8rem;
}
.sub-title {
  display: flex;
  justify-content: space-between;
  color: #f00;
  margin-bottom: 3rem;
  padding-left:16rem;
  padding-right:16rem;
  font-size: 20rem;
}
.rank-detail {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top:1rem;
  font-size: 1rem;
  border-bottom: 1rem dotted #a5e7cd;
}

/* 分类按钮 */
.right-button {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.btn {
  background: none;
  border: 0;
  width:150rem;
  font-size: 14rem;
}
.active {
  background: #8ee2c1;
  border-radius: 0;
  color: #fff;
}
</style>