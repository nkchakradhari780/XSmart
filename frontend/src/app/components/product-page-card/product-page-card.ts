import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-page-card',
  imports: [],
  templateUrl: './product-page-card.html',
  styleUrl: './product-page-card.css'
})
export class ProductPageCard {
  @Input() product: any;

  ngOnInit() {
    console.log('Product details:', this.product);
  }
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
    window.open(url, '_blank'); // <-- Opens PDF in new tab
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

}
