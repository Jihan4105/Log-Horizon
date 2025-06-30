"use client";

import dynamic from "next/dynamic";
import { useState, forwardRef, useEffect } from 'react';
import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
  TreeItems,
  SortableTreeProps
} from 'dnd-kit-sortable-tree';
import { MinimalTreeItemData } from '@/lib/types';
const SortableTree = dynamic<SortableTreeProps>(
  () => import('dnd-kit-sortable-tree').then(mod => ({ default: mod.SortableTree })),
  { ssr: false }
)
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { GoPlus } from "react-icons/go";


const TreeItem = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
  return (
    <SimpleTreeItemWrapper {...props} ref={ref} className="*:bg-white group">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {props.item.children && props.item.children.length !== 0 && (
            <div className='mr-1 text-xs font-semibold'>({props.item.children!.length})</div>
          )}
          <div>{props.item.value}</div>
        </div>
        <div className="group-hover:flex hidden gap-2">
          <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2] h-[24px] text-[12px]">
            Edit
          </Button>
          {(props.item.children && props.item.children.length !== 0) ? (
            <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2] h-[24px] text-[12px] cursor-not-allowed!" disabled>
              Delete
            </Button>
          ) : (
            <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2] h-[24px] text-[12px]">
              Delete
            </Button>             
          )}
        </div>
      </div>
    </SimpleTreeItemWrapper>
  );
});
TreeItem.displayName = "TreeItem";


const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
  {
    id: 1,
    value: 'IT',
    children: [
      { id: 4, value: 'HTML' },
      { id: 5, value: 'SCSS' },
    ],
  },
  { id: 2, value: 'Writes', children: [{ id: 6, value: 'Novel' }] },
  { id: 3, value: 'News' },
];

export default function CategoryManagementPage() {
  const [items, setItems] = useState(initialViableMinimalData);
  const [isClinet, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold">Category Management</h1>
      <p className='mb-6'>You can sort your categories with Drag n Drop</p>
      <div className='p-4 bg-gray-100 mb-4'>
        {isClinet ? 
          <SortableTree
          items={items}
          onItemsChanged={setItems}
          TreeItemComponent={TreeItem}
          />
          :
          <Spinner />
        }
        <div className="border-dotted border-1 mt-2 p-2.5 flex items-center cursor-pointer ">
          <GoPlus className="mr-0.5"/>
          Add New Category
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Button className="border border-gray-300 rounded-none" disabled>Submit</Button>
      </div>
    </>
  );
}

