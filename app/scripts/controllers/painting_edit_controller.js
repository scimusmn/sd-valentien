SdValentien.PaintingEditController = Ember.ObjectController.extend({
  needs: 'painting',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.painting.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('painting',this.get('model'));
    }
  }
});

