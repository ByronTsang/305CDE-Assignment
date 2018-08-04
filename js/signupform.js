$(document).ready(function() {
   $("#view_button3").bind("mousedown touchstart", function() {
          $("#password").attr("type", "text");
      }), $("#view_button3").bind("mouseup touchend", function() {
          $("#password").attr("type", "password");
      }), $("#view_button4").bind("mousedown touchstart", function() {
          $("#verifypassword").attr("type", "text");
      }), $("#view_button4").bind("mouseup touchend", function() {
          $("#verifypassword").attr("type", "password")
      })
});

var code = "";
var codeverified = false;

function passwordChecker(){
  $('#verifypassword').val('');
  $('#message1').html('');
  $('#message8').html('');
  $('#message10').html('');
  $('#message').html('');
  $('#message2').html('');
  $('#message3').html('');
  $('#message4').html('');
  $('#message5').html('');
  $('#message6').html('');
  $('#message7').html('');
  if($('#password').val().length>=4){
    if(newValPassPoilcy()===true ){
      $('#message').css('color','green');
      $('#message').html('Although looks like a good password, try to make it more stronger');
    if($('#password').val().length>=9){
      $('#message').html('');
      $('#message1').html('');
    } 
      return true;
    }
  }
}

function NumAndWordRep(){
  var password = $('#password').val().toLowerCase();
  if(password.match(/(.)\1\1/)){
    //	alert("Your Password cannot contain Character or Number repetition");
    $('#message7').css('color','red');
    $('#message7').html('Your Password cannot contain Character or Number repetition.');
    return false;
  }
  return true;
}

function userNameAsPass(){
  var password = $('#password').val().toLowerCase();
  var uname=$('#username').val().toLowerCase();
  var uname1 = new RegExp(uname);
  if(null!==uname &&''!==uname){
  if( uname1.test(password)){
    $('#message6').css('color','red');
    $('#message6').html('Your Password cannot contain your Username.');
    return false;
  }}
  else{
    $('#message6').html('');
    $('#message10').css('color','red');
    $('#message10').css('font-weight','bold');
    $('#message10').html('Please enter your username first !!');
    return false;
  }
  return true;
}

