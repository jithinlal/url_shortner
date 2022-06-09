import { Router } from 'express';
import UrlController from '~/controller/url.controller';
import { UrlDto } from '~/dto/url.dto';
import validationMiddleware from '~/middleware/validation.middleware';

const router = Router();

const urlController = new UrlController();

/**
 * POST /url/encode
 * @tag URL
 * @summary encode a URL string
 * @bodyContent {EncodeURLPost} application/json
 * @description shorten a URL and return the shortened URL
 * @response 201 - OK
 * @responseContent {EncodeURL} 201.application/json
 */
router.post('/encode', validationMiddleware(UrlDto), urlController.encodeUrl);

/**
 * POST /url/decode
 * @tag URL
 * @summary decode a URL string
 * @bodyContent {DecodeURLPost} application/json
 * @description return the original URL for a shortened URL
 * @response 200 - OK
 * @responseContent {DecodeURL} 200.application/json
 */
router.post('/decode', validationMiddleware(UrlDto), urlController.decodeUrl);

export default router;
