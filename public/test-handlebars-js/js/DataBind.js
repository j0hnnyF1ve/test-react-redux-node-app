window.module = window.module || {};
window.module.exports = window.module.exports || {};

module.exports.DataBind = (function($) {

function DataBind(object_id) {
  var pubsub = $({});

  var data_attr = "bind-" + object_id,
      message = object_id + ":change";

  // We handle change or keyup events on elements with data_attr
  jQuery( document ).on("change", "[data-"+data_attr+"]", changeHandler);
  jQuery( document ).on("keyup", "[data-"+data_attr+"]", keyupHandler);

  pubsub.on( message, function( evt, prop_name, new_val) {
    jQuery("[data-"+data_attr+"]").each(function() {
      var $bound = jQuery(this);

      if( $bound.is("input, textarea, select")) {
        $bound.val( new_val );
      }
      else {
        $bound.html( new_val );
      }

    });
  });

  pubsub.on(object_id + ":change", function(evt, attrName, newVal, initiator) {
    if(initiator !== evt.target) {
      _trigger(attrName, newVal, this);
    }
  });


  function changeHandler(evt) { pubsubTrigger.call(this, evt); }
  function keyupHandler(evt) {
    if(["Backspace"].includes(evt.key) ) { }
    else if(evt.key.length > 1) { return; }
    pubsubTrigger.call(this, evt);
  }

  function pubsubTrigger(evt) {
    var $input = jQuery( this );

    _trigger( data_attr.replace("bind-", ""), $input.val() );
  }

  function _trigger(name, value, obj=null) {
    pubsub.trigger( message, [ name, value, obj ] );
  }

  pubsub.actions = {
    trigger : _trigger
  }

  return pubsub;
}

return DataBind;

})(jQuery);


module.exports.DataBindManager = (function($, DataBind) {

function DataBindManager() {

  var bindings = new Map();

  // jQuery extension to get all data keys in a DOM element
  jQuery.extend(jQuery.expr[':'], {
    "dataStartsWith" : function(el, i, p, n) {
      var pCamel = p[3].replace(/-([a-z])/ig,
          function(m,$1) { return $1.toUpperCase(); });

      return Object.keys(el.dataset).some(function(i, v){
        return i.indexOf(pCamel) > -1;
      });
    }
  });

  init();

// Method Declarations
//-------

  function init() {
    var map = new Map();

    // To get a list of data attributes:
    $('*:dataStartsWith(bind)').each(function(i, el){

      for(let index in el.dataset) {
        index = index.replace("bind", "");
        index = index[0].toLowerCase() + index.slice(1);
        if(!map.has(index) ) { map.set(index, ""); }
      }
    });

    // Attempting to write the databindings automatically
    map.forEach( (value, key, ownerMap) => {
      bindings.set(key, new DataBind(key) );
    });
  }

  function addBinding(key) {
    if(bindings[key]) { return; }
    bindings.set(key, new DataBind(key) );
  }

  function getBinding(key) { return bindings.get(key); }
  function getBindings() { return bindings; }

return {
  addBinding : addBinding,
  getBinding : getBinding,
  getBindings : getBindings
};

}

return DataBindManager;

})(jQuery, module.exports.DataBind);
