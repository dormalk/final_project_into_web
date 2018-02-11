/*UNIVERSAL MENU*/
function loadNav(){
    var nav="<li><a href=\"#\">הופעות</a></li>\n";
    nav += "<li><a href=\"music.php\">מוזיקה</a></li>\n";
    nav += "<li><a href=\"#\">חנות</a></li>";
    nav += "<li><a href=\"#\"><b>IV.TV</b></a></li>";
    nav += "<li><a href=\"update.html\">עדכונים</a></li>";
    nav += "<li><a href=\"bio.html\">ביוגרפיה</a></li>";
    nav += "<li><a href=\"#\">תמונות</a></li>";
    nav += "<li><a href=\"#\">הורדות</a></li>";
    nav += "<li><a href=\"contact.html\">קשר</a></li>";
    $("nav ul").html(nav);
};
/*ALBUM LIST SCRIPT-TOGGLING*/
/*CUSTOMIZE TO DESK COMPUTER AND TO PHONE*/
function albumListScript() {
    $(".albumImg").off();
    $(".albumTitle").off();
    var albumName;
    $(".albumTitle").click(function(){
        //get index of current block
        var currIndexBlock=$(this).parent(".albumBlock").index(".albumBlock");
        //open image of this single block
        $(this).siblings(".albumImg").slideToggle();
        //if desktop than hide single show section
        if ($(window).width() > 520){
            console.log(1);
            $("#singlesList").slideUp();
            $("#singleShow").hide();
        }
        //get name of album
        albumName=$(this).html().split("<span")[0];
        //get array of all image element in album list
        var allBlock = $(".albumBlock").children(".albumImg");
        //for each element in list
        allBlock.each(function () {
            //get block index of current image
            var currIndexImg=$(this).parent(".albumBlock").index(".albumBlock");
            //check if this image is the open one
            if (currIndexBlock==currIndexImg) {
                //when current image clicked
                $(this).click(function(){
                    //clear list
                    $("#singlesList article").html("");
                    $(".List").html("");
                    //load single list
                    loadSingleByNameMusic(albumName,$(this).parent(".albumBlock").index()+1);
                    //if desktop then
                    if ($(window).width() > 520)
                        //toggle single list
                        scrollTitleBar($(this), "auto");
                    else
                        $(this).siblings(".albumSingelList").slideDown("slow");
                })
            }
            else {
                //close this image
                $(this).slideUp();
                //close album title bar
                scrollTitleBar($(this),"close");
                $(this).siblings(".albumSingelList").slideUp("slow");
            }
        });
    });
}
/*Release Album Script*/
function scrollTitleBar(titleBar,op){
    if ($(window).width() > 520) {
        if (op == "close") {
            titleBar.siblings(".albumTitle").animate({
                width: "155px"
            }, 1000);
            titleBar.siblings(".albumTitle").children(".albumRelease").fadeTo("slow", 0);
            $("#singlesList").slideUp();
        }
        else if (op == "open") {
            titleBar.siblings(".albumTitle").animate({
                width: "320px"
            }, 1000);
            titleBar.siblings(".albumTitle").children(".albumRelease").fadeTo("slow", 1);
            $("#singlesList").slideDown();
        }
        else {
            if (titleBar.siblings(".albumTitle").children(".albumRelease").css('opacity') == 0)
                scrollTitleBar(titleBar, "open")
            else
                scrollTitleBar(titleBar, "close")
        }
    }
}
/*LOAD SINGLE LIST FOR MUSIC PAGE*/
function loadSingleByNameMusic(name,k){
    $.ajax({
        type:'post',
        url:'index1.php',
        data: {album:name},
        success: function(data) {
            var list = parseData(data);
            var singleAppand = "";
            if(list.length>1){
                for (var i=0;i<k;i++)
                    singleAppand += "<span class=\"emptyTitle\"></span>";
                for (var i=1;i<list.length;i++){
                    singleAppand += "<div class=\"singleTitle\">"+list[i].name+"</div>";
                }
            }
            $(".List").html(singleAppand);
            $("#singlesList article").html(singleAppand);

            //when clicked on single title from list open his Youtube clip and his lyrics
            $(".singleTitle").click(function(){
                for(var i=0;i<list.length;i++){
                    var title=$(this).html();
                    if(list[i].name==title){
                        var rowAppand2 = "<iframe src=\"https://www.youtube.com/embed/"+list[i].url+"\" frameborder=\"0\" gesture=\"media\" allow=\"encrypted-media\" allowfullscreen></iframe>"
                        rowAppand2 += "<div class=\"lyrics\">"+list[i].lyrics+"</div>";
                        if ($(window).width() > 520){
                            $("#singleShow article").html(rowAppand2);
                            $("#singleShow").show();
                        }
                        else{
                            rowAppand2 += "<div class=\"returnButton\"><<</div>";
                            $(this).parent(".List").siblings(".singleShowMobile").html(rowAppand2);
                            $(this).parent(".List").siblings(".singleShowMobile").children(".returnButton").click(function(){
                                $(this).parent(".singleShowMobile").siblings(".List").show("slow");
                                $(this).parent(".singleShowMobile").hide("slow");
                            })
                            $(this).parent(".List").siblings(".singleShowMobile").show("slow");
                            $(this).parent(".List").hide("slow");
                        }
                    }
                }
            });
        }
    });
}
/*GENERATE RANDOMIZE NUMBER*/
function randomizeInt(min,max){
    return (Math.floor(Math.random() * max)+min)
}
/*PARSE DATA GOT FROM DATABASE*/
function parseData(data1){
    var singles=new Array();
    data1.split("<single>").forEach(function(single){
        var attr = single.split("<attribute>");
        singles.push({name:attr[1],lyrics:attr[2],url:attr[3],album:attr[4]});
    })
    return singles;
}
/*INITIALIZE UPDATE PAGE*/
function loadUpdates(){
    $.getJSON("includes/updates.json",function (data) {
        var htmlDate="";
        var titleHtml="";
        var mobileTitle="";
        $.each(data,function (key,val) {
            htmlDate+="<p>"+val.Date+"</p>";
            titleHtml+="<p id=\'"+key+"\'>"+val.Title+"</p>";
            mobileTitle+="<section id=\'"+key+"\'>"
            mobileTitle+="<p class=\"titleList\">"+val.Date+"&nbsp;&nbsp;\t-&nbsp;&nbsp;"+val.Title+"</p>";
            mobileTitle+="<div class=\"upsPicked\"></div>";
            mobileTitle+="</section>";
        });
        $("#updateDate article").html(htmlDate);
        $("#updateList article").html(titleHtml);
        $("#updateListMobile article").html(mobileTitle);

        $.each(data,function(key,val)
        {
            $("#updateList p").click(function() {
                if(key==$(this).attr('id'))
                {
                    var txtHtml="<img src=\""+val.Image+"\">";
                    txtHtml +="<p><span>"+val.Date+"</span>"+val.Text+"</p>";
                    $("#newsPick article").html(txtHtml);
                }
            });
            $("#updateListMobile section").click(function() {
                if(key==$(this).attr('id'))
                {
                    var txtHtml="<img src=\""+val.Image+"\">";
                    txtHtml +="<p><span>"+val.Date+"</span>"+val.Text+"</p>";
                    $(this).children(".upsPicked").html(txtHtml);
                    $(this).children(".upsPicked").slideToggle();
                }
            });
        });
    })
}
/*PLAYER CONTINUELY SCRIPT*/
function player(){
    var myAudio=document.getElementById('player');
    myAudio.currentTime = localStorage.getItem("duration");
    if(localStorage.getItem("play")=="on")
        myAudio.play();
    else if(localStorage.getItem("play")=="off")
        myAudio.pause();
    else
        myAudio.play();
};

