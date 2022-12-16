
$(document).ready( function(){


	upVotes = function (i){
			posts[i].votes += 1;

			updatePost(i);
			
			var anchorId = "#upvote"+ i; 
			
			$(anchorId).css("color", "green")
					   .css( 'pointer-events', 'none');

	};

	downVotes = function (i){
			posts[i].votes -= 1;
			
			updatePost(i);
			
			var anchorId = "#downvote"+ i; 
			
			$(anchorId).css("color", "red")
					   .css( 'pointer-events', 'none');
 
	};

	 
	var html = "";

		for ( var i in posts) {
	
		html +=	'<div class="post">';
	    html += '<div class="post-heading">';
	    html += '<div class="post-title">' + posts[i].subject + '</div>';
	    html += '<div class="post-date">' + posts[i].date + '</div>';
	    html += '</div>'
	    html +=	'<div class="post-content">' + posts[i].content + '</div>';
	    html +=	'<div id="post' + i + '" class="post-vote"> votes(' + posts[i].votes + ')';
	    html +=	'<a id="upvote' + i + '" onclick="upVotes(' + i + ')" class="login-link">up</a>';
	    html +=	'<a id="downvote' + i + '" onclick="downVotes(' + i + ')" class="login-link">down</a>';
	    html +=	'</div>';
		html += '</div>';

	}
		$("#postslist").html(html);


	$("#postFormValidate").submit(function(event){

		var errorMsg = "";
		event.preventDefault();

 		var postSubject = $("#subject").val();
 		var postContent = $("#content").val();

 		if( postSubject ==="" || postContent === ""){
 			 $("#postFeedback").css("color", "red")
 		   			     	   .html("invalid content or subject");
 		}

 		else{

 			var newpost = { subject : postSubject, 
 							content : postContent,
 							date    : '12-12-2012'
 						};

 			posts.unshift(newpost);

 			$("#postFeedback").css("color", "green")
 						      .html("Done"); 
 		}
	});


	$("#loginFormValidate").submit(function(event){

		var errorMsg = "";
		event.preventDefault();

 		var name     = $("#loginName").val();
 		var password = $("#loginPw").val();


		function getUserIndex(){
			for (var i in users){
				if (users[i].userName === name)
					return i;
			}	
			return -1;
		};

		function isValidPassword(){
			var userIndex = getUserIndex(name);
			
			if( userIndex !== -1){
				return (password === users[userIndex].passWord);
			}
			else return false;

		};


 		if(name === "" || password === "" || !isValidPassword()){
 			 $("#loginFeedback").css("color", "red")
 		   			     	   .html("invalid username or password");
 		}

 		else{

 			localStorage.setItem("user", name);

 			$("#loginFeedback").css("color", "green")
 						      .html("Welcome " + name); 
 		}
	});


	$("#signupFormValidate").submit(function(event){

		event.preventDefault();

		function isValidEmail(emailAddress) {

 			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([az]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
 			return pattern.test(emailAddress);
 		};

 		function clearErrors(){
 			$("#nameError").html("");
 			$("#passError").html("");
 			$("#verfyError").html("");
 			$("#mailError").html("");
 		
 		};


 		var username  = $("#signupName").val();
 		var password  = $("#signupPw").val();
		var verifyPw  = $("#signupVerify").val();
 		var email     = $("#signupMail").val();


 		if( username ===""){
 			 $("#nameError").html("invalid username");
 		}

 		if( password ===""){
 			 $("#passError").html("invalid password");
 		}

 		if( password !== verifyPw){
 			 $("#verfyError").html("verifying password not match");
 		}

 		if( !isValidEmail(email)){
 			 $("#mailError").html("invalid email");
 		}

 		else{
 			
 			clearErrors();

 			var newuser = {
			 				userName : username,
			 				passWord : password,
			 				email    : email
						}

			users.push(newuser);

			console.log(users);

 		}
	});

});

	function updatePost(i) {

		var postId = "#post" + i;	
		
		var html = "";

		 html +='votes(' + posts[i].votes + ')';
	    html +=	'<a id="upvote' + i + '" onclick="upVotes(' + i + ')" class="login-link">up</a>';
	    html +=	'<a id="downvote' + i + '" onclick="downVotes(' + i + ')" class="login-link">down</a>';
		
		$(postId).html(html);	
		
	};