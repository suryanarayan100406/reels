import * as cheerio from 'cheerio';

/**
 * Generates embed HTML for an Instagram reel URL.
 * Uses the standard Instagram blockquote embed format — no API keys needed.
 * Instagram's embed.js script on the frontend converts this into a full player.
 * @param {string} url - The Instagram reel URL
 * @returns {string} - The embed HTML string
 */
export function generateEmbedHtml(url) {
  if (!url || !url.includes('instagram.com/reel/')) {
    throw new Error('Invalid Instagram Reel URL');
  }

  // Standard Instagram embed blockquote — the embed.js script on the frontend
  // automatically upgrades this into a full interactive player
  return `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"><a href="${url}" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">View this post on Instagram</a></div></blockquote>`;
}

/**
 * Extracts the og:image thumbnail URL directly from the Instagram page HTML.
 * No API keys needed — just fetches the public page and reads the meta tag.
 * @param {string} url - The Instagram reel URL
 * @returns {Promise<string|null>} - The thumbnail URL, or null if not found
 */
export async function extractThumbnail(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!response.ok) {
      console.warn(`Failed to fetch Instagram page for thumbnail: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Check multiple possible selectors for the og:image
    const thumbnailUrl = $('meta[property="og:image"]').attr('content') || 
                         $('*[property="og:image"]').attr('content');
                         
    return thumbnailUrl || null;
  } catch (err) {
    console.error('Error extracting thumbnail:', err);
    return null;
  }
}
