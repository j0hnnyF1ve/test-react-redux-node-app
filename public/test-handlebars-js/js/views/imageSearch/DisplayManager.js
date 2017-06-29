window.module = window.module || {};
window.module.exports = window.module.exports || {};

module.exports.DisplayManager = (function($) {

function generateDisplayManager() {

  function layoutPhotos(photos, numCols) {
    $("#ImageDisplay").html("");

    var count = 0;
    var row = $('<div class="row"></div>');
    var cols = Math.floor( 12 / numCols );
    var template = '<div data-num="{num}" data-image-url="{image}" data-toggle="modal" data-target="#ImageModal" class="{className}"></div>';

    photos.forEach(function(element) {
        var image = createImage(element);

        var className = "col-lg-" + cols;
        className += " col-md-" + cols;
        className += " col-sm-" + cols;
        className += " col-xs-" + cols;
        row.append( $( template.replace("{className}", className)
            .replace("{image}", image.dataset.rootUrl + ".jpg")
            .replace("{num}", image.dataset.num) )
          .append(image) );

        count++;

        if(count % numCols == 0) {
          $("#ImageDisplay").append(row);
          row = $('<div class="row"></div>');
        }
    });
    if(row.children().length > 0) { $("#ImageDisplay").append(row); }
  } // end layoutPhotos

  function createImage(data) {
    var image = new Image();
    var url = generateImageUrl(data);

    image.dataset.num     = data.num;
    image.dataset.rootUrl = url;
    image.src = url + "_n.jpg";
    image.className = "img-responsive";
    image.alt = "Responsive Image";

    return image;
  }

  function generateImageUrl(data, ext="") {
    var url   = "https://farm{farm}.staticflickr.com/{server}/{id}_{secret}";
    url       = url.replace("{farm}", data.farm);
    url       = url.replace("{server}", data.server);
    url       = url.replace("{id}", data.id);
    url       = url.replace("{secret}", data.secret);
    return url + ext;
  }

  function setActivePage(page) {
    $("#FormPagination .page").removeClass("active")
    $("#FormPagination #page-" + page).addClass("active");
  }

  function setCarouselImage(data, pos) {
    if(!data || pos > 5 || pos < 0) { return; }
    var image = new Image();
    image.src = data.imageUrl || generateImageUrl(data, ".jpg");
    image.dataset.num = data.num;
    var selector = "#CarouselImage{num}";
    $(selector.replace("{num}", pos) + " img").remove();
    $(selector.replace("{num}", pos) ).append(image);
  }

  function updatePager(numPages, handler) {
    var template = '<li id="page-{page}" class="page" data-page="{page}"><a href="#">{page}</a></li>';

    $("#FormPagination .page").remove();
    for(let i=1; i <= numPages; i++) {
      $("#FormPaginationNext").before( template.replace(/{page}/g,i) );
    }
    $("#FormPagination .page").on("click", handler);
  }

  return {
    layoutPhotos : layoutPhotos,
    createImage : createImage,
    generateImageUrl : generateImageUrl,
    setActivePage : setActivePage,
    setCarouselImage : setCarouselImage,
    updatePager : updatePager
  };
}

return { generate: generateDisplayManager };

})(jQuery);
