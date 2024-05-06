import React from 'react';
import {
  Breadcrumb,
  Button,
  ColorSelector,
  Image,
  Reviews,
  SizeSelector
} from 'vendere-storybook-test';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import http from '@/services/http';
import { Product } from '@/types/product';

// const product = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' }
//   ],
//   images: [
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.'
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.'
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.'
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.'
//     }
//   ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' }
//   ],
//   sizes: [
//     { name: 'XXS', inStock: false },
//     { name: 'XS', inStock: true },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//     { name: '2XL', inStock: true },
//     { name: '3XL', inStock: true }
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton'
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.'
// };
const reviews = { href: '#', average: 4, totalCount: 117 };

interface ProductProps {
  product: Product;
}

const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  if (product) {
    return (
      <div className="bg-white">
        <div className="pt-6">
          <Breadcrumb
            breadcrumbs={product?.breadcrumbs}
            currentName={product?.name}
            currentHref={product?.href}
          />

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <Image
              aspectH="2"
              aspectW="3"
              imageAlt={product.images[0].alt}
              imageSrc={product.images[0].src}
            />
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <Image
                aspectH="2"
                aspectW="3"
                imageAlt={product.images[1].alt}
                imageSrc={product.images[1].src}
              />
              <Image
                aspectH="2"
                aspectW="3"
                imageAlt={product.images[2].alt}
                imageSrc={product.images[2].src}
              />
            </div>
            <Image
              aspectH="5"
              aspectW="4"
              imageAlt={product.images[3].alt}
              imageSrc={product.images[3].src}
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <Reviews
                  average={reviews.average}
                  totalCount={reviews.totalCount}
                  href={reviews.href}
                />
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div className="mt-10">
                  <ColorSelector colors={product.colors} />
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <SizeSelector sizes={product.sizes} />
                </div>

                <Button
                  className="mt-10"
                  color="bg-indigo-600"
                  label="Add to bag"
                  primary={true}
                  size={'large'}
                  fullWidth={true}
                />
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product?.highlights?.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h5>No product details</h5>;
  }
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  // If your API route requires a specific query parameter, you can extract it like this:
  const productId = query.id as string; // Assuming 'id' is passed as a query parameter.

  try {
    const { data: product } = await http.get(`product/${productId}`);
    // console.log('data', product);
    return { props: { product } };
  } catch (error) {
    console.log(error);
    // Handle errors or redirect if necessary
    return { props: { product: null } }; // Always return an object with `props` key.
  }
};

export default ProductDetails;
