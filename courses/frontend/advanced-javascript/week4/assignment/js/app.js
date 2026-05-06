// Wires services + views. Checks config and starts the UI.
import { APP_CONFIG } from './config.js';
import { ScreenshotService } from './services/ScreenshotService.js';
import { SavedScreenshotsService } from './services/SavedScreenshotsService.js';
import { CaptureView } from './CaptureView.js';
import { SavedListView } from './SavedListView.js';
import {
  AppError,
  ConfigError,
  NetworkError,
  StorageError,
} from './errors.js';

function readConfig() {
  const c = APP_CONFIG;
  if (!c || !c.rapidApiKey || !c.crudCrudScreenshotsUrl) {
    throw new ConfigError(
      'Missing config. Open js/config.js and set rapidApiKey and crudCrudScreenshotsUrl (see js/config.example.js).',
    );
  }
  const key = String(c.rapidApiKey).trim();
  const url = String(c.crudCrudScreenshotsUrl).trim();
  if (!key || !url) {
    throw new ConfigError('Fill in both fields in js/config.js before running the app.');
  }
  if (key.includes('YOUR_') || url.includes('YOUR_')) {
    throw new ConfigError('Replace the placeholder values in js/config.js with your real keys.');
  }
  return { rapidApiKey: key, crudCrudScreenshotsUrl: url };
}

export function init() {
  let config;
  try {
    config = readConfig();
  } catch (e) {
    const mount = document.getElementById('app');
    const msg = e instanceof AppError ? e.toUserMessage() : e.message;
    mount.innerHTML = `<div class="error-box config-banner">${msg}</div>`;
    return;
  }

  const screenshotService = new ScreenshotService(config.rapidApiKey);
  const storageService = new SavedScreenshotsService(config.crudCrudScreenshotsUrl);

  const captureView = new CaptureView(screenshotService);
  captureView.render();

  const savedListView = new SavedListView(storageService);
  savedListView.render();

  captureView.onSavedRequest = async (url, imageUrl) => {
    try {
      await storageService.create({ url, imageUrl });
    } catch (e) {
      if (e instanceof NetworkError) {
        throw e;
      }
      if (e instanceof StorageError) {
        throw e;
      }
      throw new StorageError(e.message || 'Unknown error');
    }
    await savedListView.loadAndRender();
  };

  savedListView.loadAndRender();
}
