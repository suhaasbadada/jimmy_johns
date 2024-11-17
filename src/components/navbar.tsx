
import { Link } from "@nextui-org/link";
import {
    Navbar as NextUINavbar,
    NavbarItem
} from "@nextui-org/navbar";

import { siteConfig } from "@/config/site";
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
                            className="underline hover:text-red-500"
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
