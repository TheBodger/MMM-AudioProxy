
var Utilities = {
	getProxyAudioSrc(dlnaUrl, config) {

		if (!config.useProxy) {
			return dlnaUrl;
		}

		//if the dlnaUrl doesnt start with the contents of this.config.DLNAs then just return it unchanged

		if (!config.DLNAs.some(dlna => dlnaUrl.startsWith(dlna))) {
			return dlnaUrl; // Return unchanged if not from DLNA base
		}

		const proxyBase = config.proxyBase;
		const encoded = encodeURIComponent(dlnaUrl);
		return `${proxyBase}?target=${encoded}`;

	}

};
