"use client";

import { startTransition, useOptimistic } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

const categories = [
  { id: "1", name: "IT" },
  { id: "2", name: "HTML" },
  { id: "3", name: "GYM" },
  { id: "4", name: "Book" },
  { id: "5", name: "Corps" },
];

export default function CategoryManagementPage() {

  const [optimisticState, swapOptimistic] = useOptimistic(
    categories,
    (state, { sourceCategoryId, destinationCategoryId }) => {
      const sourceIndex = state.findIndex(
        (category) => category.id === sourceCategoryId
      )
      const destinationIndex = state.findIndex(
        (category) => category.id === destinationCategoryId
      )
      const newState = [...state];
      newState[sourceIndex] = state[destinationIndex];
      newState[destinationIndex] = state[sourceIndex];
      return newState;
    }
  );

  const onDragEnd = async (result: any) => {
    const sourceCategoryId = result.draggableId;
    const destinationCategoryId = categories[result.destination?.index].id;
    startTransition(() => {
      swapOptimistic({ sourceCategoryId, destinationCategoryId });
      // Here you would typically make an API call to update the order in the backend
      // For example:
      // await updateCategoryOrder(sourceCategoryId, destinationCategoryId);
      console.log("Order updated:", sourceCategoryId, destinationCategoryId);
    });
  }

  return (
    <div className="mt-3">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <p className="text-gray-600">This page is under construction.</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"categories"}>
          {(droppableProvided) => (
            <ul
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className="flex-grow flex flex-col"
            >
              {optimisticState.map((category, index) => {
                return (
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex gap-4 items-center">
                          <button
                            {...provided.dragHandleProps}
                            className="text-gray-500 hover:text-gray-700 cursor-grab">
                              <GripVertical className="text-neutral-500" size={20}/>
                            </button>
                            <div>
                              Category {index + 1}: <i>{category.name}</i>
                            </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}