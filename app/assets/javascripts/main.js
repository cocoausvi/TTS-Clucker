$(document).ready(function(){
    $('#signUpFormList').hide();
    $('#overlay').hide();
	$('#btnLogin').on('click', function(){
		$('#overlay').show();
		$('#signUpFormList').fadeIn(1000).show();
		$('#Cancel').on('click', function(){
			$('#overlay').hide();
			$('#signUpFormList').hide();
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
		$('#Submit').on('click', function() {
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
		// $.ajax({
			// url: '/api/saveSignUp',
			// data: {firstname: firstname, lastname: lastname, email: email},
			// type: 'POST'
		// }).done(function(data){
			// console.log(data);
			// alert('Success Submission');
		});
	});
});
