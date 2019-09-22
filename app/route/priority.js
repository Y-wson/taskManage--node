module.exports = app => {
    const {controller, router} = app;
    router.get('/priority/get', controller.priority.list);
}