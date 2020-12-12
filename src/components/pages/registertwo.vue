<template>
   <div>
  <div>
             <van-nav-bar
                title="用户注册"
                left-text="返回"
                left-arrow
                @click-left="goBack"
             />
             <div class="register-panel">
                 <van-field
                   v-model="username"
                   label="用户名"
                    
                    icon="question"
                     placeholder="请输入用户名"
                  required
                  @click-icon="username = ''"
                 />
                   <van-field
                   v-model="password"
                   label="密码"
                   
                   icon="question"
                   placeholder="请输入密码"
                   required
                   @click-icon="password=''"
                 />

                    <div class="register-button">
                        <van-button type="primary" @click="registerAction" :loading="openLoading" size="large">
                            马上注册

                        </van-button>
                    </div>

             </div>

            
         </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'

    export default {
        data() {
            return {
                username:'',
                password:'',
                openLoading:false,
                usernameErrorMsg:'',
                passwordErrorMsg:'',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
                
            },
             registerAction(){
                this.checkForm()&&this.axiosRegisterUer()

            },
            axiosRegisterUer(){
                this.openLoading=true,
                axios({
                    url:url.registertwoUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password,
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code==200){
                        this.$router.push('/')
                        Toast.success(response.data.message)
                    }else{
                        Toast.fail('注册失败')
                        this.openLoading=false
                        console.log(response.data.message)
                    }
                })
                .catch(error=>{
                    Toast.fail('注册失败')
                     this.openLoading=false
                    console.log(error)
                })
            },
            checkForm(){
                let isOk=true
                if(this.usernameErrorMsg<5){
                     this.usernameErrorMsg='用户名不能小于5位'
                     isOk=false
                }else{
                    this.usernameErrorMsg=''

                }
                if(this.passwordErrorMsg<6){
                    this.passwordErrorMsg='密码不能少于6位'
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk

            }
        },
    }
</script>

<style scoped>

</style>
