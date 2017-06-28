console.log(module.exports);


(function($, Flickr, AppManager, DisplayManager) {
"use strict"

var FlickrObj = new Flickr({ api_key: "f100f808b8501d88fae083df7dc7d7a6"});
var App = AppManager.generate();
var Display = DisplayManager.generate();

// initialize the app
$(onReady);

function onReady() {
  App.setCols(5);
  App.setItems(10);

  $("#FormNumCols").val( App.getCols() );
  $("#FormNumResults").val( App.getItems() );

  $("#FormSubmit").on("click", formHandler);
  $("#FormSearch").on("submit", formHandler);
  $("#FormNumCols").on("change", numColsHandler);
  $("#FormNumResults").on("change", numResultsHandler);
  $("#FormPaginationPrevious").on("click", pagePreviousHandler);
  $("#FormPaginationNext").on("click", pageNextHandler);

  $("#ImageModal").on("show.bs.modal", imageModalShowHandler);
  $("#ImageModalPrev").on("click", imageModalPrevHandler);
  $("#ImageModalNext").on("click", imageModalNextHandler);


  if( $("#FormSearchText").val() != "")
  { search($("#FormSearchText").val()); }
}

function search(term) {
  FlickrObj.photos.search({ text: term }, searchHandler);
} // end search

// Handlers
// ----------------------------------------------------------------
function imageModalPrevHandler(e) {
  var id = $("#ImageModal .modal-body img").data("num");
  var photoData = App.getPhoto(1*id-1);

  if(photoData) {
    var image = new Image();
    image.src = Display.generateImageUrl(photoData);
    image.dataset.num = photoData.num;
    
    $("#ImageModal .modal-body").html("")
      .append(image);
  }
}

function imageModalNextHandler(e) {
  var id = $("#ImageModal .modal-body img").data("num");
  var photoData = App.getPhoto(1*id+1);

  if(photoData) {
    var image = new Image();
    image.src = Display.generateImageUrl(photoData);
    image.dataset.num = photoData.num;

    $("#ImageModal .modal-body").html("")
      .append(image);
  }
}

function imageModalShowHandler(e) {
  console.log(e);
  if(e.relatedTarget && e.relatedTarget.dataset.imageUrl) {
    var data = e.relatedTarget.dataset;

    var image = new Image();
    image.src = data.imageUrl;
    image.dataset.num = data.num;
    $("#ImageModal .modal-body").html("")
      .append(image);
  }
}

function pagePreviousHandler(e) {
  App.previous();
  Display.layoutPhotos( App.getCurrentPhotos(), App.getCols() );
  Display.setActivePage( App.getPage() );
}

function pageNextHandler(e) {
  App.next();
  Display.layoutPhotos( App.getCurrentPhotos(), App.getCols() );
  Display.setActivePage( App.getPage() );
}

function pageClickHandler(e) {
  App.setPage(this.dataset.page);
  Display.layoutPhotos( App.getCurrentPhotos(), App.getCols() );
  Display.setActivePage( App.getPage() );
}

function numColsHandler(e) {
  App.setCols(this.value);

  if( !App.isEmpty() ) {
    App.next();
    Display.layoutPhotos( App.getCurrentPhotos(), App.getCols() );
  }
}

function numResultsHandler(e) {
  App.setItems(this.value);
  App.setIndex(0);

  if( !App.isEmpty() ) {
    Display.updatePager( App.getNumPages(), pageClickHandler );
    Display.layoutPhotos( App.getCurrentPhotos(), App.getCols() );
    Display.setActivePage( App.getPage() );
  }
}

function formHandler(e) {
  e.preventDefault();

  search( $("#FormSearchText").val() );
}

function searchHandler(err, result) {
  if(err) { throw new Error(err); }
    // do something with result

  if(result.photos.photo) {
    App.setPhotoCache(result.photos.photo);

    Display.updatePager( App.getNumPages(), pageClickHandler );
    Display.layoutPhotos( App.getCurrentPhotos(), App.getCols() );
    Display.setActivePage( App.getPage() );
  }
}

})(jQuery, Flickr, module.exports.AppManager, module.exports.DisplayManager);
