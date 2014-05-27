require 'json'
class ApiController < ApplicationController
	def savesignup
		firstname = params[:first] #[:firstname] should be the variable that you are passing in from your JQuery tag data: {firstname: first, lastname: last, email: email},
		lastname = params[:last]
		email = params[:email]
		password = params[:password]
		password2 = params[:password2]

		# if (password1 === password2)
			# p 'Password ok'
		# else p 'Re-enter the same Password'
		# end

		p firstname + '| ' + lastname + '| ' + email + '| ' + password

		new_user = User.new(first: firstname, last: lastname, email: email, password: password)

		if (new_user.valid?)
			SimpleMailer.welcome_email(new_user).deliver
			new_user.save
			session[:user_id] = new_user.id.to_s
			session[:first] = new_user.first
			session[:last] = new_user.last



			render json: new_user

			# p new_user.firstname
			# p new_user.id

			p session[:first]


		else
			render json: nil
		end
	end

	def login
		email = params[:email]
		password = params[:password]

		p email + ' | ' + password

		old_user = User.find_by(email: email)

		if (old_user != nil && old_user.password == password)
			session[:user_id] = old_user.id.to_s
			session[:first] = old_user.first
			session[:last] = old_user.last
			render json: old_user
		else
			render json: nil
		end

	end

	def savecluck
		text2 = params[:text].chomp

		user_id2 = session[:user_id]
		firstname2 = session[:first]
		lastname2 = session[:last]

		post_date2 = Time.now
		post_date2.to_formatted_s(:short)
		# post_date2.strftime("%m/%d/%Y")


		new_cluck = Cluck.new(user_id: user_id2, user_name: firstname2, text: text2, post_date: post_date2)


		if (new_cluck.valid?)
			new_cluck.save
			render json: new_cluck.to_json
			# c.find_by(userID:session[user_id])
		else
			render json: nil
		end

		p new_cluck.text
		p new_cluck.user_name

	end

	def logout
		reset_session
		flash[:notice] = ""
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