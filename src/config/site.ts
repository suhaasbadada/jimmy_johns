export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Visualization",
    description: "Visualize toxic waste data",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Spill Search",
            href: "https://jimmy-johns.onrender.com/",
        },
        {
            label: "Dashboard",
            href: "https://app.powerbi.com/view?r=eyJrIjoiMWEyMjllYWYtNTEwZi00MmExLTlhMzAtNGRkNmU0MWQzZjVmIiwidCI6IjExMTNiZTM0LWFlZDEtNGQwMC1hYjRiLWNkZDAyNTEwYmU5MSIsImMiOjN9",
        },
        {
            label: "Team",
            href: "/team",
        },
    ],
    navMenuItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Page 1",
            href: "/page1",
        },
        {
            label: "Page 2",
            href: "/page2",
        },
        {
            label: "Team",
            href: "/team",
        },
    ],
    links: {
        github: "https://github.com/AbhasiSaikap/jimmy_johns",
    },
};
