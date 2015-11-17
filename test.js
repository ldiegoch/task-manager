var Generator = require('./Gruntfile');

var manager = new Generator();
/*manager.getTenants('./../../src',function(error,response){
    console.log(response);
});*/

/*var files = [];
manager.getFiles('./../../src',files);
console.log(files);*/

manager.test('./../../src');