<template>
 <div class="operate">
     <div class="search">
         <el-form :inline="true" :model="searchform" >
            <el-form-item label="选择岗位">
                <el-select style="width:200px" size="small" v-model="searchform.group" placeholder="请选择岗位">
                    <el-option
                    v-for="item in group"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size="small" @click="search" >搜索</el-button>    
            </el-form-item>
         </el-form>
     </div>
    <div class="tree">
        <div class="title font_20" style="padding-bottom:20px">
            <span class="dot g-fl"></span>
            &ensp; 功能权限配置
        </div>
        <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            show-checkbox
            :default-expanded-keys='[7]'
            :default-checked-keys="[5]"
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
            </span>
        </el-tree>
        <div class="fotter">
        <el-button  size="small" @click="back" >返回</el-button>    
        <el-button type='primary' size="small" @click="save" >保存</el-button>   
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        data:null,
        searchform:{
            group:'选项1'
        },
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
    };
  },

  components: {},

  computed: {},

  methods: {
      save(){

      },
      back(){
          this.$router.push({path:`/set/organization`})
      },
      search(){

      },
      getdata(data){
         if(data){
        this.data = data
         this.$set(this.data,data)
         }else{
         this.data = [{
        id: 1,
        label: '面朝',
        children: [{
          id: 4,
          label: '销售部',
          children: [{
            id: 7,
            label: '飞虎队'
          }, {
            id: 8,
            label: '雷霆队'
          }, {
            id: 9,
            label: '星火队'
          }, {
            id: 10,
            label: '冲锋队'
          }, {
            id: 11,
            label: '渠道组'
          }, {
            id: 12,
            label: '政委组'
          }, {
            id: 13,
            label: '测试001'
          }, {
            id: 14,
            label: '战狼组'
          }]
            }, {
            id: 2,
            label: '媒体运营部',
        }, {
            id: 3,
            label: '增值部'
        }, {
            id: 5,
            label: '财务'
        }, {
            id: 6,
            label: '外部渠道'
        }
        ]
      }]
      }
     }
  },

 mounted() {
     this.getdata()
 },
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
.operate{
    background: #fff;
    border-radius: 6px;
    min-height: calc(~"100vh - 200px");
    margin-top: 20px;
    padding: 30px;
    .search{

    }
    .tree{
        width: 400px;
        .dot {
            width: 1px;
            height: 16px;
            background: #ff8800;
            border-radius: 2px;
            border: 2px solid #ff8800;
        }
        .font_20 {
            font-size: 16px;
            font-weight: 600;
        }
        .title{
            display:flex;
            align-items:center;
        }
    }
    .fotter{
        margin-top: 30px;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
}
</style>
<style rel='stylesheet/less' lang='less'>
.operate{
    .tree {
        .el-icon-caret-right:before {
        content: "\E60E";
        margin: 22px 0;
        border-left: 1px solid #d9d9d9;
        }
  }
}
</style>