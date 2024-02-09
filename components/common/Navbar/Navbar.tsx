import { Container } from "@components/ui";
import Link from "next/link";
import { FC } from "react";
import style from './Navbar.module.css'
import { Usernav } from "@components/common";

const Navbar: FC = () => {
    return (
        <Container>
            <div className={style.root}>
                <div className="flex flex-1 items-center">
                    <Link href="/" className={style.logo}>
                        Next Store
                    </Link>
                    <nav className="ml-6 space-x-6">
                        <Link href="/" className={style.link}>All</Link>
                        <Link href="/" className={style.link}>Clothes</Link>
                        <Link href="/" className={style.link}>Accessories</Link>
                        <Link href="/" className={style.link}>Shoes</Link>
                    </nav>
                    <div className="flex flex-1 justify-end space-x-8">
                        <Usernav />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Navbar
