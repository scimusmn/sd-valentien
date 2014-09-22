define([ 'net/AppData', 'net/ui/ScreenManager', 'net/Language', 'net/ui/PhotoViewer', 'tween' ], function( AppData, ScreenManager, Language, PhotoViewer ){

function ViewerScreen( containerDiv ){
    
		this.containerDiv = containerDiv; 
		
		this.init();

        //must be after init so mouse listeners aren't removed.
        this.photoViewer = new PhotoViewer ( $(containerDiv).find('.viewer').first() );
        this.photoViewer.setPanControls( $(this.containerDiv).find("#photo_controls").first() );
        this.photoSources = [];
				     	
    }

	// init() | Set up screen layout and buttons
    ViewerScreen.prototype.init = function() {
    
    	this.refreshButtonListeners();
    	
    };
    
    // refresh() | Refresh displays as needed before showing
    ViewerScreen.prototype.refresh = function() {
    	
        this.updateFeaturePlant( AppData.featuredPlant );

    };
    
    // updateFeaturePlant() | Update displays this new plant
    ViewerScreen.prototype.updateFeaturePlant = function( plantId ){

        var plantConfig = $(AppData.configXML).find('plants plant[id="'+plantId+'"]').first();
        
        //Load images
        var paintingSrc = $(plantConfig).find("images image[id='painting']").first().text();
        var collectionsSrc = $(plantConfig).find("images image[id='collections']").first().text();
        var natureSrc = $(plantConfig).find("images image[id='nature']").first().text();

        //Set info text for this plant
        var common = Language.getTranslation( 'common_name', $(plantConfig) ); 
        var scientific = Language.getTranslation( 'scientific_name', $(plantConfig) ); 
        var description = Language.getTranslation( 'description', $(plantConfig) ); 
                
        $("#info_container #common_name").html( common );
        $("#info_container #scientific_name").html( scientific );
        $("#info_container #description").html( description );
        
        //Add filter attribute to text so translations are specific to this plant
        $("#info_container #common_name").attr("data-filter-id", plantId);
        $("#info_container #scientific_name").attr("data-filter-id", plantId);
        $("#info_container #description").attr("data-filter-id", plantId);

        this.photoSources = [paintingSrc, collectionsSrc, natureSrc];
        this.photoViewer.updateSourceImage( this.photoSources[0] );

        //TODO - Pre-loading photos?

        this.hidePhotoDisplay();

    };

    // showPhotoDisplay() | Reset and show current plant photos
    ViewerScreen.prototype.showPhotoDisplay = function( plantId ){

        $('#viewer').show();

    };

    // hidePhotoDisplay() | Hide current plant photos
    ViewerScreen.prototype.hidePhotoDisplay = function( plantId ){

         //TODO - Unload photo viewer

        $('#viewer').hide();

    };

    // transitionIn() | Tween in display elements
    ViewerScreen.prototype.transitionIn = function( ){
        
        //screen
        TweenLite.to( $( this.containerDiv ), 1, { css: { left:0 }, delay:0, ease:Power2.easeIn } );

        //controls bar
        TweenLite.set( $("#controls_bar"), { css: { bottom: -170, opacity:0 } } );
        TweenLite.to( $("#controls_bar"), 1, { css: { bottom:0, opacity:1 }, delay:1.1, ease:Power2.easeOut } );

        //home bar
        TweenLite.set( $("#home_bar"), { css: { bottom: -70 } } );
        TweenLite.to( $("#home_bar"), 1, { css: { bottom:0 }, delay:1.2, ease:Power2.easeOut } );

        //Fade in loader
        TweenLite.set( $("#loader"), { css: { opacity: 0 } } );
        TweenLite.to( $("#loader"), 0.75, { css: { opacity: 1 }, delay:0.8, ease:Power2.easeIn } );

        //Fade in plant info
        TweenLite.set( $("#info_container"), { css: { opacity: 0 }} );
        TweenLite.delayedCall( 3, function() {
                
            TweenLite.to( $("#info_container"), 1.75, { css: { opacity: 1 }, ease:Power2.easeInOut } );
            
        }); 

        //Wait for transition to complete before displaying photo
        var thisRef = this;
        TweenLite.delayedCall(2.5, function() {
                
            thisRef.showPhotoDisplay();
            
        }); 

    }

    // transitionOut() | Tween out display elements
    ViewerScreen.prototype.transitionOut = function( ){

        TweenLite.to( $( this.containerDiv ), 1, { css: { left:1080 }, delay:0.4, ease:Power2.easeIn } );

        //controls bar
        TweenLite.to( $("#controls_bar"), 0.5, { css: { bottom:-170, opacity:0 }, ease:Power2.easeIn } );

        //home bar
        TweenLite.to( $("#home_bar"), 0.5, { css: { bottom:-70 }, delay:0.1, ease:Power2.easeIn } );

        //Hide loader
        TweenLite.set( $("#loader"), { css: { opacity: 0 } } );

        //Plant info
        TweenLite.to( $("#info_container"), .25, { css: { opacity: 0 }, ease:Power2.easeInOut } );

        //fade out photo
        this.photoViewer.hidePhoto();

    }
    
    // refreshButtonListeners() | Listen to all buttons on this screen
    ViewerScreen.prototype.refreshButtonListeners = function(){
    	
    	var thisRef = this;
    	
    	//Removes all existing listeners to avoid doubling listeners
    	this.disableButtonListeners();
    	
    	//Listen for all button clicks...
    	$(this.containerDiv).find("[data-role='button']").on("click", function(event) {
    	
    		thisRef.buttonClicked( $(this).attr('id'), $(this) );
    		
    	});
    	
    };
    
    // disableButtonListeners() | Remove all current button listeners
    ViewerScreen.prototype.disableButtonListeners = function() {
    
    	$(this.containerDiv).find("[data-role='button']").each( function () {
    	
    		$(this).off();	
    		
    	});
    
    }
    
    // buttonClicked() | All click events for this screen shall pass through here
    ViewerScreen.prototype.buttonClicked = function(btnId, btnRef) {
    
    	console.log("buttonClicked(btnId): " + btnId);
    	
    	//Plant Thumbs
    	if (btnId.substring(0, 6) == "thumb_") {
    	
    		var plantId = btnId.substring(6);
    		this.featurePlant(plantId);
    		return;
    		
    	}
    	
    	//other btns...
    	switch (btnId) {
    		case "snap_to_1":
    			this.photoViewer.snapToView(50, 70, 15);//zoom,x,y
    		break;
            case "snap_to_2":
                this.photoViewer.snapToView(77, 44, 32);
            break;
            case "snap_to_3":
                this.photoViewer.snapToView(50, 10, 88);//zoom,x,y
            break;
            case "snap_to_4":
                this.photoViewer.snapToView(77, 88, 88);
            break;
    		case "home_bar":
                ScreenManager.showScreen( ScreenManager.SCREEN_MAIN ); 
    		break;
    		case "btn_view_painting":
                this.photoViewer.updateSourceImage( this.photoSources[0] );
    		break;
    		case "btn_view_collections":
    			this.photoViewer.updateSourceImage( this.photoSources[1] );
    		break;
    		case "btn_view_nature":
    			this.photoViewer.updateSourceImage( this.photoSources[2] );
    		break;
    		default:
    		
    		break;
    	}
    
    };
   
    return ViewerScreen;
    
});