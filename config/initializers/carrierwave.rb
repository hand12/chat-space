CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => ENV['ACCESS_KEY_ID'],
    :aws_secret_access_key  => ENV['SECRET_ACCESS_KEY'],
    :region                 => 'ap-northeast-1'
  }

  case Rails.env
  when 'development'
    config.storage = :fog
    config.fog_directory = "chat-space-by-yusuke"
    config.asset_host = "https://s3-ap-northeast-1.amazonaws.com/#{config.fog_directory}"
  when 'test'
    config.storage = :file
    config.enable_processing = false
  when 'production'
    config.storage = :fog
    config.fog_directory = 'chat-space-by-yusuke'
    config.asset_host = "https://s3-ap-northeast-1.amazonaws.com/#{config.fog_directory}"
  end

end
