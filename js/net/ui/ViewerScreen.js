define([ 'net/AppData', 'net/ui/ScreenManager' ], function( AppData, ScreenManager ){

function ViewerScreen( containerDiv ){
    
		this.containerDiv = containerDiv; 
				
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


    	$("#plantname").html(plantId + '\n' + $(plantConfig).find('text[id="common_name"]').text() );

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
    		case "btn_id_1":
    		
    		break;
    		default:
    		
    		break;
    	}
    
    };
   
    return ViewerScreen;
    
});