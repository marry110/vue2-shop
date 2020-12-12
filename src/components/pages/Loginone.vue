<template>
    <div>
  <div>
             <van-nav-bar
                title="用户登录"
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
                        <van-button type="primary" @click="LoginAction" :loading="openLoading" size="large">
                            马上登录

                        </van-button>
                    </div>

             </div>

            
         </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
    export default {
          data() {
            return {
                username: '',
                password:'',
                openLoading:false,//是否开启用户的Loading
                usernameErrorMsg:'',
                passwordErrorMsg:'',
                
            }
        },
        created(){
            if(localStorage.useInfo){
                Toast.success('您已经登录了')
                this.$router.push('/')
            }
        },
        created(){
           if(localStorage.userInfo){
               Toast.success('您已经登录了')
           }
        },
        methods: {
            goBack() {
               this.$router.go(-1) 
            },
            LoginAction(){
                this.checkForm()&&this.axiosRegisterUser()

            },
            axiosRegisterUser(){
                this.openLoading=true
                axios({
                    url:url.loginone,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password,
                    }
                })
                .then(response=>{
                    

                   console.log(response)
                   if(response.data.code==200 && response.data.message){
                      

                        new Promise((resolve,reject)=>{
                        localStorage.userInfo={userName:this.userName}
                        setTimeout(() => {resolve()}, 500)

                    }).then(()=>{
                       Toast.success('登陆成功')
                        this.$router.push('/')
                    }).catch(err=>{
                        Toast.fail('登陆状态保存失败')
                        console.log(err)
                    })
                   }else{
                       Toast.fail('登陆失败')
                       this.openLoading=false

                   }
               
                })
                .catch(error=>{
                     Toast.fail('登陆失败')
                       this.openLoading=false
                  
                })
            },
            checkForm(){
                let isOk=true
                if(this.username.length<5){
                    this.usernameErrorMsg='用户名不能小于5位'
                    isOk=false
                }else{
                     this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg='密码不能少于6位'
                    isOk=false
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