import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDTO } from '../model/file-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = 'http://localhost:8080/api/files'; 

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      withCredentials: true
    });
    return this.http.request(req);
  }

  getFiles(): Observable<FileDTO[]> {
    return this.http.get<FileDTO[]>(`${this.baseUrl}`, {
      withCredentials: true 
    });
  }

  getFileById(id: string): Observable<HttpResponse<Blob>> { 
    return this.http.get(`${this.baseUrl}/${id}`, {
        observe: 'response', 
        responseType: 'blob', 
        withCredentials: true 
    }) as Observable<HttpResponse<Blob>>; 
  }
}
