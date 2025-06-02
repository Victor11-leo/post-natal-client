
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { db } from '@/db/config'
import { articles } from '@/db/schema'
import { Checkbox } from '@radix-ui/react-checkbox'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const articlesRes = await db.select().from(articles)  
  return (
    <div>
      <Link href='/admin/articles/new'>
        <Button><PlusIcon/> Article</Button>
      </Link>
      <section className='pt-4'>
        
          <Card>
            <Table>
              <TableHeader>
                <TableRow>                  
                  <TableHead className="w-10">Title</TableHead>                                                                  
                  <TableHead>Views</TableHead>
                  <TableHead className='w-12'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articlesRes.map(({title,id,featuredImage,excerpt,tags}) => (
                  <TableRow key={id}>
                     <TableCell className=''>
                      <div className="flex items-center gap-3 ">
                        {featuredImage && (
                          <img
                            src={featuredImage || "/placeholder.svg"}
                            alt={title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div className='w-[50%] overflow-ellipsis'>
                          <div className="font-medium">{title}</div>
                          <div className="text-sm overflow-ellipsis text-muted-foreground line-clamp-1">{excerpt}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>
                      <Link href={`/admin/articles/${id}`}>
                        <Button>Manage</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
          </Card>
        
      </section>
    </div>
  )
}

export default page