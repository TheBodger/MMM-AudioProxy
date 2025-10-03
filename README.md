# MMM-AudioProxy
Audio proxy module to enable CORS free access to DLNA server for a visualiser

Some browser security will reject a visualiser directly accessing data from a DLNA server. The proxy server that is started by this module when the magic mirror webserver starts will act as a proxy, sending the request to the DLNA server and amending succesful response headers to allow the visualiser to access the DLNA data.

This module is also a demo for the MMM-ButterMeNoParsnips module that provides support for the ButterChurn visualiser linked to an Audio tag. 

A more comprehensive Audio player using this module can be found at MMM-SimplePlayer.

### Examples:

An example layout with a DLNA track playing, the butterchurn visualiser working and an additional magic mirror module.<br>
![Example of MMM-AudioProxy playing CORs protected DLNA tracks mouse over the visualiser controls](images/Screenshot2025-10-03182757.png?raw=true "Example screenshot")
![Example of MMM-AudioProxy playing CORs protected DLNA tracks mouse left the visualiser controls](images/Screenshot2025-10-03182823.png?raw=true "Example screenshot")
![Example of MMM-AudioProxy playing CORs protected DLNA tracks visualiser expanded](images/Screenshot2025-10-03182856.png?raw=true "Example screenshot")

### Dependencies

This module requires the MMM-ButterMeNoParsnips module to be installed as it provides the audio visualiser support, helpers and example audio files.

This module requires npm modules installed after it is cloned

## Installation
To install the module, use your terminal to:
1. Navigate to your MagicMirror's modules folder. If you are using the default installation directory, use the command:<br />`cd ~/MagicMirror/modules`
2. Clone the module:<br />`git clone https://github.com/TheBodger/MMM-AudioProxy `
3. npm install

## Update
to update this module, use your terminal to:
1. `cd ~/MagicMirror/modules/MMM-AudioProxy`
2. `git pull`

## Using the module

### MagicMirror² Configuration

To use this module, add the following minimum configuration block to the modules array in the `config/config.js` file:
```js
		{
			module: "MMM-AudioProxy",
		},
```

### Configuration Options

| Option                  | Details
|------------------------ |--------------
| `srcIdx`                | *Optional* - <br><br> **Possible values:** Any value between 0 and the number of src entries in srcs - 1. Indicates the first src to play.<br> **Default value:** 0
| `srcs`                | *Optional* - <br><br> **Possible values:** A list of audio sources in the format ["source1","source2",etc].<br> **Default value:** see below
| `DLNAs`                | *Optional* - <br><br> **Possible values:** A list of host and port addresses to proxy.<br> **Default value:** [], see below for example
| `useProxy`            |*Optional* -  Enables the conversion of DLNA addresses into Proxy compatible addresses when using the Utilities.getProxyAddress <br><br> **Possible values:** true,false <br> **Default value:** true
| `proxyOnly`            |*Optional* -  If true, no audio or visualisation is rendered to the module<br><br> **Possible values:** true,false <br> **Default value:** true
| `proxyBase`                | *Optional* - <br><br> **Possible values:** The URL+port of the proxy endpoint.<br> **Default value:** "http://localhost:8080/proxy"

### default srcs list
```js
["modules/MMM-ButterMeNoParsnips/rocku.mp3", "https://ice6.somafm.com/groovesalad-256-mp3", "modules/MMM-ButterMeNoParsnips/viper.mp3"],
```
The above list contains a couple of local mp3 files and a streaming URL from SomaFM. You can add your own mp3 files to any module folder or use other streaming URLs.

### Example DLNAs list
```js
  DLNAs: ["http://192.168.10.39:50002"], //add other servers as required here
  ```

### Additional Notes

Other proxy servers can be used, change the proxyBase to the required URL that receives a target of the actual DLNA address and audio details.

This comes with a Utilities library containing a function to convert a DLNA address into a proxy address.

```js
  proxyURL = Utilities.getProxyAddress(dlnaAddress,this.config);
```

The proxyURL is then used as the source for the audio player.
