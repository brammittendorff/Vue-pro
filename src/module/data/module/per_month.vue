<template>
 <div class="month_list">
     <div class="search">
         <el-form :inline="true" :model="searchform" class="demo-form-inline">
            <el-form-item >
                <el-select style="width:100px" size="small" v-model="searchform.group" placeholder="请选择">
                    <el-option
                    v-for="item in group"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                 <el-select style="width:150px" size="small" v-model="searchform.person" placeholder="请选择">
                    <el-option
                    v-for="item in persons"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="选择时间段：">
                 <el-date-picker
                    v-model="searchform.year"
                    type="year"
                    size="small"
                    style="width:150px"
                    clearable
                    placeholder="选择年">
                </el-date-picker>
               <el-select style="width:150px" size="small" v-model="searchform.month" placeholder="选择月">
                    <el-option
                    v-for="item in month"
                    :key="item.value"
                    clearable
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="客户名称：">
                 <el-autocomplete
                  clearable 
                  size="small"
                  v-model="searchform.name"
                  style="width:300px"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请选择客户"
                  @select="getDatabefor"
                  :select-when-unmatched="true"
                  @keyup.enter.native="getData"
                  @clear="clearCustomer"
                  >
              </el-autocomplete>
            </el-form-item>

            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>

            <el-form-item>
                <el-button size="small"  @click="excel">导出报表</el-button>
            </el-form-item>
         </el-form>

     </div>
     <p class="price">业绩：<span style="color:#ff8800">￥50000</span></p>
     <div class="list">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="员工姓名">
            </el-table-column>
             <el-table-column
                prop="name"
                label="客户名称">
            </el-table-column>
             <el-table-column
                prop="date"
                label="投放当月市场占比">
            </el-table-column>
            <el-table-column
                prop="name"
                label="已核销金额">
                <template slot-scope="scope">
                    <a>￥{{scope.row.date}}</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="业绩">
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="searchform.page"
            :page-size="10"
            background
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
     </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        month:[{
          value: '1',
          label: '一月'
        },{
          value: '2',
          label: '二月'
        },{
          value: '3',
          label: '三月'
        },{
          value: '4',
          label: '四月'
        },{
          value: '5',
          label: '五月'
        },{
          value: '6',
          label: '六月'
        },{
          value: '7',
          label: '七月'
        },{
          value: '8',
          label: '八月'
        },{
          value: '9',
          label: '九月'
        },{
          value: '10',
          label: '十月'
        },{
          value: '11',
          label: '十一月'
        },{
          value: '12',
          label: '十二月'
        },
        ],
        group: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        persons: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        searchform:{
            group:'选项1',
            person:'选项1',
            year:'',
            month:'',
            customer_id:'',
            name:'',
            page:1
        },
        total:100,
        customerNames:[],
        customer_id:'',
        exportloading: true,//正在导出
    }
  },
  components: {},

  computed: {},

  methods: {
       handleChange(value) {
        console.log(value);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //搜索
      search(){
          console.log(this.searchform,'searchform')
      },
      //excel导出
      excel(){
          if (this.total) {
            if (this.exportloading && this.total) {
              this.exportloading = false;
              this.$axios
                .post("/kapi/import/aibrand", this.searchform)
                .then(e => {
                  this.$store.dispatch("getExcelNum");
                  this.exportloading = true;
                  this.$confirm("业绩月报正在导出，是否显示导出列表?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  })
                    .then(() => {
                      this.showDialog.show = true;
                    })
                    .catch(() => {});
                });
            }
          } else {
            this.$message.error("暂无数据可以导出");
          }
      },
        //获取客户
      querySearchAsync(queryString, cb) {
      if (this.isLoading) {
        return;
      }
      this.customer_id = '',
      this.$axios
        .get("/data_analysis/get_customer_selections", {
          params: {
            name:this.searchform.name
          }
        })
        .then(res => {
          this.customerNames = [];
          res.data.data.map(el => {
            let obj = {
              value: el.company,
              names: el.id
            };
            this.customerNames.push(obj);
          });
          cb(this.customerNames);
          // this.isLoading = false;
          // this.getData()
        });
    },
      //客户选择前获取id
    getDatabefor(){
      this.customerNames.map(item =>{
        if(item.value == this.searchform.name){
          this.searchform.customer_id = item.names
        }
      })
    //   this.getData();
    //   this.gettop();
    },
    clearCustomer(){
      this.searchform.customer_id=''
      this.searchform.name=''
    //   this.getData()
    //   this.gettop()
    },
    getData(){

    }
  },

 mounted() {},
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
.month_list{
    background: #fff;
    padding: 30px;
    margin-top: 15px;
    border-radius: 6px;
    .search{

    }
    .price{
        text-align:right;
        margin-right:"30px"
    }
    .list{
        .page{
            text-align:center;
            margin-top:20px
        }
    }
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>