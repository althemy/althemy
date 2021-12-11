$(function () {

    $('.post-outer.card img').each(function () {
        var _this = $(this),
            _parent = _this.parent("a");

        if (_parent.length > 0) {
            _this.attr("src", _parent.attr("href"));
            _parent.addClass("pop");
        }

    });

    $('.post-outer.card').magnificPopup({
        delegate: 'a.pop',
        type: 'image',
        gallery: {
            enabled: true
        },

        zoom: {
            enabled: true,
            duration: 400,
            opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        },

        navigateByImgClick: false,

        image: {
            markup: '<div class="mfp-figure">' +
                '<div class="mfp-close"></div>' +
                '<div class="mfp-img"></div>' +
                '<div class="custom-bottom-bar">' +
                '<div class="mfp-title"></div>' +
                '</div>' +
                '</div>'
        },

        callbacks: {
            imageLoadComplete: function () {
                $(".mfp-img").orThemesZoom();
            },
        }

    });

});
