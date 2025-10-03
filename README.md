# MMM-AudioProxy
Audio proxy module to enable CORS free access to DLNA server for a visualiser

Some browser security will reject a visualiser directly accessing data from a DLNA server. The proxy server that is started wjen the magic mirror webserver starts will act as a psroxy, sending the request to the DLNA server and then in response adding response headers that will allow the visualiser to access the DLNA data.

This module is also a demo for the MMM-ButterMeNoParsnips module that provides support for the ButterChurn visualiser when used againstan Asuio tag. 

### Examples:

An example layout with a DLNA track playing, the butterchurn visualiser working and additioanl magic mirror modules
![Example of MMM-ModulePosition resizing modules](images/screenshot_edit.png?raw=true "Example screenshot")

### Dependencies

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
### Not quite WYSIWYG

If planning to reposition and / or resize most or all of the modules, moving them across the screen far from their original positions, the best way of ensuring the best results is to give them the same initial module position in the config.js. top_bar works best. 

When repositioning modules, their contents may left justify. This is only in the positioner and when the custom.css is applied and the postioning module removed from the config, the correct justification will be shown on you magic mirror.

### Known "Features" and Docker watch outs

Docker implementations may not provide all the permissions required to write the custom CSS to the css folder. If the file isnt being written or is empty, check that the css folder in the MMM-ModulePosition folder has write permissions for the Docker instance. i.e. Synology NAS requires that the folder has read/write access applied for Everyone

The MMM-WallPaper module (https://github.com/kolbyjack/MMM-Wallpaper) - awesome module! covers the grid. Grid snapping will still work but the grid will not be visible. The grid will be visible when the MMM-WallPaper module is removed from the config file.

### MMM-Carousel compatability

if using MMM-carousel, add/update the ignoreModules line to include module position otherwise the module wont operate correctly
```js
		{
			module: 'MMM-Carousel',
			config: {
				ignoreModules:['MMM-ModulePosition'],
				//rest of config
		      }
		},
```
If you are using the carousel arrow keys that appear on the screen, these wil be disabled when running this module. there is a simple workaround.

If the carousel transitioninterval is set to 0, temporarily change it to 10000 ~(10 seconds) which will ensure each slide is shown whilst this module is running. Any changes made on any of the slides during an edit session will be captured in the save file and can be used in custom.css as described below.

This also works if you already have the slides changing automatically.

### Saving and using custom.css

This module uses the names allocated by the MM process, which will change depending on their absolute order within the config files. Make sure that this module is the last in the configuration file to ensure all modules have the correct name when the new layout is saved.

Drag and /or resize the modules displayed on the MM display. Some module contents will resize to fit the new module size, others will ignore the size set due to how that particular module is coded.

Once the layout is saved, using the SAVE button, it can be found in the css sub folder of the MMM-ModulePosition folder (it should be here: modules/MMM-ModulePosition/css/)

Each save is given the name of custom.css.timestamp, where timestamp is a numeric representation of the time when the file is saved and will always be unique. This is to allow multiple saves within one positioning session without overwriting each save.

To use the saved custom css file, simply copy all the contents and paste into the bottom of the custom.css file found in the magic mirror css folder, normally found as a sub folder to the MagicMirror folder. Remove this module from the config file and restart MM2.

If any new modules are added to the MM config, to maintain the validity of the new custom CSS, ensure they are added at the end of the modules list. If a module is removed, then the custom CSS may not behave as expected and a new custom CSS will need to be created.


### Configuration Options

| Option                  | Details
|------------------------ |--------------
| `text`                | *Optional* - <br><br> **Possible values:** Any string.<br> **Default value:** "... loading"
| `easeAmount`            | *Optional* - the percentage of the total delta to move an object during each frame<br><br> **Possible values:** a numeric value where 1 = 100%<br> **Default value:** 0.3
| `FPS`         | *Optional* - frames per second of the animation of objects during resizing and dragging<br><br> **Possible values:** a whole numeric value between 5 and 60 <br> **Default value:** 15
| `minimum_size`            | *Optional* - minimum size in pixels that the resizer will allow an objects width and height to be.<br><br> **Possible values:** a whole number of pixels <br> **Default value:** 50 
| `canvasid`        | *Optional* - the name of the dom element within the MM display to use as a relative container for any movements. If not set then the window is used.<br><br> **Possible values:** any dom element defined within the current MM display <br> **Default value:** `"body"`
| `grid`            |*Optional* -  the size of a grid in pixels to snap modules to when dragging and resizing<br><br> **Possible values:** a whole number of pixels. <br> **Default value:** 10
| `showAlerts`            |*Optional* -  display javscript alerts on the screen that are created for events such as custom css file save<br><br> **Possible values:** true,false <br> **Default value:** true

### Additional Notes

This is a WIP; changes are being made all the time to improve the compatibility across the modules. 

Leave settings as the default for best results, minimum size is probably the only setting that may need amending depending on the size of the MM2 display

This has been tested with a number of different MM layouts and layout options. It may however not cater for all combinations and may have problems with modules that adjust the modules displayed in the MM display or that swap between sets of visible modules. Try it out to see if it works ok with your favorite layout. Raise an issue in Github if it doesnt work as expected.


