// CrudCrud REST API for saved screenshots (JSON: { url, imageUrl }).
class SavedScreenshotsService {
  constructor(collectionBaseUrl) {
    this.baseUrl = collectionBaseUrl.replace(/\/$/, '');
  }

  async listAll() {
    let res;
    try {
      res = await fetch(this.baseUrl);
    } catch (e) {
      throw new NetworkError(e.message || 'Request failed');
    }
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      throw new StorageError(t || `List failed (${res.status})`);
    }
    try {
      return await res.json();
    } catch {
      throw new StorageError('Could not parse list response.');
    }
  }

  async create(record) {
    let res;
    try {
      res = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    } catch (e) {
      throw new NetworkError(e.message || 'Request failed');
    }
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      throw new StorageError(t || `Save failed (${res.status})`);
    }
    try {
      return await res.json();
    } catch {
      throw new StorageError('Could not parse save response.');
    }
  }

  async removeById(id) {
    const url = `${this.baseUrl}/${id}`;
    let res;
    try {
      res = await fetch(url, { method: 'DELETE' });
    } catch (e) {
      throw new NetworkError(e.message || 'Request failed');
    }
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      throw new StorageError(t || `Delete failed (${res.status})`);
    }
  }
}
