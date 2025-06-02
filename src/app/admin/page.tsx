import { ChartAreaInteractive } from '@/components/chart-area'
import { DataTable } from '@/components/data-table'
import data from './data.json'
import React from 'react'

const page = () => {
  return (
    <div className=''>
       <div className="px-4 lg:px-6">
        <ChartAreaInteractive/>
      </div>
      <DataTable data={data} />
    </div>
  )
}

export default page