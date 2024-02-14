import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import DashboardSvg from "./svgs/dashbard";
import { Typography } from "@mui/material";
import SideBarButton from "./svgs/sidebar_button";
import ProfessionSvg from "./svgs/professions";
import RoleSvg from "./svgs/role";
import ContractorSvg from "./svgs/contractors";
import ConsultantSvg from "./svgs/consultant";
import ClientSvg from "./svgs/client";
import SupplierSvg from "./svgs/supplier";
import SupplierTypes from "./svgs/types_svg";
import CategoriesSvg from "./svgs/categories_svg";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}
interface SidebarLinks {
    link: string;
    name: string;
    icon: any;
}
const sidebarLinks: SidebarLinks[] = [
    {
        link: "/",
        name: "Dashboard",
        icon: <DashboardSvg />
    }, {
        link: "/professions",
        name: "Professions",
        icon: <ProfessionSvg />
    }, {
        link: "/roles",
        name: "Roles",
        icon: <RoleSvg />
    }, {
        link: "/contractors",
        name: "Contractors",
        icon: <ContractorSvg />
    }, {
        link: "/consultants",
        name: "Consultants",
        icon: <ConsultantSvg />
    }, {
        link: "/clients",
        name: "Clients",
        icon: <ClientSvg />
    }, {
        link: "/suppliers",
        name: "Suppliers",
        icon: <SupplierSvg />
    }, {
        link: "/supplier_types",
        name: "Supplier Types",
        icon: <SupplierTypes />
    }, {
        link: "/categories",
        name: "Categories",
        icon: <CategoriesSvg />
    }
];
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    let storedSidebarExpanded = "true";
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 pt-5.5 lg:pt-6.5">
                <Link href="/">
                    <Typography variant="h4" className="text-white">BuildUp</Typography>
                </Link>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <SideBarButton />
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Dashboard --> */}
                            {
                                sidebarLinks.map((link, index) => {
                                    return (<li key={index}>
                                        <Link
                                            href={link.link}
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === link.link || pathname.includes(link.link)) &&
                                                "bg-graydark dark:bg-meta-4"
                                                }`}
                                        >
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    </li>)
                                })
                            }
                            {/* <!-- Menu Item Dashboard --> */}
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
