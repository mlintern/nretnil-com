          if(window.location.hash) {
            var hash = window.location.hash.substring(1);
            var regexp = /=(.*)/g;
            var token = regexp.exec(hash);
            var regexp = /([0-9]*)/g;
            var id = regexp.exec(token[1]);

            $('.result').addClass("hidden");
            $(".result .text").empty();
            $(".result .avatar").empty();
            $(".result .token").empty();
            $.getJSON("https://api.instagram.com/v1/users/"+id[1]+"/?access_token="+token[1]+"&callback=?",
                {
                    format: "json"
                },
                function(data) {
                    console.log(data);
                    var avatar = "<ul class='thumbnails'><li class='span1'><a href='"+data.data.profile_picture+"' class='thumbnail' target='_blank'><img src='"+data.data.profile_picture+"' alt=''></a></li>";
                    $(".result .avatar").append(avatar);
                    
                    var token2 = "<h4>Access Token:</h4><br /><pre>" + token[1] + "</pre><br />";
                    $(".result .token").prepend(token2);
                    
                    var id = "<span class='lead'>User ID: " + data.data.id + "</span><br />";
                    $(".result .text").prepend(id);
                    
                    var username = "Username: " + data.data.username + "<br />";
                    $(".result .text").append(username);
                    
                    if (data.data.full_name){
                        var name = "Name: " + data.data.full_name + "<br />";
                        $(".result .text").append(name);
                    }
                    if (data.data.website){
                        var website = "Website: " + data.data.website + "<br />";
                        $(".result .text").append(website);
                    }
                     
                    $('.result').toggleClass("hidden");
                });
            }
        
        function getToken(){
            var id = $("#authId").val();
            window.location.href = 'https://instagram.com/oauth/authorize/?client_id='+id+'&redirect_uri=http://www.nretnil.com/Instagram/Auth&response_type=token&scope=likes+comments+relationships+basic';
        }