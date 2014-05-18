$(document).ready(function(){
	HideDialog();
	$('#btnSignup').on('click', function(){
		$('#overlay').show();
		$('#signUpFormList').fadeIn(1000).show();
		$('#Cancel1').on('click', function(){
			HideDialog();
		});
		$("#firstname").on('blur', function(){
			var firstNameLength = $(this).val().length;
				if (firstNameLength == 0) {
					alert("Please enter a first name")
				}
		});
		$("#lastname").on('blur', function(){
			var lastNameLength = $(this).val().length;
				if (lastNameLength == 0) {
					alert("Please enter a last name")
				}
		});
		$("#email").on('blur', function(){
			var emailAddress = $(this).val();
			function isValidEmailAddress(emailAddress) {
				var reg = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
				// alert (pattern.test(emailAddress));
				return reg.test(emailAddress);
			};
			if( !isValidEmailAddress(emailAddress)) {
				alert("Re-enter correct email");
			}
		});
		$('#Submit1').on('click', function() {
			var first = $("#firstname").val();
			var last = $("#lastname").val();
			var email = $("#email").val();
			var password = $("#password").val();
			var password2 = $("#password2").val();

			if (password !== password2){
				alert("Passwords should be equal.  Please re-enter.")
			}
			$.ajax({
				url: '/api/savesignup',
				data: {firstname: first, lastname: last, email: email, password: password, password2: password2}, //{firstname: first} --> firstname = variable key you're passing to JQuery controller params[firstname]; local variable you're assigning the user input to
				type: 'POST',
			}).done(function(data){
				console.log(data);
			});
			HideDialog();
			window.location.replace("http://localhost:3000/main/clucks")
			// alert("Your signup was successful.  Please use the Login button to enter the app.")
			

		// $.ajax({
			// url: '/api/saveSignUp',
			// data: {firstname: firstname, lastname: lastname, email: email},
			// type: 'POST'
		// }).done(function(data){
			// console.log(data);
			// alert('Success Submission');
		});
	});
	$('#btnSignin').on('click', function(){
		$('#overlay').show();
		$('#signInFormList').fadeIn(1000).show();
		$('#Cancel2').on('click', function(){
			HideDialog();
		});
		$('#Submit2').on('click', function(){
			Login();
		});
	});
	$('#txtCluck').keypress(function(e){
		var txt = $('#txtCluck').val();
		var max = 142;

		if(txt.length >= max) {
			e.preventDefault();
			return;
		}

		var remaining = max - txt.length - 1;
		$('#cluckCounter').html(remaining + ' characters left!');

	});




	$('#btnSaveCluck').on('click', function(){
		saveCluck();
	});
});

function Login(){
	var email = $('#txtLoginEmail').val(); // need var here in JS bc then x would be a global variable
	var password = $('#txtLoginPassword').val();

	if (email === '' || password === '')
		return;

	$.ajax({
		url: '/api/login', //action or view you what to run
		type: 'POST', //post because we are pushing data
		data: { email: email, password: password} //name: value pair; values from above; name whatever you want it to be but must match your params[:name] in your controller
	}).done(function(data){

		if (data === null)
			alert('We could not log you in.  Please try again.');
		else
			// alert('Hello! ' + data.firstname + '. You have been successfully logged in');
			HideDialog();
			window.location.replace("http://localhost:3000/main/clucks")
	});
}

function HideDialog(){
	$('#overlay').hide();
	$('#signUpFormList').hide();
	$('#signInFormList').hide();
}

function saveCluck(){
	var txt = $('#txtCluck').val();

	$.ajax({
		url: '/api/savecluck',
		type: 'POST',
		data: {text: txt}
	}).done(function(newCluck){
		var old = $('#showClucks').html();
		var html = '<div class="cluck">';
		html += '<div class="item text">' + newCluck.text + '</div>';
		html += '<div class="item name">' + newCluck.user_name + '</div>';
		html += '<div class="item date">' + newCluck.post_date + '</div>';
		html += '</div>';

		$('#showClucks').html(html + old);
		$('#txtCluck').val('');
		$('#cluckCounter').html('142 characters left!');

	});
}
