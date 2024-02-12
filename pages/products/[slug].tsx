import { Layout } from "@components/common";
import { Container } from "@components/ui";
import { getConfig } from "@framework/api/config";
import { getAllProductsPaths, getProduct } from "@framework/product";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { ProductView } from "@components/product";

export const getStaticPaths: GetStaticPaths = async () => {
    const config = getConfig();
    const { products } = await getAllProductsPaths(config);
    return {
        paths: products.map((product) => ({ params: { slug: product.slug } })),
        fallback: false,
    }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
    const config = getConfig();
    const variables = { slug: params?.slug };
    const { product } = await getProduct({ config, variables });

    return {
        props: { product }
    }
}

export default function ProductSlug({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            {product && <ProductView product={product} />}
        </>
    )
}

ProductSlug.Layout = Layout;
