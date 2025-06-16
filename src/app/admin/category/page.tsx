"use client";

import { useState, forwardRef } from 'react';
import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
  TreeItems,
  SortableTree
} from 'dnd-kit-sortable-tree';
import { MinimalTreeItemData } from '@/lib/types';

/*
 * Here's the component that will render a single row of your tree
 */
const TreeItem = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
  return (
    <SimpleTreeItemWrapper {...props} ref={ref}>
      {props.item.children?.length !== 0 && ( <div className='mr-1 text-xs font-semibold'>({props.item.children!.length})</div>)}
      <div>{props.item.value}</div>
    </SimpleTreeItemWrapper>
  );
});
TreeItem.displayName = "TreeItem";



/*
 * Configure the tree data.
 */
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

  return (
    <>
      <h1 className="text-2xl font-bold">Category Management</h1>
      <p className='mb-6'>You can sort your categories with Drag n Drop</p>
      <div className='border-[#d2d2d2] p-4 border-1'>
        <SortableTree
          items={items}
          onItemsChanged={setItems}
          TreeItemComponent={TreeItem}
        />
      </div>
      
    </>
  );
}

