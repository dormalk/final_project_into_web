<?php
    include 'db.php';
    if(isset($_POST['album']))
    {
        $query = "SELECT * FROM albums_singles_27 LEFT JOIN singles_27 ON albums_singles_27.single_id=singles_27.id WHERE album_id IN(SELECT id FROM albums_27 WHERE album_name='".$_POST['album']."')";
        $result = mysqli_query($conn,$query);

        if(!$result){
            die("database can't connect!");
        }

        while($row = mysqli_fetch_assoc($result)){
            echo "<single>";
            echo "<attribute>".$row['single_name'];
            echo "<attribute>".$row['lyrics'];
            echo "<attribute>".$row['url'];
        }

    }

    function loadAlbumOptions($conn){
        $query = "SELECT * FROM albums_27";
        $result = mysqli_query($conn,$query);
        $first = true;
        $firstAlbum = "";
        if(!$result){
            die("DB can't connect!");
        }

        while($row = mysqli_fetch_assoc($result)){
            if($first){
                $firstAlbum = $row["album_name"];
                $first = false;
            }
            echo "<option value=\"".$row["album_name"]."\">".$row["album_name"]."</option>";
        }
        return $firstAlbum;
    }

    function loadAlbumList($conn){
        $query = "SELECT * FROM albums_27";
        $result = mysqli_query($conn,$query);

        if(!$result){
            die("DB can't connect!");
        }

        while($row = mysqli_fetch_assoc($result)){
            echo "<span class=\"albumBlock\">";
            echo "<span class=\"albumTitle\">".$row["album_name"];
            echo "<span class=\"albumRelease\">".$row["album_year"]."</span></span>";
            echo "<span class=\"albumImg\"><img src=\"images/".$row["album_imgPath"]."\"></span>";
            echo "<div class=\"albumSingelList\"><span class=\"albumRelease2\">".$row["album_year"]."</span><div class=\"List\"></div><div class=\"singleShowMobile\"></div></div></span>";
        }
    }

    function addNewAlbum($conn,$albumNamePost,$yearPost,$imgPathPost){

        /*INSERT ALBUM TO DATABASE*/
        $query = "INSERT INTO albums_27(album_name,album_year,album_imgPath) values('".$albumNamePost."','".$yearPost."','".$imgPathPost."')";          //query
        if (mysqli_query($conn, $query)) {
                alert("New album created successfully");
        }
        else {
            alert("Error: " . $query . "\n" . mysqli_error($conn));
        }
    }

    function addNewSingle($conn,$singleNamePost,$lyricsPost,$urlPost) {
        $query = "INSERT INTO singles_27(single_name,lyrics,url) VALUES('".$singleNamePost."','".str_replace("\n","<br>",$lyricsPost)."','".$urlPost."')";          //query
        if (mysqli_query($conn, $query)) {
            alert("New single created successfully.");
        }
        else {
            alert("Error: " . $query . "\n" . mysqli_error($conn));
        }
    }

    function removeSingle($conn,$single_id){
       $query = "DELETE FROM singles_27 WHERE id=".$single_id;          //query
        if (mysqli_query($conn, $query)) {
            alert("Single: ".$single_id." deleted successfully");
        }
        else {
            alert("Error: " . $query . "\n" . mysqli_error($conn));
        }
    }

    function removeAlbum($conn,$album_id){
        $query = "DELETE FROM albums_27 WHERE id=".$album_id;          //query
        if (mysqli_query($conn, $query)) {
            alert("Album: ".$album_id." deleted successfully.");
        }
        else {
            alert("Error: " . $query . "\n" . mysqli_error($conn));
        }
    }

    function linkSingleToAlbum($conn,$album_id,$single_id){
        $query = "INSERT INTO albums_singles_27(album_id,single_id) values('".$album_id."','".$single_id."')";          //query
        if (mysqli_query($conn, $query)) {
            alert("Album: ".$album_id." linked with single: ".$single_id." successfully.");
        }
        else{
            alert("Error: " . $query . "\n" . mysqli_error($conn));
        }

    }

    function unlinkedSingleFromAlbum($conn,$album_id,$single_id){
        $query = "DELETE FROM albums_singles_27 WHERE album_id=".$album_id." AND single_id=".$single_id;          //query
        if (mysqli_query($conn, $query)) {
            alert("Album: ".$album_id." unlinked with single: ".$single_id." successfully.");
        }
        else {
            alert("Error: " . $query . "\n" . mysqli_error($conn));
        }
        removeSingle($conn,$single_id);
    }

    function unlinkedAlbum($conn,$album_id){
        $result = mysqli_query($conn,"SELECT * FROM albums_singles_27 WHERE album_id='".$album_id."';");          //query
        if ($result->num_rows > 0) {
            // output data of each row
            while($link = $result->fetch_assoc()) {
                $query = "DELETE FROM albums_singles_27 WHERE single_id=".$link["single_id"];          //query
                if (mysqli_query($conn, $query)) {
                    alert("Album: ".$link["album_id"]." unlinked from single:".$link["single_id"]." successfully.");
                }
                else {
                    alert("Error: " . $query . "\n" . mysqli_error($conn));
                }
                removeSingle($conn,$link["single_id"]);
            }
        }
        removeAlbum($conn,$album_id);
    }


    function getIndexOfAlbum($conn,$album_name){
        $query = "SELECT * FROM albums_27 where album_name='".$album_name."';";
        $result = mysqli_query($conn,$query);          //query

        if(!$result){
            die("DB can't connect!    =   ".$query);
        }

        while($row = mysqli_fetch_assoc($result)){
                return $row["id"];
        }
    }

    function getIndexOfSingle($conn,$single_name){
        $query = "SELECT * FROM singles_27 where single_name='".$single_name."';";
        $result = mysqli_query($conn,$query);          //query
        if(!$result){
            die("DB can't connect!    =   ".$query);
        }
        while($row = mysqli_fetch_assoc($result)){
                return $row["id"];
        }
    }
?>


