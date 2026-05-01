import * as cheerio from 'cheerio';

/**
 * Fetches oEmbed data from Instagram for a given reel URL.
 * Requires META_APP_ID and META_APP_SECRET environment variables.
 * @param {string} url - The Instagram reel URL
 * @returns {Promise<string>} - The embed HTML string
 */
export async function fetchOEmbedData(url) {
  if (!url || !url.includes('instagram.com/reel/')) {
    throw new Error('Invalid Instagram Reel URL');
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error('Missing META_APP_ID or META_APP_SECRET environment variables');
  }

  const accessToken = `${appId}|${appSecret}`;
  const oEmbedUrl = `https://graph.facebook.com/v19.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${accessToken}&omitscript=true`;

  const response = await fetch(oEmbedUrl);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch oEmbed data: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  if (!data.html) {
    throw new Error('Invalid oEmbed response: missing html field');
  }

  return data.html;
}

/**
 * Extracts the og:image thumbnail URL directly from the Instagram page HTML.
 * @param {string} url - The Instagram reel URL
 * @returns {Promise<string|null>} - The thumbnail URL, or null if not found
 */
export async function extractThumbnail(url) {
  try {
    const response = await fetch(url);
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
