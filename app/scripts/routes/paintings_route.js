SdValentien.PaintingsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('painting');
  }
});

