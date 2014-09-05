define(['net/Language'], function( Language ){

	function ThumbGrid( containerDiv, thumbCloneDiv, configList, numCols, numRows ){
    
		this.containerDiv = containerDiv; 
		this.thumbCloneDiv = thumbCloneDiv;
		this.configList = configList;
		
		this.numCols = numCols;
		this.numRows = numRows;
						     	
    }

	// setupGrid() | Create grid by duplicating and customizing the thumbCloneDiv
    ThumbGrid.prototype.makeGrid = function() {
    
   		$( this.thumbCloneDiv ).hide(); //Take cloner thumb out of flow.
   		
   		var thumbIndex = -1;
   		        	
    	for (var r = 1; r <= this.numRows; r++) {
    		for (var c = 1; c <= this.numCols; c++) {
    				
    			var newThumb = $( this.thumbCloneDiv ).clone().appendTo( $( this.containerDiv ) );
    			
    			//add positioning styles to new thumb
    			newThumb.addClass('row_'+r+' col_'+c);
    			
    			// Set id, image and text
    			$(newThumb).show();
    			thumbIndex++;    			
    			
    			var thumbConfig = $(this.configList).eq(thumbIndex %3); //TEMP ( %3 for prototype )
    			
    			var thumbId = 'thumb_'+$(thumbConfig).attr('id');
    			var thumbTxt = Language.getTranslation( 'common_name', $(thumbConfig) ); 
    			var imgSrc = $(thumbConfig).find('images image[id="thumb"]').text();
    			
    			$(newThumb).attr('id', thumbId);
    			$(newThumb).children('#name').html(thumbTxt);
    			$(newThumb).children('img').attr('src', imgSrc);
    			
    		}
    	}
   	
    };
   
    return ThumbGrid;
    
});