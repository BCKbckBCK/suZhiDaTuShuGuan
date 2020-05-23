<template>
  <div class="container">
    <!--网页顶部-->
    <div class="header">
      <img src="@/assets/index/logo-home.png" width="20%">
      <div></div>
      <span>图书馆大数据展示系统</span>    
    </div>
    <!-- 网页主体 -->
    <div class="main">
      <div class="left">
        <div class="about-library">
          <aboutLibraryComponent></aboutLibraryComponent>
        </div>
        <div class="content">
          <div class="content-left">
            <div class="today-recommend">
              <todayRecommendComponent></todayRecommendComponent>
            </div>
            <div class="borrowing-list">
              <borrowingListComponent></borrowingListComponent>
            </div>
          </div>
          <div class="content-right">
              <div class="notice">
                  <noticeComponent></noticeComponent>
              </div>
          </div>
        </div>
      </div>
      <div class="right">
          <div class="reader-star">
            <readerStarComponent></readerStarComponent>
          </div>
          <div class="library-people-count">
            <libraryPeopleCountComponent></libraryPeopleCountComponent>
          </div>
          <div class="borrowing-count">
            <borrowingCountComponent></borrowingCountComponent>
          </div>
      </div>
    
    </div> 
  </div>
  
</template>

<script>
import aboutLibraryComponent from "./index/aboutLibrary"; //引入 图书馆风采展示 模块
import readerStarComponent from "./index/readerStar"; //引入 阅读之星 模块
import todayRecommendComponent from "./index/todayRecommend"; //引入 今日推荐 模块
import borrowingListComponent from "./index/borrowingList"; //引入 图书借阅排行 模块
import noticeComponent from "./index/notice"; //引入 公告 模块
import libraryPeopleCountComponent from "./index/libraryPeopleCount"; //引入 到馆人数统计 模块
import borrowingCountComponent from "./index/borrowingCount"; //引入 借阅量统计 模块
export default {
  components: {
    aboutLibraryComponent,
    readerStarComponent,
    todayRecommendComponent,
    borrowingListComponent,
    noticeComponent,
    libraryPeopleCountComponent,
    borrowingCountComponent
  }
};
</script>

<style scoped>
/* 首页 */
.container{
  background-color:#2e936a;
  width:100%;
  height:100%;
}
/* 网页顶部样式 */
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 112rem;
  padding-top:8rem;
  padding-bottom: 8rem;
}
.header div{
  width:12rem;
  height:112rem;
  margin-left:40rem;
  margin-right:52rem;
  background:linear-gradient(0deg,rgba(46,147,106,1),rgba(255,255,255,1),rgba(46,147,106,1)); 
}
.header span{
  font-size: 36rem;
  font-weight: bold;
}
/* 网页结构内容样式 */
.main{
  display: flex;
  margin-left:15px;
  margin-right:15px;
  flex:1;
}
.main .left{
  margin-right:6px;
 
}
.main .right{
  margin-right:6px;

}
/* 内容主体 */
.content{
  display: flex;
  justify-content: space-between;
}
/* 主体左边样式 */
.content .content-left{
  margin-top:15px;
  margin-right: 20px;
}
.content .content-left .today-recommend{
  margin-bottom:15px;
}

.content .content-right{
  margin-top:15px;
  margin-right: 15px;
}
/* 主体右边样式 */
.right .library-people-count{
  margin-top:15px;
  margin-bottom:15px;
  margin-left: 10px;
}
.right .borrowing-count{
 margin-left: 10px;
 
}

</style>