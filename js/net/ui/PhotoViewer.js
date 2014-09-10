/* ========================================================================================
   PhotoViewer is a wrapper for the Zoomer js component (http://formstone.it/components/Zoomer/) 
   It adds extra functionality and controls that work well with a kiosk trackball.
   ===================================================================================== */

define(['Zoomer'], function( zoomer ){

	function PhotoViewer( containerDiv ){
    
		this.containerDiv = containerDiv; 
		this.imgSrcArray = [];
		
		this.panIncrement = 35;
								     	
    }
    
    // preloadImgList() | Preload a list of big images (Recommended if initial load time is not a concern)
    PhotoViewer.prototype.preloadImgList= function( preloadSrcArray ) {
    
    	jQuery.each(preloadSrcArray, function(i,source) { 
    	
    		jQuery.get(source); 
    		
    	});

    };

	// updateImages() | Unload current images and load new images.
    PhotoViewer.prototype.updateImages= function( imgSrcArray ) {
        	
    	this.imgSrcArray = imgSrcArray;
    	
   		for (var i = 0; i < imgSrcArray.length; i++) {
   			
   			var src = imgSrcArray[i];
   			
   			$(this.containerDiv).find("img").eq(i).attr('src', src);
   			   			
   		}
   				
		$(".viewer").zoomer({
			controls: {
				zoomIn: "#photo_controls #zoom_in",
				zoomOut: "#photo_controls #zoom_out"
			},
			marginMin: 0, // Min bounds 
			marginMax: 0 // Max bounds // (Setting to 0 allows larger side of image butt up to edge)
		});
	
   	
    };
    
    // jumpToPhoto() | Choose a photo do display if more than one img is in Zoomer instance.
    PhotoViewer.prototype.jumpToPhoto= function( photoIndex ) {
		
		//NOT WORKING
		
		/*
		if (photoIndex < 0 || photoIndex > this.imgSrcArray.length-1) return;
		
		var data = $( this.containerDiv ).data('zoomer');
		var curIndex = data.index;
		data.index = photoIndex;
		
		console.log( "cur photo index: " + curIndex );		
		console.log( "new index: " + photoIndex );	
		
		if ( curIndex < photoIndex ) {
			$(this.containerDiv).zoomer("nextImage");
		} else {
			$(this.containerDiv).zoomer("previousImage");
		}
		
		*/
		
    };
    
    // - PAN CONTROL - //
    // panLeft() | 
    PhotoViewer.prototype.panLeft = function(  ) {
    	var data = $( this.containerDiv ).data("zoomer");
    	data.targetPositionerLeft += this.panIncrement;
    }
    
    // panRight() | 
    PhotoViewer.prototype.panRight = function(  ) {
    	var data = $( this.containerDiv ).data("zoomer");
    	data.targetPositionerLeft -= this.panIncrement;
    }
    
    // panUp() | 
    PhotoViewer.prototype.panUp = function(  ) {
    	var data = $( this.containerDiv ).data("zoomer");
    	data.targetPositionerTop += this.panIncrement;
    }
    
    // panDown() | 
    PhotoViewer.prototype.panDown = function(  ) {
    	var data = $( this.containerDiv ).data("zoomer");
    	data.targetPositionerTop -= this.panIncrement;
    }
    
    // snapToView() | Provide zoom and pan levels (0-100%) to jump to a predetermined view 
    PhotoViewer.prototype.snapToView = function( zoom, panLeft, panTop) {
    	
    	//TODO - also set zoom value
    	
    	$( this.containerDiv ).zoomer("pan", panLeft, panTop);
    	
    }
    
   
    return PhotoViewer;
    
});