function  newValPassPoilcy(){
  var password = $('#password').val();
  if(!password.match(/^(?=.{6,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_+=\\*\\-\\(\\)\\{\\}\\:\\;\\<\\>\\|\\,\\.\\?\\/\\'\\"]).*$/) || userNameAsPass()===false || NumAndWordRep()===false){
    $('#message8').css('color','red');
    $('#message8').html('Your password must contain:-');
    if(!password.match(/^(?=.{6,}).*$/)){
      $('#message').css('color','red');
      $('#message').html(' - minimum 6 characters.');
    }
    if(!password.match(/^(?=.*[0-9]).*$/)){
      $('#message2').css('color','red');
      $('#message2').html(' - at least 1 Number.');
    }
    if(!password.match(/^(?=.*[a-z]).*$/))
    {
      $('#message3').css('color','red');
      $('#message3').html(' - at least 1 Lowercase character.');
    }
    if(!password.match(/^(?=.*[A-Z]).*$/)){
      $('#message4').css('color','red');
      $('#message4').html(' - at least 1 Uppercase character.');
    }
    if(!password.match(/^(?=.*[!@#$%^&_+=\\*\\-\\(\\)\\{\\}\\:\\;\\<\\>\\|\\,\\.\\?\\/\\'\\"]).*$/)){
      $('#message5').css('color','red');
      $('#message5').html('	- at least 1 Special character.');
    }
    if(userNameAsPass()===false){
      if(password.match(/^(?=.{6,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_+=\\*\\-\\(\\)\\{\\}\\:\\;\\<\\>\\|\\,\\.\\?\\/\\'\\"]).*$/)){
      $('#message8').html('');  
      }
    }
    if(NumAndWordRep()===false){
      if(password.match(/^(?=.{6,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_+=\\*\\-\\(\\)\\{\\}\\:\\;\\<\\>\\|\\,\\.\\?\\/\\'\\"]).*$/)){
      $('#message8').html('');  
      }
    } 
    return false;
    } 
    else{

    return true;
    }
}

function submitForm(){
  if(document.getElementById("username").value.trim()==="" && document.getElementById("username").value!==null){
    $('#message1').css('color','red');
    $('#message1').html('Please enter your username');   
  }
  else if(document.getElementById("yourEmail").value.trim()==="" && document.getElementById("yourEmail").value!==null){
    $('#message1').css('color','red');
    $('#message1').html('Please enter your Email ID');   
  }
  else if(checkEmail()===false){
    $('#message1').css('color','red');
    $('#message1').html('Enter a valid Email address'); 
  }
  else if(document.getElementById("password").value.trim()==="" && document.getElementById("password").value!==null){
    $('#message1').css('color','red');
    $('#message1').html('Please enter your Password');   
  }
  else if(document.getElementById("verifypassword").value.trim()==="" && document.getElementById("verifypassword").value!==null){
    $('#message1').css('color','red');
    $('#message1').html('Please confirm your password');   
  }
  else if(!codeverified){
    $('#message1').css('color','red');
    $('#message1').html('Please verify your verification code'); 
  }
  else{
    var password=$('#password').val();
    var confirm=$('#verifypassword').val();
    if(password==confirm){
      $('#message1').css('color','green');
      
            var tempSignupData;
		        tempSignupData = document.forms["challenge"]["username"].value;
            if(tempSignupData == "")
              {
                alert("Please fill the field.");
              }
            else{
              //alert("Login click");
              var usr=$("#username").val();
              var pwd=$("#password").val();
              var mydata="uname="+usr+"&pwd="+pwd;
              //alert(mydata);
              //return;
              $.ajax({
                url: "https://mean-177370407284805.codeanyapp.com/Signup",
                type: "POST",
                data: mydata,
                success: function (result) {
                  //alert(result);
                  //alert(mydata);
                  console.log(result);
                  alert('You can now login with your credential!');
                  window.location.href = "/";
                  if(result.status == 200){
                      console.log("hope can see here");
                    }
                },
                error: function(result){
                  alert('Account problems');
                  console.log(result);
                  window.location.href = window.location.href;
                  }
              });
              return false;
            }
          
      //$('#message1').html('Success! You have reached the end of this demo application');   
    }
    else{
      $('#message1').css('color','red');
      $('#message1').html('Confirm password and password must be same');   
    return false;
    }
    return true;
  }
}	
function checkEmail(){
  var email=$('#yourEmail').val();
  if((email.indexOf(".") > 2) && (email.indexOf("@") > 0)){
    return true; 
  }
  else{
    return false;		 
  }
}

function samplesendMail(){  
  var myform = $("form#myform");
  myform.submit(function(event){
    event.preventDefault();

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";
    var template_id = "template_lBuHMfYk";

    myform.find("button").text("Sending...");
    emailjs.sendForm(service_id,template_id,"myform")
      .then(function(){ 
        alert("Sent!");
         myform.find("button").text("Send");
      }, function(err) {
         alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
         myform.find("button").text("Sent");
      });
    return false;

  });
}

function sendCodeToMail(){  
  var codeLength = 4;
  var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
       for(var i = 0; i < codeLength; i++) {
          var index = Math.floor(Math.random()*36); 
          code += random[index];
      }
  //emailjs API
  //var code = "jQuery 3.3.1, default template, modified toname with id, message with code - tested ok";
  var template_params = {
     "reply_to": "Prevent Risk Taking Bahaviour",
     "from_name": "Prevent Risk Taking Bahaviour",
     "to_name": document.getElementById("yourEmail").value,
     "message_html": code
  }

  var myform = $("form#signupform");
  myform.submit(function(event){
    event.preventDefault();

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";
    var template_id = "template_lBuHMfYk";

    myform.find("#sendcodebtn").text("Sending...");
    emailjs.send(service_id,template_id,template_params)
      .then(function(){ 
        alert("Sent!");
         myform.find("#sendcodebtn").text("Send");
      }, function(err) {
         alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
         myform.find("#sendcodebtn").text("Sent");
      });
    return false;
  });
}

function validate(){  
  var inputCode = document.getElementById("codeinput").value.toUpperCase();
  if(inputCode.length <= 0) {
    alert("Please enter the code sent to your email.");
  }else if(inputCode != code ) {
    alert("Failed to verify the code. New code is sent to your email.");
    sendCodeToMail();
    document.getElementById("codeinput").value = "";
    code = "";
  }else {
    alert("Code verified successfully.");
    codeverified = true;
  }
}