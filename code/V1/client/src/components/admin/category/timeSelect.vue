<template>
  <div>
    <!-- 分类按钮 -->
    <el-button-group style="margin-right:30px;">
      <el-button v-for="(item,index) of category" :key="index" class="btn" :class="[isActive == index?'active':'']" @click="getIndex(index)">{{item}}</el-button>
    </el-button-group>
    <!-- 时间选择 -->
    <div style="border:1px solid #000;margin-top:10px;margin-bottom:10px;padding:10px 20px">
      <span>时间选择：</span>
      <el-date-picker v-if="isActive==Index&&isActive!=4" v-model="value" :type="timeType" :placeholder="defaultValue">
      </el-date-picker>
      <!-- <el-date-picker v-if="isActive==Index&&isActive==4" v-model="value1" type="year" :placeholder="defaultValue" style="width:110px">
      </el-date-picker>
      <el-select v-model="value2" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <el-button type="primary" style="width:95px;margin-left:40px" @click="selectData()">查询</el-button>
    </div>

  </div>
</template>

<script>
  import {toDate,toWeek,toMonth,toQuarter} from '@/filter/timeFilter.js'
  export default {
    data() {
      return {
        category:['全部','日报','周报','月报','季报','其他时间段>>'],  //分类
        isActive:1, //选中值
        value:'',  //时间选择的值
        Index:'',   
        timeType:'',  //时间类型
        defaultValue:''  //时间选择默认值
      }
    },
    created () {
      this.getIndex(1);
    },
    methods: {
      getIndex(index) {
        this.isActive=index
        this.value=''
        switch(this.isActive){
          case 0:
            this.Index=0
            this.timeType="year"
            this.defaultValue='全部'
            break;
          case 1:
            this.Index=1
            this.timeType="date"
            this.defaultValue=toDate( new Date() )
            break;
          case 2:
            this.Index=2
            this.timeType="week"
            this.defaultValue=toWeek( new Date() )
            break;
          case 3:
            this.Index=3
            this.timeType="month"
            this.defaultValue=toMonth( new Date() )
            break;
          case 4:
            this.Index=4
            this.defaultValue=toQuarter( new Date() )
            break;
          case 5:
            this.Index=5
            this.timeType="datetimerange"
            this.defaultValue='请选择时间段'
            break;
        }
      },
      selectData(){
        this.$emit('selectDa',{vlaue:this.value,defaultValue:this.defaultValue})
      }
    },
  }
</script>

<style scoped>
  .btn{
    border:1px solid #000;
    border-radius:0px;
    background:#ccc;
    color:#000;
  }
  .active{
    background:#fff;
  }
</style>