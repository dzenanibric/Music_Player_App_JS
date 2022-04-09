import { music_list } from "./data.js";

const play_btn = document.getElementById('play-btn'),
pause_btn = document.getElementById('pause-btn'),
previous_btn = document.getElementById('previous-btn'),
next_btn = document.getElementById('next-btn'),
list_btn = document.getElementById('list-btn'),
progress_bar = document.getElementById('progress-bar'),
name_div = document.getElementById('name-of-song'),
list_div = document.getElementById('list-all-songs'),
close_list_btn = document.getElementById('close-list');

let song = 0;
let num_of_songs = music_list.length;
let audio = new Audio(music_list[song].path);

//here we clean the progress bar from the previous song, 
//by removing it and after 50ms we show it again and set its length
function clearProgressBar(){
    progress_bar.style.display = 'none';
    setTimeout(getDuration, 50);
}

//progress bar will be paused when we click pause button
function progressPausedControl(bool){
    if(bool == true){
        if(progress_bar.classList.contains('paused')){
            progress_bar.classList.remove('paused');
        }
    }
    else{
        if(!progress_bar.classList.contains('paused')){
            progress_bar.classList.add('paused');
        }
    }
}

//when we choose song from album list
function getClickedSong(i){
    audio.pause();
    audio = new Audio(music_list[i].path);
    audio.play();
    name_div.innerText = music_list[i].name;
    setPauseButtonActive();
    song = i;
    clearProgressBar();
    progressPausedControl(true);
}

//after end of song, next one will start automatically, if we are on last one than first in album will be next one
function playNextSongAutomatically(){
    audio.addEventListener('ended', function(){
        if(song >= num_of_songs - 1){
            song = 0;
            audio = new Audio(music_list[song].path);
            audio.play();
            name_div.innerText = music_list[song].name;
            clearProgressBar();
        }
        else{
            song++;
            audio = new Audio(music_list[song].path);
            audio.play();
            name_div.innerText = music_list[song].name;
            clearProgressBar();
        }
    });
}

//here we take the length of the song and set the loading time of the progress bar to that length, 
//we do this via the css variable by setting its value to the length of the song
function getDuration(){
    document.documentElement.style.setProperty("--duration", audio.duration + "s");
    progress_bar.style.display = 'block';
}

function getNextSong(){
    song++;
    audio.pause();
    audio = new Audio(music_list[song].path);
    audio.play();
}

function getPreviousSong(){
    song--;
    audio.pause();
    audio = new Audio(music_list[song].path);
    audio.play();
}

function setPauseButtonActive(){
    pause_btn.classList.add('active');
    play_btn.classList.remove('active');
}

play_btn.addEventListener('click', function(){
    if(play_btn.classList.contains('play_btn')){
        setPauseButtonActive();
    }
    name_div.innerText = music_list[song].name;
    audio.play();
    getDuration();
    progressPausedControl(true);
});

pause_btn.addEventListener('click', function(){
    if(pause_btn.classList.contains('pause_btn')){
        play_btn.classList.add('active');
        pause_btn.classList.remove('active');
    }
    audio.pause();
    progressPausedControl(false);
});

next_btn.addEventListener('click', function(){
    if(song >= num_of_songs - 1){
        song = song - num_of_songs;
    }
    getNextSong();
    setPauseButtonActive();
    name_div.innerText = music_list[song].name;
    clearProgressBar();
    progressPausedControl(true);
    playNextSongAutomatically();
});

previous_btn.addEventListener('click', function(){
    if(song <= 0){
        song = song + num_of_songs;
    }
    getPreviousSong();
    setPauseButtonActive();
    name_div.innerText = music_list[song].name;
    clearProgressBar();
    progressPausedControl(true);
    playNextSongAutomatically();
});

//here we show all the songs in the album (list div)
for(let i = 0; i<num_of_songs; i++){
    const el = document.createElement("p");
    el.textContent = music_list[i].name;
    list_div.appendChild(el);
    el.addEventListener('click', function(){
        getClickedSong(i);
        playNextSongAutomatically();
    });
}

list_btn.addEventListener('click', function(){
    list_div.style.display = 'block';
    if(list_btn.classList.contains('list_btn')){
        close_list_btn.classList.add('active');
        list_btn.classList.remove('active');
    }
});

close_list_btn.addEventListener('click', function(){
    list_div.style.display = 'none';
    list_btn.classList.add('active');
    close_list_btn.classList.remove('active');
});