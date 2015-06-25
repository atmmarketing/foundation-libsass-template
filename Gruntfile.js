module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		sass: {
			options: {
			  includePaths: ['bower_components/foundation/scss'],
			  sourceMap: true
			},
			lib: {
				options: {
			    outputStyle: 'expanded'
			  },
			  files: {
			    '../default/css/foundation.css': 'scss/app.lib.scss'
			  }
			},
			dev: {
				options: {
			    outputStyle: 'expanded'
			  },
			  files: {
			    '../default/css/custom.css': 'scss/custom.scss'
			  }
			},
			prod: {
			  options: {
			    outputStyle: 'expanded'
			  },
			  files: {
			    '../default/css/foundation.min.css': 'scss/app.prod.scss'
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
		
		concat: {
			options: {
				sourceMap: true
			},
			
			lib: {
				src: [
					'../base/fontawesome/css/font-awesome.min.css',
					'../base/css/body.css',
					'../base/js/vendor/flexslider/flexslider.css',
					'../base/css/smoothness/jquery-ui-1.10.3.custom.min.css',
					'../base/js/vendor/fancybox/jquery.fancybox.css',
					'../base/js/vendor/fancybox/helpers/jquery.fancybox-buttons.css',
				],
		      dest: '../default/css/lib.min.css',
			},

			prod: {
				src: [
					'../default/css/lib.min.css',
					'../default/css/foundation.min.css',
				],
		      dest: '../default/css/custom.min.css',
			}
			
		},
		
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			
			lib: {
				files: {
					'../default/js/libraries.min.js': [  
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
						'../default/js/libraries.min.js',
						'../default/js/custom.js' ]
					
				}
			}
			
			
			
		}

	});
	grunt.option('color', false);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	//grunt.registerMultiTask('build', ['sass']);
	grunt.registerTask('lib', ['sass:lib','uglify:lib','concat:lib']);
	grunt.registerTask('default', ['sass:dev','watch']);
	grunt.registerTask('prod', ['sass:prod','uglify:prod']);
}