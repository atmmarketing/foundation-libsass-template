module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		sass: {
			options: {
			  includePaths: ['bower_components/foundation/scss'],
			  outputStyle: 'expanded'
			},
			dev: {
				options: {
			    sourceMap: 'scss/custom.css.map'
			  },
			  files: {
			    '../default/css/custom.dev.css': 'scss/app.lib.scss'
			  }
			}
		},
	
		watch: {
			grunt: {
				options: {
					reload: true
				},
				files: ['Gruntfile.js'],
				tasks: ['sass:dev']
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
					target : '../default/css/'
				},
				files:{'../default/css/lib.dev.css':[
					'../base/fontawesome/css/font-awesome.min.css',
					'../base/js/vendor/flexslider/flexslider.css',
					'../base/js/vendor/jquery-ui/jquery-ui.min.css',
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
					'../default/css/lib.dev.css',
					'../default/css/custom.dev.css'
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
					'../default/js/lib.dev.js': [  
						'bower_components/jquery/dist/jquery.min.js', 
						'../base/js/vendor/jquery-ui/jquery-ui.min.js', 
						'bower_components/foundation/js/foundation/foundation.js', 
						'bower_components/foundation/js/foundation/foundation.alert.js', 
						'bower_components/foundation/js/foundation/foundation.topbar.js', 
						'bower_components/foundation/js/foundation/foundation.interchange.js', 
						'../base/js/vendor/flexslider/jquery.flexslider-min.js', 
						'../base/js/vendor/placeholders.jquery.min.js', 
						'../base/js/vendor/masonry.pkgd.min.js', 
						'../base/js/vendor/fancybox/jquery.fancybox.pack.js', 
						'../base/js/vendor/fancybox/helpers/jquery.fancybox-media.js', 
						'../base/js/vendor/fancybox/helpers/jquery.fancybox-buttons.js']
				}
			},
			prod: {
				files: {
					'../default/js/custom.min.js': [  
						'../default/js/lib.dev.js',
						'../default/js/custom.dev.js' ]
				}
			}
		}
	});

	grunt.option('color', false);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('lib', ['cssmin:lib','uglify:lib','sass:dev']);
	grunt.registerTask('default', ['sass:dev','watch']);
	grunt.registerTask('prod', ['sass:dev','cssmin:prod','uglify:prod']);
}