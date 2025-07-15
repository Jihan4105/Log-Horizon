"use client";

import React, { useState, forwardRef, useEffect, useRef, useContext } from 'react';
import clsx from 'clsx';
import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
  SortableTree
} from 'dnd-kit-sortable-tree';
import { MinimalTreeItemData, CategoryTreeData } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast, Toaster } from 'sonner';

import { GoPlus } from "react-icons/go";

import { SetItemsContext } from '@/lib/contexts/SetItemsContext';


const TreeItem = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editValue, setEditValue] = useState<string>(props.item.value)
  const setItems = useContext(SetItemsContext)

  useEffect(() => {
    if(isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    setEditValue(props.item.value);
  }, [props.item.value]);

  return (
    <SimpleTreeItemWrapper {...props} ref={ref} className="*:bg-white group">
      <div className="flex items-center justify-between w-full">
        {isEditing ?
          <input 
            ref={inputRef}
            id='editInput'
            value={editValue}
            onChange={(e) => {setEditValue(e.target.value)}}
            className='outline-none border-1 border-[#d2d2d2] rounded-none'
          />
          :
          <div className="flex items-center">
            {props.item.children && props.item.children.length !== 0 && (
              <div className='mr-1 text-xs font-semibold'>({props.item.children!.length})</div>
            )}
            <div>{props.item.value}</div>
          </div>
        }
        {isEditing ? 
          <div className="flex gap-2">
            <Button 
              variant={"outline"} 
              size={"sm"} 
              className="rounded-none border-[#d2d2d2] h-[24px] text-[12px]"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false); 
                setEditValue(props.item.value)
              }}
            >
              Cancel
            </Button>
            <Button 
              variant={"outline"} 
              size={"sm"} 
              className={clsx(
                "rounded-none border-[#d2d2d2] h-[24px] text-[12px]", 
                {
                  "cursor-not-allowed!": !editValue.trim() || !editValue
                }
              )}
              disabled={!editValue.trim() || !editValue}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setItems(prevItems => updateTreeValue(prevItems, props.item.id, editValue))
                setIsEditing(false);
              }}
            >
              Submit
            </Button>
          </div>
          :
          <div className="group-hover:flex hidden gap-2">
            <Button 
              variant={"outline"} 
              size={"sm"} 
              className="rounded-none border-[#d2d2d2] h-[24px] text-[12px]" 
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
            >
              Edit
            </Button>
            {(props.item.children && props.item.children.length !== 0) ? (
              <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2] h-[24px] text-[12px] cursor-not-allowed!" disabled>
                Delete
              </Button>
            ) : (
              <Button 
                variant={"outline"} 
                size={"sm"} 
                className="rounded-none border-[#d2d2d2] h-[24px] text-[12px]"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  setItems((prevItems) => {
                    const updated = updateTreeValue(prevItems, props.item.id)
                    return updated
                  })
                }}
              >
                Delete
              </Button>             
            )}
          </div>
        }
      </div>
    </SimpleTreeItemWrapper>
  );
});
TreeItem.displayName = "TreeItem";

export default function CategoryManagementPage() {
  const initialTree = useRef<MinimalTreeItemData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MinimalTreeItemData[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData () {
      try {
        const res = await fetch("/api/admin/category");
        const data = await res.json();
        initialTree.current = data;
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

  useEffect(() => {
    if (isUpdating) {
      onSubmit(items, setIsUpdating, initialTree);
    }
  }, [isUpdating, items]);
  
  return (
    <>
      <h1 className="text-2xl font-bold">Category Management</h1>
      <p className='mb-6'>You can sort your categories with Drag n Drop</p>
      <div className='p-4 bg-gray-100 mb-4'>
        {items.length > 0 ?
          <SetItemsContext.Provider value={setItems}>
            <SortableTree
              items={items}
              onItemsChanged={setItems}
              TreeItemComponent={TreeItem}
            />
          </SetItemsContext.Provider>
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
                const newId = findAvailableId(items);
                setIsAdding(false)
                setNewCategory("")
                setItems([
                  ...items,
                  {
                    id: newId,
                    value: newCategory.trim(),
                    children: []
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
          onClick={() => {
            setIsUpdating(true);
          }}
          disabled={JSON.stringify(items) === JSON.stringify(initialTree.current) || isUpdating}
        >
          {isUpdating ? 
            <Spinner size={20} /> 
            : 
            "Save Changes"
          }
        </Button>
        <Toaster />
      </div>
    </>
  );
}

async function onSubmit(
  items: MinimalTreeItemData[], 
  setIsUpdating: (loading: boolean) => void,
  initialTree: React.RefObject<MinimalTreeItemData[]>
) {
  let dbItems: CategoryTreeData[] = []
  arrayRecursiveFunc(dbItems, items, null)
  dbItems.sort((prev, next) => prev.id - next.id)

  try {
    const result = await fetch("/api/admin/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dbItems),
    });
    const data = await result.json();
    console.log(data.newItemsTree)
    initialTree.current = data.newItemsTree
    console.log("Categories updated successfully:", data);
    toast.success("Categories updated successfully!");
    setIsUpdating(false);
  } catch(error) {
    console.error("Error updating categories:", error);
    toast.error("Something went wrong while updating categories...");
    setIsUpdating(false);
  }
}

function arrayRecursiveFunc(dbItems: object[], children: MinimalTreeItemData[], parentId: number | null) {
  for (const child of children) {
    dbItems.push({
      id: child.id,
      value: child.value,
      parentId: parentId
    })
    if(child.children && child.children.length > 0) {
      arrayRecursiveFunc(dbItems, child.children, child.id)
    }
  }
}

function updateTreeValue(
  items: MinimalTreeItemData[], 
  id: number, 
  newValue?: string
): MinimalTreeItemData[] {
  return items
    .filter(item => {
      if (newValue === undefined && item.id === id) {
        return false; // 제거
      }
      return true; // 유지
    }) 
    .map(item => {
      const updatedChildren = item.children
        ? updateTreeValue(item.children, id, newValue)
        : [];

      if (item.id === id && newValue) {
        return {
          ...item,
          value: newValue,
          children: updatedChildren
        };
      }

      return {
        ...item,
        children: updatedChildren
      };
    });
}

function findAvailableId(items: MinimalTreeItemData[]): number {
  const existingIds = new Set<number>();

  function traverse(nodes: MinimalTreeItemData[]) {
    for (const node of nodes) {
      existingIds.add(node.id);
      if (node.children) traverse(node.children);
    }
  }

  traverse(items);

  let id = 1;
  while (existingIds.has(id)) {
    id++;
  }
  return id;
}