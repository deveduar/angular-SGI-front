// export interface Product {
//     id: number;
//     title: string;
//     price: number;
//     description: string;
//     category: string;
//     images: {
//       front: string;
//       preview: string;
//       thumbnail: string;
//     }
//     rating: {
//       rate: number;
//       count: number;
//     };
// }

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: {
    front: string;
    preview: string;
    thumbnail: string;
  };
  rating: {
    rate: number;
    count: number;
  };
  sku: string;                // Nuevo campo SKU
  currency: string;            // Nuevo campo Currency
  color: string;               // Nuevo campo Color
  availability_status: string; // Nuevo campo Availability Status
  external_id: string;         // Nuevo campo External ID
  variants: {
    id: number;
    name: string;
    size: string; 
    color: string;
    price: number;
    sku: string;
    external_id: string;
  }[]; // Variants con tamaños
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