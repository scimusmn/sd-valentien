define(['net/AppData'], function(AppData){

    //Track current language
    Language.translationXML = {};
    Language.currentLanguage = '';

    //Language Keys
    Language.ENGLISH = 'en';
    Language.SPANISH = 'es';

    function Language( ){

    }

    /* setupToggle() | Set up a button for language toggling */
    Language.setupToggle = function( uniqueId ){

        this.toggleBtn = $(uniqueId);
        this.toggleTxt = $(this.toggleBtn).find("h3");

        //use language button to switch between english and spandish
        $( this.toggleBtn ).on( "click", function(){

            if ( Language.getCurrentLanguage() == Language.ENGLISH ) {
                $(this.toggleTxt).html("English");
                Language.setLanguage( Language.SPANISH );
            } else {
                $(this.toggleTxt).html("Español");
                Language.setLanguage( Language.ENGLISH );
            }

        });

    };

    /* setupTranslations() | Accepts xml to be searched. */
    Language.setupTranslations = function( xml ){

        Language.translationXML = xml;

        //Default to english
        Language.setLanguage(Language.ENGLISH);

    };

    /* setLanguage() | Find and replace all text by translation ids */
    Language.setLanguage = function( languageId ){

        Language.currentLanguage = languageId;

        //Find all swappable language
        $("#wrapper").find("p,h1,h2,h3,span").each(function(){

            var translationText = "";

            //Filter-id (optional) used to narrow translation search
            var filterId = $(this).attr('data-filter-id');

            //Retrieve translation text from translation xml
            if (filterId != undefined && filterId != '') {

                //Filtered
                translationText = Language.getTranslation( $(this).attr('id'), $(Language.translationXML).find("[id='"+filterId+"']") );

            } else {

                //Unfiltered (search entire xml)
                translationText = Language.getTranslation( $(this).attr('id'), Language.translationXML );

            }

            //Apply to html
            if (translationText != '') $(this).html( translationText );

        });

    };

    /* getTranslationById() | Find specific translation text in XML. */
    Language.getTranslation = function( translationId, fromConfig ){

        var translationText = $( fromConfig ).find('text[id="'+translationId+'"]').children( Language.currentLanguage ).first().text();
        return translationText;

    };

    /* getCurrentLanguage() | Return the current displayed language key. */
    Language.getCurrentLanguage = function(){

        return Language.currentLanguage;

    };

    return Language;

});
