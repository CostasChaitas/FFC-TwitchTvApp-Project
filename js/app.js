$(document).ready(function(){
  
  var users = ["DenMcH", "FreeCodeCamp", "MedryBW", "GeoffStorbeck","terakilobyte","Habathcx","RobotCaleb","Brunofin", "thomasballinger", "noobs2ninjas", "Beohoff",'devwars','syntag','destiny','monstercat','saintvicious'];
  var streamUrl;
  var channelUrl;
  var status;
  var topic;
  
  users.forEach(function(name){
      $.getJSON('https://api.twitch.tv/kraken/channels/' + name + '?callback=?',function(channel){
        $.getJSON('https://api.twitch.tv/kraken/streams/' + name + '?callback=?',function(stream){
          
          if(channel.status  && stream.stream ){
             status = '<span class = "glyphicon glyphicon-ok"></span>' ;    
             topic= channel.status;            
          }else{
             status = '<span class = "glyphicon glyphicon-remove"></span>';
             topic= "";
          }
          
          if(channel.logo === null){
            channel.logo="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRUxyaCX9KrmOUhrkzqK_8c565VxdzPS9I99PrPiA7LxRFFBypu";
          }
          
          $("#users").append('<div id="' + name + '"><a href="' + channel.url + '" target="_blank">' + '<li>' + '<img src="' + channel.logo + '">' + '<span>' + name + '<br>' + '<aside class="topic">' + topic + '</aside>' + '<span class="status">' + status + '</span>' + '</span>' + '</li>'+'</a></div>');
          
          $("#all").click(function(){           
            $("#all").addClass('active');
            $("#online").removeClass('active');
            $("#offline").removeClass('active');                    
            $('#' + name).show();
          });
          
          $("#online").click(function(){           
            $("#all").removeClass('active');
            $("#online").addClass('active');
            $("#offline").removeClass('active');
            
            if ($('#' + name).find('.glyphicon-remove').length) {
              $('#' + name).hide();
            }
            if ($('#' + name).find('.glyphicon-ok').length) {
              $('#' + name).show();
            }
          });
          
          $("#offline").click(function(){           
            $("#all").removeClass('active');
            $("#online").removeClass('active');
            $("#offline").addClass('active');
            
            if ($('#' + name).find('.glyphicon-ok').length) {
              $('#' + name).hide();
            }
            if ($('#' + name).find('.glyphicon-remove').length) {
              $('#' + name).show();
            }
          });
          
          $('#search').keyup(function() {
            
            var value =   $("#search").val().toLowerCase();

            $('#users>div').each(function() {

              var text = $(this).text().toLowerCase();

              if (text.indexOf(value) !== -1) {
                $(this).show()
              } else {
                $(this).hide();
              }
            });    
          });
          
          
        });
      });
    
  });
});