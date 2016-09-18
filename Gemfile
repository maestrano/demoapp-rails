source 'https://rubygems.org'

gem 'rails', '~> 4.2'
gem 'jquery-rails'
gem 'haml-rails'
gem 'font-awesome-rails'
gem 'foundation-rails'
gem 'puma'

gem 'httparty'
gem 'config'
gem 'figaro'

gem 'maestrano-rails', '1.0.0.pre.RC5'

group :development, :test do
  gem 'activerecord-jdbcsqlite3-adapter', platforms: :jruby
  gem 'sqlite3', platforms: :ruby
end

group :production do
  gem 'rails_12factor'
  gem 'activerecord-jdbcpostgresql-adapter', platforms: :jruby
  gem 'pg', platforms: :ruby
end

group :test do
  gem 'rspec-rails'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
end
