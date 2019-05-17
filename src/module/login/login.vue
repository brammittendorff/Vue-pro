<template>
 <div class='content'>
<canvas  style="background:#000000;" id="canvas"></canvas>

<div class='g-container g-box-shadow'>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="name">
        <el-input type="name" v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        <!-- autocomplete  自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。 -->
    </el-form-item>
    <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" placeholder="必须年满18岁"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">注册</el-button>
    </el-form-item>
    </el-form>
</div>
</div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        name: [{ required: true, message: "名字不为空", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  mounted() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var s = window.screen;
    var w = s.width;
    var h = s.height;
    canvas.width = w;
    canvas.height = h;
    var fontSize = 14;
    var clos = Math.floor(w / fontSize);
    var drops = [];
    var str = "zhangbaoxihuanmishasha";
    for (var i = 0; i < clos; i++) {
      drops.push(0);
    }
    function drawString() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "600 " + Math.round(Math.random() * 30) + "px";
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", "#ff0000");
      gradient.addColorStop("0.2", "#ec00ff");
      gradient.addColorStop("0.4", "#00dfff");
      gradient.addColorStop("0.6", "#00ff10");
      gradient.addColorStop("0.8", "#cfff00");
      gradient.addColorStop("1.0", "#ff7e00");
      ctx.fillStyle = gradient;
      // ctx.fillStyle = "#00ff00";
      for (var i = 0; i < clos; i++) {
        var x = i * fontSize;
        var y = drops[i] * fontSize;
        ctx.fillText(str[Math.floor(Math.random() * str.length)], x, y);
        if (y > h && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      window.requestAnimationFrame(drawString);
    }
    // setInterval(drawString,20);
    window.requestAnimationFrame(drawString);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.$axios
            .post("/kapi/login", this.ruleForm)
            .then(res => {
              if (res.data.code == 200) {
                sessionStorage.setItem("user", res.data.data.name);
                this.$router.push({ path: "/echarts" });
              }
            })
            .catch(err => {
              console.log(err && err.data, "err");
              this.$router.push({ path: "/echarts" });
              sessionStorage.setItem("user", " res.data.data.name");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.content {
  width: 100%;
  height: 100vh;
  #canvas {
    width: 100%;
    height: 100vh;
  }
  .g-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
  }
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>