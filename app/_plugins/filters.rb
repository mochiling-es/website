module Jekyll
  module DateFilter
    require 'date'
    def date_sort(collection)
      collection.sort_by do |el|
		el[1]['date_end']
      end
    end
  end
end
Liquid::Template.register_filter(Jekyll::DateFilter)