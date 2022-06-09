import { Request, Response, NextFunction } from 'express';
import { UrlDto } from '~/dto/url.dto';
import UrlService from '~/services/url.service';

class UrlController {
	private urlService = new UrlService();

	public encodeUrl = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const urlData: UrlDto = req.body;

		try {
			const url = await this.urlService.encode(urlData);

			res.status(201).json({ url });
		} catch (error) {
			next(error);
		}
	};

	public decodeUrl = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const urlData: UrlDto = req.body;

		try {
			const url = await this.urlService.decode(urlData);

			res.status(200).json({ url });
		} catch (error) {
			next(error);
		}
	};
}

export default UrlController;
