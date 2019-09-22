module.exports = app => {
    const {controller, router} = app;

    // middleware
    const UserInterceptor = app.middleware.jwt({}, app);

    // get user info
    router.get('/user', UserInterceptor, controller.user.index);

    // login and regist
    router.post('/regist', controller.login.regist);
    router.post('/login', controller.login.login);

    // get priority
    router.get('/priority', controller.priority.index);
}