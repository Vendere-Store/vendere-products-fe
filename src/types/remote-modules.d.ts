// remote-modules.d.ts
declare module 'remote/Products' {
    import { FunctionComponent } from 'react';

    interface ProductsProps {
        // Expected props for the Products component
        id: number;
        name: string;
        price: string;
        description: string;
    }

    const Products: FunctionComponent<ProductsProps>;
    export default Products;
}
