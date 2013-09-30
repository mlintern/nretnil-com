$(document).ready(function () {
	
	var bs_pinButtonURL = "http://dev.nretnil.com/staging/tools/img/pinterest.png";
	var bs_pinButtonPos = "center";
	var bs_pinPrefix = "";
	var bs_pinSuffix = "";
	var imageSelector = ".post-body img";
	var descriptionSelector = ".post-title";
	var urlSelector = ".post-title a";
	
    $('body').append('<img class="pinimgload" src="' + bs_pinButtonURL + '" >');
    $('#bs_pinOnHover').hide();
    var bsButtonHover;
    var bs_pinButtonWidth;
    var bs_pinButtonHeight;
    $('.pinimgload').load(function () {
        bs_pinButtonWidth = $('.pinimgload').outerWidth(true);
        bs_pinButtonHeight = $('.pinimgload').outerHeight(true);
        $('.pinimgload').remove()
    });

    function getButtonHTML(media, description, pinitURL) {
        $HTML = '<div class="fog" style="background: url(http://dev.nretnil.com/staging/tools/css/fog/fog_50.png) 0 0 transparent repeat;"></div><div class="pinit-wrapper" style="display:none;position: absolute;z-index: 9999; cursor: pointer;" ><a href="http://pinterest.com/pin/create/button/?url=' + pinitURL + '&media=' + encodeURIComponent(media) + '&description=' + description + '" style="display:block;outline:none;" target="_blank"><img class="pinimg" style="-moz-box-shadow:none;-webkit-box-shadow:none;-o-box-shadow:none;box-shadow:none;background:transparent;margin: 0;padding: 0;border:0;" src="' + bs_pinButtonURL + '"></a></div>';
        return $HTML
    }
    function hoverCheck() {
        $(imageSelector).mouseenter(function () {
            $('.pinit-wrapper').css("visibility", "hidden");
            clearTimeout(bsButtonHover);
            if ( $(this).attr('src').toLowerCase().indexOf("http") >= 0 ){
	        	media = $(this).attr('src');
	        }else{
	        	if ( $(this).attr('src').toLowerCase().indexOf("//") >= 0 ){
	        	media = location.protocol + $(this).attr('src');
	        	}else{
	        	media = page_protocol + "//" + page_domain + "/" + $(this).attr('src');
	        	}
	        }
            description = $(this).closest('.post').find(descriptionSelector).text();
            var pinitURL = $(this).closest('.post').find(urlSelector).attr('href');
            if (pinitURL == undefined) {
                pinitURL = $(location).attr('href')
            }
            var $target = $(this).parent().is('a') ? $(this).parent() : $(this);
            if (!$target.next().hasClass('pinit-wrapper')) {
                $target.after(getButtonHTML(media, description, pinitURL));
                $target.next('.pinit-wrapper').attr("onmouseover", "this.style.opacity=1;this.style.visibility=visible;clearTimeout(bsButtonHover)")
            }
            switch (bs_pinButtonPos) {
                case 'center':
                    posY = $(this).position().top + $(this).outerHeight(true) / 2 - bs_pinButtonHeight / 2;
                    posX = $(this).position().left + $(this).outerWidth(true) / 2 - bs_pinButtonWidth / 2;
                    break;
                case 'topright':
                    posY = $(this).position().top + 5;
                    posX = $(this).position().left + $(this).outerWidth(true) - bs_pinButtonWidth - 5;
                    break;
                case 'topleft':
                    posY = $(this).position().top + 5;
                    posX = $(this).position().left + 5;
                    break;
                case 'bottomright':
                    posY = $(this).position().top + $(this).outerHeight(true) - bs_pinButtonHeight - 5;
                    posX = $(this).position().left + $(this).outerWidth(true) - bs_pinButtonWidth - 5;
                    break;
                case 'bottomleft':
                    posY = $(this).position().top + $(this).outerHeight(true) - bs_pinButtonHeight - 5;
                    posX = $(this).position().left + 5;
                    break
            }
            $pinwrap = $target.next(".pinit-wrapper");
            $pinwrap.css({
                "top": posY,
                "left": posX
            });
            $pinwrap.css("visibility", "visible");
            $pinwrap.stop().fadeTo(300, 1.0, function () {
                $(this).show()
            })
        });
        $(imageSelector).on('mouseleave', function () {
            if ($.browser.msie) {
                $targetIE1 = $(this).next('.pinit-wrapper');
                $targetIE2 = $(this).parent('a').next('.pinit-wrapper');
                bsButtonHover = setTimeout(function () {
                    $targetIE1.stop().css("visibility", "hidden");
                    $targetIE2.stop().css("visibility", "hidden")
                }, 3000)
            } else {
                $('.pinit-wrapper').stop().fadeTo(0, 0.0)
            }
        })
    }
        
    hoverCheck();
});