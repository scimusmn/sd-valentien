define(['net/AppData'], function(AppData){

    //Track current language
    Language.translationXML = {};
    Language.currentLanguage = '';

    //Language Keys
    Language.ENGLISH = 'en';
    Language.SPANISH = 'es';

    function Language( ){

    }

    /* setupTranslations() | Accepts xml to be searched. */
    Language.setupTranslations = function( xml ){

        Language.translationXML = xml;

        //TODO - Could run through all html text on init to create filtered list of text that actually requires translation

        //default to english
        Language.setLanguage(Language.ENGLISH);

    }

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

                //filtered
                translationText = Language.getTranslation( $(this).attr('id'), $(Language.translationXML).find("[id='"+filterId+"']") );

            } else {

                //unfiltered (search entire xml)
                translationText = Language.getTranslation( $(this).attr('id'), Language.translationXML );

            }

            //Apply to html
            if (translationText != '') $(this).html( translationText );

        });

    }

    /* getTranslationById() | Find specific translation text in XML. */
    Language.getTranslation = function( translationId, fromConfig ){

        var translationText = $( fromConfig ).find('text[id="'+translationId+'"]').children( Language.currentLanguage ).first().text();
        return translationText;

    }

    /* getCurrentLanguage() | Return the current displayed language key. */
    Language.getCurrentLanguage = function(){

        return Language.currentLanguage;

    }

    return Language;

});
