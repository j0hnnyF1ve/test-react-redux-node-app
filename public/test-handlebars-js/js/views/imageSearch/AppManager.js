window.module = window.module || {};
window.module.exports = window.module.exports || {};

module.exports.AppManager = (function($) {

function generateAppManager() {
  var _photoCache = [];
  var _numItems = 10;
  var _numCols = 5;
  var _index = 0;

  function isEmpty() { return _photoCache > 0; }
  function setPhotoCache(photos) {
    var count=0;
    for(let photo of photos) { photo.num = count++; }
    _photoCache = photos;
  }
  function getPhotoCache() { return _photoCache; }
  function getPhotos(start, end) { return _photoCache.slice(start, end); }
  function getCurrentPhotos() { return _photoCache.slice(_index, 1*_index + _numItems*1 ); }
  function getPhoto(index) { return _photoCache[index] || null; }

  function setItems(items) { _numItems = items; }
  function getItems() { return _numItems; }

  function setCols(num) { _numCols = num; }
  function getCols() { return _numCols; }

  function setIndex(num) { _index = num; }
  function getIndex() { return _index; }

  function setPage(num)  {
    if(num >= 0 && (num - 1) * _numItems < _photoCache.length) {
      _index = (num - 1) * _numItems;
    }
  }
  function getPage()  { return Math.floor(_index / _numItems) + 1; }

  function getNumPages() { return _photoCache.length / _numItems; }

  function previous() { _index = (_index - _numItems > 0) ? _index - _numItems : 0 }
  function next() { _index = (1*_index + _numItems*1 < _photoCache.length) ? 1*_index + _numItems*1 : _photoCache.length - _numItems; }


  return {
    isEmpty : isEmpty,
    setPhotoCache : setPhotoCache,
    getPhotoCache : getPhotoCache,
    getPhotos : getPhotos,
    getCurrentPhotos : getCurrentPhotos,
    getPhoto : getPhoto,
    setItems : setItems,
    getItems : getItems,
    setCols : setCols,
    getCols : getCols,
    setIndex : setIndex,
    getIndex : getIndex,
    setPage : setPage,
    getPage : getPage,
    getNumPages : getNumPages,
    previous : previous,
    next : next
  };
}

return { generate : generateAppManager};

})(jQuery);
