import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage = localStorage;

  get<T>(key: string): T | null {
    const value = this._storage.getItem(key);

    if (!value) return null;

    return JSON.parse(value) as T;
  }

  set(key: string, value: string) {
    this._storage.setItem(key, value);
  }

  remove(key: string) {
    this._storage.removeItem(key);
  }
}
