import { nanoid } from 'nanoid';
import { addUrl, findUrl } from '~/data-access/url.data-access';
import { UrlDto } from '~/dto/url.dto';
import HttpException from '~/exceptions/HttpException';
import { isValidHttpUrl } from '~/utils/validateURL';

class UrlService {
	public async encode(urlData: UrlDto) {
		/**
		 * According to https://www.rfc-editor.org/rfc/rfc3986
		 * links such as www.example.com is not a valid URL
		 * Thus such url's are considered as invalid URL's
		 * This can be shown from the front end by appending
		 * either a http or https protocol
		 */
		if (!isValidHttpUrl(urlData.url)) {
			throw new HttpException(
				400,
				`${urlData.url} is not a valid URL. Please refer https://www.rfc-editor.org/rfc/rfc3986`
			);
		}

		const shortUrlBase = process.env.SHORT_URL_BASE;
		/**
		 * According to nanoid package
		 * at a speed of 1000 ids per hour/second short urls are generated
		 * then ~17 years needed, in order to have a 1% probability of at least one collision
		 */
		const nanoId = nanoid(10);

		// TODO a cache layer can be introduced here
		if (findUrl(nanoId)) {
			return `${shortUrlBase}/${nanoId}`;
		}

		addUrl(urlData.url, nanoId);

		return `${shortUrlBase}/${nanoId}`;
	}

	public async decode(urlData: UrlDto) {
		const nanoId = urlData.url.trim().split('/').pop();

		// TODO a cache layer can be introduced here
		const url = findUrl(nanoId);
		if (!url) {
			throw new HttpException(404, 'Could not find the URL');
		}

		return url;
	}
}

export default UrlService;
