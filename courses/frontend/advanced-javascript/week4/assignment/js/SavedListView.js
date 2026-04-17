// Loads saved screenshots from CrudCrud and renders a Screenshot card per row.
class SavedListView {
  constructor(storageService) {
    this.storageService = storageService;
    this.root = document.getElementById('saved-root');
  }

  render() {
    this.root.innerHTML = `
      <h2>Saved screenshots</h2>
      <p class="hint">Stored in CrudCrud (your own endpoint).</p>
      <div class="row">
        <button type="button" id="refresh-saved-btn" class="btn ghost">Refresh list</button>
      </div>
      <div id="saved-error" class="error-slot" aria-live="polite"></div>
      <div id="saved-list" class="saved-list"></div>
    `;

    this.listEl = this.root.querySelector('#saved-list');
    this.errorEl = this.root.querySelector('#saved-error');
    this.root.querySelector('#refresh-saved-btn').addEventListener('click', () => {
      this.loadAndRender();
    });
  }

  showError(err) {
    const msg = err instanceof AppError ? err.toUserMessage() : err.message;
    this.errorEl.innerHTML = `<div class="error-box">${msg}</div>`;
  }

  clearError() {
    this.errorEl.innerHTML = '';
  }

  async loadAndRender() {
    this.clearError();
    this.listEl.innerHTML = '<p class="muted">Loading…</p>';

    try {
      const items = await this.storageService.listAll();
      this.listEl.innerHTML = '';

      if (!Array.isArray(items) || items.length === 0) {
        this.listEl.innerHTML = '<p class="muted">No saved screenshots yet.</p>';
        return;
      }

      for (const row of items) {
        const id = row._id;
        const url = row.url;
        const imageUrl = row.imageUrl;
        if (!id || !url || !imageUrl) continue;

        const shot = new Screenshot({ id, url, imageUrl });
        const node = shot.render({
          onDelete: async () => {
            try {
              await shot.deleteFromStorage(this.storageService);
              await this.loadAndRender();
            } catch (err) {
              if (err instanceof ValidationError) {
                this.showError(err);
              } else if (err instanceof NetworkError) {
                this.showError(err);
              } else if (err instanceof StorageError) {
                this.showError(err);
              } else {
                this.showError(new AppError('Delete failed.'));
              }
            }
          },
        });
        this.listEl.appendChild(node);
      }
    } catch (e) {
      this.listEl.innerHTML = '';
      if (e instanceof NetworkError) {
        this.showError(e);
      } else if (e instanceof StorageError) {
        this.showError(e);
      } else {
        this.showError(new AppError('Could not load saved screenshots.'));
      }
    }
  }
}
