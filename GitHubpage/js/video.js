/*------------------------------------------------------------------
Project:        Gonex - HTML onepage theme
Version:        1.0
Last change:    14/07/2017
Author:         GraphBerry
URL:            #
License:        #/pages/license
-------------------------------------------------------------------*/
(function () {

	'use strict';

	/*--------------------------------------------------
    Custom video controls
    ---------------------------------------------------*/

    var supportsVideo = !!document.createElement('video').canPlayType;
	
	if (supportsVideo) {

		var videoContainer = document.getElementById('video-container');
		var video = document.getElementById('video-player');
		var videoControls = document.getElementById('video-controls');

		// Hide the default controls
		video.controls = false;

		// Display the user defined video controls
		videoControls.style.display = 'block';

		// Button variables
		var muteVolume = document.getElementById('mute');
		var volumeSlider = document.getElementById('volume-slider');
		var videoCurrent = document.getElementById('current-time');
		var videoDuration = document.getElementById('video-duration');
		var rewind = document.getElementById('rew-back');
		var playpause = document.getElementById('playpause');
		var forward = document.getElementById('rew-forward');
		var share = document.getElementById('share-video');
		var shareSocial = document.getElementById('share-social');
		var progress = document.getElementById('video-progress');
		var progressBar = document.getElementById('video-progress-bar');

		var toHHMMSS = function ( totalsecs ) {
	        var sec_num = parseInt(totalsecs, 10);
	        var hours   = Math.floor(sec_num / 3600);
	        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	        var seconds = sec_num - (hours * 3600) - (minutes * 60);

	        if (hours   < 10) {hours   = "0"+hours; }
	        if (minutes < 10) {minutes = "0"+minutes;}
	        if (seconds < 10) {seconds = "0"+seconds;}

	        if (hours   > 1 ) {
	        	var time = hours+':'+minutes+':'+seconds;
	        } else {
	        	var time = minutes+':'+seconds;
	        }
	        
	        return time;
	    }

	    // Change the icon of the mute button
	    var changeSoundIcon = function (i) {
	    	var soundIcon = muteVolume.childNodes[1];
	    	if(i !== 0 && i <= 0.50) {
				soundIcon.classList.add("fa-volume-down");
				soundIcon.classList.remove("fa-volume-off");
				soundIcon.classList.remove("fa-volume-up");
			} else if(i > 0.50 && i<= 1) {
				soundIcon.classList.add("fa-volume-up");
				soundIcon.classList.remove("fa-volume-off");
				soundIcon.classList.remove("fa-volume-down");
			} else {
				soundIcon.classList.add("fa-volume-off");
				soundIcon.classList.remove("fa-volume-down");
				soundIcon.classList.remove("fa-volume-up");
			}
	    }

	    // Change the icon of the play / pause button
	    var changePlayIcon = function() {

	    	var playIcon = playpause.childNodes[1];

	    	if (video.paused || video.ended) {
				playIcon.classList.add("fa-play");
		   		playIcon.classList.remove("fa-pause");
			} else {
				playIcon.classList.add("fa-pause");
		   		playIcon.classList.remove("fa-play");
			}
	    }

	    // Change play / pause icon when video ends
	    video.addEventListener('ended', changePlayIcon);

		// Play or pause video
		playpause.addEventListener('click', function(e) {

			// Show video container
			videoContainer.classList.add("is-active");
			
			if (video.paused || video.ended) {
				video.play();
				changePlayIcon();
			} else {
				video.pause();
				changePlayIcon();
			}

		});

		 rewind.addEventListener('click', function(){
	      video.currentTime -= 15;
	    }, false);

	    forward.addEventListener('click', function(){
	      video.currentTime += 15;
	    }, false);

	    // Volume control
	    volumeSlider.addEventListener('change', function() {
	    	video.muted = false;
		    video.volume = this.value;
		    changeSoundIcon(video.volume);
	    });

		// Mute or unmute video
		muteVolume.addEventListener('click', function(e) {
			video.muted = !video.muted;
			video.muted ? (volumeSlider.value = 0) : (volumeSlider.value = 1);
			video.muted ? (video.volume = 0) : (video.volume = 1);
			changeSoundIcon(video.volume);
		});

		//Get video's duration
		var getMetaData = function() {
			progress.setAttribute('max', video.duration);
		   	videoDuration.innerHTML = toHHMMSS(video.duration);
		}

		//Get video's metadata
		video.addEventListener('loadedmetadata', getMetaData);

		// Firefox fix for video preload: metadata
		if(video.readyState >= 2) {
			getMetaData();
		}

		video.addEventListener('timeupdate', function() {
			// Update current time
			videoCurrent.innerHTML = toHHMMSS(video.currentTime);
			// Update progress bar with current time
			if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
			progress.value = video.currentTime;
			progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
		});

		// Share video
		share.addEventListener('click', function() {
			this.classList.toggle('is-active');
			shareSocial.classList.toggle('is-active');
		});

	}

})();