'use strict';
const Controller = require('egg').Controller;
const utility=require("utility");
const jwt = require('jsonwebtoken') //引入jsonwebtoken
class UserController extends Controller {
    async userInfo() {
        const ctx = this.ctx;
        const token = ctx.get('Authorization');

        if (!token) { // 判断请求头有没有携带 token ,没有直接返回 401
            ctx.throw(401, 'no token detected in http header "Authorization"');
        }
        console.log('wswsws',token);
        const res=jwt.verify(token, 'token');
        return ctx.success('',res);
    }

    async login(){
        const ctx=this.ctx;
        const query=ctx.request.body;
        const {username, password} = query;
        const user=await ctx.model.User.findOne({username});
        if(!user){
            return ctx.failure("该用户不存在");
        }
        if(user.password!==utility.md5(password)){
            return ctx.failure("密码错误");
        }
        const token=ctx.helper.loginToken(user);
        return ctx.success('登录成功',token);
    }

    async regist() {
        const ctx = this.ctx;
        const query = ctx.request.body;
        const {username, password, gender} = query;
        const user = await ctx.model.User.findOne({username});
        if (user) {
            return ctx.failure('该用户已被注册')
        }

        const result = await ctx.model.User.create({
            username,
            password:utility.md5(password),
            gender
        }).then((res) => {
            const token=ctx.helper.loginToken(res);

            ctx.success('注册成功',token)
        }).catch(() => {
            ctx.failure('注册失败')
        });
        return result;

    }


}

module.exports = UserController;