var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', {name: String });

var Kitty = new Cat({ name: 'Zildjian' });
Kitty.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
