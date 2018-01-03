function loadAlbumsData() {
    var jqxhr = $.ajax( "includes/db.php" )
        .done(function(data) {
            var rowAppand = "";
            var dataBlocks=data.split("######");
            var dataRows=dataBlocks[0].split("<br>");
            for(var i=0; i<dataRows.length-1;i++)
                rowAppand += loadAlbumsList(dataRows[i]);
            $("#albumsList article").append(rowAppand);

            albumListScript();
        })
};

function loadSinglesData(index) {
    var jqxhr = $.ajax( "includes/db.php" )
        .done(function(data) {
            var rowAppand = "";
            var dataBlocks=data.split("######");
            var dataRows=dataBlocks[index].split("*****");
            for(var i=0;i<dataRows.length-1;i++)
            {
                if(i==(index-1))
                    rowAppand += "<span class=\"empyTitle\"></span>";
                var row=dataRows[i].split("//");
                rowAppand += "<span class=\"singleTitle\">";
                rowAppand += row[0];
                rowAppand += "</span>";
            }

            $(".albumSingelList .List").html(rowAppand);
            $("#singlesList article").html(rowAppand);
        })
};

function loadSingleByName(inAlbumName){
    var index=0;
    var jqxhr = $.ajax( "includes/db.php" )
        .done(function(data) {
            var dataBlocks=data.split("######");
            var dataRows=dataBlocks[0].split("<br>");
            for(var i=0; i<dataRows.length-1;i++)
            {
                row=dataRows[i].split("//");
                if(row[0]==inAlbumName) {
                    index = row[3];
                }
            }
            loadSinglesData(index);
        });
}

function loadSingleList(inSingle){
    var singleAppend = "";
    var vals=inSingle.split("//");
    singleAppend +="<span class=\"singleTitle\">"+vals[0]+"</span>";
    return  singleAppend;
}

function loadAlbumsList(inData) {
    var albumsAppend="";
    var rowData=inData.split("//");

    albumsAppend += "<span class=\"albumBlock\">";
    albumsAppend += "<span class=\"albumTitle\">"+rowData[0];
    albumsAppend += "<span class=\"albumRelease\">"+rowData[1]+"</span>";
    albumsAppend +="</span>";
    albumsAppend += "<span class=\"albumImg\"><img src=\"../images/"+rowData[2]+"\"></span>";
    albumsAppend += "<div class=\"albumSingelList\"><span class=\"albumRelease2\">"+rowData[1]+"</span><div class=\"List\"></div></div>";
    albumsAppend +="</span>";

    return albumsAppend;
}

function albumListScript() {
    $(".albumImg").off();
    $(".albumTitle").off();
    var albumName;
    if ($(window).width() > 520) {
        $(".albumTitle").click(function () {
            albumName=$(this).html().split("<span")[0];
            $(this).parent(".albumBlock").children(".albumImg").slideToggle();
            $(this).parent(".albumBlock").children(".albumImg").attr('id', 'titleOpened');
            var allBlock = $(".albumBlock").children(".albumImg");
            allBlock.each(function () {
                if (($(this).css("display") === 'inline') && ($(this).attr('id') != 'titleOpened')) {
                    $(this).slideToggle();
                    if ($(this).attr('id') === 'listOpen') {
                        $(this).parent(".albumBlock").children(".albumTitle").animate({
                            width: "83.8%"
                        }, 1000);
                        $(this).attr('id', '');
                        $(this).parent(".albumBlock").children(".albumTitle").children(".albumRelease").fadeTo("slow", 0);
                        $("#singlesList").slideToggle();
                    }
                }
                else
                    $(this).parent(".albumBlock").children(".albumImg").attr('id', '');
            });
        });

        $(".albumImg").click(function () {
            loadSingleByName(albumName);
            var currAlbum = $(this).parent(".albumBlock").children(".albumTitle");
            $("#singlesList").slideToggle();
            if ($(this).attr('id') != 'listOpen') {
                currAlbum.animate({
                    width: "384"
                }, 1000);
                $(this).attr('id', 'listOpen');
                $(this).parent(".albumBlock").children(".albumTitle").children(".albumRelease").fadeTo("slow", 1);
            }
            else {
                currAlbum.animate({
                    width: "83.8%",
                }, 1000);
                $(this).attr('id', '');
                $(this).parent(".albumBlock").children(".albumTitle").children(".albumRelease").fadeTo("slow", 0);
            }
        });
    }
    else{
        $(".albumTitle").click(function () {
            albumName=$(this).html().split("<span")[0];

            $(this).parent(".albumBlock").children(".albumImg").slideToggle();
            $(this).parent(".albumBlock").children(".albumImg").attr('id', 'titleOpened');
            var allBlock = $(".albumBlock").children(".albumImg");
            allBlock.each(function () {

                if (($(this).css("display") === 'inline') && ($(this).attr('id') != 'titleOpened')) {
                    $(this).slideToggle();
                    if ($(this).attr('id') === 'listOpen') {
                        $(this).attr('id', '');
                        $(this).parent(".albumBlock").children(".albumSingelList").slideToggle();
                    }
                }
                else
                    $(this).parent(".albumBlock").children(".albumImg").attr('id', '');
            });
        });

        $(".albumImg").click(function () {
            loadSingleByName(albumName);
            $(this).parent(".albumBlock").children(".albumSingelList").slideToggle();
            if ($(this).attr('id') != 'listOpen') {
                $(this).attr('id', 'listOpen');
            }
            else {
                $(this).attr('id', '');
            }
        });
    }
}


