# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

ready = ->
  if $('body#images_new,body#images_create').length > 0
    show_or_hide_embedded_fields = ->
      field = $('select[name=piece_id]')
      value = field.val()
      console.log(field)
      embedded_fields = $('#pieces_embedded_fields')

      if value
        embedded_fields.hide()
      else
        embedded_fields.show()

    show_or_hide_embedded_fields()
    $('select[name=piece_id]').change(show_or_hide_embedded_fields)

  if $('body#images_new, body#images_edit').length > 0
    authors = new Bloodhound(
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: gon.authors
    )

    authors.initialize()

    tagsinput = $('input[name=image\\[author_id\\]]')
    tagsinput.tagsinput({
      itemValue: 'id',
      itemText: 'name',
      typeaheadjs: {
        name: 'authors',
        displayKey: 'name',
        source: authors.ttAdapter()
      },
      maxTags: 1
    })

    tagsinput.on('itemAdded', (event) ->
      $('input[name=image\\[attribution\\]]').val(event.item.name + '–The Tech');
    );

    for author in gon.prefilled_authors
      tagsinput.tagsinput('add', author)

  if $('#articles_index').length > 0
    $('#keywords').keyup ->
      window.delay('keywords_search', ->
        $('#keywords').parents('form').submit()
      , 300)

  if $('#images_index').length > 0
    $('.titleline select').click ->
      if $(this).val() != ''
        $('.titleline form input[type=file]').click()

  if $('body#images_show').length > 0
    switch_to_picture = (picture_id) ->
      $('#pictures > div').hide()
      $('#' + picture_id).show()

    show_picture = ->
      picture_id = $(this).data('picture-id')
      switch_to_picture(picture_id)

    switch_to_picture('picture_0')

    $('#pictures_toggle button').click show_picture
    $('#images_field').change ->
      $(this).parents('form').submit()


$(document).ready(ready)
$(document).on('page:load', ready)