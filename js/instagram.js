function lookupID(){
    $('.result').addClass("hidden");
    var username = $("#username").val();
    $(".result .text").empty();
    $(".result .avatar").empty();
    $(".result .id").empty();
    $.getJSON("https://api.instagram.com/v1/users/search?q="+username+"&access_token=205224010.b4dbc01.934a2808f4454f89bef3ae8b33bc120a&callback=?",
      {
        format: "json"
      },
      function(data) {
            var avatar = "<ul class='thumbnails'><li><a href='"+data.data[0].profile_picture+"' class='thumbnail' target='_blank'><img src='"+data.data[0].profile_picture+"' alt=''></a></li>";
            $(".result .avatar").append(avatar);
            
            var id = "<h2>User ID: " + data.data[0].id + "<br /></h2>";
            $(".result .id").prepend(id);
            
            var username = "Username: " + data.data[0].username + "<br />";
            $(".result .text").append(username);
            
            if (data.data[0].full_name){
                var name = "Name: " + data.data[0].full_name + "<br />";
                $(".result .text").append(name);
            }
            if (data.data[0].website){
                var website = "Website: " + data.data[0].website + "<br />";
                $(".result .text").append(website);
            }
             
            $('.result').toggleClass("hidden");
    });
}
/*
function lookupID(){
    $('.result').addClass("hidden");
    var username = $("#username").val();
    $(".result .text").empty();
    $(".result .avatar").empty();
    $(".result .id").empty();
    console.log(username);
    $.getJSON("http://jelled.com/instagram/user.php?username="+username,
      {
        format: "json"
      },
      function(data) {
            console.log(data);
            var avatar = "<ul class='thumbnails'><li class='span1'><a href='"+data.data[0].profile_picture+"' class='thumbnail' target='_blank'><img src='"+data.data[0].profile_picture+"' alt=''></a></li>";
            $(".result .avatar").append(avatar);
            
            var id = "<h2>User ID: " + data.data[0].id + "<br /></h2>";
            $(".result .id").prepend(id);
            
            var username = "Username: " + data.data[0].username + "<br />";
            $(".result .text").append(username);
            
            if (data.data[0].full_name){
                var name = "Name: " + data.data[0].full_name + "<br />";
                $(".result .text").append(name);
            }
            if (data.data[0].website){
                var website = "Website: " + data.data[0].website + "<br />";
                $(".result .text").append(website);
            }
             
            $('.result').toggleClass("hidden");
    });
}
*/