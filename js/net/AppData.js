define([], function(){


    function AppData(){
		
		this.configXML = {};
		
    }
	
    AppData.updateSettings = function(configXML){
    
    	this.configXML = configXML;
    	
    	this.developerMode = ($(this.configXML).find('setting[id=developerMode]').attr('value') == "true");
    	
    	//how to set string setting
//    	this.EXAMPLE_SETTING = $(this.configXML).find('setting[id=EXAMPLE_SETTING_ID]').attr('value');
    	
    };
    
    AppData.setCurrentState = function(stateId){
    
    	this.currentStateId = stateId;
    	
    };

    return AppData;
    
});