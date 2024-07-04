import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Dboard from '@/Components/Dboard';
import Nitem from '@/Components/NItem';
import Ncategory from '@/Components/Ncategory';
import Nlocation from '@/Components/Nlocation';
import Nemployee from '@/Components/Nemployee';
import Narchive from '@/Components/Narchive';
import Nreceiving from '@/Components/Nreceiving';
import Nbrand from '@/Components/Nbrand';
import SearchItem from '@/Components/SearchItem';
import DbitransparentLogo from '@/Components/DbitranparentLogo';
import Nclient from '@/Components/Nclient';
import Deliver from '@/Components/Deliver';
import Srequest from '@/Components/Srequest';
import Nuser from '@/Components/Nuser';

export default function Authenticated({ user, header, children,}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  
    return (
        <div className="min-h-screen flex bg-gray-200">
            <nav className="bg-main border-b border-gray-100">
                <div className="max-w-7xl  px-1 ">
                    <div className="">
                        <div className='flex flex-col'>
                            {/*Logo*/}
                            <div className="shrink-0 flex items-center p-1 mt-6 mb-12">
                            <NavLink href={route('dashboard')} >
                                    <DbitransparentLogo className="w-[32px] fill-current text-white" />
                                </NavLink>
                            </div>
                            <div className="items-center flex flex-col gap-2 space-y-5">

                                <div class="group relative">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <Dboard className="block h-9 w-auto fill-current " />
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Dashboard</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('item.index')} active={route().current('item.index')}>
                                    <Nitem className="block h-9 w-auto fill-current " /> 
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Items</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('category.index')} active={route().current('category.index')}>
                                   <Ncategory className="block h-9 w-auto fill-current " />
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Categories</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('brand.index')} active={route().current('brand.index')}>
                                    <Nbrand className="block h-9 w-auto fill-current " />
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Brands</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('location.index')} active={route().current('location.index')}>
                                    <Nlocation className="block h-9 w-auto fill-current " />
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Locations</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('employee.index')} active={route().current('employee.index')}>
                                    <Nemployee className="block h-9 w-auto fill-current " />
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Employees</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('client.index')} active={route().current('client.index')}>
                                    <Nclient className="block h-9 w-auto fill-current " /> 
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Clients</span>
                                </div>
                               
                                {(user.role === 'admin' || user.role === 'super_admin') && (
                                <div class="group relative">
                                <NavLink href={route('user.index')} active={route().current('user.index')}>
                                    <Nuser className="block h-9 w-auto fill-current " />
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">User</span>
                                </div>
                                      )}

                                {(user.role === 'admin' || user.role === 'super_admin') && (
                                <div class="group relative">
                                <NavLink href={route('archive.index')} active={route().current('archive.index')}>
                                    <Narchive className="block h-9 w-auto fill-current " />
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Trash</span>
                                </div>
                                
                                )}
                                  
                                   

                                <div class="group relative">
                                <NavLink href={route('receiving.index')} active={route().current('receiving.index')}>
                                    <Nreceiving className="block h-9 w-auto fill-current " /> 
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">MRR</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('deliverables.index')} active={route().current('deliverables.index')}>
                                    <Deliver className="block h-7 w-auto fill-current  " /> 
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">DR</span>
                                </div>
                               

                                <div class="group relative">
                                <NavLink href={route('stockrequisition.index')} active={route().current('stockrequisition.index')}>
                                    <Srequest className="block h-7 w-auto fill-current  " /> 
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Stock Requisition</span>
                                </div>
                               
                                {/* <div class="group relative">
                                <NavLink href={route('sritem.index')} active={route().current('sritem.index')}>
                                    <Srequest className="block h-7 w-auto fill-current  " /> 
                                </NavLink>
                                <span class="absolute z-10 top-0 left-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Stock Requisition Item</span>
                                </div> */}
                                
                                
                            </div>
                                      
                        <div>
                        <div className="-me-2 mt-3 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div> 
                        </div>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    
                    <div className="pt-2 pb-3 ml-10 space-y-1">

    
                         
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <DbitransparentLogo className="w-[32px] fill-current text-white" />
                        </ResponsiveNavLink>
                            
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <Dboard className="block h-9 w-auto fill-current " />
                        </ResponsiveNavLink>
                                <br />
                        <ResponsiveNavLink href={route('item.index')} active={route().current('item.index')}>
                                    <Nitem className="block h-9 w-auto fill-current " /> 
                        </ResponsiveNavLink>
                                <br />
                        <ResponsiveNavLink href={route('category.index')} active={route().current('category.index')}>
                                   <Ncategory className="block h-9 w-auto fill-current " />
                        </ResponsiveNavLink>
                                <br />
                        <ResponsiveNavLink href={route('brand.index')} active={route().current('brand.index')}>
                                    <Nbrand className="block h-9 w-auto fill-current " />
                        </ResponsiveNavLink>
                                <br />
                        <ResponsiveNavLink href={route('location.index')} active={route().current('location.index')}>
                                    <Nlocation className="block h-9 w-auto fill-current " />
                        </ResponsiveNavLink>
                                <br />
                        <ResponsiveNavLink href={route('employee.index')} active={route().current('employee.index')}>
                                    <Nemployee className="block h-9 w-auto fill-current " />
                        </ResponsiveNavLink>
                                <br />
                        <ResponsiveNavLink href={route('archive.index')} active={route().current('archive.index')}>
                                    <Narchive className="block h-9 w-auto fill-current " />
                        </ResponsiveNavLink>
                                <br />                
                        <ResponsiveNavLink href={route('receiving.index')}  active={route().current('receiving.index')}>
                                    <Nreceiving className="block h-9 w-auto fill-current " /> 
                        </ResponsiveNavLink>
                        <br />
                        <ResponsiveNavLink href={route('deliverables.index')} active={route().current('deliverables.index')}>
                                    <Deliver className="block h-7 w-auto fill-current  " /> 
                        </ResponsiveNavLink>
                        <br />
                        <ResponsiveNavLink href={route('stockrequisition.index')} active={route().current('stockrequisition.index')}>
                                    <Srequest className="block h-9 w-auto fill-current" />
                        </ResponsiveNavLink>

                        
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-100">{user.name}</div>
                            <div className="font-medium text-sm text-gray-300">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink className='text-white' href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink className='text-white' method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='w-full'>
            {header && (
                <header className="">
                    <div className="hidden sm:flex sm:items-center sm:ms-6 justify-end">
                        <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md  hover:text-gray-500 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                     
                    <div className="mx-auto py-2 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
            </div>

            
        </div>
    );
}
