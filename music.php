<?php
    include "index1.php";
?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>עיברי לידר - פרויקט סוף קורס</title>
    <link rel="stylesheet" type="text/css" href="includes/indexStyle.css">
    <script src="http://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="includes/indexScript.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="loading"><div id="loadBar"></div></div>
<header>
    <a href="index.html">עברי לידר<br><span>/מוזיקה</span></a>
    <svg width="100%" height="250" xmlns="http://www.w3.org/2000/svg">
        <circle cx="125" cy="10" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="330" cy="40" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="600" cy="30" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="770" cy="20" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="950" cy="85" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="950" cy="105" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="950" cy="125" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="950" cy="185" r="3" fill="#b4b4b6" stroke="none"></circle>
        <circle cx="940" cy="105" r="3" fill="#b4b4b6" stroke="none"></circle>
    </svg>
    <div id="menuButton"></div>
</header>
<main  class="textureViewer">
    <nav>
        <ul></ul>
    </nav>
        <section id="albumsList">
            <article>
                <?php
                    loadAlbumList($conn);
                ?>
            </article>
        </section>
        <section id="singlesList">
            <article>
            </article>
        </section>
        <section id="singleShow">
            <article>
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
<script>
        albumListScript();
</script>
</body>
</html>