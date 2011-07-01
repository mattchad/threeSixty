(function( $ )
{
	$.fn.threeSixty = function(method)
	{
		if ( methods[method] )
		{
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if (typeof(method) === 'object' || !method)
		{
			return methods.init.apply(this, arguments);
		}
		else
		{
			$.error( 'Method ' +  method + ' does not exist on jQuery.spritespin' );
		}
	};

	var methods = {
		//INIT METHOD
		init : function(options)
		{
			var settings = 
			{
				frames : 24,
				reverse: false,
				images : false,
				zoom_images: false,
				zoom_window_size: 100,
				disabled: false,
				current_slide: 0,
				frame_width: 0,
				frame_height: 0
			};
			
			var threeSixtyObject = this;
			
			return this.each(function()
			{
				
				var self = $(this);
				var mode = "sprite";
				var imagesLoaded = 0; // For the fake sprite
				var images = new Array();
				var zoom_images = new Array();
				
				if (options)
				{ 
					$.extend( settings, options );
				}
				
				//Once the main image is loaded. We need this so we know the width/height
				$(self).one('load', function()
				{
					//Figure out if a sprite has been specified, if not we assume that the sprite is the same name as the image with "-sprite" on the end
					var attr = self.attr('spritesrc')
					if(typeof attr !== 'undefined' && attr !== false)
					{
						var spriteLocation = self.attr("spritesrc");	//The location of the image sprite on the server
					}
					else
					{
						if(settings['images'])
						{
							mode = "fakeSprite";
						}
						else
						{
							alert("Error: No spritesrc attribute or images found.");
							var spriteLocation = "";
						}
					}
					
					var sprite_container  = $("<div/>").css({ "overflow": "hidden", "height": 0, "margin": 0 });
					if(mode == "sprite")
					{
						var sprite = $("<img/>").attr("src", spriteLocation);
					}
					else
					{
						var sprite = $("<div/>").css({"overflow": "hidden"});
						//If mode = "fakeSprite"
						$.each(settings['images'], function(index, value)
						{
							var image = $("<img/>").attr("src", value).css({ "float": "left" });
							images.push(image);
							sprite.append(image);
						});
					}
					self.parent().append(sprite_container.append(sprite));
										
					threeSixtyObject.spriteLoaded = function()
					{
						if(mode == "sprite")
						{
							var spriteWidth = sprite.width();						//Width of the sprite
							var spriteHeight = sprite.height();						//Height of the sprite
							var slideWidth = settings['frame_width'] = spriteWidth / settings['frames'];		//Width of the slide
							var slideHeight = settings['frame_height'] = self.height();						//Height of the slide
						}
						else
						{
							//FakeSprite
							var spriteWidth = images[0].width() * settings['frames'];	//Width of the sprite
							sprite.width(spriteWidth);
							var spriteHeight = frame_height = images[0].height();						//Height of the sprite
							var slideWidth = settings['frame_width'] = spriteWidth / settings['frames'];			//Width of the slide
							var slideHeight = settings['frame_height'] = images[0].height();						//Height of the slide
						}
						var imgId = self.attr("id");							//The id of the original image, which we will give to the new image
						var distanceToMove = slideWidth / settings['frames']; 	//The distance we need to move the cursor to move between frames.
						var currentSlide = 0;									//Initialise the counter for the current slide
						
						//Create block to determine current location of the image
						var threeSixty_location = $("<span/>").addClass("threeSixty_location").css({ height: 10, width: 10, background: "black", position: "absolute", "left": 0, "bottom": 0 });
						//Create div for image itself			
						var threeSixty_image = $('<div/>').addClass("threeSixty_image").css({ "position": "absolute", "left": 0, "top": 0}).width(spriteWidth).height(slideHeight);
						if(mode == "sprite")
						{
							threeSixty_image.css({ "background": "url(" + spriteLocation + ")" });
						}
						else
						{
							threeSixty_image.append(sprite);
						}
						//Create container for the image to move within
						var threeSixty_container = $('<div/>').addClass("threeSixty_container").css({ position: "relative", overflow: "hidden", "cursor": "move" }).width(slideWidth).height(slideHeight).attr("id", imgId).attr("disabled", "false").append(threeSixty_image).append(threeSixty_location);
						threeSixty_container.data("settings", settings);
						//Add the image to the container
						self.parent().append(threeSixty_container);
						
						//Prevent dragging of the image in firefox etc (Used to bookmark, open in a new window etc)
						threeSixty_image.bind('dragstart', function(event) { event.preventDefault(); });
						
						function moveToFrame(frameIndex)
						{
							threeSixty_image.css("left", (frameIndex * settings['frame_width'])*-1 );
							//console.log(threeSixty_image.css("left"));
							//Move block
							var threeSixty_location = threeSixty_container.find(".threeSixty_location");
							if(!settings['reverse'])
							{
								if(settings['current_slide'] == 0)
								{
									var block_location = 0;
								}
								else
								{
									var block_location = ((settings['frame_width'] - threeSixty_location.width())/(settings['frames']-1))*(settings['frames']-settings['current_slide']);
								}
								threeSixty_location.css("left", block_location);
							}
							else
							{
								threeSixty_location.css("left", ((settings['frame_width'] - threeSixty_location.width())/(settings['frames']-1))*settings['current_slide']);
							}
						}
						
						var interval;
						function animate(loop)
						{
							var startFrame = settings['current_slide'];
							interval = setInterval(function()
							{	
								if(!settings['reverse'])
								{
									settings['current_slide']--;	
									if(settings['current_slide'] < 0)
									{
										settings['current_slide'] = (settings['frames']-1);
									}
								}
								else
								{
									settings['current_slide']++;
									if(settings['current_slide'] >= settings['frames'])
									{
										settings['current_slide'] = 0;
									}
								}
								
								moveToFrame(settings['current_slide']);
								
								if((settings['current_slide'] == startFrame) && !loop)
								{
									clearInterval(interval);	
								}
							}, 100);
						}
						
						animate(false);
						
						threeSixty_container.dblclick(function(e)
						{
							animate(true);
						});
						
						threeSixty_container.mousedown(function(e)
						{
							clearInterval(interval);
							if(threeSixty_container.attr("disabled") == "false")
							{
								//Starting position of the image when we clicked
								var startLeft = parseInt(threeSixty_image.css("left"));
								//The slide we were on when we clicked
								var startSlide = settings['current_slide'];
								//Initialise counter for how many frames we are moving this click
								var framesToMove = 0;
								//The position of the cursor when we clicked.
								var mousedown_x = e.pageX;
								$(this).bind('mousemove', function(e)
								{
									//Decide how far the mouse has moved since we clicked
									var position = parseInt(e.pageX - mousedown_x);
									//Decide how many slide moves the above relates to
									framesToMove = parseInt(position / distanceToMove);
									if(!settings['reverse'])
									{
										framesToMove = framesToMove * -1;
									}
									//Determine the current slide given the above..
									currentSlide = (startSlide + framesToMove) % settings['frames'];
									if(currentSlide < 0)
									{
										//For negative slide moves..
										currentSlide = settings['frames'] + currentSlide;
									}
									settings['current_slide'] = currentSlide;
									threeSixty_container.attr('currentslide', currentSlide);
									
									//Move the image within the container depending on the current slide			
									moveToFrame(currentSlide)
								});
							}
							
						}); 
									
						$("body").mouseup(function(e)
						{
							$(threeSixty_container).unbind('mousemove');
						});
						
						if(mode == "sprite")
						{
							threeSixty_container.mouseout(function(e)
							{
								$("body").mouseup();
							});
						}
						
						//Remove the original image + sprite, we've replaced it. 
						self.remove();
						sprite_container.remove(); 
					};
					
					this.fakeSpriteImageLoaded = function()
					{
						imagesLoaded++;
						if(imagesLoaded == settings['frames'])
						{
							threeSixtyObject.spriteLoaded();
						}
					};
					
					if(mode == "sprite")
					{
						$(sprite).one('load', function()
						{
							threeSixtyObject.spriteLoaded();
						}).each(function()
						{
							if(this.complete) $(this).load();
						});
					}
					else
					{
						//If we've made a fake sprite
						var plugin = this;
						$.each(images, function(index, value)
						{
							$(value).one('load', function()
							{
								plugin.fakeSpriteImageLoaded();
							}).each(function()
							{
								if(value.complete) $(value).load();
							});
						});
					}
				}).each(function()
				{
					if(this.complete) $(this).load();
				});
			});
		}, 
		zoom: function(options)
		{
			var self = this;
			var settings = self.data("settings");
			var attr = self.attr('disabled');
			if(typeof attr == 'undefined' || attr == "false")
			{
				self.attr('disabled', "true");
				var window = $("<div/>").css({ "position": "absolute", width: settings['zoom_window_size'], height: settings['zoom_window_size'], border: "1px solid black", "overflow": "hidden", left: -99999, "cursor": "crosshair" }).attr("class", "threeSixty_zoomWindow");
				var zoom_images = settings['zoom_images'];
				var current_slide = settings['current_slide'];
				var window_background = $("<img/>").attr("src", zoom_images[current_slide]).css({ "position": "absolute" });
				window_background.bind('dragstart', function(event) { event.preventDefault(); });
				window.append(window_background);
				self.append(window);
				
				$(window_background).one('load', function()
				{
					var aspect_ratio = window_background.width() / self.width();
					self.mousemove(function(e)
					{
						var x = e.pageX - this.offsetLeft;
						var y = e.pageY - this.offsetTop;
						window.css({ left: (x-(settings['zoom_window_size']/2)), top: (y-(settings['zoom_window_size']/2)) });
						window_background.css({ left: ((x*-1)*aspect_ratio)+(settings['zoom_window_size']/2), top: ((y*-1)*aspect_ratio)+(settings['zoom_window_size']/2) })
					});
				}).each(function()
				{
					if(this.complete) $(this).load();
				});
								
				self.mouseout(function(e)
				{
					window.hide();
				});
				
				self.mouseover(function(e)
				{
					window.show();
				});
			}
		},
		rotate: function(options)
		{
			var self = this;
			self.attr('disabled', "false")
			$(".threeSixty_zoomWindow").remove();
		}
	};
})( jQuery );