$( document ).ready(function() {
    //svg circle at header design
    var svgStringIndex="        <svg width=\"100%\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "            <defs>\n" +
        "                <pattern id=\"Pattern\" x=\"0\" y=\"0\" width=\".015\" height=\".015\">\n" +
        "                    <circle cx=\"0\" cy=\"0\" r=\"0.8\" fill=\"#000000\" fill-opacity=\"0.5\"/>\n" +
        "                </pattern>\n" +
        "            </defs>\n" +
        "            <circle cx=\"90\" cy=\"90\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"230\" cy=\"70\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"400\" cy=\"0\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"430\" cy=\"110\" r=\"140\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"480\" cy=\"10\" r=\"150\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"590\" cy=\"20\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"640\" cy=\"80\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"760\" cy=\"100\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"870\" cy=\"100\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <rect x=\"195\" y=\"0\" width=\"270\" height=\"5\" fill=\"#ff3300\"/>\n" +
        "            <rect x=\"530\" y=\"0\" width=\"185\" height=\"5\" fill=\"#ff3300\"/>\n" +
        "            <rect x=\"770\" y=\"0\" width=\"185\" height=\"5\" fill=\"#ff3300\"/>\n" +
        "            <rect x=\"1040\" y=\"0\" width=\"130\" height=\"5\" fill=\"#999999\"/>\n" +
        "            <circle cx=\"125\" cy=\"8\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"325\" cy=\"38\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"605\" cy=\"30\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"770\" cy=\"25\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"945\" cy=\"80\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"945\" cy=\"110\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"945\" cy=\"150\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"960\" cy=\"150\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"945\" cy=\"160\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"945\" cy=\"175\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "        </svg>\n"
    $("#index header").append(svgStringIndex);

    var svgStringIndex="        <svg width=\"100%\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "            <defs>\n" +
        "                <pattern id=\"Pattern\" x=\"0\" y=\"0\" width=\".015\" height=\".015\">\n" +
        "                    <circle cx=\"0\" cy=\"0\" r=\"0.8\" fill=\"#000000\" fill-opacity=\"0.5\"/>\n" +
        "                </pattern>\n" +
        "            </defs>\n" +
        "            <circle cx=\"260\" cy=\"115\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"280\" cy=\"70\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"360\" cy=\"80\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"585\" cy=\"100\" r=\"140\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"630\" cy=\"125\" r=\"150\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"700\" cy=\"115\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"710\" cy=\"70\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"890\" cy=\"40\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"925\" cy=\"125\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <rect x=\"385\" y=\"0\" width=\"565\" height=\"5\" fill=\"#ff3300\"/>\n" +
        "            <rect x=\"1040\" y=\"0\" width=\"130\" height=\"5\" fill=\"#999999\"/>\n" +
        "            <circle cx=\"140\" cy=\"40\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"235\" cy=\"5\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"505\" cy=\"20\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"560\" cy=\"40\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"565\" cy=\"30\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"805\" cy=\"35\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"1010\" cy=\"130\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"1040\" cy=\"130\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"1040\" cy=\"145\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"1055\" cy=\"145\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"1065\" cy=\"145\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"1065\" cy=\"155\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "        </svg>\n"
    $("#bio header").append(svgStringIndex);

    var svgStringIndex="        <svg width=\"100%\" height=\"250\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "            <defs>\n" +
        "                <pattern id=\"Pattern\" x=\"0\" y=\"0\" width=\".015\" height=\".015\">\n" +
        "                    <circle cx=\"0\" cy=\"0\" r=\"0.8\" fill=\"#000000\" fill-opacity=\"0.5\"/>\n" +
        "                </pattern>\n" +
        "            </defs>\n" +
        "            <circle cx=\"100\" cy=\"50\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"110\" cy=\"70\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"350\" cy=\"115\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"635\" cy=\"95\" r=\"140\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"765\" cy=\"70\" r=\"150\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"785\" cy=\"70\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"820\" cy=\"70\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"840\" cy=\"60\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"900\" cy=\"95\" r=\"130\" fill=\"url(#Pattern)\" stroke=\"none\"/>\n" +
        "            <circle cx=\"235\" cy=\"30\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"520\" cy=\"5\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"725\" cy=\"10\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"833\" cy=\"20\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"855\" cy=\"100\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"870\" cy=\"100\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"880\" cy=\"100\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"880\" cy=\"85\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"920\" cy=\"100\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <circle cx=\"950\" cy=\"100\" r=\"3\" fill=\"#b4b4b6\" stroke=\"none\"/>\n" +
        "            <rect x=\"340\" y=\"0\" width=\"370\" height=\"5\" fill=\"#ff3300\"/>\n" +
        "            <rect x=\"730\" y=\"0\" width=\"220\" height=\"5\" fill=\"#ff3300\"/>\n" +
        "        </svg>\n"
    $("#con header").append(svgStringIndex);

    loadAlbumsData();
    $("#menu").click(function () {
        $("nav").slideToggle();
    });

});

$(window).resize(function(){
    albumListScript();
});






