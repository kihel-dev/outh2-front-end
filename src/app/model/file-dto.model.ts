// file-dto.model.ts
export interface FileDTO {
    id: string;
    name: string; // The name of the file
    url: string;  // The URL to access the file
    type: string; // The type (MIME type) of the file
    size: number; // The size of the file in bytes
  }
  