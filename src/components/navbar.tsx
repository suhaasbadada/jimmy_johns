import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
    GithubIcon,
} from "@/components/icons";

export const Navbar = () => {

    return (
        <NextUINavbar className="flex border-2 border-red-600 max-w-2xl md:mx-auto mt-5" maxWidth="lg" position="sticky">
            <div className="flex gap-4 lg:gap-6 justify-start">
                {siteConfig.navItems.map((item) => (
                    <NavbarItem key={item.href}>
                        <Link
                            className={clsx(
                                linkStyles({ color: "foreground" }),
                                "data-[active=true]:text-primary data-[active=true]:font-medium",
                            )}
                            color="foreground"
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </div>

            <div className="flex gap-4">
                <Link isExternal href={siteConfig.links.github} title="GitHub">
                    <GithubIcon className="text-default-500" />
                </Link>
                {/**<ThemeSwitch /> */}
            </div>


        </NextUINavbar>
    );
};
