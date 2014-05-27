class SimpleMailer < ActionMailer::Base
	default from: "cocoausvi@hotmail.com"

	def welcome_email(new_user)
		@user = new_user
		@url = 'http://localhost:3000/'
		mail(to: @user.email, subject: 'Welcome to Clucker!')
	end

end
