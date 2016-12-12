var jasmineExtensions = {
  jQuerySpies: {},
  spyOnEvent: function( element, eventName ) {
    var control = {
      triggered: false;
    };

    element.bind( eventName, function() {
      control.triggered = true;
    } );
    jasmineExtensions.jQuerySpies[ elemnt[ eventName ] ] = control;
  };
};
