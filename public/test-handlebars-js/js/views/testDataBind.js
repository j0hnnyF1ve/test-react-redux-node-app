window.module = window.module || {};
window.module.exports = window.module.exports || {};

console.log(module.exports);

(function($, imports) {
"use strict"

// initialize the app
$(onReady);

function onReady(evt) {
  var user = new User();
  console.log(user);

  var dataBindManager = new imports.DataBindManager();

  $("#FormButton").on("click", clickHandler);
  $("#FormButton2").on("click", clickHandler2);
  $("#FormButton3").on("click", clickHandler3);
  $("#FormButton4").on("click", addHandler);
  $("#FormButton5").on("click", removeHandler);


  function clickHandler(evt) {
    evt.preventDefault();

    var val = $("#FormInput").val();
    var attr = $("#FormSelect").val();

    var bind = dataBindManager.getBinding(attr);
    if(bind) { bind.actions.trigger(attr, val); }

    console.log(bind);
  }

  function clickHandler2(evt) {
    evt.preventDefault();

    var val = $("#FormInput2").val();
    var attr = $("#FormSelect2").val();

    user.set(attr, val);
  }

  function clickHandler3(evt) {
    evt.preventDefault();

    var attributes = user.getAttributes();
    var text = "";
    var template = "{key} : {value}\n";
    for(let key in attributes) {
      text += template.replace("{key}", key).replace("{value}", attributes[key]);
    }

    $("#FormTextArea3").html(text);
  }

  function addHandler(evt) {
    evt.preventDefault();

    user.addBinding( $("#FormSelect4").val() );
  }

  function removeHandler(evt) {
    evt.preventDefault();

    user.removeBinding( $("#FormSelect4").val() );
  }


  function User( name ) {
    var attributes = {
      test : "",
      "test-2" : "",
      name : ""
    };
    var bindings = new Set();

    function _triggerBinding(attr, value) {
      if( !bindings.has(attr) ) { return; }
      var bind = dataBindManager.getBinding(attr);
      if(bind) { bind.actions.trigger("", value); }
    }

    function set(attr, value) {
      if(attr.length == 0) { return; }
      attributes[attr] = value;
      _triggerBinding(attr, value, this);
    }

    function get(attr) { return attributes[attr]; }
    function getAttributes() { return attributes; }

    function addBinding(attr) {
      bindings.add(attr);
      var bind = dataBindManager.getBinding(attr);
      if(bind) {
        bind.on(attr + ":change", _callback);
      }
    }

    function removeBinding(attr) {

      var bind = dataBindManager.getBinding(attr);
      if(bind) {
        bind.off(attr + ":change", _callback);
      }
      bindings.delete(attr);
    }

    var that = this;
    function _callback(evt, attr, newVal, initiator) {
      if(initiator !== that) {
        that.set(attr, newVal);
      }
    }

    this.set = set;
    this.get = get;
    this.getAttributes = getAttributes;
    this.addBinding = addBinding;
    this.removeBinding = removeBinding;
//    return { set, get, getAttributes, addBinding, removeBinding }
    return this;
  }

}

})(jQuery, module.exports);
