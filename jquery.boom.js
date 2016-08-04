(function( $ ){

    "use strict";

    var start = false;
    $.fn.boom = function ( options ) 
    {
        if ( this.length == 0 ) return;

        var $root = $( this ); //корневой элемент
        

        var settings = $.extend( {
            'elem'      : '.boom',
            'fromY'     : parseInt($root.height() / 2),
            'fromX'     : parseInt($root.width() / 2),
            'factor'    : 50 // кол-во пикс. для постр скролла
        }, options);

        var $el = $( $root.selector + " " + settings.elem );

        if ( $el.length == 0 ) return;


        var scrollBottom = $(window).scrollTop() + $(window).height();
        var elTop = $root.offset().top;
        var elBottom = $root.offset().top + $root.outerHeight(true) + settings.factor;

        if( scrollBottom >= elTop && scrollBottom <= elBottom ) { // если всё в пределах корневого элемента то двигаем
            
            var percent = (elBottom - elTop) / 100;
            var position = parseInt( (scrollBottom - elTop) / percent );
            //console.log(position);

            $.each($el, function (e, i) {
                if ( !start ) {
                    $(this).data('endY', $(this).css('top'));
                    $(this).data('endX', $(this).css('left'));
                }

                var x = ( settings.fromX - ( ( ( settings.fromX - parseInt( $(this).data('endX') ) ) / 100 ) * position) );
                var y = ( settings.fromY - ( ( ( settings.fromY - parseInt( $(this).data('endY') ) ) / 100 ) * position) );
                
                $(this).css('left', x);
                $(this).css('top', y);
            });
            start = true; // флаг для запоминания
            
        }
    };
})( jQuery );
