window.fbAsyncInit = function() {
  FB.init({
    appId      : '495142504256241',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.9',
  });

  FB.AppEvents.logPageView();   

};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK

function fbLogin() {
  FB.login(function (response) {
    if (response.authResponse) {
      FB.api('/me', function(response) {
        // Get and display the user profile 
        FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
         function (response) {
           sessionStorage.fb = response.first_name;
           sessionStorage.username = response.id;
           localStorage.setItem("username", response.first_name);
           var mydata = "uname="+response.id;
           //alert(mydata);
           //return;
           $.ajax({
             url: "https://mean-177370407284805.codeanyapp.com/FBLogin",
             type: "POST",
             data: mydata,
             success: function (result) {
               //alert('welcome'+ usr);
               $("#loginresult").html("Welcome:" + localStorage.getItem("username"));
               console.log(result);
               window.location.href = window.location.href;
               if(result.status == 200){
                 console.log("hope can see here");
               }
             },
             error: function(result){
               console.log(result);
             }
           });
         });

       });
     } else {
          window.location.href = "/";
     }
  
  });
}


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}


// Fetch the user profile data from facebook

function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
        document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
        document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>Locale:</b> '+response.locale+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
    });
}

// Logout from facebook

function fbLogout() {
    Logout();
    if (sessionStorage.id){
    FB.logout(function() {
        window.location.href = "/";
    });
    }
}
  
  