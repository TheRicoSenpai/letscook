import { Injectable, EventEmitter } from '@angular/core';

export class BaseService {
  public needsRefresh = new EventEmitter();
  // private url = 'https://localhost:44386';
  public url = 'http://127.0.0.1:52080';
  // public url = 'http://10.0.2.2:52080';
}
