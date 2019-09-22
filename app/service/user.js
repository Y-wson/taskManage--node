const Service = require('egg').Service;

class UserService extends Service {
    async list() {
        const ctx = this.ctx;
        return ctx.model.User.find();
    }
}

module.exports = UserService;