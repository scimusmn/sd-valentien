/*global Ember*/
SdValentien.Painting = DS.Model.extend({
    name: DS.attr('string'),
    thumbURL: DS.attr('string')
});

// probably should be mixed-in...
SdValentien.Painting.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

SdValentien.Painting.FIXTURES = [
    { id: 0, name: 'foo' , thumbURL: 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/12-07-12-wikimania-wdc-by-RalfR-010.jpg/500px-12-07-12-wikimania-wdc-by-RalfR-010.jpg'},
    { id: 1, name: 'foo' },
    { id: 2, name: 'foo' },
    { id: 3, name: 'foo' },
    { id: 4, name: 'foo' },
    { id: 5, name: 'foo' },
    { id: 6, name: 'foo' },
];
