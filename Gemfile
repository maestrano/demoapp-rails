source 'https://rubygems.org'

gem 'rails'
gem 'jquery-rails'
gem 'haml-rails'

gem 'maestrano-rails', '1.0.0.pre.RC2'

group :development, :test do
  gem 'sqlite3', :platforms => :ruby
end

group :test do
  gem 'test-unit', '~> 3'
  gem 'mocha', '~> 1.1'
  gem 'shoulda', '~> 3.5'
  gem 'activesupport', '~> 4.2'
  gem 'database_cleaner'
end

group :production do
  gem 'pg', :platforms => :ruby
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
end
