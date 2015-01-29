/**
 * Created by brandonantonelli on 1/11/14.
 */
/*
*/

'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        // The watch object is specific to the grunt-contrib-watch task
        // This is specified in the task's documentation
        // Paths in the watch object are relative to where the Gruntfile.js is located.
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'cds_components/css/styles.css': 'cds_components/sass/styles.scss'       // 'destination': 'source'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'app/styles/app.css': [
                        'cds_components/css/select2.css',
                        'cds_components/css/styles.css'
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: {
                    port: 9090
                }
            },
            // options can also be put inside of a subtask
            // (ie: less can have its own options)
            sass: {
                files:['cds_components/sass/*.scss', 'cds_components/sass/*/*.scss'],
                tasks:['sass']
            },
            html: {
                files:['templates/**/*.html', 'templates/*.html']
            },
            css: {
                files:['cds_components/css/*.css'],
                tasks:['cssmin']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};