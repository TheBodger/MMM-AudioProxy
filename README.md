# MMM-AudioProxy
Audio proxy module to enable CORS free access to DLNA server for a visualiser

Some browser security will reject a visualiser directly accessing data from a DLNA server. The proxy server that is started wjen the magic mirror webserver starts will act as a psroxy, sending the request to the DLNA server and then in response adding response headers that will allow the visualiser to access the DLNA data.

This module is also a demo for the MMM-ButterMeNoParsnips module that provides support for the ButterChurn visualiser when used againstan Asuio tag. 

### Examples:

An example layout with a DLNA track playing, the butterchurn visualiser working and additioanl magic mirror modules
![Example of MMM-ModulePosition resizing modules](images/screenshot_edit.png?raw=true "Example screenshot")

### Dependencies

This module requires the MMM-ButterMeNoParsnips module to be installed as it provides the audio visualiser support and example audio files.

This module requires npm modules installed after it is cloned

## Installation
To install the module, use your terminal to:
1. Navigate to your MagicMirror's modules folder. If you are using the default installation directory, use the command:<br />`cd ~/MagicMirror/modules`
2. Clone the module:<br />`git clone https://github.com/TheBodger/MMM-AudioProxy `
3. nmp install

## Update
to update this module, use your terminal to:
1. `cd ~/MagicMirror/modules/MMM-AudioProxy`
2. `git pull`

## Using the module

### MagicMirror² Configuration

To use this module, add the following minimum configuration block to the END of the modules array in the `config/config.js` file:
```js
		{
			module: "MMM-AudioProxy",
		},
```

### Configuration Options

| Option                  | Details
|------------------------ |--------------
| `srcIdx`                | *Optional* - <br><br> **Possible values:** Any value between 0 and the number of src entries in srcs - 1.<br> **Default value:** 0
| `srcs`                | *Optional* - <br><br> **Possible values:** A list of test audio sources in the format ["source1","source2",etc].<br> **Default value:** see below
| `DLNAs`                | *Optional* - <br><br> **Possible values:** A list of host and port addresses to proxy.<br> **Default value:** [], see below for example
| `useProxy`            |*Optional* -  Enables the conversion of DLNA addresses into Proxy compatible addresses<br><br> **Possible values:** true,false <br> **Default value:** true
| `proxyOnly`            |*Optional* -  If true, no audio or visualisation is rendered to the module<br><br> **Possible values:** true,false <br> **Default value:** true

### example srcs list
```js
["modules/MMM-ButterMeNoParsnips/rocku.mp3", "https://ice6.somafm.com/groovesalad-256-mp3", "modules/MMM-ButterMeNoParsnips/viper.mp3"],
```

The above list contains a couple of local mp3 files and a streaming URL from SomaFM. You can add your own mp3 files to any module folder or use other streaming URLs.

### Example DLNAs list
```js
  DLNAs: ["http://192.168.10.39:50002"], //add other servers as required here
  ```

### Additional Notes

This comes with a Utilities library containing a function to convert a DLNA address into a proxy address.

```js
  proxyURL = Utilities.getProxyAddress(dlnaAddress,this.config);
```

The proxyURL is then used as the source for the audio player.
