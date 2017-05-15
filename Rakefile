# coding: utf-8
require 'highline/import'

# Extend string to allow for bold text.
class String
  def bold
    "\033[1m#{self}\033[0m"
  end

  def sanitize
    self.downcase.strip.to_s.gsub(/\s+/, '-')
  end
end

# Rake Jekyll tasks
task :create_member do
  member_data = {
    short_desc: {}
  }
  member_key = ''

  # key
  key = ask("Key name of the new member (E.g. victor, jamon, perico): ".bold) { |q|
    q.validate  = /.*\S.*/i
  }
  member_key = key.sanitize
  if key != member_key
    puts "Key name sanitized to: #{member_key}".bold
  end

  # complete name
  member_data[:complete_name] = ask("Full name of the new member (E.g. Victor García): ".bold)

  # short desc
  member_data[:short_desc]['es'] = ask("Short decription in spanish for #{member_data[:complete_name]} (E.g. Viajero por herencia): ".bold)
  member_data[:short_desc]['en'] = ask("Short decription in english for #{member_data[:complete_name]} (E.g. Heritage Traveler): ".bold)

  # image
  puts "For the image you have to create a PNG file with the #{member_data[:complete_name]} face in app/assets/img/members/#{member_key}.png".bold

  # gender
  member_data[:gender] = ask("male or female".bold) { |q|
    q.default   = "male"
    q.validate  = /^(male|female)$/i
  }

  # role
  # languages
  # facebook
  # twitter
  # instagram
  # instagram_id
  # born_location
  # visited_countries
  # banner

  puts member_key
  puts member_data
end
