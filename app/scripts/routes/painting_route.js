SdValentien.PaintingRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('painting', params.painting_id);
  }
});

