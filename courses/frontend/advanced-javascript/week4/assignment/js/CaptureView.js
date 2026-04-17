
class CaptureView {
  constructor(screenshotService) {
    this.screenshotService = screenshotService;
    this.root = document.getElementById('capture-root');
    this.onSavedRequest = null;
  }

  render() {
    this.root.innerHTML = `
      <h2>Capture</h2>
      <p class="hint">Enter a website address. We request a screenshot from RapidAPI.</p>
      <div class="row">
        <input type="text" id="url-input" class="input" placeholder="https://example.com" autocomplete="url" />
        <button type="button" id="capture-btn" class="btn primary">Capture</button>
      </div>
      <div id="capture-error" class="error-slot" aria-live="polite"></div>
      <div id="preview-area" class="preview-area"></div>
    `;

    this.input = this.root.querySelector('#url-input');
    this.btn = this.root.querySelector('#capture-btn');
    this.errorEl = this.root.querySelector('#capture-error');
    this.previewEl = this.root.querySelector('#preview-area');

    this.btn.addEventListener('click', () => this.capture());
    this.input.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.capture();
    });
  }

  showError(err) {
    const msg = err instanceof AppError ? err.toUserMessage() : err.message;
    this.errorEl.innerHTML = `<div class="error-box">${msg}</div>`;
  }

  clearError() {
    this.errorEl.innerHTML = '';
  }

  setLoading(on) {
    this.btn.disabled = on;
    this.btn.textContent = on ? 'Capturing…' : 'Capture';
  }

  validateUrl(raw) {
    const trimmed = (raw ?? '').trim();
    if (!trimmed) {
      throw new ValidationError('Please enter a URL.');
    }
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    let parsed;
    try {
      parsed = new URL(withScheme);
    } catch {
      throw new ValidationError(`"${trimmed}" is not a valid URL.`);
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new ValidationError('URL must use http or https.');
    }
    return parsed.href;
  }

  async capture() {
    this.clearError();
    this.previewEl.innerHTML = '';

    let pageUrl;
    try {
      pageUrl = this.validateUrl(this.input.value);
    } catch (e) {
      this.showError(e);
      return;
    }

    this.setLoading(true);
    try {
      const imageUrl = await this.screenshotService.fetchScreenshotImageUrl(pageUrl);
      const shot = new Screenshot({ url: pageUrl, imageUrl });
      const el = shot.render({
        onSave: async s => {
          try {
            await this.handleSave(s);
          } catch (err) {
            this.showError(
              err instanceof AppError ? err : new AppError('Save failed.'),
            );
          }
        },
      });
      this.previewEl.appendChild(el);
    } catch (e) {
      if (e instanceof ValidationError) {
        this.showError(e);
      } else if (e instanceof NetworkError) {
        this.showError(e);
      } else if (e instanceof ApiError) {
        this.showError(e);
      } else {
        this.showError(new AppError('Something went wrong while capturing.'));
      }
    } finally {
      this.setLoading(false);
    }
  }

  async handleSave(screenshot) {
    if (this.onSavedRequest) {
      await this.onSavedRequest(screenshot.url, screenshot.imageUrl);
    }
    this.previewEl.innerHTML = '';
    this.clearError();
  }
}
