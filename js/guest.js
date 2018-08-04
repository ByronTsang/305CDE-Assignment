// node.js login
      $(document).ready(function(){
          $("#loginbtn").click(function(){
              var tempLoginData;
              tempLoginData = document.forms["formName"]["usr_id"].value;
              if(tempLoginData == "")
              {
                  alert("Please fill the login form.");
              }
              else{
                  //alert("Login click");
                  var usr=$("#usr_id").val();
                  var pwd=$("#pwd_id").val();
                  var mydata="uname="+usr+"&pwd="+pwd;
                  //alert(mydata);
                  //return;
                  $.ajax({
                      url: "https://mean-177370407284805.codeanyapp.com/Login",
                      type: "POST",
                      data: mydata,
                      success: function (result) {
                        //alert('welcome'+ usr);
                        localStorage.setItem("username", usr);
                        $("#loginresult").html("Login:" + localStorage.getItem("username"));
                        //alert(result);
                        //alert(mydata);
                        console.log(result);
                        window.location.href = window.location.href;
                        if(result.status == 200){
                            console.log("hope can see here");
                        }
                      },
                      error: function(result){
                        console.log(result);
                        alert("Username or Password does not match.");
                      }
                  });
                  return false;
              }
          });
        
          $("#searchbtn").click(function(){
              var tempSearchData;
              tempSearchData = document.forms["mySearchForm"]["search_txt"].value;
              if(tempSearchData == "")
              {
                  alert("Please fill the search field.");
              }
              else{
                  //alert("Login click");
                  var usrSearch=$("#search_txt").val();
                  var mydata="keyword="+usrSearch;
                  //alert(mydata);
                  //return;
                  $.ajax({
                      url: "https://mean-177370407284805.codeanyapp.com/Search",
                      type: "POST",
                      data: mydata,
                      success: function (resultReturn) {
                        //alert('Search: '+ mydata);
                        //alert(resultReturn);
                        console.log(resultReturn);
                        var stringObj = JSON.parse(resultReturn);
                        alert('Found ' + stringObj.length + ' item(s).');
                        var searchResultHtml = "";
                        searchResultHtml += '<div class="row">';
                        for(i = 0; i < stringObj.length; i++)
                        {
                          var num = i + 1;
                          var temp1="";
                          searchResultHtml += '<div class="col-md-6 col-sm-12 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">';
                          searchResultHtml += '<div class="testimonial clearfix">';
                          searchResultHtml += '<div class="desc">';
                          searchResultHtml += '<h3><i class="fa fa-quote-left"></i>' + stringObj[i].texttitle + '</h3>';
                          searchResultHtml += '<p class="lead">' + stringObj[i].keyword + '</p>';
                          searchResultHtml += '</div>';
                          
                          searchResultHtml += '<div class="testi-meta">';
                          searchResultHtml += '<img src="images/' + stringObj[i].image + '" alt="" class="img-responsive alignleft">';
                          searchResultHtml += '<h4>' + stringObj[i].username + ' <small>- ' + stringObj[i].usertitle + '</small></h4>';
                          searchResultHtml += '</div>';
                          
                          searchResultHtml += '</div>';
                          searchResultHtml += '</div>';

                        }
                        searchResultHtml += '</div>';
                        $('#searchresult').html(searchResultHtml);
                        
                        if(result.status == 200){
                            console.log("hope can see here");
                        }
                      },
                      error: function(result){
                          console.log(result);
                      }
                  });
                  return false;
              }
          });

        $(function() {
          if (localStorage.getItem("username")){
            $("#loginresult").html("Welcome: " + localStorage.getItem("username"));
            $("#loginmenu").hide();
            $("#logoutbtn").show();
          }else{
            $("#loginresult").html("Guest");
            $("#loginmenu").show();
            $("#logoutbtn").hide();
          }
        });
        
      });

function listVenue (){
  $.ajax({
    type: "GET",
    url : "https://mean-177370407284805.codeanyapp.com/json/venue.json",
    dataType : "json",
    success : function(venueData) {
      alert('Found ' + venueData.length + ' venue(s).');
      var venuehtml = "";
      venuehtml += '<div class="heading">';
      venuehtml += '<span class="icon-logo"><img src="images/icon-logo.png" alt="#"></span>';
      venuehtml += '<h2>Leisure Venue for Outdoor Activity</h2>';
      venuehtml += '<h3>Get away from risk taking behavior, find some leisure places to go!</h3>';
      venuehtml += '</div>';
      for(i = 0; i < 20; i++)
      {
        var num = i + 1;
        venuehtml += '<div class="col-md-3 col-sm-6 col-xs-12">';
        venuehtml += '<div class="service-widget">';
        venuehtml += '<div class="post-media wow fadeIn">';
        venuehtml += '<h2>No. ' + num + ' : ' + venueData[i].Name_en + '</h2>';
        venuehtml += '<h3>' + venueData[i].Category_en + '</h3>';
        venuehtml += '</div>';
        venuehtml += '<div class="footer-social">';
        venuehtml += '<a href="' + venueData[i].URL_en + '" data-scroll="" class="btn btn-dark btn-radius btn-brd" target="_blank">Click Here</a>';
        venuehtml += '</center>';
        venuehtml += '</div>';
        venuehtml += '<div class="footer-social">';
        venuehtml += '</div>';
        venuehtml += '</div>';
        venuehtml += '</div>';
      }
      $('#leisureVenue').html(venuehtml);
    },
    error : function(xhr){
      alert('Venue request error.');
    }
  });
}
