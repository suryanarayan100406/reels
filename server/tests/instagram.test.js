import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchOEmbedData, extractThumbnail } from '../src/services/instagram.js';

describe('Instagram Service', () => {
  beforeEach(() => {
    process.env.META_APP_ID = 'test-id';
    process.env.META_APP_SECRET = 'test-secret';
    vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchOEmbedData', () => {
    it('should throw an error for invalid URLs', async () => {
      await expect(fetchOEmbedData('https://youtube.com/watch?v=123')).rejects.toThrow('Invalid Instagram Reel URL');
    });

    it('should throw an error if env vars are missing', async () => {
      delete process.env.META_APP_ID;
      await expect(fetchOEmbedData('https://www.instagram.com/reel/XYZ123/')).rejects.toThrow('Missing META_APP_ID');
    });

    it('should fetch oEmbed html successfully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ html: '<blockquote>Embed content</blockquote>' })
      });

      const html = await fetchOEmbedData('https://www.instagram.com/reel/XYZ123/');
      expect(html).toBe('<blockquote>Embed content</blockquote>');
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('access_token=test-id|test-secret'));
    });

    it('should handle API errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => 'Bad Request'
      });

      await expect(fetchOEmbedData('https://www.instagram.com/reel/XYZ123/')).rejects.toThrow('Failed to fetch oEmbed data: 400 Bad Request');
    });
  });

  describe('extractThumbnail', () => {
    it('should extract og:image from html', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: async () => `
          <html>
            <head>
              <meta property="og:image" content="https://example.com/thumb.jpg" />
            </head>
            <body></body>
          </html>
        `
      });

      const thumbnail = await extractThumbnail('https://www.instagram.com/reel/XYZ123/');
      expect(thumbnail).toBe('https://example.com/thumb.jpg');
    });

    it('should return null if no og:image is found', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: async () => '<html><head></head><body></body></html>'
      });

      const thumbnail = await extractThumbnail('https://www.instagram.com/reel/XYZ123/');
      expect(thumbnail).toBeNull();
    });

    it('should return null on network error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const thumbnail = await extractThumbnail('https://www.instagram.com/reel/XYZ123/');
      expect(thumbnail).toBeNull();
    });
  });
});
