import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateEmbedHtml, extractThumbnail } from '../src/services/instagram.js';

describe('Instagram Service', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateEmbedHtml', () => {
    it('should throw an error for invalid URLs', () => {
      expect(() => generateEmbedHtml('https://youtube.com/watch?v=123')).toThrow('Invalid Instagram Reel URL');
    });

    it('should generate embed html for valid URLs', () => {
      const html = generateEmbedHtml('https://www.instagram.com/reel/XYZ123/');
      expect(html).toContain('instagram-media');
      expect(html).toContain('data-instgrm-permalink="https://www.instagram.com/reel/XYZ123/"');
      expect(html).toContain('blockquote');
    });

    it('should throw for null/empty input', () => {
      expect(() => generateEmbedHtml(null)).toThrow('Invalid Instagram Reel URL');
      expect(() => generateEmbedHtml('')).toThrow('Invalid Instagram Reel URL');
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
