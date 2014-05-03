require 'json'
class ApiController < ApplicationController
	def savesignup
		firstname = params[:firstname] #[:firstname] should be the variable that you are passing in from your JQuery tag data: {firstname: first, lastname: last, email: email},
		lastname = params[:lastname]
		email = params[:email]
		password = params[:password]
		password2 = params[:password2]

		# if (password1 === password2)
			# p 'Password ok'
		# else p 'Re-enter the same Password'
		# end
		
		p firstname + '| ' + lastname + '| ' + email + '| ' + password

		u = User.new(firstname: firstname, lastname: lastname, email: email, password: password)
		
		p u

		u.save

		head :ok

		# need json render here

		# test = JSON.generate({'lastname' => lastname, 'firstname' => firstname, 'email' => email, 'password1' => password1});
		
		# p test;
		
		# respond_to do |format|
			# format.json{render :json => test }
	  	# end
	end
end