define([ 'net/AppData'], function( AppData ){


    function ScreenManager(){
    	
    }
    
    //Constants
    ScreenManager.SCREEN_MAIN = 'main';
    ScreenManager.SCREEN_VIEWER = 'viewer';

     ScreenManager.ddddd = "ddd";
    
    ScreenManager.init = function(){

    	//Init screens
    	this.screens = []; 

    };
    
    ScreenManager.addScreen = function(screen){
    	this.screens.push(screen);
    }
    
    ScreenManager.showScreen = function( screenContainerId ) {
        	
        console.log("ScreenManager.showScreen: " + screenContainerId);
        			
		//hide current screen
		if(this.currentScreen) {
			$(this.currentScreen.containerDiv).hide();
		} else {
			$("#screen_"+screenContainerId).parent().children("div[id^='screen_']").each( function () {
				$(this).hide();
			});
		}
						
		switch (screenContainerId) {
		
			case ScreenManager.SCREEN_MAIN:
				this.currentScreen = this.screens[0];
			break;
			case ScreenManager.SCREEN_VIEWER:
				this.currentScreen = this.screens[1];
			break;
		  	
		}
		
		//update app data
		AppData.setCurrentScreen( screenContainerId );
		
		//Do any preparation before transition
		this.currentScreen.refresh();
		
		//show new screen
		$(this.currentScreen.containerDiv).show();
					
    }

    return ScreenManager;
    
});