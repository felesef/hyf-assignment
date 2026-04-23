import { ValidationError } from './errors.js';

// One screenshot: page URL + image URL (+ CrudCrud _id when saved).
// Renders a small card; Save / Delete wired through callbacks.
export class Screenshot {
  constructor({ url, imageUrl, id = null }) {
    this.url = url;
    this.imageUrl = imageUrl;
    this.id = id;
  }

  render(handlers) {
    const card = document.createElement('article');
    card.className = 'screenshot-card';

    const shortUrl = this.url
      .replace(/^https?:\/\//i, '')
      .replace(/\/$/, '');

    const actionsHtml = this.id
      ? '<button type="button" class="btn danger btn-delete">Delete</button>'
      : '<button type="button" class="btn primary btn-save">Save</button>';

    card.innerHTML = `
      <header class="card-head">
        <span class="card-url" title="${this.url}">${shortUrl}</span>
        <a class="btn ghost" href="${this.imageUrl}" target="_blank" rel="noopener">Open image</a>
      </header>
      <img class="card-img" src="${this.imageUrl}" alt="Screenshot of ${shortUrl}" loading="lazy" />
      <footer class="card-actions">${actionsHtml}</footer>
    `;

    if (this.id) {
      card.querySelector('.btn-delete').addEventListener('click', () => {
        if (handlers.onDelete) handlers.onDelete(this);
      });
    } else {
      card.querySelector('.btn-save').addEventListener('click', () => {
        if (handlers.onSave) handlers.onSave(this);
      });
    }

    return card;
  }

  // Removes this saved row from CrudCrud (only works when `this.id` is set).
  async deleteFromStorage(storageService) {
    if (!this.id) {
      throw new ValidationError('Only saved screenshots can be deleted from storage.');
    }
    await storageService.removeById(this.id);
  }
}
