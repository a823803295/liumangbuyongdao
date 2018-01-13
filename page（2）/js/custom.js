/*------------------------------------------------------------------
Project:        Gonex - HTML onepage theme
Version:        1.0
Last change:    14/07/2017
Author:         GraphBerry
URL:            #
License:        #/pages/license
-------------------------------------------------------------------*/
$(function(){
	'use strict';


	/*--------------------------------------------------
    Scrollspy Bootstrap 
    ---------------------------------------------------*/

    $('body').scrollspy({
    	target: '#header',
    	offset: 85
    });


	/*--------------------------------------------------
    Smooth Scroll 
    ---------------------------------------------------*/

	smoothScroll.init({
		selector: '.smoothScroll',
		speed: 1000,
		offset: 85,
		before: function(anchor, toggle){
			// Check if mobile navigation is active
			var query = Modernizr.mq('(max-width: 767px)');
			// Check if element is navigation eelement
			var navItem = $(toggle).parents("#main-navbar").length;
			// If mobile nav & nav item then close nav
			if (query && navItem !== 0) {
				$("button.navbar-toggle").click();
			}
		}
	});


	/*--------------------------------------------------
    Search Toggle
    ---------------------------------------------------*/
	
    $('#btn-togglesearch').click(function(){
    	$(this).find('.ico-search-icon').toggleClass('text-green')
    	$('#search-input').toggleClass('search-active');
    	$('#search-input>input').focus();
    });


    /*--------------------------------------------------
    Mixitup
    ---------------------------------------------------*/

    var mixer = mixitup('#works-grid', {

		selectors: {
			control: '[data-mixitup-control]'
		}
		
	});


    /*--------------------------------------------------
    Works Gallery: Grid and image calculation
    ---------------------------------------------------*/

    var calcGrid = function() {

    	var queryMedium = Modernizr.mq('(min-width: 992px)');
    	var querySmall = Modernizr.mq('(min-width: 480px)');

    	var windowWidth = ($('.grid').width());
	    var itemHeight2 = (windowWidth/100)*30;
	    var itemHeight = itemHeight2/2;

    	if(queryMedium) {
		    $('.grid-item').height(itemHeight);
		    $('.grid-item.-height2').height(itemHeight2);
    	} else if(querySmall) {
    		$('.grid-item').height(windowWidth/2);
		    $('.grid-item.-height2').height(windowWidth/2);
    	} else {
    		$('.grid-item').height(windowWidth);
		    $('.grid-item.-height2').height(windowWidth);
    	}

	}

	var calcImg = function () {
		$(".grid-item>img").each(function(i, img) {

			// Reset to default 
			// on window resize
			$(img).css({
				width: '100%',
				height: 'auto',
				marginLeft: 0
			});

		    if($(img).height() < $(img).parent().height()) {
		    	$(img).css({
		    		height: '100%',
		    		width: 'auto',
		    		marginLeft: function(){
		    			return (($(img).parent().width() - $(img).width()) / 2)
		    		}
		    	});
		    }

		});
	}

	calcGrid();
	$.when(calcGrid).then(calcImg);

	// Change Gallery layout on window resize
	$(window).on("resize", function(){
		calcGrid();
		$.when(calcGrid).then(calcImg);
	});

	/*--------------------------------------------------
    Current Year
    ---------------------------------------------------*/

    // Automatically update copyright year in the footer
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	$("#year").text(year);


	/*--------------------------------------------------
    Bootstrap Modal Google Map
    ---------------------------------------------------*/

	$("#map-modal").one("shown.bs.modal", function () {
	    initMap();
	});

});