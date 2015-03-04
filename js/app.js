/* global sharing */
var nouns = [],
    verbs = [];

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

function generate(text) {
  igf = _.chain(igf.split('\r')).sample(300).value().join('\r');
  var chain  = new Markov(igf, 8);
  var result = '';
  chain.each(function (v) {
    result += v;
  });
  var generatedText = text || result.trim().substr(0,500).replace(/\n.*$/,'').replace(/(\n|\r)+/g,'<br><br>');
  console.log(generatedText);
  var sharedText = generatedText.substr(0,100) + '... #igfmarkov';
  $('#content').html(generatedText);
  var shareUrl = window.location.href.split('?')[0]+'?word='+sharing.encodeStr(generatedText);
  $('#share').attr('href', shareUrl);
  $('.twitter-share-button').remove();
  $('#twitterShare').html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="' + shareUrl + '" data-text="' + sharedText + '" data-lang="en">Tweet</a>');
  if (twttr.widgets) {
    twttr.widgets.load();
  }
}

$('#generate').click(function() { generate(); });
if (sharing.gup('word') === '') {
  generate();
}
else {
  var text = sharing.decodeStr(unescape(sharing.gup('word')));
  generate(text);
}
