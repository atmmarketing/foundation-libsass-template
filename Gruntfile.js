module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		sass: {
			options: {
			  includePaths: ['bower_components/foundation/scss'],
			  outputStyle: 'nested'
			},
			dev: {
				options: {
			    sourceMap: 'scss/custom.css.map'
			  },
			  files: {
			    '../default/css.dev/custom.css': 'scss/app.lib.scss'
			  }
			}
		},
	
		watch: {
			grunt: {
				options: {
					reload: true
				},
				files: ['Gruntfile.js']
			},
			
			sass: {
			  files: 'scss/**/*.scss',
			  tasks: ['sass:dev']
			}
		},
		
		cssmin: {
			options: {
				roundingPrecision: -1,
				keepSpecialComments : 0,
				rebase: true,
				relativeTo : '../default/',
			},
			
			lib: {
				options: {
					sourceMap:true,
					target : '../default/css.dev/'
				},
				files:{'../default/css.dev/lib.min.css':[
					'../base/fontawesome/css/font-awesome.min.css',
					'../base/css/body.css',
					'../base/js/vendor/flexslider/flexslider.css',
					'../base/css/smoothness/jquery-ui-1.10.3.custom.min.css',
					'../base/js/vendor/fancybox/jquery.fancybox.css',
					'../base/js/vendor/fancybox/helpers/jquery.fancybox-buttons.css'
					]
				}
			},
			prod: {
				options: {
					sourceMap:false,
					target : '../default/css/'
				},
				files:{'../default/css/custom.min.css' : [
					'../default/css.dev/lib.min.css',
					'../default/css.dev/custom.css'
				]}
			}
		},
		
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			
			lib: {
				files: {
					'../default/js.dev/lib.min.js': [  
						'../base/js/vendor/jquery.js', 
						'../base/js/vendor/jquery-ui-1.10.3.custom.min.js', 
						'../base/js/foundation/foundation.js', 
						'../base/js/foundation/foundation.alert.js', 
						'../base/js/foundation/foundation.topbar.js', 
						'../base/js/foundation/foundation.interchange.js', 
						'../base/js/vendor/flexslider/jquery.flexslider-min.js', 
						'../base/js/vendor/placeholder.js', 
						'../base/js/vendor/masonry.pkgd.min.js', 
						'../base/js/vendor/fancybox/jquery.fancybox.pack.js', 
						'../base/js/vendor/fancybox/helpers/jquery.fancybox-media.js', 
						'../base/js/vendor/fancybox/helpers/jquery.fancybox-buttons.js']
				}
			},
			prod: {
				files: {
					'../default/js/custom.min.js': [  
						'../default/js.dev/lib.min.js',
						'../default/js.dev/custom.js' ]
				}
			}
		}
	});

	grunt.option('color', false);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('lib', ['cssmin:lib','uglify:lib']);
	grunt.registerTask('default', ['sass:dev','watch']);
	grunt.registerTask('prod', ['sass:dev','cssmin:prod','uglify:prod']);
}