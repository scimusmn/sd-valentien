define([ 'net/AppData', 'net/ui/ScreenManager', 'net/Language', 'net/ui/PhotoViewer' ], function( AppData, ScreenManager, Language, PhotoViewer ){

function ViewerScreen( containerDiv ){
    
		this.containerDiv = containerDiv; 
		
		this.photoViewer = new PhotoViewer ( $(containerDiv).find('.viewer').first() );
		
		/*		
		var preloadImgList = [];
		$(AppData.configXML).find('plants plant images image[id!="thumb"]').each(function() { preloadImgList.push($(this).text()) });
		this.photoViewer.preloadImgList( preloadImgList );
		*/
				
		this.init();
				     	
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
        
        //Update PhotoViewer with new images
        this.photoViewer.updateImages([paintingSrc, collectionsSrc, natureSrc]);
        
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

    };
    
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
    		case "pan_left":
    			this.photoViewer.panLeft();
    		break;
    		case "pan_right":
    			this.photoViewer.panRight();
    		break;
    		case "pan_up":
    			this.photoViewer.panUp();
    		break;
    		case "pan_down":
    			this.photoViewer.panDown();
    		break;
    		case "snap_to_1":
    			this.photoViewer.snapToView(50, 70, 15);
    		break;
    		case "home_bar":
    			ScreenManager.showScreen( ScreenManager.SCREEN_MAIN );
    		break;
    		case "btn_view_painting":
    			this.photoViewer.jumpToPhoto(0);
    		break;
    		case "btn_view_collections":
    			this.photoViewer.jumpToPhoto(1);
    		break;
    		case "btn_view_nature":
    			this.photoViewer.jumpToPhoto(2);
    		break;
    		default:
    		
    		break;
    	}
    
    };
   
    return ViewerScreen;
    
});