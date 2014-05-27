# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Clucker::Application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => 'bigpixel',
  :password => 'techTalent2014!',
  :domain => 'localhost',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}

