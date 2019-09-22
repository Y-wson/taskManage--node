module.exports = app => {
    const {controller, router} = app;
    const UserInterceptor = app.middleware.jwt({}, app);
    router.get('/get',UserInterceptor, controller.user.userInfo);
    router.post('/regist', controller.user.regist);
    router.post('/login',controller.user.login);
}