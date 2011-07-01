$(document).ready(function()
{
	//$("#tester2").threeSixty({ frames: 24, reverse: true });
	$("#tester").threeSixty({ frames: 24, reverse: false, zoom_window_size: 150,
				images: [
					"/_sprites/sprite-image-01-1.jpg",
					"/_sprites/sprite-image-02-1.jpg",
					"/_sprites/sprite-image-03-1.jpg",
					"/_sprites/sprite-image-04-1.jpg",
					"/_sprites/sprite-image-05-1.jpg",
					"/_sprites/sprite-image-06-1.jpg",
					"/_sprites/sprite-image-07-1.jpg",
					"/_sprites/sprite-image-08-1.jpg",
					"/_sprites/sprite-image-09-1.jpg",
					"/_sprites/sprite-image-10-1.jpg",
					"/_sprites/sprite-image-11-1.jpg",
					"/_sprites/sprite-image-12-1.jpg",
					"/_sprites/sprite-image-13-1.jpg",
					"/_sprites/sprite-image-14-1.jpg",
					"/_sprites/sprite-image-15-1.jpg",
					"/_sprites/sprite-image-16-1.jpg",
					"/_sprites/sprite-image-17-1.jpg",
					"/_sprites/sprite-image-18-1.jpg",
					"/_sprites/sprite-image-19-1.jpg",
					"/_sprites/sprite-image-20-1.jpg",
					"/_sprites/sprite-image-21-1.jpg",
					"/_sprites/sprite-image-22-1.jpg",
					"/_sprites/sprite-image-23-1.jpg",
					"/_sprites/sprite-image-24-1.jpg"], 
				zoom_images: [
					"/_sprites/image01.jpg",
					"/_sprites/image02.jpg",
					"/_sprites/image03.jpg",
					"/_sprites/image04.jpg",
					"/_sprites/image05.jpg",
					"/_sprites/image06.jpg",
					"/_sprites/image07.jpg",
					"/_sprites/image08.jpg",
					"/_sprites/image09.jpg",
					"/_sprites/image10.jpg",
					"/_sprites/image11.jpg",
					"/_sprites/image12.jpg",
					"/_sprites/image13.jpg",
					"/_sprites/image14.jpg",
					"/_sprites/image15.jpg",
					"/_sprites/image16.jpg",
					"/_sprites/image17.jpg",
					"/_sprites/image18.jpg",
					"/_sprites/image19.jpg",
					"/_sprites/image20.jpg",
					"/_sprites/image21.jpg",
					"/_sprites/image22.jpg",
					"/_sprites/image23.jpg",
					"/_sprites/image24.jpg"] });
					
					
	$("#controls img").css({ "opacity": 0.2 });
	$("#zoom img").css({ "opacity": 1 });
	
	$("#zoom").click(function()
	{
		$("#tester").threeSixty("zoom");
		$("#controls img").css({ "opacity": 0.2 });
		$("#rotate img").css({ "opacity": 1 });
		return false;
	});
	
	$("#rotate").click(function()
	{
		$("#tester").threeSixty("rotate");
		$("#controls img").css({ "opacity": 0.2 });
		$("#zoom img").css({ "opacity": 1 });
		return false;
	});
});