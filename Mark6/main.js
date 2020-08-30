var audio, playbtn, title,poster, artists, seekslider, seeking=false, seekto, 
curtimetext, durtimetext, playlist_status, 
dir, playlist, ext, agent,playlist_artist,repeat,random;

//Initialization Of Array of Music, Title , Poster Image , Artists
dir = "music/";
playlist = ["Memories","Hymn-For-The-Weekend","Believer","We-Dont-Talk-Anymore","Senorita","Perfect"];
title = ["Memories","Hymn For The Weekend","Believer","We Don't Talk Anymore","Senorita","Perfect"];
poster = ["images/Memories.jpg","images/alan-walker.jpg","images/Believer.jpg","images/we-don't-talk-anymore.jpg","images/senorita.jpg","images/perfect.jpg"];
artists = ["Maroon 5 - Memories","Alan Walker","Imagine Dragons - Believer","Charlie Puth - (feat. Selena Gomez)","Shawn Mendes – Senorita Ft. Camila Cabello","Perfect - Ed Sheeran"];
playlist_index = 0;

//Used to run on every browser
ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
ext = ".ogg";
}

// Set object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
seekslider = document.getElementById("seekslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

// Audio Object
audio = new Audio();
audio.src = dir+playlist[0]+ext;
audio.loop = false;

//First Song Title and Artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

// Add Event Handling
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup",function(){ seeking=false; });

audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack(); });
repeat.addEventListener("click",loop);
randomSong.addEventListener("click",random);

//Functions
function fetchMusicDetail(){
    //Poster Image , Pause/Play Image
    $("#image").attr("src",poster[playlist_index]);

    //Title and Artist
    playlist_status.innerHTML =title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    //Audio
    audio.src = dir+playlist[playlist_index]+ext;
    audio.play();
}
function getRandomNumber(min,max){
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

function random(){
    let randomIndex = getRandomNumber(0,playlist.length-1);
    playlist_index = randomIndex;
    fetchMusicDetail();
    document.querySelector(".playpause").classList.add("active");
}

function loop(){
    if(audio.loop){
        audio.loop = false;
        document.querySelector(".loop").classList.remove("active");
    } else {
        audio.loop = true;
        document.querySelector(".loop").classList.add("active");    
    }
}

function nextSong(){
    document.querySelector(".playpause").classList.add("active");
    playlist_index++;
    if(playlist_index > playlist.length - 1){
        playlist_index = 0;
    }
    fetchMusicDetail();
}

function prevSong(){
    document.querySelector(".playpause").classList.add("active");
    playlist_index--;
    if(playlist_index < 0){
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetail();
}

function switchTrack(){
    if(playlist_index == (playlist.length - 1)){
        playlist_index = 0;
    }else{
        playlist_index++;	
    }
    fetchMusicDetail();
}

function playPause(){
    
    if(audio.paused){
        audio.play();
        document.querySelector(".playpause").classList.add("active");

    }else{
        audio.pause();
        document.querySelector(".playpause").classList.remove("active");
    }
}


function seek(event){
    if(audio.duration == 0){
        null
    }else{
        if(seeking){
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    } 
}


function seektimeupdate(){
    if(audio.duration){
        var nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        if(curmins < 10){ curmins = "0"+curmins; }
        if(durmins < 10){ durmins = "0"+durmins; }
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML = "00"+":"+"00";
        durtimetext.innerHTML = "00"+":"+"00";
}	
}

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change',function(){
if(this.checked){
    document.documentElement.setAttribute('data-theme','dark');
}else{
    document.documentElement.setAttribute('data-theme','light');
}
})