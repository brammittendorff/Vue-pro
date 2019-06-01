<template>
 <div class="organization">
    <div class="tree">
        <p class="title">部门结构</p>
        <el-tree
        :data="data"
        node-key="id"
        draggable
        @node-click='tree_click'
        :default-expanded-keys='[7]'
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
        </span>
        </el-tree>
        <p class="exit" @click="exit_branch">编辑部门</p>
    </div>
    <div class="list">
        <div class="search">
            <el-form :inline="true" :model="searchform">
                <el-form-item label="角色名称">
                    <el-input size="small" v-model="searchform.name"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="small" type="primary" @click="secrch">查找</el-button>                    
                </el-form-item>
                 <el-form-item >
                    <el-button size="small" type="primary" @click="newper">+新建角色</el-button>                    
                </el-form-item>
            </el-form>
        </div>
        <div class="all_list">
            <el-table
                ref="singleTable"
                :data="tableData"
                border
                 v-loading="loading"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="50">
                </el-table-column>
                <el-table-column
                property="name"
                label="角色名称">
                </el-table-column>
                <el-table-column
                property="des"
                label="角色描述">
                </el-table-column>
                <el-table-column
                property="number"
                label="人数">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <div>
                            <a @click="list_exit(scope.row,scope.$index)">编辑</a>&ensp;|&ensp;
                            <a @click="list_set">设置权限</a>&ensp;|&ensp;
                            <a @click="list_del(scope.row,scope.$index)">删除</a>
                        </div>
                    </template>
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
     <!-- 新建角色 -->
    <el-dialog
        title="新建角色"
        :visible.sync="exitshow"
        width="30%"
        :show-close='true'
        :close-on-click-modal='false'
        >
        <el-form  label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm" >
            <el-form-item label="角色名称" prop="name">
                <el-input size="small"  v-model="ruleForm.name" clearable />
            </el-form-item>
             <el-form-item label="角色描述" >
                <el-input type="textarea" v-model="ruleForm.des"  />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="exitshow = false,ruleForm.name = '',ruleForm.des = '',type = 0">取 消</el-button>
            <el-button type="primary" @click="exitFun('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
</div>

</template>

