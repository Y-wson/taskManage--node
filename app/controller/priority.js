'use strict';
const Controller = require('egg').Controller;

class PriorityController extends Controller {
    async list() {
        const ctx = this.ctx;
        const result = await ctx.service.priority.list();
        ctx.success('查询成功',result);
    }
}

module.exports = PriorityController;