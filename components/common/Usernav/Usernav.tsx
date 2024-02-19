import { FC } from "react";
import style from './Usernav.module.css'
import Link from "next/link";
import { Bag as Card, Heart } from "@components/icons";
import { useUI } from "@components/ui/context";
import useCart from '@framework/cart/use-cart'

const Usernav: FC = () => {
    const ui = useUI();
    const { data } = useCart();

    return (
        <nav>
            <ul className={style.list}>
                <li className={style.item}>
                    <Card onClick={ui.openSidebar} />
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
