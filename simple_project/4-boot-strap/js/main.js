
$(document).ready( function(){


	upVotes = function (i){
			posts[i].upvotes += 1;

			updatePost(i);
			
			var anchorId = "#upvote"+ i; 
			
			$(anchorId).addClass("btn-success")
					   .css( 'pointer-events', 'none');

	};

	downVotes = function (i){
			
			if ( posts[i].downvotes <= 0) posts[i].downvotes = 0;
			else posts[i].downvotes -= 1;

			updatePost(i);
			
			var anchorId = "#downvote"+ i; 
			
			$(anchorId).addClass("btn-danger")
					   .css( 'pointer-events', 'none');
 
	};

	
	updateHome();


	$("#postFormValidate").submit(function(event){

		var errorMsg = "";
		event.preventDefault();

 		var postSubject = $("#subject").val();
 		var postContent = $("#content").val();

 		if( postSubject ==="" || postContent === ""){
 			
 			console.log("wrong post");
 			$("#postSubjectGroup").addClass("has-error");
 			$("#postContentGroup").addClass("has-error");
 			//console.log($("#postSubjectGroup").attr("class"));
 		}

 		else{

 			var newpost = { subject  : postSubject, 
 							content  : postContent,
 							date     : '12-12-2012',
 							upvotes  : 0,
 							downvotes: 0
 						};

 			posts.unshift(newpost);

 			console.log(posts);

 			$("#postSubjectGroup").removeClass("has-error");
 			$("#postContentGroup").removeClass("has-error");
 			$("#subject").val("");
 			$("#content").val("");


 			updateHome();
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
 
 			$("#loginNameGroup").addClass("has-error");
 			$("#loginPassGroup").addClass("has-error");
 		   	console.log("wrong user");
 		}

 		else{

 			localStorage.setItem("user", name);
 			console.log("Welcome " + name);

 			$("#loginNameGroup").removeClass("has-error");
 			$("#loginPassGroup").removeClass("has-error");
 			$("#loginName").val("");
 			$("#loginPw").val("");


 			setTimeout( function() { $('#loginModal').modal('hide'); } , 1000);
 		}
	});

});

	function updatePost(i) {

		var postId = "#post" + i;	
		
		var html = "";

		html += '<a id="upvote' + [i] + '" onclick="upVotes(' + i + ')" type="button" class="btn btn-default">';
        html += '<span class="glyphicon glyphicon-thumbs-up"></span>';
      	html += '<span class="badge">' + posts[i].upvotes + '</span>';
	  	html += '</a>';
      	html += '<a id="downvote' + [i] + '" onclick="downVotes(' + i + ')" type="button" class="btn btn-default">';
      	html += '<span class="glyphicon glyphicon-thumbs-down"></span>';
  		html += '<span class="badge">' + posts[i].downvotes + '</span>';
      	html += '</a>';

		$(postId).html(html);	
		
	};


   function updateHome() {

   	var html = "";

		for ( var i in posts) {
	
          html += '<div class="post">';
          html += '  <h2>' + posts[i].subject + ' <small> ' + posts[i].date + '</small> </h2>';
          html += '  <div style="margin-top: 20px;"></div>';
          html += '  <div class="panel panel-default">';
          html += '      <div class="panel-body">' + posts[i].content + '</div>';
          html += '  </div>';
          html += '  <div class="row">';
          html += '    <div id="post' + [i] + '" class="col-xs-12 col-sm-12">';
          html += '        <a id="upvote' + [i] + '" onclick="upVotes(' + i + ')" type="button" class="btn btn-default">';
          html += '          <span class="glyphicon glyphicon-thumbs-up"></span>';
          html += '          <span class="badge">' + posts[i].upvotes + '</span>';
          html += '        </a>';
          html += '        <a id="downvote' + [i] + '" onclick="downVotes(' + i + ')" type="button" class="btn btn-default">';
          html += '          <span class="glyphicon glyphicon-thumbs-down"></span>';
          html += '          <span class="badge">' + posts[i].downvotes + '</span>';
          html += '        </a>';
          html += '    </div>';
          html += '  </div>';
          html += '</div>';

	}
		$("#postslist").html(html);
   } ;
	