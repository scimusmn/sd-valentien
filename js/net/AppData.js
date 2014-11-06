define([], function(){

    function AppData(){

        this.configXML = {};

    }

    AppData.updateSettings = function(configXML){

        this.configXML = configXML;

        this.developerMode = ($(this.configXML).find('setting[id=developerMode]').attr('value') == "true");
        this.screensaverTimeout = parseFloat( $(this.configXML).find('setting[id=screensaverTimeout]').attr('value') );
        this.infoHideTimeout = parseFloat( $(this.configXML).find('setting[id=infoHideTimeout]').attr('value') );

        //this.EXAMPLE_SETTING = $(this.configXML).find('setting[id=EXAMPLE_SETTING_ID]').attr('value');

    };

    AppData.setCurrentScreen = function(screenId){

        this.currentScreenId = screenId;

    };

    AppData.setFeaturePlant = function(plantId){

        this.featuredPlant = plantId;

    };

    return AppData;

});
