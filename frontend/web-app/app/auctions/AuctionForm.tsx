'use client'

import { Button, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { create } from 'domain';
import { createAuction, updateAuction } from '../actions/auctionActions';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Auction } from '@/types';

type Props = {
  auction?: Auction
}

export default function AuctionForm({auction}: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const {control, handleSubmit, setFocus, reset, formState: {
    errors,
    isSubmitting,
    isSubmitSuccessful,
    isDirty,
    isValid  
  }} = useForm({
    mode: 'onTouched',
  });

  useEffect(() => {
    if(auction) {
      const { make, model, color, year, mileage } = auction;
      reset({ make, model, color, year, mileage });
    }
    setFocus('make');
  }, [auction, reset, setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      let id= '';
      let res;
      if(pathName === '/auctions/create'){
        res = await createAuction(data);  
        id = res.id;
      } else {
        //update
        res = await updateAuction(data, auction?.id || '');
        id = auction?.id || '';
      }
      if(res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error:any) {
      toast.error(`${error.status}  ${error.message}`);
    }
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>      
        <Input name='make' label='Make' control={control} rules={{required: 'Make is required'}}/>        
        <Input name='model' label='Model'control={control} rules={{required: 'Model is required'}}/>
        <Input name='color' label='Color' control={control} rules={{required: 'Color is required'}}/>

        <div className='grid grid-cols-2 gap-3'>
            <Input name='year' label='Year' control={control} type='number' rules={{required: 'Year is required'}}/>
            <Input name='mileage' label='Mileage' control={control} type='number' rules={{required: 'Mileage is required'}}/>
        </div>

        {pathName === '/auctions/create' && 
        <>
        <Input name='imageUrl' label='Image Url' control={control} rules={{required: 'Color is required'}}/>


        <div className='grid grid-cols-2 gap-3'>
          <Input name='reservePrice' label='Reservice Price (enter 0 is no reserve)' control={control} type='number' rules={{required: 'Reserve price is required'}}/>
          <DateInput name='auctionEnd' label='Auction end date/time' control={control}  showTimeSelect dateFormat="dd MMMM yyyy h:mm a"          
          rules={{required: 'Auction End date is required'}}/>
        </div>

        </>}

          


      <div className="flex justify-between">
        <Button outline color="gray">Cancel</Button>
        <Button outline color="success" type="submit" isProcessing={isSubmitting} 
        >Submit</Button>
      </div>
    </form>
  );
}
