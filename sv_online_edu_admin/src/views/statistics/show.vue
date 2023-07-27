<template>
  <div class="app-container">
    <h1 style="text-align: center;">Show statistics data</h1>
    <!-- Table-->
    <el-form
      :inline="true"
      class="demo-form-inline">
      <el-form-item label="Statistics daily data">
        <el-select
          v-model="searchObj.type"
          clearable
          style="width:300px"
          placeholder="Pick a data">
          <el-option
            key="register_num"
            label="Member register daily statistics"
            value="register_num" />
          <el-option
            key="login_num"
            label="Member login daily statistics"
            value="login_num" />
          <el-option
            key="video_view_num"
            label="Video play daily statistics"
            value="video_view_num" />
          <el-option
            key="course_num"
            label="New course number daily statistics"
            value="course_num" />
        </el-select>
      </el-form-item>
      <el-form-item label="Begin time">
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="Pick start date"
          format="dd-MM-yyyy"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="End time">
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="Pick end date"
          format="dd-MM-yyyy"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">Search</el-button>
    </el-form>
    <div class="chart-container">
      <div
        id="chart"
        class="chart"
        style="height:600px;width:100%" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import staApi from '@/api/statistics'

export default {
  data() {
    return {
      searchObj: {
        type: '',
        begin: '',
        end: ''
      },
      btnDisabled: false,
      title: 'Member register daily statistics',
      xData: [],
      yData: []
    }
  },
  created() {
    this.initChartData()
    // this.setChart()
  },
  methods: {
    // init chart data
    initChartData() {
      this.searchObj.type = 'register_num'
      this.searchObj.begin = '2018-08-01'
      this.searchObj.end = '2018-12-31'
      // this.setChart()
      this.showChart()
    },
    //  Get statistic daily data to show
    showChart() {
      staApi.getDataSta(this.searchObj)
        .then(response => {
          this.xData = response.data.date_calculatedList
          this.yData = response.data.numDataList

          // set chart title
          switch (this.searchObj.type) {
            case 'register_num':
              this.title = 'Member register daily statistics'
              break
            case 'login_num':
              this.title = 'Member login daily statistics'
              break
            case 'video_view_num':
              this.title = 'Video play daily statistics'
              break
            case 'course_num':
              this.title = 'New course number daily statistics'
              break
          }

          // call setChart and show data
          this.setChart()
        })
    },
    // User Echarts to show data
    setChart() {
      // init echarts
      this.chart = echarts.init(document.getElementById('chart'))
      // console.log(this.chart)
      // line chart from Echarts
      var option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'
        },
        {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        // x axis, x data is a array
        xAxis: {
          type: 'category',
          data: this.xData
        },
        // y axis
        yAxis: {
          type: 'value'
        },
        // series
        series: [{
          // y data is a array
          data: this.yData,
          // line chart
          type: 'line'
        }]
      }
      this.chart.setOption(option)
    }
  }

}
</script>
