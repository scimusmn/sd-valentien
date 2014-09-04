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
	
		
		//Find all swappable language
		$("#wrapper").find("p,h1,h2,h3,span").each(function(){
			
			//Retrieve translation text from translation xml
			var translationId = $(this).attr('id');
			var translationText = $( Language.translationXML ).find('text[id="'+translationId+'"]').children( languageId ).first().text(); 
			
			//Apply to html
			if (translationText != '') $(this).html( translationText );
		
		});
		
		Language.currentLanguage = languageId;
				
	}
	
	/* getCurrentLanguage() | Return the current displayed language key. */
	Language.getCurrentLanguage = function(){
	
		return Language.currentLanguage;
		
	}

	return Language;

});