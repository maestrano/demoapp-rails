source 'https://rubygems.org'

gem 'rails', '~> 4.2'
gem 'jquery-rails'
gem 'haml-rails'
gem 'font-awesome-rails'
gem 'foundation-rails'

gem 'puma', require: false

gem 'httparty'
gem 'config'
gem 'figaro'

gem 'maestrano-rails', '1.0.4'

group :production, :uat do
  gem 'activerecord-jdbcmysql-adapter', platforms: :jruby
  gem 'mysql2', platforms: :ruby
  gem 'rails_12factor'
end

group :test, :develpment do
  gem 'activerecord-jdbcsqlite3-adapter', platforms: :jruby
  gem 'sqlite3', platforms: :ruby
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
