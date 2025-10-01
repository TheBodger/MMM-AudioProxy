Module.register("MMM-AudioProxy", {
  start: function () {
    this.audio = new Audio("http://localhost:3001/proxy/path/to/audio.mp3");
    this.audio.crossOrigin = "anonymous";
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(this.audio);
    source.connect(ctx.destination);
    this.audio.play();
  }
});
