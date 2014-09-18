/* ========================================================================================
   PhotoViewer is a wrapper for the Zoomer js component (http://formstone.it/components/Zoomer/) 
   It adds extra functionality and controls that work well with a kiosk trackball.
   ===================================================================================== */

define(['Zoomer', 'tween'], function( zoomer ){

    function PhotoViewer( containerDiv ){

      this.containerDiv = containerDiv; 
      this.imgSrcArray = [];

      this.zoomerData = {};//data binding to zoomer object

      this.leftPanBtn = {};
      this.rightPanBtn = {};
      this.upPanBtn = {};
      this.downPanBtn = {};

      this.panIncrement = 20;
      this.panSpeed = 0.05;
      this.allowPan = true;

      this.initZoomer();
    	     	
    }

    // initZoomer() | Create instance of zoomer using the containerIdv
    PhotoViewer.prototype.initZoomer = function( ) {

      $( this.containerDiv ).zoomer("destroy");// Usually not needed, but will prevent layer Zoomer instances

      $( this.containerDiv ).zoomer({
        controls: {
          zoomIn: "#photo_controls #zoom_in",
          zoomOut: "#photo_controls #zoom_out"
        },
        marginMin: 0, // Min bounds 
        marginMax: 0 // Max bounds // (Setting to 0 allows larger side of image butt up to edge)
      });

    }

     // updateImage() | Unload current instance and re-init w new image
    PhotoViewer.prototype.updateSourceImage = function( imgSrc ) {

      $(this.containerDiv).zoomer("load", imgSrc);

      //grab instance of zoomer data
      this.zoomerData = $( this.containerDiv ).data("zoomer");

    };

    // preloadImgList() | Preload a list of big images (Recommended if initial load time is not a concern)
    PhotoViewer.prototype.preloadImgList= function( preloadSrcArray ) {
      
      jQuery.each(preloadSrcArray, function(i,source) { 
      
        jQuery.get(source); 
        
      });

    };

    // setPanControls() | Pass a container div to search for pan buttons
    PhotoViewer.prototype.setPanControls = function( panBtnsContainerDiv ) {

      this.leftPanBtn = $( panBtnsContainerDiv ).find("#pan_left").first();
      this.rightPanBtn = $( panBtnsContainerDiv ).find("#pan_right").first();
      this.upPanBtn = $( panBtnsContainerDiv ).find("#pan_up").first();
      this.downPanBtn = $( panBtnsContainerDiv ).find("#pan_down").first();

      var thisRef = this;

      //Listen for all button action...
      $( this.leftPanBtn ).on("mousedown", function() { thisRef.allowPan = true; thisRef.panLeft(); } );
      $( this.rightPanBtn ).on("mousedown", function() { thisRef.allowPan = true; thisRef.panRight(); } );
      $( this.upPanBtn ).on("mousedown", function() { thisRef.allowPan = true; thisRef.panUp(); } );
      $( this.downPanBtn ).on("mousedown", function() { thisRef.allowPan = true; thisRef.panDown(); } );

      $( this.leftPanBtn ).on("mouseup", function() { thisRef.allowPan = true; thisRef.panStop(); } );
      $( this.rightPanBtn ).on("mouseup", function() { thisRef.allowPan = true; thisRef.panStop(); } );
      $( this.upPanBtn ).on("mouseup", function() { thisRef.allowPan = true; thisRef.panStop(); } );
      $( this.downPanBtn ).on("mouseup", function() { thisRef.allowPan = true; thisRef.panStop(); } );

      $( this.leftPanBtn ).on("mouseout", function() { thisRef.allowPan = true; thisRef.panStop(); } );
      $( this.rightPanBtn ).on("mouseout", function() { thisRef.allowPan = true; thisRef.panStop(); } );
      $( this.upPanBtn ).on("mouseout", function() { thisRef.allowPan = true; thisRef.panStop(); } );
      $( this.downPanBtn ).on("mouseout", function() { thisRef.allowPan = true; thisRef.panStop(); } );

    };

   

    // - PAN CONTROL - //

    // panLeft() | 
    PhotoViewer.prototype.panLeft = function(  ) {

      if ( this.allowPan == false ) return;

    	this.zoomerData.targetPositionerLeft += this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panLeft(); });

    }
    
    // panRight() | 
    PhotoViewer.prototype.panRight = function(  ) {

      if ( this.allowPan == false ) return;

    	this.zoomerData.targetPositionerLeft -= this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panRight(); });

    }
    
    // panUp() | 
    PhotoViewer.prototype.panUp = function(  ) {

      if ( this.allowPan == false ) return;

    	this.zoomerData.targetPositionerTop += this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panUp(); });

    }
    
    // panDown() | 
    PhotoViewer.prototype.panDown = function(  ) {

      if ( this.allowPan == false ) return;

    	this.zoomerData.targetPositionerTop -= this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panDown(); });

    }

    // panStop() | 
    PhotoViewer.prototype.panStop = function(  ) {

      this.allowPan = false;

    }
    
    // snapToView() | Provide zoom and pan levels (0-100%) to jump to a predetermined view 
    PhotoViewer.prototype.snapToView = function( zoom, panLeft, panTop) {
    	
    	//TODO - also set zoom value
    	
    	$( this.containerDiv ).zoomer("pan", panLeft, panTop);
    	
    }
    
   
    return PhotoViewer;
    
});