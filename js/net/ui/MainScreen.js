define([ 'net/AppData', 'net/ui/ThumbGrid', 'net/ui/ScreenManager', 'tween' ], function( AppData, ThumbGrid, ScreenManager, MainScreen, ViewerScreen ){

	function MainScreen( containerDiv ){
    
		this.containerDiv = containerDiv; 
		
		this.thumbGrid = {};
		this.init();
				     	
    }

	// init() | Set up screen layout and buttons
    MainScreen.prototype.init = function() {
    	
    	this.thumbGrid = new ThumbGrid( $("#main_nav_grid"), $("#main_nav_grid #thumb_clone"), $(AppData.configXML).find("component plants plant"), 5, 6 );
    	this.thumbGrid.makeGrid();
    	
    	this.refreshButtonListeners();
    	   		
    };
    
    // refresh() | Refresh displays as needed before showing
    MainScreen.prototype.refresh = function() {

    	this.resetGrid ();

    };

    // resetGrid() | Reset visual states of thumb grid
    MainScreen.prototype.resetGrid = function() {
    	
    	$("#main_nav_grid .thumb").each( function() {
			TweenLite.set( $(this), { css: { zIndex: 0, opacity:1, scale:1, boxShadow:"0px 0px 0px 0px rgba(0,0,0,0)" } } );
    	});  

    };

    // transitionIn() | Tween in display elements
    MainScreen.prototype.transitionIn = function( ){

    	TweenLite.delayedCall(1.5, function(){

    		TweenLite.to( $( "#main_nav_grid" ), 1, { css: { left:0 }, ease:Power2.easeOut } );
			TweenLite.to( $( "#screen_main .content-left" ), 1, { css: { left:0 }, delay:0.2, ease:Power2.easeOut } );

    	});

    }

    // transitionOut() | Tween out display elements
    MainScreen.prototype.transitionOut = function( ){
        
        TweenLite.to( $( "#main_nav_grid" ), 1, { css: { left:-1080 }, ease:Power2.easeIn } );
		TweenLite.to( $( "#screen_main .content-left" ), 1, { css: { left:-1080 }, delay:0.2, ease:Power2.easeIn } );

    }
    
    // featurePlant() | Transition to viewer screen with selected plant
    MainScreen.prototype.featurePlant = function( plantId, plantThumbBtn ){

       	//Tell Viewer screen to setting up plant info
       	AppData.setFeaturePlant( plantId );

       	ScreenManager.showScreen( ScreenManager.SCREEN_VIEWER );

    };
    
	// refreshButtonListeners() | Listen to all buttons on this screen
	MainScreen.prototype.refreshButtonListeners = function(){
		
		var thisRef = this;
		
		//Removes all existing listeners to avoid doubling listeners
		this.disableButtonListeners();
		
		//Listen for all button clicks...
		$(this.containerDiv).find("[data-role='button']").on("click", function(event) {
		
			thisRef.buttonClicked( $(this).attr('id'), $(this) );

		});
		
	};
	
	// disableButtonListeners() | Remove all current button listeners
	MainScreen.prototype.disableButtonListeners = function() {
	
		$(this.containerDiv).find("[data-role='button']").each( function () {
		
			$(this).off();
			
		});
	
	}
	
	// buttonClicked() | All click events for this screen shall pass through here
	MainScreen.prototype.buttonClicked = function(btnId, btnRef) {
	
		console.log("buttonClicked(btnId): " + btnId);
		
		//Plant Thumbs
		if (btnId.substring(0, 6) == "thumb_") {
		
			var plantId = btnId.substring(6);
			this.featurePlant(plantId, btnRef);
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
	
    return MainScreen;
    
});