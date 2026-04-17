// RapidAPI Website Screenshot 6 (GET + query params).
class ScreenshotService {
  static API_URL = 'https://website-screenshot6.p.rapidapi.com/screenshot';
  static API_HOST = 'website-screenshot6.p.rapidapi.com';

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async fetchScreenshotImageUrl(pageUrl) {
    const params = new URLSearchParams({
      url: pageUrl,
      width: '1280',
      height: '720',
    });

    let res;
    try {
      res = await fetch(`${ScreenshotService.API_URL}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': ScreenshotService.API_HOST,
          'x-rapidapi-key': this.apiKey,
        },
      });
    } catch (e) {
      throw new NetworkError(e.message || 'Request failed');
    }

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new ApiError(body || 'Screenshot service returned an error.', res.status);
    }

    let json;
    try {
      json = await res.json();
    } catch {
      throw new ApiError('Could not read the screenshot service response.');
    }

    const imageUrl =
      json.screenshotUrl || json.screenshot || json.url || json.image;
    if (!imageUrl) {
      throw new ApiError('The screenshot service did not return an image URL.');
    }

    return imageUrl;
  }
}
