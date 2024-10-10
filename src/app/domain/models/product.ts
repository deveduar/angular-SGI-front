export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    // image: string;
    images: {
      front: string;
      preview: string;
    }
    rating: {
      rate: number;
      count: number;
    };
  
}

// export interface Product {
//   id: number; // ID del producto
//   external_id: string; // ID externo del producto
//   title: string; // Nombre del producto
//   variants: number; // Número de variantes del producto
//   synced: number; // Número de variantes sincronizadas
//   image: string; // URL de la miniatura del producto
//   is_ignored: boolean; // Indica si el producto está ignorado
//   category: string;
//   price: number;
//   description: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }