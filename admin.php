<?php
    include "index1.php";

    //IF ADD ALBUM BUTTON CLICKED
    if (isset($_POST['addAlbum']))
    {
        /*UPLOAD IMAGE TO DATABASE*/
        $target_dir = "images/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if($check !== false) {
                alert("File is an image - " . $check["mime"]);
                $uploadOk = 1;
            } else {
                alert("File is not an image");
                $uploadOk = 0;
            }
        }
        // Check if file already exists
        if (file_exists($target_file)) {
            alert("Sorry, file already exists.");
            $uploadOk = 0;
        }
        // Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            alert("Sorry, your file is too large.");
            $uploadOk = 0;
        }
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            alert("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
            $uploadOk = 0;
        }
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            alert("Sorry, your file was not uploaded.");
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                alert("The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.");
            } else {
                alert("Sorry, there was an error uploading your file.");
            }
        }
        /*END UPLOAD IMAGE*/

        /*ADD ALBUM TO DATABASE*/
        addNewAlbum($conn,$_POST["albumName"],$_POST["year"],basename($_FILES["fileToUpload"]["name"]));
    }
    /*END ADD ALBUM TO DATABASE*/


    //IF ADD SINGLE BUTTON CLICKED
    if (isset($_POST['addSingle']))
    {
        /*INSERT SINGLE TO DATABASE*/
        addNewSingle($conn,$_POST["singleName"],$_POST["lyrics"],$_POST["url"]);

        //LINKED BETWEEN ALBUM AND SINGLE
        linkSingleToAlbum($conn,getIndexOfAlbum($conn,$_POST["linkedAlbum"]),getIndexOfSingle($conn,$_POST["singleName"]));
    }

    //IF DELETE BUTTON CLICKED
    if (isset($_POST['delete']))
    {
        //UNLINK BETWEEN SINGLES AND ALBUMS
        if($_POST['selectedSingle']=="all"){
            unlinkedAlbum($conn,getIndexOfAlbum($conn,$_POST["selectedAlbum"]));
        }
        else{
            unlinkedSingleFromAlbum($conn,getIndexOfAlbum($conn,$_POST["selectedAlbum"]),getIndexOfSingle($conn,$_POST['selectedSingle']));
        }
    }

    function alert($msg) {
      echo "<script type='text/javascript'>alert('$msg');</script>";
    }


?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>עיברי לידר - פרויקט סוף קורס</title>
    <link rel="stylesheet" type="text/css" href="includes/indexStyle.css">
    <script src="http://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="includes/indexScript.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        function loadSingleByName(name){
            $.ajax({
                type:'post',
                url:'index1.php',
                data: {album:name},
                success: function(data) {
                     var list=parseData(data);
                     var opList="<option value=\"all\"></option>";
                     if(list.length>1)
                     {
                        for (var i=1;i<list.length;i++)
                        {
                            opList += "<option value=\""+list[i].name+"\">"+list[i].name+"</option>";
                        }
                     }
                     $("#selectedSingleList").html(opList);
                }
            });
        }
    </script>
</head>
<body>
    <header>
        <a href="index.html">עברי לידר<br><span>/אדמין</span></a>
        <svg width="100%" height="250" xmlns="http://www.w3.org/2000/svg">
            <circle cx="125" cy="10" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="330" cy="40" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="600" cy="30" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="770" cy="20" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="950" cy="80" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="950" cy="110" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="950" cy="150" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="960" cy="150" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="950" cy="160" r="3" fill="#b4b4b6" stroke="none"></circle>
            <circle cx="950" cy="175" r="3" fill="#b4b4b6" stroke="none"></circle>
        </svg>
        <div id="menuButton"></div>
    </header>
    <main class="textureViewer" id="adminPage">
        <nav>
            <ul></ul>
        </nav>
                <section id="addNewAlbum">
                    <h4><b>הוספת אלבום</b></h4>
                    <article>
                        <form action="admin.php" method="post" autocomplete="on" novalidate enctype="multipart/form-data">
                            <label class="lableStyle">שם האלבום</label>
                            <input  type="text" name="albumName" value="" class="inputStyle">
                            <label class="lableStyle">שנת יציאה</label>
                            <input  type="text" name="year" value="" class="inputStyle">
                            <label class="lableStyle">תמונת האלבום</label>
                            <input type="file" name="fileToUpload" id="fileToUpload" class="inputStyle">
                            <input type="submit" name="addAlbum" value="שלח" class="ButtonStyle">
                            <input type="reset" value="אפס" class="ButtonStyle">
                        </form>
                    </article>
                </section>
                <section id="addNewSingle">
                    <h4><b>הוספת שיר</b></h4>
                    <article>
                        <form action="admin.php" method="post" autocomplete="on" novalidate>
                            <label class="lableStyle">שם השיר</label>
                            <input  type="text" name="singleName" value="" class="inputStyle">
                            <label class="lableStyle">מילות השיר</label>
                            <textarea name="lyrics" class="inputStyle" id="inputStyleArea"></textarea>
                            <label class="lableStyle">מזהה שיר</label>
                            <input  type="text" name="url" value="" class="inputStyle">
                            <label class="lableStyle">שם האלבום</label>
                            <select name="linkedAlbum" class="inputStyle" id="linkedAlbumList">
                                <?php
                                   $first = loadAlbumOptions($conn);
                                   echo "<script>loadSingleByName(\"".$first."\")</script>";
                                ?>
                            </select>
                            <input type="submit" name="addSingle" value="שלח" class="ButtonStyle">
                            <input type="reset" value="אפס" class="ButtonStyle">
                        </form>
                    </article>
                </section>
            <section id="removeSection">
                <h4><b>מחיקת אלבום/שיר</b></h4>
                <article>
                    <form action="#" method="post" autocomplete="on" novalidate >
                        <label class="lableStyle">שם האלבום</label>
                        <select name="selectedAlbum" class="inputStyle" id="selectedAlbumList" onchange="loadSingleByName(this.value)">
                            <?php
                                loadAlbumOptions($conn);
                            ?>
                        </select>
                        <label class="lableStyle">שם השיר</label>
                        <select name="selectedSingle" class="inputStyle" id="selectedSingleList">
                            <option value="all"> </option>
                        <input type="submit" name="delete" value="שלח" class="ButtonStyle">
                        <input type="reset" value="אפס" class="ButtonStyle">
                    </form>
                </article>
            </section>
            <div id="playerPanel">
                <audio id="player" loop>
                    <source src="audio/Ivri_Lider_MOOGZAM.ogg" type="audio/ogg" />
                    <source src="audio/Ivri_Lider_MOOGZAM.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <button onclick="document.getElementById('player').pause()">עצור</button>
                <button onclick="document.getElementById('player').play()">נגן</button>
            </div>
    </main>
</body>
</html>