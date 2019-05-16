<template>
 <div class='content'>
<div class='g-container g-box-shadow'>
    <v-echarts id='echarts' width='800px' height='400px' :option='defaultOption' ></v-echarts>
</div>
</div>
</template>

<script>
import vEcharts from "../components/echarts";
import data from "../assets/data";

export default {
  data() {
    return {
      defaultOption: {}
    };
  },

  components: {
    vEcharts
  },

  computed: {},

  methods: {
    getdata() {
      this.defaultOption = {
        title: {
          text: "Beijing AQI"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096"
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33"
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933"
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033"
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099"
            },
            {
              gt: 300,
              color: "#7e0023"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: {
          name: "Beijing AQI",
          type: "line",
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      };
    }
  },
  mounted () {
    this.getdata();
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
</style>
<style rel='stylesheet/less' lang='less'>
</style>
