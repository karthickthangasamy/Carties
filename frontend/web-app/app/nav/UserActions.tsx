'use client'

import { Button, Dropdown } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi'

type Props = {
  user: Partial<User>
}
export default function UserActions({user}:Props) {
  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={HiUser}>
        <Link href='/'>
        My Auctions
        </Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href='/'>
        Auctions Won
        </Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href='/'>
        Sell My Car
        </Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href='/session'>
        Session (dev only)
        </Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({callbackUrl: '/'})}>
        <Link href='/'>
        Logout
        </Link>
      </Dropdown.Item>
    </Dropdown>
  )
}