$( window ).unload(function() {
    var myAudio=document.getElementById('player');
    localStorage.setItem("duration",myAudio.currentTime);
    if(myAudio.paused)
        localStorage.setItem("play","off");
    else
        localStorage.setItem("play","on");

});

/*INITIALIZE WEB JAVASCRIPT WEN LOAD*/
$( document ).ready(function() {
    /*SVG DESIGN HEADER DESIGN*/
    $(".albumSingelList").hide();
    //svg circle at header design

    var svgString = "    <svg width=\"100%\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "               <defs>\n" +
        "                   <pattern id=\"Pattern\" x=\"0\" y=\"0\" width=\".015\" height=\".015\">\n" +
        "                       <circle cx=\"0\" cy=\"0\" r=\"0.8\" fill=\"#000000\" fill-opacity=\"0.5\"/>\n" +
        "                   </pattern>\n" +
        "               </defs>\n";


    for (var i = 0; i < 4; i++){
        svgString += "<circle cx=\"0\" cy=\""+randomizeInt(0,10)*10+"\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\">\n";
        svgString += "<animate attributeName=\"cx\" from=\"-200\" to=\"1550\" dur=\""+randomizeInt(15,70)+"s\" repeatCount=\"indefinite\" /></circle>\n";
    }
    for (var i = 0; i < 4; i++){
        svgString += "<circle cx=\"0\" cy=\""+randomizeInt(0,10)*10+"\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\">\n";
        svgString += "<animate attributeName=\"cx\" from=\"1550\" to=\"-200\" dur=\""+randomizeInt(15,70)+"s\" repeatCount=\"indefinite\" /></circle>\n";
    }

    svgString+="<rect x=\"-300\" y=\"0\" width=\"270\" height=\"5\" fill=\"#ff3300\">\n";
    svgString+="<animate attributeName=\"x\" from=\"-300\" to=\"1550\" dur=\"31s\" repeatCount=\"indefinite\" /></rect>\n";
    svgString+="<rect x=\"1400\" y=\"0\" width=\"185\" height=\"5\" fill=\"#ff3300\">\n";
    svgString+="<animate attributeName=\"x\" from=\"1400\" to=\"-350\" dur=\"27s\" repeatCount=\"indefinite\" /></rect>\n";
    svgString+="<rect x=\"-400\" y=\"0\" width=\"185\" height=\"5\" fill=\"#ff3300\">\n";
    svgString+="<animate attributeName=\"x\" from=\"-400\" to=\"1350\" dur=\"33s\" repeatCount=\"indefinite\" /></rect>\n";
    svgString+="<rect x=\"1450\" y=\"0\" width=\"130\" height=\"5\" fill=\"#999999\">\n";
    svgString+="<animate attributeName=\"x\" from=\"1450\" to=\"-150\" dur=\"35s\" repeatCount=\"indefinite\" /></rect>\n";


    svgString+="</svg>\n"

    $("header svg").append(svgString);
    /*END SVG HEADER DESIGN*/

    loadNav();
    loadUpdates();

    $("#menuButton").click(function () {
        $("nav").slideToggle();
    });

    player();

});
/*LIKENING TO WINDOW SIZE - CHANGE SCRIPT WHEN IT'S PHONE*/
$(window).resize(function(){
    albumListScript();
});
$(document).ajaxStop(function() {
        $( "#loading" ).hide();
});
$( document ).ajaxStart(function() {
    $( "#loading" ).show();
});
