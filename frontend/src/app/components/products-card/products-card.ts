import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-card',
  imports: [],
  templateUrl: './products-card.html',
  styleUrl: './products-card.css'
})
export class ProductsCard {

  @Input() product: any;

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
