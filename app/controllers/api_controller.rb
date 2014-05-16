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

		if (u.valid?)
			u.save
			session[:user_id] = u.id
			session[:user_name] = u.firstname
			render json: u
		else
			render json: nil
		end
	end

	def login
		email = params[:email]
		password = params[:password]

		p email + ' | ' + password

		u = User.find_by(email: email)

		if (u != nil && u.password == password)
			session[:user_id] = u.id
			session[:user_name] = u.firstname
			render json: u
		else
			render json: nil
		end

	end

	def clucks
		body = params[:body]
		c = Clucks.new(body: body)

		if (c.valid?)
			c.save
			render json: c
			# c.find_by(userID:session[user_id])
		else
			render json: nil
		end
	end

	def logout
		reset_session
		flash[:notice] = "You have successfully logged out!"
		redirect_to :root
	end 
end

		# head :ok #use head :ok when you have a controller method that's only an action and that doesn't have a view

		# need json render here

		# test = JSON.generate({'lastname' => lastname, 'firstname' => firstname, 'email' => email, 'password1' => password1});

		# p test;

		# respond_to do |format|
			# format.json{render :json => test }
	  	# end