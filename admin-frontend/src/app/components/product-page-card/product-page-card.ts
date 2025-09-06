import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-page-card',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './product-page-card.html',
  styleUrls: ['./product-page-card.css']
})
export class ProductPageCard {
  @Input() product: any;

  userId: number = 3;

  // product-page-card.component.ts
  openPdf(base64Pdf: string) {
    const byteCharacters = atob(base64Pdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank'); // Opens PDF in new tab
  }

  downloadPdf(base64Pdf: string, fileName: string = 'document.pdf') {
    const byteCharacters = atob(base64Pdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a hidden link and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // Free memory
    URL.revokeObjectURL(link.href);
  }

  getImageSrc(base64: string | null): string {
    return base64 ? `data:image/png;base64,${base64}` : 'assets/placeholder.png';
  }
}
