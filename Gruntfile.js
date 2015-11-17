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

    this.getTenants = function(srcPath,finalCallback){

        function filter(file){
            return fs.statSync(path.join(srcPath, file)).isDirectory();
        }

        async.waterfall([
            function(callback){
                fs.exists(srcPath,function(result){
                    callback(null,result);
                })
            },
            function(callback){
                var results = fs.readdirSync(srcPath).filter(filter);
                finalCallback(null,results);
            }
        ], finalCallback);
    };

    function getFiles(dir,fileList){
        if (!fileList) {
            console.log("Variable 'fileList' is undefined or NULL.");
            return;
        }
        var files = fs.readdirSync(dir);
        for (var i in files) {
            console.log(files[i]);
            if (!files.hasOwnProperty(i)) continue;
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, fileList);
            } else {
                fileList.push(name);
            }
        }
    };

    this.getFiles = getFiles;
    this.test = function(cwd){
        var options = {
            'cwd': cwd,
            'ignore': ['vendor/js/*.js','tenants']
        };
        glob('**/*.js',options,function(err,files){
            console.log(files);
        })
    };

};
