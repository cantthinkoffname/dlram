let root_css, gb, log;

let state = 0;

let prev_time = 0;

let log_i = 0;

function loop(time) {
	for (let i = 0; i < 6; i++)
		root_css.style.setProperty(`--col${i}`, `hsl(${time / 5 + i * 30}, 100%, 50%)`);

	const dt = (time - prev_time) / 1e3;

	if (state == 1) {
		const k = 100006 * Math.log(2) / (log_i * log_i); // Like real progress bars
		if (log_i < log.length && Math.random() > Math.exp(-k * dt)) {
			document.getElementById("status").innerHTML += log[log_i] + "<br>";
			log_i++;
		}

		if (log_i == log.length) {
			document.getElementById("after-downloading").classList.remove("hidden");
			state = 2;
		}
	}
	
	prev_time = time;
	window.requestAnimationFrame(loop);
}

function create_log() {
	log = [
		"Initialising CPU context",
		"Initialising CPU context",
		`exec: kvramnew(${gb}e9)`,
		"RAM loading: 13%",
		"RAM loading: 25%",
		"RAM loading: 38%",
		"RAM loading: 51%",
		"RAM loading: 63%",
		"RAM loading: 75%",
		"RAM loading: 88%",
		"RAM loading: 100%",
		"Installing newly created RAM to memory manager...",
		"Opening CPU instruction socket...",
		"Uploading memory object to CPU context...",
		"exec: kvramset(kmobj)",
		"Mounting virtual drive /proc/1/map_files/00000000-ffffffff to /mnt",
		"exec: kvramop()",
		"Mounting virtual drive /proc/1/map_files/01234567-ffffffff to /mnt",
		"exec: kvramop()",
		"Mounting virtual drive /proc/1/map_files/815ff341-8ac19426 to /mnt",
		"exec: kvramop()",
		"Mounting virtual drive /proc/1/map_files/eec27916-917bb745 to /mnt",
		"exec: kvramop()",
		`pre_realloc(/dev/mem, ${gb}e9)`,
		"Done"
	];
}

function finish_ram() {
	for (let i = 0; i < 1e9; i++); // Looks like stuff is being done
	window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

window.onload = function() {
	root_css = document.querySelector(":root");

	const container = document.getElementById("dl");
	for (let i = 0; i < container.children.length; i++) {
		container.children[i].onclick = function() {
			if (state == 0) {
				gb = container.children[i].innerText;
				gb = gb.substr(0, gb.length - 2);
				create_log();
				document.getElementById("downloading").classList.remove("hidden");
				state = 1;
			}
		}
	}
	
	window.requestAnimationFrame(loop)
}
