$(document).ready(function()
{
	//$("#tester2").threeSixty({ frames: 24, reverse: true });
	$("#tester").threeSixty({ frames: 24, reverse: false, zoom_window_size: 150,
				images: [
					"sprite-image-01-1.jpg",
					"sprite-image-02-1.jpg",
					"sprite-image-03-1.jpg",
					"sprite-image-04-1.jpg",
					"sprite-image-05-1.jpg",
					"sprite-image-06-1.jpg",
					"sprite-image-07-1.jpg",
					"sprite-image-08-1.jpg",
					"sprite-image-09-1.jpg",
					"sprite-image-10-1.jpg",
					"sprite-image-11-1.jpg",
					"sprite-image-12-1.jpg",
					"sprite-image-13-1.jpg",
					"sprite-image-14-1.jpg",
					"sprite-image-15-1.jpg",
					"sprite-image-16-1.jpg",
					"sprite-image-17-1.jpg",
					"sprite-image-18-1.jpg",
					"sprite-image-19-1.jpg",
					"sprite-image-20-1.jpg",
					"sprite-image-21-1.jpg",
					"sprite-image-22-1.jpg",
					"sprite-image-23-1.jpg",
					"sprite-image-24-1.jpg"], 
				zoom_images: [
					"image01.jpg",
					"image02.jpg",
					"image03.jpg",
					"image04.jpg",
					"image05.jpg",
					"image06.jpg",
					"image07.jpg",
					"image08.jpg",
					"image09.jpg",
					"image10.jpg",
					"image11.jpg",
					"image12.jpg",
					"image13.jpg",
					"image14.jpg",
					"image15.jpg",
					"image16.jpg",
					"image17.jpg",
					"image18.jpg",
					"image19.jpg",
					"image20.jpg",
					"image21.jpg",
					"image22.jpg",
					"image23.jpg",
					"image24.jpg"] });
					
					
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