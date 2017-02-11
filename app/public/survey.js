$(document).ready(function() {
	$(document).on('click', '#submit', function() {
		// Form validation
    	function validateForm() {
			var isValid = true;
			$('.form-control').each(function() {
		    	if ( $(this).val() === "" ){
					isValid = false;
		    	}
			});

			$('.chosen-select').each(function() {

				if( $(this).val() === "") {
					isValid = false
				}
			});
			return isValid;
		}
		if (validateForm()) {
			var scoresArr = [
					parseInt($('#q1').val().trim()),
					parseInt($('#q2').val().trim()),
					parseInt($('#q3').val().trim()),
					parseInt($('#q4').val().trim()),
					parseInt($('#q5').val().trim()),
					parseInt($('#q6').val().trim()),
					parseInt($('#q7').val().trim()),
					parseInt($('#q8').val().trim()),
					parseInt($('#q9').val().trim()),
					parseInt($('#q10').val().trim())
				];
			var newUser = {
				name: $('#name').val().trim(),
				picture: $('#photo').val().trim(),
				scores: scoresArr
			};
			console.log(newUser);

			$.post(window.location.origin + "/api/friends", newUser).done(function(bestMatch) {
				$('#matchName').text(bestMatch.name);
				$('#matchImg').attr("src", bestMatch.picture);
				console.log(bestMatch.picture);
				$('#resultsModal').modal('toggle');
			});
		}
		else {
			$("#errorModal").modal('toggle');
		}
	});
});