import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../service/auth.service'; // Import AuthService
import { UserService } from '../../service/user.service';
import { UploadFileService } from '../../service/upload-file.service';
import { User } from '../../model/user.model';
import { FileDTO } from '../../model/file-dto.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo!: User;
  selectedFiles?: FileList; 
  currentFile?: File; 
  progress = 0;
  message = '';
  fileInfos!: Observable<FileDTO[]>; 

  constructor(
    private userService: UserService, 
    private uploadService: UploadFileService,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      this.userInfo = data;
      this.fileInfos = this.uploadService.getFiles();
    }, error => {
      console.error('Error fetching user info:', error);
      this.message = 'Could not load user information.';
    });
  }

  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files;
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              if (event.total) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else {
                this.progress = 0;
              }
            } else if (event instanceof HttpResponse) {
              this.message = 'File uploaded successfully!';
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
          }
        );
      }
      this.selectedFiles = undefined; 
    } else {
      this.message = 'Please select a file to upload!';
    }
  }

  downloadFile(fileId: string): void {
    this.uploadService.getFileById(fileId).subscribe((response: HttpResponse<Blob>) => {
        if (response.body) {
            const blob = new Blob([response.body]);
            const fileType = response.headers.get('Content-Type');
            const fileUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            let filename = 'downloaded_file';
            if (fileType) {
                filename += this.getFileExtension(fileType);
            }
            a.href = fileUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(fileUrl);
        } else {
            this.message = 'Could not download the file! No data received.';
        }
    }, (error) => {
        this.message = 'Could not download the file!';
    });
  }

  isImage(type: string): boolean {
    return type.startsWith('image/');
  }

  isDocument(type: string): boolean {
    return type.startsWith('application/') || type.endsWith('.txt') || type.endsWith('.csv');
  }

  private getFileExtension(fileType: string): string {
    switch (fileType) {
        case 'image/png': return '.png';
        case 'image/jpeg': return '.jpg';
        case 'application/pdf': return '.pdf';
        case 'text/csv': return '.csv';
        case 'text/plain': return '.txt';
        default: return '';
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login'], { queryParams: { logout: true } });
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
}