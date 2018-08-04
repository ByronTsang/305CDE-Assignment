// node.js login
$(document).ready(function(){
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

// Logout function
function Logout(){
  //alert("Logout");
  $.ajax({
    url: "https://mean-177370407284805.codeanyapp.com/Logout",
    type: "POST",
    data: "",
    success: function (result) {
      console.log(result);
      $("#loginresult").html("Guest");
      window.location.href = "/";
      if(result.status == 200){
          console.log("hope can see here");
        }
    },
    error: function(result){
        console.log(result);
      }
  });
  localStorage.removeItem("username");
}

// add to favourite function
function changePwd(){
  var dataOld = $("#pwdOld").val();
  var dataNew = $("#pwdNew").val();
  $.ajax(
    {	
      url: "https://mean-177370407284805.codeanyapp.com/changepassword", 
      type: 'POST',
      data: "user="+localStorage.getItem("username")+"&pwdOld="+dataOld+"&pwdNew="+dataNew,
      success: function(result){
        alert("Password changed successfully.");
      }//,
      //error: function (xhr, textStatus, errorThrown) {
      //  alert("Error: "+textStatus);
      //  console.log(textStatus);
      //}
    }
  );
}


// add to favourite function
function addtofav(id){
  //alert("Link ID : "+id);
  var data=$("#linkto"+id).html();
  //alert("Favourite content : "+data);
  var datalink=document.getElementById("linkto"+id).href;
  //alert("Favourite link : "+datalink);
  $.ajax(
    {	
      url: "https://mean-177370407284805.codeanyapp.com/addfavour", 
      type: 'POST',
      data: "user="+localStorage.getItem("username")+"&fav="+data+"&favlink="+datalink,
      success: function(result){
        alert("Successfully added to your favourite list.");
      },error: function (xhr, textStatus, errorThrown) {
        alert("Error: "+textStatus);
        console.log(textStatus);
      }
    }
  );
}

// read to favourite function
function readfav(){
  //alert("read");
  var mydata="user="+localStorage.getItem("username");
  var data = "";
  //alert(mydata);
  $.ajax(
    {
      url: "https://mean-177370407284805.codeanyapp.com/readfavour",
      type: 'POST',
      data: "user="+localStorage.getItem("username"),
      success: function(resultReturn)
      { 
        //alert(resultReturn);
        var stringObj = JSON.parse(resultReturn);
        alert('Found ' + stringObj.length + ' item(s) in your favourite.');
        var favhtml = "";
        favhtml += '<div class="heading">';
        favhtml += '<span class="icon-logo"><img src="images/icon-logo.png" alt="#"></span>';
        favhtml += '<h2>Favourite List of ' + stringObj[0].user + '</h2>';
        favhtml += '</div>';
        for(i = 0; i < stringObj.length; i++)
        {
          var num = i + 1;
          var tempLink=stringObj[i].favouriteLink;
          favhtml += '<div class="col-md-3 col-sm-6 col-xs-12">';
            favhtml += '<div class="service-widget">';
              favhtml += '<div class="post-media wow fadeIn">';
                favhtml += '<h3><a target="_blank" href="'+ tempLink +'">No. ' + num + ' : ' + stringObj[i].favourite + '</a></h3>';
              favhtml += '</div>';
              favhtml += '<div class="footer-social">';
                favhtml += '<center><button id=remove_' + stringObj[i]._id + ' class="btn grd1" onclick="removefav(this.id)">Remove Favourite</button>';
                favhtml += '</center>';
              favhtml += '</div>';
              favhtml += '<div class="footer-social">';
              favhtml += '</div>';
            favhtml += '</div>';
          favhtml += '</div>';
        }
          //alert(favhtml);
        $('#flistresult').html(favhtml);
      },error: function (xhr, textStatus, errorThrown) 
      {
        alert("Favourite search failed.");
        alert(data);
        console.log(textStatus);
        alert(xhr.responseText);
      }
    });
}


function removefav(id){
  //alert(id);
  var splitData = id.split("_");
  var removeData = "removeid=" + splitData[1];
  //alert(removeData);
  $.ajax(
    {	
      url: "https://mean-177370407284805.codeanyapp.com/removefavour", 
      type: 'POST',
      data: removeData,
      success: function(resultReturn)
      { 
        //alert(resultReturn);
        //alert(JSON.stringify(resultReturn));
        alert(id+" removed from your favourite list.")
        readfav()
      },error: function (xhr, textStatus, errorThrown) 
      {
        alert("Favourite remove failed");
        console.log(textStatus);
        alert(xhr.responseText);
      }
    }
  );
}

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
        var nameToID = venueData[i].Name_en;
        nameToID = nameToID.replace(/\s/g, '');
        venuehtml += '<div class="col-md-3 col-sm-6 col-xs-12">';
        venuehtml += '<div class="service-widget">';
        venuehtml += '<div class="post-media wow fadeIn">';
        venuehtml += '<h2><a id="linkto' + nameToID + '" href="' + venueData[i].URL_en + '">' + venueData[i].Name_en + '</a></h2>';
        venuehtml += '<h3>' + venueData[i].Category_en + '</h3>';
        venuehtml += '</div>';
        venuehtml += '<div class="footer-social">';
        venuehtml += '<a href="' + venueData[i].URL_en + '" data-scroll="" class="btn btn-dark btn-radius btn-brd">Click Here</a>';
        venuehtml += '</div>';
        venuehtml += '<div class="footer-social">';
				venuehtml += '<button id="' + nameToID + '" class="btn grd1" onclick="addtofav(this.id)">Add to Favourite</button>';
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
      alert('Venue request error: '+xhr);
    }
  });
}