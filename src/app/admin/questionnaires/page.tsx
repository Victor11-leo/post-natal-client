import { QuestionnairesDataTable } from '@/components/questionnaires-table'
import { Button } from '@/components/ui/button'
import { db } from '@/db/config'
import { questionnaires } from '@/db/schema'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const res = await db.select().from(questionnaires)
  console.log(res);
  return (
    <div>
      <Link href='/admin/questionnaires/new'>
        <Button><PlusIcon/> Questionnaire</Button>
      </Link>
      {/* <QuestionnairesDataTable questionnaires={res}/> */}
    </div>
  )
}

export default page