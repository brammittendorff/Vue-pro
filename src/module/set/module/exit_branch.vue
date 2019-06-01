<template>
 <div class="exit_branch">
    <p class="title">部门结构</p>
    <div class="tree">
        <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :default-expanded-keys='[7]'
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
            <span>
                <el-button
                    v-show="data.children?false:true"
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    删除
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => exit(node,data)">
                    编辑部门
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => append(node,data)">
                    添加子部门
                </el-button>
            </span>
        </span>
        </el-tree>
    </div>
    <!-- 编辑提示 -->
    <el-dialog
        title="提示"
        :visible.sync="exitshow"
        width="30%"
        :show-close='true'
        :close-on-click-modal='false'
        >
        <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" >
            <el-form-item label="编辑部门" prop="exitval">
                <el-input v-model="ruleForm.exitval" clearable />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="exitshow = false,ruleForm.exitval = ''">取 消</el-button>
            <el-button type="primary" @click="exitFun('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
<!-- <router-view></router-view> -->
</div>
</template>

<script>
  let id = 1000;
export default {
  data () {
    return {
        loading:false,
        exitshow:false,
        ruleForm:{
            exitval:''
        },
        data: null,
        rules: {
          exitval: [
            { required: true, message: '部门名称不为空', trigger: 'blur' }
          ],
        }
     };
  },

  components: {},

  computed: {},

  methods: {
      exit(node,data){
        this.ruleForm.exitval = data.label
        this.exitshow = true
      },
      
      exitFun(formName){
           this.$refs[formName].validate(val =>{
              if(val){
                this.exitshow = false
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                this.$set(children[index], 'label', this.ruleForm.exitval);
                // this.getdata(this.data)
              }
          })
            
      },
       append(node,data) {
        const newChild = { id: id++, label: '新部门'};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
         console.log(data,node,this.data,'append')

        // this.getdata(this.data)
      },

      remove(node, data) {
        this.$confirm(`确认删除,${data.label}？`)
          .then(_ => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
         console.log(data,node,this.data,'remove')
        // this.getdata(this.data)
         })
          .catch(_ => {});
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
     this.getdata();
 },
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
.exit_branch{
    background: #fff;
    border-radius: 6px;
    min-height: calc(~'100vh - 120px');
    .title{
        font-size: 16px;
        padding: 10px;
        background: #ececec;
    }
    .tree{
        width: 400px;
        padding: 20px 10px;
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

.exit_branch{
    .tree{
        .el-icon-caret-right:before {
            content: "\E60E";
            margin: 22px 0;
            border-left: 1px solid #d9d9d9;
        }
    }
}

</style>