export function isValidHttpUrl(url: string) {
	let convertedUrl;

	try {
		convertedUrl = new URL(url);
	} catch (_) {
		return false;
	}

	return (
		convertedUrl.protocol === 'http:' || convertedUrl.protocol === 'https:'
	);
}
