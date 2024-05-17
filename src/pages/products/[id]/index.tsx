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

const reviews = { href: '#', average: 4, totalCount: 117 };

interface ProductProps {
  product: Product;
}

const ProductDetails: any = (props: ProductProps) => {
  const { product } = props;

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

ProductDetails.getInitialProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  // If your API route requires a specific query parameter, you can extract it like this:
  const productId = query.id as string; // Assuming 'id' is passed as a query parameter.

  try {
    const { data: product } = await http.get(`products/${productId}`);
    console.log('PRODUCT', product);
    return { product };
  } catch (error) {
    console.log(error);
    // Handle errors or redirect if necessary
    return { props: { product: null } }; // Always return an object with `props` key.
  }
};

export default ProductDetails;