<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "面朝",
        children: [
          {
            id: 4,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "飞虎队"
              },
              {
                id: 8,
                label: "雷霆队"
              },
              {
                id: 9,
                label: "星火队"
              },
              {
                id: 10,
                label: "冲锋队"
              },
              {
                id: 11,
                label: "渠道组"
              },
              {
                id: 12,
                label: "政委组"
              },
              {
                id: 13,
                label: "测试001"
              },
              {
                id: 14,
                label: "战狼组"
              }
            ]
          },
            {
                id: 2,
                label: "媒体运营部"
            },
            {
                id: 3,
                label: "增值部"
            },
            {
                id: 5,
                label: "财务"
            },
            {
                id: 6,
                label: "外部渠道"
            }
        ]
      }
    ];
    return {
      searchform: {
        name: "",
        page: 1
      },
      total:100,
      ruleForm: {
        name: "",
        des: ""
      },
      exitshow: false,
      type: 0,
      index:0,
      loading: false,
      rules: {
        name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }]
      },
      data: data,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          number: 1,
          des:'这人真的好'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          number: 2,
          des:'这人真的好'

        },
        {
          date: "2016-05-01",
          name: "王小虎",
          number: 1,
          des:'这人真的好'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          number: 3,
          des:'这人真的好'

        },
        {
          date: "2016-05-01",
          name: "王小虎",
          number: 2,
          des:'这人真的好'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          number: 1,
          des:'这人真的好'

        },{
          date: "2016-05-01",
          name: "王小虎",
          number: 2,
          des:'这人真的好'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          number: 5,
          des:'这人真的好'

        }
      ],
      data2: [
        {
          id: 1, //部门id
          name: "优粉吧", //部门名称
          parent_id: 0, //上级部门id
          user_id: 44, //主管用户id
          updated_at: "2019-05-20 19:48:50",
          created_at: "2019-05-20 19:48:50",
          user: {
            //主管用户信息
            id: 44,
            username: "xixihaha",
            nickname: null,
            real_name: "天才",
            password: "12345",
            department_id: 5,
            last_login_time: null,
            last_login_ip: "",
            avatar: "",
            updated_at: "2019-05-22 14:21:09",
            created_at: "2019-05-22 14:21:09",
            status: 1,
            deleted_at: null
          },
          children: [
            //下级部门
            {
              id: 3,
              name: "销售部",
              parent_id: 1,
              user_id: null,
              updated_at: "2019-05-20 20:12:44",
              created_at: "2019-05-20 20:12:44",
              children: null
            },
            {
              id: 4,
              name: "技术部",
              parent_id: 1,
              user_id: null,
              updated_at: "2019-05-20 20:25:25",
              created_at: "2019-05-20 20:25:25",
              children: [
                {
                  id: 5,
                  name: "crm",
                  parent_id: 4,
                  user_id: 44,
                  updated_at: "2019-05-20 20:25:54",
                  created_at: "2019-05-20 20:25:54",
                  children: null
                }
              ]
            }
          ]
        }
      ]
    };
  },

  components: {},

  computed: {},

  methods: {
    exit_branch() {
      this.$router.push({ path: "/set/exit_branch" });
    },
    tree_click(data, node, dav) {
      console.log(data, node, dav, "data,node,dav");
    },
    secrch() {},
    newper() {
        this.exitshow = true
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    list_exit(data,index){
        this.type = 1
        this.index = index
        this.exitshow = true
        this.ruleForm.name = data.name
        this.ruleForm.des = data.des
    },
    list_set(){
          this.$router.push({path:`/set/pre_set/operate_set`})
    },
    list_del(data,index){
        if(data.number==1){
        this.$confirm(`确认删除角色 ${data.name} 吗？`, '删除角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.tableData.splice(index,1)
        })
        }else{
        this.$confirm(`  该角色下还有人员存在，请先处理角色内员工。`, '删除角色', {
          confirmButtonText: '好的',
          type: 'warning',
           callback: action => {

          }
        })
        }
    },
    keyupl(data){
        console.log(this.ruleForm.name,data,'this.ruleForm.name')
    },
     exitFun(formName){
           this.$refs[formName].validate(val =>{
              if(val&&this.type){
                    this.$set(this.tableData[this.index], 'name', this.ruleForm.name);
                     this.$set(this.tableData[this.index], 'des', this.ruleForm.des);
                  this.type = 0
                  this.exitshow = false
                this.ruleForm.name = ''
                this.ruleForm.des = ''
                // this.getdata(this.data)
              }
          })
            
      },
  },

  mounted() {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.organization {
  background: #fff;
  min-height: calc(~"100vh - 120px");
  position: relative;
  .tree {
    width: 160px;
    position: absolute;
    left: 0px;
    // min-height: calc(~"100vh - 120px");
    border: 1px solid #ff880052;
    .title {
      background: #ff880052;
      text-align: center;
      padding: 5px;
      font-weight: 600;
    }
    .exit {
      background: #ff880052;
      text-align: center;
      padding: 5px;
      cursor: pointer;
      font-weight: 600;
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
  .list {
    position: absolute;
    width: calc(~"100% - 220px");
    left: 200px;
    top: 30px;
    .search {
    }
    .all_list {

    }
    .page{
        text-align: center;
        margin-top: 20px;
    }
  }
}
</style>
<style rel='stylesheet/less' lang='less'>
.organization {
  .tree {
    .el-icon-caret-right:before {
      content: "\E60E";
      margin: 22px 0;
      border-left: 1px solid #d9d9d9;
    }
  }
  .list{
      .has-gutter{
          tr{
              th{
                background: #f6f8f9;
              }
          }
      }
  }
}
</style>