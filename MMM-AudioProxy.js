Module.register("MMM-AudioProxy", {

	defaults:
	{
		useProxy: true, //obs
		proxyOnly: true, //if true only use the proxy for URLS in the DLNAs list, if false add the audio controls etc as a test scenario
		srcIdx:0,
		srcs: ["modules/MMM-ButterMeNoParsnips/music/rocku.mp3", "https://ice6.somafm.com/groovesalad-256-mp3", "modules/MMM-ButterMeNoParsnips/music/viper.mp3"],// "http://192.168.1.39:50002/m/MP3/34400.mp3"],
		DLNAs: [], //add servers when found here
		proxyBase: "http://localhost:8080/proxy", //the URL of the proxy endpoint
	},

	getScripts() {
		return [
			"https://unpkg.com/butterchurn-presets@3.0.0-beta.4/dist/base.min.js",
			"https://unpkg.com/butterchurn-presets@3.0.0-beta.4/dist/extra.min.js",
			'modules/MMM-AudioProxy/utilities.js',
			'modules/MMM-butterMeNoParsnips/helpers.js',
		]
	},

	getStyles() {
		return ["modules/MMM-ButterMeNoParsnips/butterMeNoParsnips.css"]
	},

	getDom() 
	{

		//if this is proxy only then return nothing

		if (this.config.proxyOnly) {
			return document.createElement("div");
		}

		let wrapper = document.getElementById("butterme");

		if (wrapper == null) { //make sure in this example that the wrapper is only created once

			this.audio = document.createElement("audio"); //this is used by butterme to get the audio source
			this.audio.crossOrigin = "anonymous";
			this.audio.id = "audioPlayer";
			this.audio.autoplay = true; //some browsers will honour this as soon as the src is set.
			this.audio.controls = false;

			plBtn = document.createElement("button"); plBtn.textContent = "Play"; plBtn.id = "playBtn"; //some browsers demand that audio is started by user interaction/some dont
			plBtn.addEventListener("click", () => {
				this.audio.play();
			});
			stBtn = document.createElement("button"); stBtn.textContent = "Stop"; stBtn.id = "stopBtn";
			stBtn.addEventListener("click", () => {
				this.audio.pause();
			});
			srcBtn = document.createElement("button"); srcBtn.textContent = "Next"; srcBtn.id = "srcBtn";
			srcBtn.addEventListener("click", () => {
				this.config.srcIdx = (this.config.srcIdx + 1) % this.config.srcs.length;
				this.audio.src = Utilities.getProxyAudioSrc(this.config.srcs[this.config.srcIdx],this.config);
			});

			butterMeDiv = document.createElement("div");
			butterMeDiv.id = "butterme";
			butterMeDiv.className = "butterme";

			Helpers.addBMConfig("audioPlayer", true, "butterme"); //set the config for butterme only
			Helpers.addBMScript(); //writes the butterme to the page as it has to be type module!

			wrapper = document.createElement("div"); //main wrapper for the module

			wrapper.appendChild(butterMeDiv);
			wrapper.appendChild(this.audio);
			wrapper.appendChild(plBtn);
			wrapper.appendChild(stBtn);
			wrapper.appendChild(srcBtn);
		}
		
		this.audio.src = Utilities.getProxyAudioSrc(this.config.srcs[this.config.srcIdx], this.config); //pass the config to tell it if to use the proxy or not, the config also holds the DLNA ip addresses to use as source
		
		return wrapper
	}
});
