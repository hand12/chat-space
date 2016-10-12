require_relative 'boot'

require 'rails/all'
ActiveSupport::Deprecation.silenced = true

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.test_framework       false
      g.helper               false
      g.stylesheets          false
      g.javascripts          false
    end
    config.i18n.default_locale = :ja
  end
end
