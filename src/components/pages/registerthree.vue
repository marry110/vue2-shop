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
                this.checkForm()&&this.axiosRegisterUser()

            },
            axiosRegisterUser(){
                this.openLoading=true
                axios({
                    url:url.registerthreeUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code==200){
                        Toast.success(response.data.message)
                        this.$router.push('/')
                    }else{
                         console.log(response.data.message)
                          Toast.fail('注册失败')
                         this.openLoading=false
                       
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
                if(this.username.length<5){
                    this.usernameErrorMsg='用户名不能小于5位'
                }else{
                    this.passwordErrorMsg=''
                }
                if(this.password.length<6){
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
  .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>