import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-products',
    templateUrl: './add-products.html',
  styleUrls: ['./add-products.css'],
  imports: [CommonModule, FormsModule],
})
export class AddProducts {
  productForm: FormGroup;
  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Toys' },
  ];

  selectedImage: File | null = null;
  selectedPdf: File | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      pages: ['', [Validators.required, Validators.min(1)]],
      categories: this.fb.array([], Validators.required),
      image: [null, Validators.required],
      pdf: [null, Validators.required]
    });
  }

  onCheckboxChange(event: any) {
    const categoriesArray: FormArray = this.productForm.get('categories') as FormArray;

    if (event.target.checked) {
      categoriesArray.push(this.fb.control(event.target.value));
    } else {
      const index = categoriesArray.controls.findIndex(x => x.value === event.target.value);
      if (index !== -1) categoriesArray.removeAt(index);
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.productForm.patchValue({ image: file });
    }
  }

  onPdfSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPdf = file;
      this.productForm.patchValue({ pdf: file });
    }
  }

  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('pages', this.productForm.get('pages')?.value);
    formData.append('image', this.selectedImage as Blob);
    formData.append('pdf', this.selectedPdf as Blob);

    const selectedCategories = this.productForm.get('categories')?.value;
    selectedCategories.forEach((catId: string) => {
      formData.append('categoryIds[]', catId);
    });

    // Here you can call your service to send formData to backend
    console.log('Form Data ready to submit', formData);
  }
}
