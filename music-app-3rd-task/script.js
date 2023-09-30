const audio = document.querySelector('audio');
const playPauseBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');
const previousBtn = document.querySelector('#previous');
const songList = document.querySelector('.song-list');
const title = document.querySelector('#title');
const record = document.querySelector('.record');
const volSlider = document.querySelector('.slider');

let songArray = [];
let songHeading = '';
let songIndex = 0;
let isPlaying = false;


// LOADING SINGLE MUSIC
function loadAudio(){
  audio.src = songArray[songIndex];
  let songListItems = songList.getElementsByTagName('li');
  songHeading = songListItems[songIndex].getAttribute('data-name');
  title.innerHTML = songHeading;
  // Highlight
  for(let i=0; i<songListItems.length; i++){
    songListItems[i].classList.remove('active');
  }
  songList.getElementsByTagName('li')[songIndex].classList.add('active');
};


// LOADING SONGS INTO ARRAY
function loadSongs(){
  let songs = songList.getElementsByTagName('li');
  for(let i=0; i<songs.length; i++){
    songArray.push(songs[i].getAttribute('data-src'));
  };
  loadAudio();
};
loadSongs();


// PLAY AUDIO
function playAudio(){
  audio.play();
  playPauseBtn.querySelector('i.bi').classList.remove('bi-play-fill');
  playPauseBtn.querySelector('i.bi').classList.add('bi-pause-fill');
  isPlaying = true;
  record.classList.add('record-animation');
};


// PAUSE AUDIO
function pauseAudio(){
  audio.pause();
  playPauseBtn.querySelector('i.bi').classList.add('bi-play-fill');
  playPauseBtn.querySelector('i.bi').classList.remove('bi-pause-fill');
  isPlaying = false;
  record.classList.remove('record-animation');
};


// NEXT SONG
function nextSong(){
  songIndex++;
  if(songIndex > songArray.length-1){
    songIndex = 0;
  }
  loadAudio();
  playAudio();
}


// PREVIOUS SONG
function previousSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songArray.length-1;
  }
  loadAudio();
  playAudio();
}


// EVENT LISTENER
playPauseBtn.addEventListener('click', function(){
  if(isPlaying){
    pauseAudio();
  }else{
    playAudio();
  }
  !isPlaying;
});


// EVENT LISTENER FOR NEXT AND PREVIOUS SONGS
nextBtn.addEventListener('click', function(){
  nextSong();
}, false);

previousBtn.addEventListener('click', function(){
  previousSong();
}, false);


// PLAY SONGS BY CLICK ON THEM
songList.addEventListener('click', function(e){
  songIndex = e.target.closest('li').getAttribute('data-index');
  loadAudio();
  playAudio();
}, false);


// ONCE SONG IS OVER NEXT SONG WILL BE PLAYED
audio.addEventListener('ended', function(){
  nextSong();
});


// VOLUME ADJUSTMENT
volSlider.addEventListener('input', function(){
  audio.volume = volSlider.value/100;
}, false)