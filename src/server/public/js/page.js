$(document).ready(function () {
	const stream = document.getElementById("stream");
	const volbar = document.getElementById("volume");

	// Warn iOS and Safari users
	let safariUA = /Apple/i.test(navigator.vendor);
	let iOSUA =
		/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	if (iOSUA || safariUA) {
		alert(
			"You appear to be using an iOS device or a Safari browser. Cadence stream playback may not be compatible with your platform."
		);
	}

	// Loads and unloads audio stream source
	document
		.getElementById("playButton")
		.addEventListener("click", function () {
			if (stream.paused) {
				stream.src = streamSrcURL;
				stream.load();
				stream.play();
				document.getElementById("playButton").innerHTML = "⏸";
			} else {
				stream.src = "";
				stream.load();
				stream.pause();
				document.getElementById("playButton").innerHTML = "⏵";
			}
		});

	// Load cached volume level, or 30%
	volbar.value = stream.volume = localStorage.getItem("volumeKey") || 0.3;
	// Volume bar listeners
	$("#volume")
		.change(function () {
			stream.volume = this.value;
			localStorage.setItem("volumeKey", this.value);
		})
		.on("input", function () {
			stream.volume = this.value;
			localStorage.setItem("volumeKey", this.value);
		});

	// Search keyup
	$("#searchInput").keyup(function (event) {
		if (event.keyCode == 13) {
			postSearch();
		}
	});

	$('#tabs li').on('click', function() {
        var tab = $(this).data('tab');
        $('#tabs li').removeClass('is-active');
        $(this).addClass('is-active');
        $('#tab-content section').removeClass('is-active');
        $('section[data-content="' + tab + '"]').addClass('is-active');
    });
});
