"use client";

import { useState, forwardRef } from 'react';
import {
  SimpleTreeItemWrapper,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree';
import { MinimalTreeItemData } from '@/lib/types';

import dynamic from "next/dynamic";
const SortableTree = dynamic(
  () => import("dnd-kit-sortable-tree").then(mod => mod.SortableTree),
  { ssr: false }
);

export default function CategoryManagementPage() {
  const [items, setItems] = useState(initialViableMinimalData);

  return (
    <SortableTree
      items={items}
      onItemsChanged={setItems}
      TreeItemComponent={TreeItem}
    />
  );
}
/*
 * Here's the component that will render a single row of your tree
 */
const TreeItem = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
  const [sample, setSample] = useState('');
  return (
    <SimpleTreeItemWrapper {...props} ref={ref}>
      <div>{props.item.value}</div>
      <input
        value={sample}
        onChange={(e) => {
          setSample(e.target.value);
        }}
      ></input>
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
    value: 'Jane',
    children: [
      { id: 4, value: 'John' },
      { id: 5, value: 'Sally' },
    ],
  },
  { id: 2, value: 'Fred', children: [{ id: 6, value: 'Eugene' }] },
  { id: 3, value: 'Helen' },
];

