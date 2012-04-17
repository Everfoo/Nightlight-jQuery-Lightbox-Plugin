(function($) {
	$.fn.nightlight = function(options) {
		var settings = $.extend({
			'height': 300,
			'width': 300,
			'opacity': '0.7',
			'closeImage': 'close.png',
			'id': Math.floor(Math.random()*101)
		}, options);

		var divOverlay = '<div id="nl_Overlay_' + settings.id + '"></div>';
		var divPopup = '<div id="nl_Popup_' + settings.id + '"><div id="nl_PopupClose_' + settings.id + '"></div><div id="nl_PopupContent_' + settings.id + '"></div></div>';

		$(divOverlay).css({
			"background-color": "black",
			"opacity": settings.opacity, 
			/* Don't change values below */
			"position": "absolute",		
			"margin": $(this).css("margin"),
			"padding": $(this).css("padding"),			
			"top": $(this).position().top,
			"left": $(this).position().left,
			"height": $(this).height(),
			"width": $(this).width()
		}).appendTo("body");

		if (settings.focused == "true") {
			$(divPopup).css({
				"background-color": "white",
				/* Don't change values below */			
				"position": "absolute",
				"margin": $(this).css("margin"),
				"padding": $(this).css("padding"),								
				"height": ($("#nl_Overlay_" + settings.id).height() - 20) + "px",
				"width": ($("#nl_Overlay_" + settings.id).width() - 20) + "px",
		   		"top": ($("#nl_Overlay_" + settings.id).position().top + 10) + "px",
		    	"left": ($("#nl_Overlay_" + settings.id).position().left + 10) + "px"	
			}).appendTo("body").fadeIn();		    	
		} else {
			$(divPopup).css({
				"background-color": "white",
				/* Don't change values below */
				"position": "absolute",
				"height": settings.height + "px",
				"width": settings.width + "px",
		   		"top": ($("#nl_Overlay_" + settings.id).height() - settings.height) / 2 + $("#nl_Overlay_" + settings.id).position().top + "px",
		    	"left": ($("#nl_Overlay_" + settings.id).width() - settings.width) / 2 + $("#nl_Overlay_" + settings.id).position().left + "px"
			}).appendTo("body").fadeIn();		    	
		}

		$("#nl_PopupClose_" + settings.id).css({
			"float": "right",
			"overflow": "hidden",
			"margin": "10px",
			"height": "29px",
			"width": "29px",
			"cursor": "pointer",
			"background": "url('" + settings.closeImage +"')"
		});		

		if (settings.text) {
			$(settings.html).appendTo("#nl_PopupContent" + settings.id);
		}

		if (settings.html) {
			$(settings.html).appendTo("#nl_PopupContent" + settings.id);
		}

		if (settings.url) {
			$.get(settings.url, function(data) {
				$(data).appendTo("#nl_PopupContent" + settings.id);
			});
		}


		$("#nl_PopupClose_" + settings.id).click(function() {
			$("#nl_Overlay_" + settings.id).remove();
			$("#nl_Popup_" + settings.id).remove();
		});

		$(window).resize(function() {
			$("#nl_Overlay_" + settings.id).css({
				/* Don't change values below */	
				"top": $(this).position().top,
				"left": $(this).position().left,
				"height": $(this).height(),
				"width": $(this).width()
			});
			
			$("#nl_Popup_" + settings.id).css({
				/* Don't change values below */
				"height": settings.height + "px",
				"width": settings.width + "px",
		   		"top": ($(this).height() - settings.height) / 2 + $(this).position().top + "px",
		    	"left": ($(this).width() - settings.width) / 2 + $(this).position().left + "px"
			});	
		});
	}
})(jQuery);