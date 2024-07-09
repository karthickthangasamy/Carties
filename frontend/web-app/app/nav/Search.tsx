'use client';

import { useParamsStore } from '@/hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation';
import React, { use, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search() {

  const router = useRouter();
  const pathName = usePathname();

  const setParams = useParamsStore((state) => state.setParams);
  // const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useParamsStore((state) => [state.searchValue, state.setSearchValue]);

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    if (pathName !== '/') {
      router.push('/');
    }
    setParams({searchTerm: searchValue});
  }
  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
      <input type='text' placeholder='Search for cars by make, model or color' onChange={onChange} 
        onKeyDown={(e) => e.key === 'Enter' && search()}
        value={searchValue}
        className='flex-grow pl-5 bg-transparent focus:outline-none focus:border-transparent border-transparent focus:ring-0 text-sm text-gray-600' />
      <button onClick={search}>
        <FaSearch size={34} className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'/>
      </button>
    </div>
  )
}
