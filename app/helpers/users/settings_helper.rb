module Users::SettingsHelper
  def timezone_options
    us_zones = ActiveSupport::TimeZone.us_zones
    utc = ActiveSupport::TimeZone.new('UTC')
    timezones = us_zones + [utc]

    timezones.map do |tz|
      [tz.to_s, ActiveSupport::TimeZone::MAPPING[tz.name]]
    end
  end
end

