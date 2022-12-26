//can't figure out why this is necessary for it to work, but whatever
var test = document.getElementById("test-element");
test.innerText = ctr;

/*ctr for what song is playing*/
var ctr = 0;

/* getting the audio and track-art element we'll be using throughout the document*/
let audio = document.getElementById("audio-element");
let art = document.getElementById("track-art");


/* play-pause button stuff */
var playbutton = document.getElementById("play-button");
var imag = document.getElementById("play-icon");
if (audio.paused){
  imag.name = "play-outline";
}
//audio.controls = false;
playbutton.onclick = function () {
  if (audio.paused) {
    audio.play();
    imag.name = "pause-outline";
  } 
  else {
    audio.pause();
    imag.name = "play-outline";
  }
};

songs = {
  0: ["songs/Chris_Stapleton_Tennessee_Whiskey_copy.mp3", "album_images/chris.jpeg", "Chris Stapleton", "Tennessee Whiskey",293],
  1: ["songs/Heat_Waves_Glass_Animals_copy.mp3", "album_images/heat_waves.jpeg", "Glass Animals", "Heat Waves",189],
  2: ["songs/Hermitude_The_Buzz_copy.mp3", "album_images/hermitude.jpeg", "Hermitude", "The Buzz",222],
  3: ["songs/Shubh_Baller_copy.mp3","album_images/shubh.jpeg", "Shubh", "Baller",154]
};


// Find the total song list length
song_dict_len = Object.keys(songs).length;


//Initialising the variables for track details
var artist = document.getElementById("artist-name");
var song = document.getElementById("song-name");
artist.innerText = songs[ctr][2];
song.innerText = songs[ctr][3];

// next and previous buttons
//next-song button
var next = document.getElementById("next-button");
next.onclick = function () {
  direction = "next";
  audio.pause()
  prev_next(direction);
  //makes the song play automatically after going to the next/prev track
  audio.play();
}

function prev_next(direction){
  // Set the counter to the right song for playing and for next use
  if (direction == "prev") 
  {
    ctr = ctr - 1
    if (ctr < 0){
      ctr = (ctr + song_dict_len) % song_dict_len;
    }
  }
  if (direction == "next"){
    ctr = (ctr+1) % song_dict_len;
  }

  if (direction == 'random'){
    ctr = Math.floor(Math.random()*4-0.01);
  }

  // Set the song and art correctly
  audio.src = songs[ctr][0];
  art.src = songs[ctr][1];

  // set the artist name and song correctly
  artist.innerText = songs[ctr][2];
  song.innerText = songs[ctr][3]

  // resetting the value of duration as the song changes
  total_duration()

}

//prev-song button
var prev = document.getElementById("prev-button");
prev.onclick = function () {
  direction = "prev";
  audio.pause();
  prev_next(direction);
  //makes the song play automatically after going to the next/prev track
  audio.play();
}


// Volume slider
var slider = document.getElementById("volume-slider");
slider.style.opacity = 0;
var button = document.getElementById("volume-button");
audio.volume = slider.value ;
button.addEventListener("mouseenter",function(){
  audio.volume = slider.value;
  slider.style.opacity = 1;
})
slider.addEventListener("mouseenter",function(){
  audio.volume = slider.value;
  slider.style.opacity = 1;
})
button.addEventListener("mouseleave",function(){
  setTimeout(leave(),2000);
})
slider.addEventListener("mouseleave",function(){
  setTimeout(leave(),2000);
})
function leave(){
  audio.volume = slider.value;
  slider.style.opacity = 0;
}
slider.addEventListener('input',function(){
  audio.volume = slider.value;
})




// Progress bar
var curr_time = document.getElementById("current-time");
var prog = document.getElementById('progress-bar');
var total_time = document.getElementById('total-time');
setInterval(update, 20)

function update(){
  var total1 = Math.round(audio.currentTime);
  var minutes = Math.floor(total1/60);
  var seconds = total1 % 60;
  if (seconds<10){
    seconds = '0' + seconds;
  }
  curr_time.innerText = minutes + ':' + seconds;
  var frac = (total1/duration);
  prog.value = frac * 10000;
};
function total_duration(){
  duration = songs[ctr][4]
  var minutes = Math.floor(duration/60);
  var seconds = duration % 60;
  if (seconds<10){
    seconds = '0' + seconds;
  }
  total_time.innerText = minutes + ':' + seconds;
}
total_duration()


//shuffle
shuffle = document.getElementById("shuffle");
shuffle.onclick = function(){
  audio.pause()
  prev_next("random")
  audio.play()
};

//skip

function skip(time){
  var audio = document.getElementById("audio-element");
  audio.currentTime += time;
}

var forw = document.getElementById("skip-ahead");
var back = document.getElementById("seek-back");
back.onclick = function() {
  skip(-15);
}
forw.onclick = function() {
  skip(15);
}

audio.bind('ended',prev_next("next"));