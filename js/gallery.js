
function recalculateMasonry(width) {
  $('.btn_gallery').removeClass('active');

  $('.grid-item').css('width', width);
  var $grid = $('.grid');
  $grid.masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
  });
}

$(document).ready(function(){
  var imagesGallery = '<div class="gallery-grid"><div class="header_gallery"><button class="btn_gallery" id="grid_one"><i class="fas fa-stop"></i></button><button class="btn_gallery active" id="grid_two"><i class="fas fa-th-large"></i></button><button class="btn_gallery" id="grid_four"><i class="fas fa-th"></i></button></div><div class="grid">'; 
  var postImgs = $('.post-outer.card img');

  if (postImgs.length > 1) {

    postImgs.each(function(){
      var $this = $(this),
          imgUrl = $this.attr('src'),
          imgOriginalUrl = $this.parent().attr('href'),
          hasParent = imgOriginalUrl && imgOriginalUrl.indexOf('s1600') != -1,
          hasSeparator = hasParent && $this.parents().eq(1).hasClass('separator');

      if(hasSeparator) {
        $this.parents().eq(1).remove();
        imgUrl = imgOriginalUrl;
      } else if (hasParent) {
        $this.parent().remove();
        imgUrl = imgOriginalUrl;
      } else {
        $this.remove();
      }

      imagesGallery += '<div class="grid-item"><a href="'+ imgUrl +'"><img src="'+ imgUrl +'"/></a></div>';

    });
    imagesGallery += '</div></div>';
    $('.post-outer.card').append(imagesGallery);

    var $grid = $('.grid');

    $grid.imagesLoaded().progress( function() {
      $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
      });
    });

    $('.grid').magnificPopup({
      delegate: 'a', 
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
        markup: '<div class="mfp-figure">'+
        '<div class="mfp-close"></div>'+
        '<div class="mfp-img"></div>'+
        '<div class="custom-bottom-bar">'+
        '<div class="mfp-title"></div>'+
        '</div>'+
        '</div>'
      },

      callbacks: {
        imageLoadComplete: function () {
          $(".mfp-img").orThemesZoom();
        },
      }

    });

    $('#grid_one').on('click', function(e){
      e.preventDefault();

      recalculateMasonry('100%');
      $(this).addClass('active');
    });

    $('#grid_two').on('click', function(e){
      e.preventDefault();

      recalculateMasonry('50%');
      $(this).addClass('active');
    });

    $('#grid_four').on('click', function(e){
      e.preventDefault();

      recalculateMasonry('25%');
      $(this).addClass('active');
    });

  }
});
