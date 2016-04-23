module.exports = {
    shouldHaveMethods: function shouldHaveMethods (t, objName, obj) {
        return function (methods) {
            methods.forEach(function (method) {
                t.ok(method in obj, 
                    objName + '.' + method + ' should be defined')
                t.ok(typeof obj[method] === 'function', 
                    objName + '.' + method + ' should be a function') 
            })
        }
    },
    shouldHaveProps: function shouldHaveProps (t, objName, obj) {
        return function (methods) {
            methods.forEach(function (method) {
                t.ok(method in obj, 
                    objName + '.' + method + ' should be defined')
            })
        }
    }
}