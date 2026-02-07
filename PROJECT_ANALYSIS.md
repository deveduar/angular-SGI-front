# Análisis del Proyecto: my-app

Este documento proporciona un análisis detallado del proyecto para ayudarte a prepararte para una entrevista técnica.

## 1. Stack Tecnológico (Tecnologías Clave)

El proyecto está construido sobre un stack moderno y robusto. Aquí están los componentes principales:

### **Framework & Core**
-   **Angular v18.1.0**: Estás utilizando una de las versiones más recientes de Angular.
    -   *Puntos clave para entrevista*: Menciona el uso de **Standalone Components** (si los usas, que es el estándar en v18), mejoras en rendimiento con **Hydration** (ya que tienes SSR) y las nuevas **Signal APIs** (sería bueno revisar si las usas en tus componentes).
-   **SSR (Server-Side Rendering)**: Tienes dependencias como `@angular/ssr` y `express`.
    -   *Beneficio*: Mejora el SEO y el tiempo de carga inicial (First Contentful Paint), crucial para aplicaciones de comercio electrónico o contenido público.

### **UI & Estilos**
-   **PrimeNG v17.18.9**: Una librería de componentes UI muy completa para Angular.
    -   *Uso*: Tablas (`InventoryTable`), carruseles (`ProductCarousel`), y componentes interactivos.
-   **PrimeIcons**: Set de iconos oficial de PrimeNG.
-   **SCSS**: Usas SASS para estilos, lo que permite variables, mixins y anidamiento CSS.

### **Librerías de Utilidad**
-   **PapaParse**: Librería potente para analizar archivos CSV.
    -   *Caso de uso*: Probablemente para importar o exportar inventarios de productos desde/hacia Excel/CSV.
-   **RxJS**: Manejo de flujos de datos asíncronos (estándar en Angular).

### **Calidad de Código & Testing**
-   **ESLint + Prettier**: Configuración para mantener la calidad y formato del código (`angular-eslint`).
-   **Jasmine & Karma**: Stack de testing unitario por defecto de Angular.

---

## 2. Arquitectura del Proyecto

Tu estructura de carpetas sugiere que estás siguiendo principios de **Arquitectura Limpia (Clean Architecture)** o **Arquitectura Hexagonal**, lo cual es **excelente** para mencionar en una entrevista.

Estructura observada en `src/app/`:
-   **`domain/`**: Probablemente contiene la lógica de negocio pura, modelos e interfaces, sin dependencias de infraestructura (API, UI).
-   **`adapters/`**: Contiene la implementación concreta de cómo la aplicación se comunica con el mundo exterior.
    -   `api/`: Servicios HTTP para consumir datos del backend.
    -   `theme-service`: Gestión de temas/estilos.
-   **`pages/`**: Componentes que actúan como "Vistas" o contenedores principales para rutas específicas.
    -   Ejemplos: `inventory-list`, `product-page` (detalle), `category-page`, `inventory-table`.
-   **`layout/`**: Componentes estructurales como Header, Footer, Sidebar.
-   **`home/`**: Página principal.

*Puntos clave para entrevista*:
> "He organizado el proyecto separando capas. Tengo una capa de **Dominio** para las reglas de negocio, **Adaptadores** para la comunicación con APIs y servicios, y **Páginas** para la composición de la UI. Esto hace que el código sea más mantenible y testeable."

---

## 3. Funcionalidades Clave (Features)

Basado en las rutas y componentes:

1.  **Gestión de Inventario**:
    -   Vistas de lista y tabla (`InventoryList`, `InventoryTable`).
    -   Probablemente integración con CSV (PapaParse) para cargas masivas.
2.  **Catálogo de Productos**:
    -   Página de detalle de producto (`ProductPage`, `ProductDetail`).
    -   Navegación por categorías (`CategoryPage`).
    -   Carrusel de productos destacados.
3.  **Selector de Productos**: Componente `ProductPicker` para selección interactiva.

---

## 4. Preguntas Probables en Entrevista

**P: ¿Por qué usaste Angular 18?**
> R: Quería aprovechar las últimas mejoras de rendimiento como la Hidratación estable para SSR, y la arquitectura basada en componentes standalone que simplifica los módulos.

**P: ¿Cómo manejas el estado de la aplicación?**
> R: (Dependiendo de tu código) "Uso servicios de Angular con RxJS (BehaviorSubjects) para compartir estado entre componentes de manera reactiva."

**P: ¿Qué ventaja te da la estructura de carpetas que elegiste?**
> R: "Desacopla la lógica de negocio de la vista. Si mañana cambio la librería de UI (de PrimeNG a Material, por ejemplo), mi lógica de dominio en `src/app/domain` permanece intacta."

**P: ¿Cómo mejoras el SEO de la aplicación?**
> R: "Implementé Angular SSR (Server-Side Rendering) para que los motores de búsqueda puedan indexar el contenido HTML renderizado desde el servidor, en lugar de esperar a que cargue todo el JavaScript del cliente."

---

## 5. Siguientes Pasos Recomendados

1.  **Revisar `server.ts`**: Asegúrate de entender cómo Express sirve tu app Angular.
2.  **Verificar Standalone Components**: Confirma si tus componentes tienen `standalone: true` en su decorador `@Component`. Es el estándar moderno.
3.  **Chequear `adapters/api`**: Revisa si estás usando `HttpClient` y Observables correctamente.
