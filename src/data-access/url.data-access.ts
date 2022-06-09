const urls = new Map();

const addUrl = (url: string, nanoId: string) => {
	urls.set(nanoId, url);
	return url;
};

const findUrl = (nanoId: string | undefined) => {
	return urls.get(nanoId);
};

export { addUrl, findUrl };
