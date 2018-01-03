<?php
  $host = "localhost";
  $user = "root";
  $pass = "Dorm@@!!2017";

  $databaseName = "ivrilider";

  $conn = new mysqli($host, $user, $pass, $databaseName);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $result = mysqli_query($conn,"SET NAMES 'utf8'");
  $result = mysqli_query($conn,"SELECT * FROM albums");          //query
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if($row["id"]!=null)
            {
                $array = $row["album_name"]. "//" . $row["album_year"]."//".$row["album_imgPath"]."//".$row["id"]. "<br>";
                echo $array;
            }
        }
    } else {
        echo "0 results";
    }
    for ($x = 1; $x <= 7; $x++)
    {
        echo "######";
        $result = mysqli_query($conn,"select * from singles where id in(select single_id from albums_singles WHERE album_id=".$x.");");          //query
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if($row["id"]!=null)
                {
                    $array = $row["single_name"]. "//" . $row["lyrics"]."//".$row["url"]."//".$row["id"]. "<br>";
                    echo $array;
                    echo "*****";
                }
            }
        }
    }
    $conn->close();
?>