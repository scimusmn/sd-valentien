SdValentien.Router.map(function () {
  
  this.resource('paintings', function(){
    this.resource('painting', { path: '/:painting_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
  
});
