import { Product } from "@common/types/product";
import { FC } from "react";
import Link from 'next/link'
import Image from "next/image";
import style from './ProductCard.module.css'

interface Props {
    product: Product
}

const placeholderImage = '/product-image-placeholder.svg'

const ProductCard: FC<Props> = ({ product }) => {
    return (
        <Link href={`/products/${product.slug}`} className={style.root}>
            <div className={style.productBG}></div>
            <div className={style.productTag}>
                <h3 className={style.productTitle}><span>{product.name}</span></h3>
                <span className={style.productPrice}>
                    {product.price.value} {product.price.currencyCode}
                </span>
            </div>
            {product.images && (<Image alt={product.name ?? 'Product image'} src={product.images[0].url ?? placeholderImage} quality="85" height={540} width={540} layout="fixed" className={style.productImage} />)}
        </Link>

    )
}

export default ProductCard;
