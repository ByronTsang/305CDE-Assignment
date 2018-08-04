var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var dbUrl = "mongodb://localhost:27017/";
var host = 'mean-177370407284805.codeanyapp.com';
var port = 3000;
//import fontawesome from '@fortawesome/fontawesome'

(function() 
 {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) 
	{
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
    
    // signup function
		if (action === "/Signup") 
		{
			console.log("signup");
			if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
          
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var splitName = tempSplitName.split("=");
						var tempPassword = splitMsg[1];
						var splitPassword = tempPassword.split("=");
						var searchDB = "uname : " + splitName[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						res.writeHead(200, 
						{
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("student").count({"uname" : splitName[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
                console.log('count '+count);
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("student").insertOne(myobj, function(err, res) 
									{
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
    // login function
    else if (action === "/Login")
		{
			console.log("login");
			if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
          
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var splitName = tempSplitName.split("=");
						var tempPassword = splitMsg[1];
						var splitPassword = tempPassword.split("=");
						var searchDB = "Name : " + splitName[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						console.log("user=" + splitName[1] + ", password=" + splitPassword[1]);
						console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						res.writeHead(200, 
						{
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("student").count({"uname" : splitName[1], "pwd" : splitPassword[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
								if(err) throw err;
								if(finalcount > 0)
								{
									loginStatus = true;
									loginUser = splitName[1];
									console.log("user exist, user is: " + loginUser);
									db.close();
									return res.end(msg);
								}
								else
								{
									db.close();
									console.log("user or pw not match");
									return res.end("fail");
								}
							});
						});
					});
				});
			}
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
    // logout function
    else if (action === "/Logout")
		{
			console.log("logout");
			if (req.method === "POST") 
			{
				console.log("action = post");
        if (loginStatus)
          {
            loginStatus = false;
            console.log("User logout: " + loginUser);
            console.log("Login Status: " + loginStatus);
            sendFileContent (res, "index.html", "text/html");
          }
		  }
    }
    
    // facebook login function
    else if (action === "/FBLogin")
		{
			console.log("fblogin");
			if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitName = formData.split("=");
						console.log("mess="+msg);
						console.log("mess="+formData);
						res.writeHead(200, 
						{
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("student").count({"uname" : splitName[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
                console.log('count '+count);
								if(finalcount > 0)
								{
									loginStatus = true;
									loginUser = splitName[1];
									console.log("user exist, user is: " + splitName[1]);
									db.close();
									return res.end(msg);
								}
								else
								{
									dbo.collection("student").insertOne(myobj, function(err, res) 
									{
										if (err) throw err;
                    loginStatus = true;
                    loginUser = splitName[1];
										console.log("1 document inserted");
										db.close();
									});
									return res.end(msg);
								}
							});
						});
					});
				});
			}
    }
    
    // change password function
    else if (action === "/changepassword")
		{
			console.log("Change Password");
			if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
						console.log("mess="+formData);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempOldPassword = splitMsg[1];
						var tempNewPassword = splitMsg[1];
						var splitName = tempSplitName.split("=");
						var splitOldPassword = tempOldPassword.split("=");
						var splitNewPassword = tempNewPassword.split("=");
						console.log("user=" + splitName[1] + ", Old password=" + splitOldPassword[1] + ", New password=" + splitNewPassword[1]);
						var searchDB = "uname : " + splitName[1];
						console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						res.writeHead(200, 
						{
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							//if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("student").count({"uname" : splitName[1], "pwd" : splitOldPassword[1]}, function(err, count)
							{
								console.log(err, count);
								finalcount = count;
								if(err) throw err;
								if(finalcount > 0)
								{
                  var myquery = {uname : splitName[1]};
                  var newvalues = { $set: {pwd : splitNewPassword[1]} };
                  dbo.collection("student").updateOne(myquery, newvalues, function(err, count)
                  {
                    if(err) throw err;
                    console.log("Password Updated.");
                  });
									db.close();
									return res.end(msg);
								}
								else
								{
									db.close();
									console.log("user or pw not match");
									return res.end("fail");
								}
							});
						});
					});
				});
			}
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
    
    
    
    
		else if (action === "/addfavour")
		{
			if(loginStatus)
			{
				console.log("add favour");
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
					return req.on('data', function(data) 
					{
						formData += data;
						console.log("form data = "+ formData);
						return req.on('end', function() 
						{
							var user;
							user = qs.parse(formData);
							msg = JSON.stringify(user);
							stringMsg = JSON.parse(msg);
              var tempSplitMsg = formData.split("&");
              var splitMsgFav = tempSplitMsg[1].split("=");
              var splitMsgFavLink = tempSplitMsg[2].split("=");
							console.log("tempSplitMsg0 = "+tempSplitMsg[0]);
							console.log("tempSplitMsg1 = "+tempSplitMsg[1]);
							console.log("tempSplitMsg2 = "+tempSplitMsg[2]);
							console.log("splitMsgFav = "+splitMsgFav[1]);
							console.log("splitMsgFavLink = "+splitMsgFavLink[1]);
							console.log("mess = "+msg);
							console.log("mess = "+formData);
							res.writeHead(200, 
							{
								"Content-Type": "application/json",
								"Content-Length": msg.length
							});
							MongoClient.connect(dbUrl, function(err, db) 
							{
								var finalcount;
								if (err) throw err;
								var dbo = db.db("mydb");
								var myobj = {"user" : loginUser, "favourite" : splitMsgFav[1], "favouriteLink" : splitMsgFavLink[1]};
                console.log("fav data = " + myobj)
								dbo.collection("favourlist").count(myobj, function(err, count)
								{
									console.log(err, count);
									finalcount = count;
									if(finalcount > 0)
									{
										if(err) throw err;
										console.log("fav exist");
										db.close();
										return res.end("fail");
									}
									else
									{
										dbo.collection("favourlist").insertOne(myobj, function(err, res) 
										{
											if (err) throw err;
											console.log("fav inserted");
											db.close();
										});
										return res.end(msg);
									}
								});
							});
						});
					});
				}
			}
			else
			{
				console.log("no user detected.");
			}
		}
    
		else if (action === "/readfavour")
		{
      if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
					console.log("form data = "+ formData);
					return req.on('end', function() 
					{
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						//var splitMsg = formData.split("&");
						//var tempSplitName = splitMsg[0];
						var splitName = formData.split("=");
						var username =splitName[1];
						console.log("login = "+username);
					//	res.writeHead(200, 
					//	{
				//			"Content-Type": "application/json",
					//		"Content-Length": msg.length
						//});
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) {
                console.log("db connect : "+err);
                throw err;
             }
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("favourlist").find({"user" : username}).toArray(function(err, result) 
							{
								if (err) {
                  console.log("db connect : "+err);
									console.log(result);
								  db.close();
                  //throw err;
                  return res.end(err);
                } else {
								  var resultReturn = JSON.stringify(result);
									console.log(resultReturn);
                  db.close();
									return res.end(resultReturn);
                }
							});
						});
					});
				});
			}
    }
    
    
    else if (action === "/removefavour")
		{
			
				console.log("remove favour");
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
					return req.on('data', function(data) 
					{
						formData += data;
          
						console.log("form data="+ formData);
						return req.on('end', function() 
						{
							var user;
							user = qs.parse(formData);
              var splitMsg = formData.split("&");
							var tempSplitName = splitMsg[0];
              var splitName = tempSplitName.split("=");
              var favid=splitName[1];
              console.log("login="+favid);
						
							
							//res.writeHead(200, 
							//{
						//		"Content-Type": "application/json",
						//		"Content-Length": msg.length
						//	});
							MongoClient.connect(dbUrl, function(err, db) 
							{
								var finalcount;
								if (err) throw err;
								var dbo = db.db("mydb");
								var myobj = {_id : new ObjectID(favid)};
								console.log(myobj);
								dbo.collection("favourlist").count(myobj, function(err, count)
								{
									console.log(err, count);
									finalcount = count;
									if(finalcount > 0)
									{
										dbo.collection("favourlist").deleteOne(myobj, function(err, res) 
										{
											if (err) throw err;
											console.log("fav removed");
											db.close();
										});
										return res.end(msg);
									}
									else
									{
										if(err) throw err;
										console.log("fav not exist");
										db.close();
										return res.end("fail");
									}
								});
								
								 dbo.collection("favourlist").find({}).toArray(function(err, result) {
											if (err) throw err;
											console.log(result);
											db.close();
								});
              });
						});
					});
				}
    }
    
    
		else if (action === "/submitdata")
		{
      MongoClient.connect(dbUrl, function(err, db) 
      {
        var keyword = "Test";
        var texttitle = "Crime Prevention Through Sport and Physical Activity";
        var username = "Margaret Cameron and Colin MacDougall";
        var usertitle = "";
        var image = "";

        var dbo = db.db("mydb");
        var myobj = {"keyword" : keyword, "texttitle" : texttitle, "username" : username, "usertitle" : usertitle, "image" : image};
        console.log("text data = " + myobj)
            dbo.collection("textlist").insertOne(myobj, function(err, res) 
            {
              if (err) throw err;
              console.log("text inserted");
              db.close();
            });
            return res.end(msg);
      });
		}
		else if (action === "/Search")
		{
			console.log("search");
			if (req.method === "POST") 
			{
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) 
				{
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() 
					{
						var userSearch;
						userSearch = qs.parse(formData);
						msg = JSON.stringify(userSearch); 
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						console.log("form data: "+ formData);
						console.log("msg: " + msg);
            console.log("stringMsg: " + stringMsg);
            console.log("split: " + splitMsg[1]);
						/*res.writeHead(200, 
						{
							"Content-Type": "text/html",
							"Content-Length": msg.length
						});*/
						MongoClient.connect(dbUrl, function(err, db) 
						{
							var finalcount;
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("textlist").find({"keyword" : { $regex: splitMsg[1]}}, {"_id" : 0, "command" : 1, "texttitle" : 1}).toArray(function(err, result) 
							{
    						if (err) throw err;
    						console.log("result: " + result);
                db.close();
								var resultReturn = JSON.stringify(result);
								console.log("return: " + resultReturn);
								return res.end(resultReturn);
							});
						});
					});
				});
			}
			else 
			{
				form = "search.html";
				return fs.readFile(form, function(err, contents) 
				{
					if (err !== true) 
					{
						res.writeHead(200, 
						{
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
        if(loginStatus)
				{
					sendFileContent(res, "index_stylish.html", "text/html");
				}
				else
				{
					//sendFileContent(res, "client.html", "text/html");
					sendFileContent(res, "index.html", "text/html");
				}
			}
			else if (req.url === "/signup")
			{
				sendFileContent(res, "views/signup.html", "text/html");
			}
			else if (req.url === "/googlec5ba0863ca85b5e9.html")
			{
				sendFileContent(res, "googlec5ba0863ca85b5e9.html", "text/html");
			}
			else if (req.url === "/loginpage")
			{
				sendFileContent(res, "index.html", "text/html");
			}

			else if(req.url === "/")
      {
				/*console.log("Requested URL is url" + req.url);
				res.writeHead(200, 
				{
					'Content-Type': 'text/html'
				});
				res.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + req.url);*/
        if(loginStatus)
				{
					sendFileContent(res, "views/home.html", "text/html");
				}
				else
				{
					//sendFileContent(res, "client.html", "text/html");
					sendFileContent(res, "index.html", "text/html");
				}
			}
      else if(/^\/[a-zA-Z0-9\/\\.\\-]*.js$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}
			else if(/^\/[a-zA-Z0-9\/\\.\\-]*.css$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}
			else if(/^\/[a-zA-Z0-9\/\\.\\-]*.min.css$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}
			//else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(req.url.toString()))
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.jpg$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.png$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.ico.png$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.gif$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "image/gif");
			}
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.woff2$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "font/woff2");
			}
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.woff$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "application/font-woff");
			}
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.ttf$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "application/font-sfnt");
			}
			else if(/^\/[a-zA-Z0-9\/\\_\\-]*.json$/.test(req.url.toString()))
			{
				sendFileContent(res, req.url.toString().substring(1), "application/javascipt");
			}
      else
			{
				console.log("Requested URL is: " + req.url);
				res.end();
			}

		}
	});

  //Start server
	server.listen(port);
  console.log("Server is running at http://" + host + ":" + port + " on " + new Date());

	function sendFileContent(response, fileName, contentType)
	{
		fs.readFile(fileName, function(err, data)
		{
			if(err)
			{
				response.writeHead(404);
				response.write("Not Found!");
			}
			else
			{
				response.writeHead(200, {'Content-Type': contentType, 'Access-Control-Allow-Origin': '*'});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);
