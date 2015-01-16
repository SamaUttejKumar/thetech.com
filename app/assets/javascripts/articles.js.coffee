# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

ready = ->
  $(document).on('click', '.asset-candidate', ->
    CKEDITOR.instances.article_html.insertHtml('<img src="' + this.src + '">')
  )

  if $('#articles_new, #articles_edit, #article_versions_revert').length > 0
    authors = new Bloodhound(
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: gon.authors
    )

    authors.initialize()

    tagsinput = $('input[name=article\\[author_ids\\]]')
    tagsinput.tagsinput({
      itemValue: 'id',
      itemText: 'name',
      typeaheadjs: {
        name: 'authors',
        displayKey: 'name',
        source: authors.ttAdapter()
      }
    })

    for author in gon.prefilled_authors
      tagsinput.tagsinput('add', author)

  if $('#articles_index').length > 0
    window.update_article_list = (articles) ->
      $scope = angular.element('#articles_table').scope()
      $scope.$apply ->
        $scope.articles = articles

    window.update_article_list(gon.articles)

    $('#keywords').keyup ->
      window.delay('keywords_search', ->
        url = $('#keywords').data('filter-url')

        $.get(url, {q: $('#keywords').val()}, (data) ->
          window.update_article_list(data)
        )
      , 300)

$(ready)
