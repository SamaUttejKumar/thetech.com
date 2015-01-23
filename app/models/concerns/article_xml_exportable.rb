module ArticleXmlExportable
  extend ActiveSupport::Concern

  # array of strings
  ARTICLE_PARTS = %w(primary_tag headline subhead byline bytitle body)

  def as_xml(parts)
    parts ||= ARTICLE_PARTS # if no parts specified take everything
    parts_to_take = ARTICLE_PARTS & parts # intersection

    assign_attributes(latest_article_version.article_attributes)

    content = "<document>\n"

    content += metadata_xml

    content += "<content>\n"

    content += primary_tag_xml if parts_to_take.include?('primary_tag')
    content += headline_xml if parts_to_take.include?('headline')
    content += subhead_xml if parts_to_take.include?('subhead')
    content += byline_xml if parts_to_take.include?('byline')
    content += bytitle_xml if parts_to_take.include?('bytitle')

    if parts_to_take.include?('body')
      chunks.each do |chunk_node|
        chunk = Nokogiri::HTML.fragment(chunk_node)
        fc = chunk.children.first

        next if fc.name.to_sym != :p
        content += '<p>'
        fc.children.each do |c|
          case c.name.to_sym
          when :text
            content += c.text
          when :a
            content += c.content
          when :em
            content += "<em>#{c.text}</em>"
          when :strong
            content += "<strong>#{c.text}</strong>"
          end
        end
        content += "</p>\n"
      end
    end

    content += "</content>\n</document>"
    content
  end

  private

  def latest_article_version
    print_version || latest_version
  end

  def metadata_xml
"  <metadata>
    <section>#{piece.section.name}</section>
    <primary_tag>#{piece.primary_tag}</primary_tag>
    <id>#{latest_article_version.id}</id>
  </metadata>\n"
  end

  def primary_tag_xml
    "<primary_tag>#{piece.primary_tag}</primary_tag>\n"
  end

  def headline_xml
    "<headline>#{headline}</headline>\n"
  end

  def subhead_xml
    "<subhead>#{subhead}</subhead>\n"
  end

  def byline_xml
    "<byline>#{authors_line}</byline>\n"
  end

  def bytitle_xml
    "<bytitle>#{bytitle}</bytitle>\n"
  end
end
