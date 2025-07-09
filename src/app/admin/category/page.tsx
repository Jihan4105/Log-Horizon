"use client";

import { useState, forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
  SortableTree
} from 'dnd-kit-sortable-tree';
import { MinimalTreeItemData } from '@/lib/types';
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

export default function CategoryManagementPage() {
  const initialTree = useRef<MinimalTreeItemData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef<number>(0);
  const [items, setItems] = useState<MinimalTreeItemData[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("")

  useEffect(() => {
    async function fetchData () {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        initialTree.current = data;
        nextId.current = data.length
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch category items:", error);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding])

  return (
    <>
      <h1 className="text-2xl font-bold">Category Management</h1>
      <p className='mb-6'>You can sort your categories with Drag n Drop</p>
      <div className='p-4 bg-gray-100 mb-4'>
        {items.length > 0 ? 
          <SortableTree
          items={items}
          onItemsChanged={setItems}
          TreeItemComponent={TreeItem}
          />
          :
          <Spinner />
        }
        <div className={clsx(
          "items-center justify-between w-full bg-white border-1 border-[#d2d2d2] p-2",
          {
            "flex": isAdding,
            "hidden": !isAdding
          }
        )}>
          <div className="flex items-center">
            <input
              ref={inputRef}
              id='newCategory'
              type='text'
              name='newCategory'
              className='outline-none border-1 border-[#d2d2d2] rounded-none'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={"outline"} 
              size={"sm"} 
              className="rounded-none border-[#d2d2d2] h-[24px] text-[12px]"
              onClick={() => {setIsAdding(false)}}
            >
              Cancel
            </Button>
            <Button 
              variant={"outline"} 
              size={"sm"} 
              className={clsx(
                "rounded-none border-[#d2d2d2] h-[24px] text-[12px]", 
                {
                  "cursor-not-allowed!": !newCategory.trim() || !items
                }
              )}
              disabled={!newCategory.trim() || !items}
              onClick={() => {
                setItems([
                  ...items,
                  {
                    id: nextId.current++,
                    value: newCategory.trim(),
                    parentId: null,
                  }
                ])
              }}
            >
              Submit
            </Button>
          </div>
        </div>
        <div 
          className="border-dotted border-1 mt-2 p-2.5 flex items-center cursor-pointer "
          onClick={() => {setIsAdding(true)}}
        >
          <GoPlus className="mr-0.5"/>
          Add New Category
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Button 
          className="border border-gray-300 rounded-none" 
          onClick={() => {onSubmit(items!)}}
          disabled={JSON.stringify(items) === JSON.stringify(initialTree.current)}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

async function onSubmit(items: MinimalTreeItemData[]) {
  let dbItems = []
  for (const item of items) {
    dbItems.push({
      id: item.id,
      value: item.value,
      parentId: item.parentId
    })
    if(item.children && item.children.length > 0) {
      for (const child of item.children) {
        dbItems.push({
          id: child.id,
          value: child.value,
          parentId: item.id
        })
      }
    }
  }
  dbItems.sort((prev, next) => prev.id - next.id)

  try {
    const result = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dbItems),
    });

    const data = await result.json();
    console.log("Categories updated successfully:", data);
  } catch(error) {
    console.error("Error updating categories:", error);
  }
}