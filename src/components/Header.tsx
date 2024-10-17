import React, { useState, useEffect } from 'react';
import { useLocation, } from 'react-router-dom'
//import './Header.css';
// import { assets } from '../assets';

//tailwind template

import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]






const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    // const [dropdownOpen, setDropdownOpen] = useState(false);

    //const [showMenu, setShowMenu] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        console.log(pathname);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };


    }, []);

    // const toggleDropdown = () => {
    //     setDropdownOpen(!dropdownOpen);
    // };

    let navbarClasses = ['navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    return (
        // <header className={pathname == "/" ? "header-fixed" : "header-scrolled"}>

        //     <nav className={navbarClasses.join(' ')}>
        //         <div className='header-atas-container'>
        //             <div className="logoheader">
        //                 <img src={assets.logotanggamus} alt="" className="logo-image" />
        //                 <div className="logo-header-atas">
        //                     <div>DINAS LINGKUNGAN HIDUP</div>
        //                     <div>KABUPATEN TANGGAMUS</div>
        //                 </div>
        //                 <img src={assets.logohutan} alt="" className="logo-image2" />
        //             </div>
        //             <div className="navheader">
        //                 <ul className="nav-links">
        //                     <li><a href="/">Home</a></li>
        //                     <li><a href="/profile">Profile</a></li>
        //                     <li className="dropdown">
        //                         <a href="#Gallery" onClick={toggleDropdown}> Berita <i className="fa-solid fa-caret-down"></i></a>
        //                         {dropdownOpen && (
        //                             <ul className="dropdown-menu">
        //                                 <li><a href="/berita/type/ARTIKEL">Artikel</a></li>
        //                                 <li><a href="/berita/type/AKTIVITAS">Aktivitas</a></li>
        //                                 <li><a href="/berita/type/BERITA">Berita</a></li>
        //                             </ul>
        //                         )}
        //                     </li>
        //                     <li><a href="/announcement">Pengumuman</a></li>
        //                     <li className="dropdown">
        //                         <a href="#documents" onClick={toggleDropdown}>Dokumen <i className="fa-solid fa-caret-down"></i></a>
        //                         {dropdownOpen && (
        //                             <ul className="dropdown-menu">
        //                                 <li><a href="/document/Perencanaan">Dokumen Perencanaan</a></li>
        //                                 <li><a href="/document/Inovasi">Inovasi</a></li>
        //                                 <li><a href="/document/Persampahan">Persampahan</a></li>
        //                                 <li><a href="/document/Pengaduan">Pengaduan Pencemaran dan Kerusakan Lingkungan</a></li>
        //                                 <li><a href="/document/Pengawasan">Pengawasan Lingkungan</a></li>
        //                                 <li><a href="/document/Pengendalian">Pengendalian Pencemaran dan Kerusakan Lingkungan</a></li>
        //                             </ul>
        //                         )}
        //                     </li>
        //                     <li className="dropdown">
        //                         <a href="#Gallery" onClick={toggleDropdown}>Gallery <i className="fa-solid fa-caret-down"></i></a>
        //                         {dropdownOpen && (
        //                             <ul className="dropdown-menu">
        //                                 <li><a href="/media/image">Foto</a></li>
        //                                 <li><a href="/media/video">Video</a></li>
        //                             </ul>
        //                         )}
        //                     </li>
        //                     <li><a href="/pengaduan"> Kontak</a></li>
        //                 </ul>

        //             </div>

        //         </div>

        //     </nav>

        // </header>


        <header className="bg-transparent z-50 fixed w-full ">

            <nav aria-label="Global" className=" mx-auto  flex  items-center justify-between w-full p-2 lg:px-1">
                
            </nav>
            
            <nav aria-label="Global" className="mx-auto flex items-center justify-between w-full p-10 lg:px-1 text-white text-shadow-default">

                <div className="flex lg:flex-1 ml-20">
                    <a href="#" className=" -mx-1.1  text-4xl font-semibold leading-6 ">
                        <span className="sr-only">Your Company</span>
                        {/* <img
                            alt=""
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        /> */}

                        <h1> NGO - TANGGAMUS</h1>
                    </a>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <PopoverGroup className=" hidden lg:flex lg:gap-x-16">
                    <a href="/" className="text-2xl font-semibold leading-6 ">
                        Home
                    </a>

                    <a href="/profile" className="text-2xl font-semibold leading-6 ">
                        Profile
                    </a>

                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-2xl font-semibold leading-6 ">
                            Ruang Informasi
                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none " />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4">
                                {products.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-2xl leading-6 hover:bg-gray-50"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                        </div>
                                        <div className="flex-auto">
                                            <a href={item.href} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </a>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center justify-center gap-x-2.5 p-3 text-2xl font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                    >
                                        <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover>
                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-2xl font-semibold leading-6 ">
                            NGO
                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4">
                                {products.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-2xl leading-6 hover:bg-gray-50"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                        </div>
                                        <div className="flex-auto">
                                            <a href={item.href} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </a>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center justify-center gap-x-2.5 p-3 text-2xl font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                    >
                                        <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover>

                    <a href="#" className="text-2xl font-semibold leading-6 ">
                        Kontak
                    </a>
                </PopoverGroup>


                <div className="hidden lg:flex lg:flex-1 lg:justify-end mr-12">
                    <a href="/login" className="text-2xl font-semibold leading-6 ">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>

                
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Product
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products, ...callsToAction].map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>

    );
};

export default Header;

