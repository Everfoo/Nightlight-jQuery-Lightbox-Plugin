(function($) {
	$.fn.nightlight = function(options) {
		var parentContainer = $(this);

		var settings = $.extend({
			'height': 300,
			'width': 300,
			'opacity': '0.7',
			'closeImage': 'close.png'
		}, options);

		if (settings.id) {
			var idOverlay = settings.id + "_Overlay";
			var idPopup = settings.id;
			var idPopupContent = settings.id + "_Content";
			var idPopupClose = settings.id + "_PopupClose";
			var attrIdOverlay = "#" + settings.id + "_Overlay";
			var attrIdPopup = "#" + settings.id;
			var attrIdPopupContent = "#" + settings.id + "_Content";
			var attrIdPopupClose = "#" + settings.id + "_PopupClose";
	
		} else {
			settings.id = Math.floor(Math.random()*101);
			var idOverlay = "nl_Overlay_" + settings.id;
			var idPopup = "nl_Popup_" + settings.id;
			var idPopupContent = "nl_PopupContent_" + settings.id;
			var idPopupClose = "nl_PopupClose_" + settings.id;
			var attrIdOverlay = "#nl_Overlay_" + settings.id;
			var attrIdPopup = "#nl_Popup_" + settings.id;
			var attrIdPopupContent = "#nl_PopupContent" + settings.id;
			var attrIdPopupClose = "#nl_PopupClose_" + settings.id;
		}

		var divOverlay = '<div id="' + idOverlay + '"></div>';
		var divPopup = '<div id="' + idPopup + '"><div id="' + idPopupClose + '"></div><div id="' + idPopupContent + '"></div></div>';

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
				"height": ($(attrIdOverlay).height() - 20) + "px",
				"width": ($(attrIdOverlay).width() - 20) + "px",
		   		"top": ($(attrIdOverlay).position().top + 10) + "px",
		    	"left": ($(attrIdOverlay).position().left + 10) + "px"	
			}).appendTo("body").fadeIn();		    	
		} else {
			$(divPopup).css({
				"background-color": "white",
				/* Don't change values below */
				"position": "absolute",
				"height": settings.height + "px",
				"width": settings.width + "px",
		   		"top": ($(attrIdOverlay).height() - settings.height) / 2 + $(attrIdOverlay).position().top + "px",
		    	"left": ($(attrIdOverlay).width() - settings.width) / 2 + $(attrIdOverlay).position().left + "px"
			}).appendTo("body").fadeIn();		    	
		}


		$(attrIdPopupClose).css({
			"float": "right",
			"overflow": "hidden",
			"margin": "10px",
			"height": "29px",
			"width": "29px",
			"cursor": "pointer",
			"background": "url('" + settings.closeImage +"')"
		});		

		if (settings.text) {
			$(settings.html).appendTo(attrIdPopupContent);
		}

		if(settings.html) {
			$(settings.html).appendTo(attrIdPopupContent);
		}

		if (settings.url) {
			$.get(settings.url, function(data) {
				$(data).appendTo(attrIdPopupContent);
			});
		}


		$(attrIdPopupClose).click(function() {
			$(attrIdOverlay).remove();
			$(attrIdPopup).fadeOut().remove();
		});

		$(window).resize(function() {
			$(attrIdOverlay).css({
				/* Don't change values below */	
				"top": $(parentContainer).position().top,
				"left": $(parentContainer).position().left,
				"height": $(parentContainer).height(),
				"width": $(parentContainer).width()
			});
			
			$(attrIdPopup).css({
				/* Don't change values below */
				"height": settings.height + "px",
				"width": settings.width + "px",
		   		"top": ($(parentContainer).height() - settings.height) / 2 + $(parentContainer).position().top + "px",
		    	"left": ($(parentContainer).width() - settings.width) / 2 + $(parentContainer).position().left + "px"
			});	
		});
	}
})(jQuery);