"use client";

import { useState, useEffect } from "react";
import AppData from "@data/app.json";
import { usePathname } from 'next/navigation';
import Link from "next/link";

const MenuBarModule = () => {
    const [toggle, setToggle] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const asPath = usePathname();
    const [curLabel, setCurLabel] = useState(0);

    const isPathActive = (path) => {
        return (asPath.indexOf(path) !== -1) && asPath === path;
    };

    const handleSubMenuClick = (index, e) => {
        e.preventDefault();
        setActiveSubMenu(activeSubMenu === index ? null : index);
    };
    
    useEffect(() => {
        // close mobile menu
        setToggle(false);
        if ( toggle ) {
            document.querySelector('.art-content').classList.remove('art-active');
        }

        AppData.header.menu.map((item) => menuLabels(item) );
    }, [asPath])

    const menuLabels = (item) => {
        isPathActive(item.link) ? setCurLabel(item) : 0;
    }

    const menuOpen = () => {
        setToggle(!toggle);
        if ( !toggle ) {
            document.querySelector('.art-content').classList.add('art-active');
        } else {
            document.querySelector('.art-content').classList.remove('art-active');
        }
    }

    return (
        <>
            {/* menu bar */}
            <div className="art-menu-bar-fix">
            <div className={`art-menu-bar ${toggle ? "art-active" : ""}`}>

            {/* menu bar frame */}
            <div className="art-menu-bar-frame">

                {/* menu bar header */}
                <div className="art-menu-bar-header">
                {/* menu bar button */}
                <div className={`art-menu-bar-btn ${toggle ? "art-active" : ""}`} onClick={() => menuOpen() }>
                    {/* icon */}
                    <span></span>
                </div>
                {/* menu bar button end */}
                </div>
                {/* menu bar header end */}

                {/* scroll frame */}
                <div className="art-scroll-frame">

                {/* menu */}
                <nav id="swupMenu">
                    {/* menu list */}
                    <ul className="main-menu">
                        {AppData.header.menu.map((item, index) => (
                        <li className={`menu-item ${item.children.length > 0 ? "menu-item-has-children" : ""} ${isPathActive(item.link) ? "current-menu-item" : ""}`} key={`header-menu-item-${index}`}>
                            <Link href={item.link} onClick={item.children.length > 0  ? (e) => handleSubMenuClick(index, e) : null}>
                                {item.label}
                            </Link>
                            {item.children.length > 0 && (
                            <ul className={activeSubMenu === index ? 'sub-menu art-active' : 'sub-menu'}>
                                {item.children.map((subitem, subIndex) => (
                                <li key={`header-submenu-item-${subIndex}`} className={isPathActive(subitem.link) ? "menu-item current-menu-item" : "menu-item"}>
                                    <Link href={subitem.link}>
                                        {subitem.label}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                            )}
                        </li>
                        ))}
                    </ul>
                    {/* menu list end */}
                </nav>
                {/* menu end */}

                {/* language change */}
                <ul className="art-language-change">
                    {/* language item */}
                    <li><a href="?lang=fr">FR</a></li>
                    {/* language item */}
                    <li className="art-active-lang"><a href="?lang=en">EN</a></li>
                </ul>
                {/* language change end */}

                </div>
                {/* scroll frame end */}

                {/* current page title */}
                <div className="art-current-page">
                    {curLabel !== 0 ? (
                        <Link href={curLabel.link}>{curLabel.label}</Link>
                    ) : (
                        <Link href="/">Home</Link>
                    )}
                </div>
                {/* current page title end */}

            </div>
            {/* menu bar frame */}

            </div>
            </div>
            {/* menu bar end */}
        </>
    );
};
export default MenuBarModule;