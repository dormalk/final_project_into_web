<?php
    define("DBHOST" , "182.50.133.55");
    define("DBUSER" , "auxstudDB7c");
    define("DBPASS" , "auxstud7cDB1!");
    define("DBNAME" , "auxstudDB7c");
    $conn = mysqli_connect(DBHOST, DBUSER , DBPASS , DBNAME);
    //testing connection success
    if(mysqli_connect_errno()) {
        die("DB connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")"
    );

    /*ALLOW HEBREW IN DATABASE*/
    $query = mysqli_query($conn,"SET NAMES 'utf8'");

}