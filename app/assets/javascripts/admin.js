//= require jquery
//= require jquery_ujs
//= require jquery.remotipart
//= require ckeditor-jquery
//= require twitter/bootstrap
//= require typeahead.js.js
//= require bootstrap
//= require bootstrap-tagsinput
//= require bootstrap3-typeahead
//= require_tree .
//= stub frontend_pieces
//= stub frontend_browser_detection
//= stub frontend_auto_redirect

// shim for pretty file uploads, borrowed from http://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3/
$(document).on('ready', function() {

  $('.btn-file :file').on('change', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
  });

  $('.btn-file').on('fileselect', function(e, numFiles, label) {
    $(this).parent().find('#filepath').text(label);
  });
});