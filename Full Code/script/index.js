//importing the track-name Element to shown the currant song name
let trackName = document.querySelector(".track-name");

//importing the track-number Element to shown the currant song Track Number in the list
let trackNumber = document.querySelector(".track-number");

//importing the playpause-ttack Element to play song if is pause or pause it if is playing
let playPauseBtn = document.querySelector(".playpause-track");

//importing the prev-track Element to track song back
let prevBtn = document.querySelector(".prev-track");

//importing the next-track Element to track song front
let nextBtn = document.querySelector(".next-track");

//importing the playerCurrentTime Element to manipulate currant song Time
let currTime = document.querySelector(".playerCurrentTime");

//importing the playerTotalDuration Element
let totalDuration = document.querySelector(".playerTotalDuration");

//importing the seekSlider Element
let seekSlider = document.querySelector(".seekSlider");
 
//global variables
let trackIndex = 0;
let isPlaying = false;
let updateTimer;
 
 
 

 let playListContainer = document.querySelector('.playListContainer');
 let topTitle = document.querySelector('.topTitle');

 document.querySelector('.menuIcon').addEventListener('click',()=>{
   //display the playListContainer if is clicked
   playListContainer.style.display = 'flex';
   //showm 'Play List' on the topTitle Element
   topTitle.innerHTML = 'Play List';
 })
// importing the fa-chevron-down(down arror icon) to hide playListContainer
 document.querySelector('.fa-chevron-down').addEventListener('click',()=>{
  
   playListContainer.style.display = 'none'
   
   //change topTitle to the default name
   topTitle.innerHTML = 'Now Playing';
 })
 

//create a new audio element for the player
let currTrack = document.createElement('audio');
 
 
//track-list store to be played
let trackList = [];

//importing musicListContainer to display All uploaded songs
const songsOutput = document.querySelector('.musicListContainer');

//counter used to index each-song its position in trackList
let indexTrack = 0;

//importing the uploadMusics input Element and add onchange event listener to listen if a new file uplaoded
document.querySelector('#uploadMusics').addEventListener('change', (e) => {
  
  //new variable to hold currant uplaoded song
  const files = e.target.files;
 
//  iterate over currant uplaoded song variable to generate & collecte all uplaoded songs
 for(let i=0; i < files.length; i++){
    
    indexTrack ++;
    
   // display all uplaoded files on "musicListContainer" element with its 'index number', 'id' and 'file name' and then remove the last 4 extension(.mp3) on each file name and also add onclick event to each one...
   songsOutput.innerHTML += `<li onclick="playMe()" id='${indexTrack}' value="${indexTrack}">${event.target.files[i].name.substring(0, event.target.files[i].name.length - 4)}</li>`;

//add each uplaoded song on "trackList" when uploaded
  trackList.push({
    path: URL.createObjectURL(event.target.files[i]),
    name: event.target.files[i].name
  });
}
  
// load and play first song if new file or files uplaoded
  loadTrack(trackIndex);
  playTrack();
})


//play each selected or clicked song in musicListContainer(songsOutput) Element
const playMe = () => {
  
// change trackIndex variable to selected song id value(indexTrack)
trackIndex = this.event.target.value -1;

//import all "li" elements in the body container
let liElmts = document.querySelectorAll('li');

for (let j = 0; j < liElmts.length; j++) {
  //change their backgroundColor to default
  liElmts[j].style.backgroundColor = " transparent";
}
  
  //change each selected or clicked song name backgroundcolor to indicate currant song in list
this.event.target.style.backgroundColor = "#331C4F";

// load and play each clicked song
loadTrack(trackIndex);
playTrack();
}


//display them if the "trackList" (songs store) is empty
trackName.innerHTML = 'Empty';
trackNumber.innerHTML = "0/0";

//function to load track
function loadTrack(track_index) {
  // Clear the timer & reset all values to their default when load new track
  clearInterval(updateTimer);
  resetValues();
 
  // Load a new track
  currTrack.src = trackList[track_index].path;
 
 
 //import all "li" elements
 let liElmts = document.querySelectorAll('li');

 for (let i = 0; i < liElmts.length; i++) {
   //change their backgroundColor to default
   liElmts[i].style.backgroundColor = " transparent";
 }
 
 //change currant track name backgroundcolor to indicate it in a list
liElmts[track_index].style.backgroundColor = "#331C4F";


// display currant "track name" on the "trackName" Element and remove the last 4 file extension(.mp3)
 trackName.innerHTML = trackList[track_index].name.substring(0, trackList[track_index].name.length - 4);
  
  
  //display track Number on the "trackNumber" Element
trackNumber.innerHTML = trackIndex +1 + "/" + trackList.length;
 
  updateTimer = setInterval(seekUpdate, 1000);

//Move to the next track if the current song finished
  currTrack.addEventListener("ended", nextTrack);
}
 
 
// Function to reset all values to their default
function resetValues() {
  currTime.innerHTML = "00:00";
  totalDuration.innerHTML = "00:00";
  seekSlider.value = 0;
}


function playpauseTrack() {
  //Switch between play and pause
  if (!isPlaying) playTrack();
  else pauseTrack();
}


//importing the "playCover" span Element
let playCoverSpan = document.querySelector('.playCover span');
function playTrack() {
  //check if trackList is not empty
  if (!trackList.length <= 0) {
    
  // Play the loaded track
  currTrack.play();
  isPlaying = true;
  
  //start rotating playCover
  playCoverSpan.style.cssText += 'animation: startRotate 20s linear infinite';
  
  // Replace play icon with the pause icon
  playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
  }
}
 
 
function pauseTrack() {
  // Pause the loaded track
  currTrack.pause();
  isPlaying = false;
  
//pause rotating playCover
 playCoverSpan.style.cssText += 'animation-play-state:paused';
 
  // Replace pause icon with the play icon
  playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
}
 
// keyboad back buttun listener
document.addEventListener('keydown', function (event)
{
if (event.key === "Backspace" || event.key === "Escape") {
  pauseTrack();
}
});

function nextTrack() {
/*Go back to the first track if the
current one is the last in the track list*/
  if (trackIndex < trackList.length - 1)
    trackIndex += 1;
  else trackIndex = 0;
 
  // Load and play the new track
  loadTrack(trackIndex);
  playTrack();
}
 
 
function prevTrack() {
  /*go back to the last track if the current one is the first in the track list*/
  if (trackIndex > 0)
    trackIndex -= 1;
  else trackIndex = trackList.length - 1;
   
  // Load and play the new track
  loadTrack(trackIndex);
  playTrack();
}


//importing "muteVolume" icon Element
let muteVolume = document.querySelector('.muteVolume');

//importing "unMuteValume" icon Element
let unMuteValume = document.querySelector('.unMuteValume');

muteVolume.addEventListener('click',()=>{
  //display "unMuteValume" icon
  unMuteValume.style.display = 'block';

  //hide "muteValume" icon
  muteVolume.style.display = 'none';
  
 // mute the songs
  currTrack.volume = 0;
})
unMuteValume.addEventListener('click',()=>{
 // hide "unMuteValume" icon
    unMuteValume.style.display = 'none';
    
    //display "muteValume" icon
    muteVolume.style.display = 'block';
    
    //unMute songs from mute
    currTrack.volume = 1;
})


function seekTo() {
  /*Calculate the seek position by the percentage of the seek slider and get the relative duration to the track*/
  seekto = currTrack.duration * (seekSlider.value / 100);
 
  // Set the current track position to the calculated seek position
  currTrack.currentTime = seekto;
}
 
 
function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the "tracklist"
loadTrack(trackIndex);
