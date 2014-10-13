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

      //Grab instance of zoomer data
      this.zoomerData = $( this.containerDiv ).data("zoomer");

      //Listen for enabling/disabling zoom buttons
      var thisRef = this;
      $( this.zoomerData.controls.$zoomIn ).on("click", function() { thisRef.checkControlsNecessity(); } );
      $( this.zoomerData.controls.$zoomOut ).on("click", function() { thisRef.checkControlsNecessity(); } );

    };

     // updateImage() | Unload current instance and re-init w new image
    PhotoViewer.prototype.updateSourceImage = function( imgSrc ) {

      $(this.containerDiv).zoomer("load", imgSrc);

    };

    // enableInitialControlStates () | Disable various controls to match beginning zoom state
    PhotoViewer.prototype.enableInitialControlStates = function( ) {

      this.toggleControls( true );
      this.toggleDoubleClickZoom( true );

      TweenLite.set( $(this.zoomerData.controls.$zoomOut), { css: { opacity:0.3 } } );

      TweenLite.set( $(this.rightPanBtn), { css: { opacity:0.3 } } );
      TweenLite.set( $(this.leftPanBtn), { css: { opacity:0.3 } } );
      TweenLite.set( $(this.downPanBtn), { css: { opacity:0.3 } } );
      TweenLite.set( $(this.upPanBtn), { css: { opacity:0.3 } } );

    };

    // checkControlsNecessity() | Disable various controls based on current zoom/pan state
    PhotoViewer.prototype.checkControlsNecessity = function( ) {

      var curScale = this.getCurrentScale();

      //Check zoom controls
      if ( curScale[0] > 0.99 && curScale[1] > 0.99 ){
        //Cannot zoom in further
        TweenLite.set( $(this.zoomerData.controls.$zoomIn), { css: { opacity:0.3 } } );
      } else {
        TweenLite.set( $(this.zoomerData.controls.$zoomIn), { css: { opacity:1.0 } } );
      }

      var maxZoomOut = true;

      if (this.zoomerData.targetImageWidth==this.zoomerData.minWidth){
        //Cannot zoom out further
        TweenLite.set( $(this.zoomerData.controls.$zoomOut), { css: { opacity:0.3 } } );
      } else {
        TweenLite.set( $(this.zoomerData.controls.$zoomOut), { css: { opacity:1.0 } } );
        maxZoomOut = false;
      }

      //Check pan controls
      if (maxZoomOut || this.zoomerData.targetPositionerLeft <= this.zoomerData.boundsLeft) {
        //cannot pan right
        TweenLite.set( $(this.rightPanBtn), { css: { opacity:0.3 } } );
      } else {
        TweenLite.set( $(this.rightPanBtn), { css: { opacity:1 } } );
      }
      if (maxZoomOut ||  this.zoomerData.targetPositionerLeft >= this.zoomerData.boundsRight) {
        //cannot pan left
        TweenLite.set( $(this.leftPanBtn), { css: { opacity:0.3 } } );
      } else {
        TweenLite.set( $(this.leftPanBtn), { css: { opacity:1 } } );
      }
      if (maxZoomOut ||  this.zoomerData.targetPositionerTop <= this.zoomerData.boundsTop) {
        //cannot pan down
        TweenLite.set( $(this.downPanBtn), { css: { opacity:0.3 } } );
      } else {
        TweenLite.set( $(this.downPanBtn), { css: { opacity:1 } } );
      }
      if (maxZoomOut ||  this.zoomerData.targetPositionerTop >= this.zoomerData.boundsBottom) {
        //cannot pan up
        TweenLite.set( $(this.upPanBtn), { css: { opacity:0.3 } } );
      } else {
        TweenLite.set( $(this.upPanBtn), { css: { opacity:1 } } );
      }

    };

    // hidePhoto() | Fade out current photo
    PhotoViewer.prototype.hidePhoto = function(  ) {

      // $( this.containerDiv ).zoomer("unload");

        $(this.containerDiv).zoomer("load", ''); //Give blank src to take advantage of atuo-fade

    };

    // enableDoubleClickZoom() | Attach double-click zoom listener to zoomer container
    PhotoViewer.prototype.toggleDoubleClickZoom = function( enable ) {

      $( this.containerDiv ).off( "dblclick" );

      if ( enable ) {

        var thisRef = this;
        $( this.containerDiv ).on( "dblclick", function() {

          var x = event.pageX - this.offsetLeft;
          var y = event.pageY - this.offsetTop;
          thisRef.snapZoom(x,y);

        });

      }

    };

    // toggleControls() | Show/Hide active state of all controls
    PhotoViewer.prototype.toggleControls = function( enable ) {

      if ( enable ) {

        $(this.zoomerData.controls.$zoomIn).show();
        $(this.zoomerData.controls.$zoomOut).show();

        $(this.leftPanBtn).show();
        $(this.rightPanBtn).show();
        $(this.upPanBtn).show();
        $(this.downPanBtn).show();

      } else {

        $(this.zoomerData.controls.$zoomIn).hide();
        $(this.zoomerData.controls.$zoomOut).hide();

        $(this.leftPanBtn).hide();
        $(this.rightPanBtn).hide();
        $(this.upPanBtn).hide();
        $(this.downPanBtn).hide();

      }

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

     // getCurrentScale() | Return scale of current image
     PhotoViewer.prototype.getCurrentScale = function(  ) {

      var scaleX = this.zoomerData.imageWidth / this.zoomerData.naturalWidth;
      var scaleY = this.zoomerData.imageHeight / this.zoomerData.naturalHeight;
      return [scaleX, scaleY];

     };


    // - ZOOM CONTROL - //
    // snapZoom() |
    PhotoViewer.prototype.snapZoom = function( top, left ) {

      //Animate 250 ms zoom
      var thisRef = this;

      this.zoomerData.controls.$zoomIn.trigger("mousedown");
      setTimeout(function(){
        thisRef.zoomerData.controls.$zoomIn.trigger("mouseup");
        thisRef.checkControlsNecessity();
      }, 250);

    };


    // - PAN CONTROL - //
    // panLeft() |
    PhotoViewer.prototype.panLeft = function(  ) {

      if ( this.allowPan == false ) return;

        this.zoomerData.targetPositionerLeft += this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panLeft(); });

      this.checkControlsNecessity();

    };

    // panRight() |
    PhotoViewer.prototype.panRight = function(  ) {

      if ( this.allowPan == false ) return;

        this.zoomerData.targetPositionerLeft -= this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panRight(); });

      this.checkControlsNecessity();

    };

    // panUp() |
    PhotoViewer.prototype.panUp = function(  ) {

      if ( this.allowPan == false ) return;

        this.zoomerData.targetPositionerTop += this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panUp(); });

      this.checkControlsNecessity();

    };

    // panDown() |
    PhotoViewer.prototype.panDown = function(  ) {

      if ( this.allowPan == false ) return;

        this.zoomerData.targetPositionerTop -= this.panIncrement;

      var thisRef = this;
      this.panTimer = TweenLite.delayedCall(this.panSpeed, function(){ thisRef.panDown(); });

      this.checkControlsNecessity();

    };

    // panStop() |
    PhotoViewer.prototype.panStop = function(  ) {

      this.allowPan = false;

    };

    return PhotoViewer;

});
