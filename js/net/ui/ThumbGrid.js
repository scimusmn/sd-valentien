define(['net/Language', 'tween'], function( Language ){

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

                $(newThumb).show();
                thumbIndex++;

                var numConfigs = $(this.configList).length;
                var thumbConfig = $(this.configList).eq(thumbIndex%numConfigs); //TEMP ( %numConfigs for prototype )

                // Set id, image and text
                var thumbId = 'thumb_'+$(thumbConfig).attr('id');
                var thumbTxt = Language.getTranslation( 'common_name', $(thumbConfig) );
                var imgSrc = $(thumbConfig).find('images image[id="thumb"]').text();
                $(newThumb).attr('id', thumbId);
                $(newThumb).children('#common_name').html(thumbTxt);
                $(newThumb).children('img').attr('src', imgSrc);

                //Add filter attribute so translations are specific to this thumb
                $(newThumb).children('#common_name').attr("data-filter-id", $(thumbConfig).attr('id'));

            }
        }

        //Attach rollover listeners to all thumbs
        $(document).on("mouseenter", "#screen_main .thumb", function() {

            $( this ).children("#overlay").stop().fadeIn('fast');
            $( this ).children("p").stop().fadeIn('slow');

            TweenLite.to( $(this).children("p"), 0.4, { delay:0.1, css: { bottom: -10 }, ease:Power2.easeOut } );

        });
        $(document).on("mouseleave", "#screen_main .thumb", function() {

            $( this ).children("#overlay").stop().fadeOut('fast');
            $( this ).children("p").stop().fadeOut('fast');

            TweenLite.to( $(this).children("p"), 0.25, { css: { bottom: -20 }, ease:Power2.easeOut } );

        });

    };

    return ThumbGrid;

});
