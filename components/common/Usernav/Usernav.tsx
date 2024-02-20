import { FC } from "react";
import style from './Usernav.module.css'
import Link from "next/link";
import { Bag as Card, Heart } from "@components/icons";
import { useUI } from "@components/ui/context";
import useCart from '@framework/cart/use-cart'
import { LineItem } from "@common/types/cart";

const Usernav: FC = () => {
    const ui = useUI();
    const { data } = useCart();

    const itemsCount = data?.lineItems.reduce((count, item: LineItem) => {
        count += item.quantity;
        return count;
    }, 0) ?? 0;

    return (
        <nav>
            <ul className={style.list}>
                <li className={style.item}>
                    <Card onClick={ui.openSidebar} />
                    {itemsCount > 0 && <span className={style.bagCount}>{itemsCount}</span>}
                </li>
                <li className={style.item}>
                    <Link href="/wishlist">
                        <Heart />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Usernav;
