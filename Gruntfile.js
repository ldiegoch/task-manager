/*
 * grunt-chmod
 * https://github.com/JamesMGreene/grunt-chmod
 *
 * Copyright (c) 2013 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var glob = require('glob');

module.exports = function(grunt) {

    this.getTenants = function(srcPath){

        function filter(file){
            return fs.statSync(path.join(srcPath, file)).isDirectory();
        }

        if(fs.existsSync(srcPath)){
            var results = fs.readdirSync(srcPath).filter(filter);
            return results;
        }else{
            return [];
        }

        /*async.waterfall([
         function(callback){
         fs.exists(srcPath,function(result){
         callback(null,result);
         })
         },
         function(callback){
         var results = fs.readdirSync(srcPath).filter(filter);
         finalCallback(null,results);
         }
         ], finalCallback);*/
    };

    function getFiles(dir,fileList){
        if (!fileList) {
            console.log("Variable 'fileList' is undefined or NULL.");
            return;
        }
        var files = fs.readdirSync(dir);
        for (var i in files) {
            if (!files.hasOwnProperty(i)) continue;
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, fileList);
            } else {
                fileList.push(name);
            }
        }
    };

    this.getModuleFiles = function(module, element, src){
        var options = {
            'cwd': src + module
        };
        return glob.sync('js/' + element + '/*.js',options);
    };

    this.getModuleViews = function(module, src){
        var options = {
            'cwd': src + module
        };
        console.log(options);
        return glob.sync('tpl/*.html',options);
    };

    this.getFiles = getFiles;
    this.getDeniedFilesForModule = function(files,src,module){
        var deniedFiles = [];
        var fileName = null;
        for (var i in files) {
            deniedFiles.push('!' + src + module + '/' + files[i]);
        }
        return deniedFiles;
    };
    this.getTenantFilesForModule = function(files,src,tenant,module){
        var tenantFiles = [];
        var fileName = null;
        for (var i in files) {
            tenantFiles.push( src + tenant  + '/' + module + '/' + files[i]);
        }
        return tenantFiles;
    };
};
