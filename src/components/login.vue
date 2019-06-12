<template>
  <div class="login">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <div class="loginHead">
        <i class="el-icon-s-operation"></i>
        <h3>登录</h3>
      </div>

      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      realname: '',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this
          this.axios
            .post('/api/login', {
              username: that.loginForm.username,
              password: that.loginForm.password
            })
            .then(res => {
              if (res.data.length) {
                that.realname = res.data[0].realname
                console.log('接收返回数据', res.data[0].realname)
                console.log('接收返回数据', this.realname)
                this.$message({
                  message: `欢迎您,${that.realname}`,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '登录失败，请检查用户名及密码',
                  type: 'success'
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.login {
  height: 100%;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
}
.el-form {
  width: 400px;
  padding: 20px 20px 10px 10px;
  border: 1px solid #999;
  background-color: #fff;
  border-radius: 10px;
}
.loginHead {
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    margin-left: 20px;
  }
}
</style>
