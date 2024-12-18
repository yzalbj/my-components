// import React, { useCallback } from "react";
// import { ImageInput, ImagePreview } from "./image";
// import { Button } from "@/components/ui/button";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   horizontalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
// import { CSS } from "@dnd-kit/utilities";
// import { v4 as uuid } from "uuid";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Grip, Plus } from "lucide-react";
// import { useSingleImageInput } from "./single-image";

// type RequiredImageSrc = File | string
// type ImageSrc = RequiredImageSrc | undefined

// type CarouselImage = {
//   id: string
//   src?: ImageSrc
//   alt_text?: string
//   display_order: number
// }

// type CarouselProps = {
//   field: {
//     value: CarouselImage[]
//     onChange: (value: CarouselImage[]) => void
//   }
// }

// interface SortableImageProps {
//   image: CarouselImage;
//   onRemove: (id: string) => void;
//   onChange: (id: string, newImage: File) => void;
// }

// const SortableImage = ({ image, onRemove, onChange }: SortableImageProps) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: image.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const { imageSrc, imageInputRef, onInputChange } =
//     useSingleImageInput({
//       src: image.src,
//       onFileChange: (file) => onChange(image.id, file),
//     });

//   return (
//     <>
//       <ImageInput imageInputRef={imageInputRef} onInputChange={onInputChange} />

//       {image.display_order === 0 && !imageSrc && (
//         <div className="flex flex-col items-center gap-x-4 justify-center h-full text-gray-500 w-full">
//           <span>No images added yet.</span>
//           <Button
//             variant="ghost"
//             onClick={(e) => {
//               e.preventDefault();
//               imageInputRef.current?.click();
//             }}
//           >
//             → Add more images
//           </Button>
//         </div>
//       )}
//       {image.display_order > 0 && !imageSrc && (
//         <Button
//           onClick={(e) => {
//             e.preventDefault();
//             imageInputRef.current?.click();
//           }}
//           className="flex items-center justify-center p-2 rounded-md border border-gray-200 hover:bg-gray-300 transition-colors hover:text-background hover:border-gray-300"
//           variant="ghost"
//           size="icon"
//         >
//           <Plus className="h-4 w-4" />
//         </Button>
//       )}
//       {imageSrc && (
//         <div
//           ref={setNodeRef}
//           style={style}
//           className="flex-shrink-0 w-[150px] mr-4"
//         >
//           <ImagePreview
//             onLoadImage={() => imageInputRef.current?.click()}
//             src={imageSrc}
//             width={150}
//             height={150}
//             onRemove={() => onRemove(image.id)}
//             dragHandle={
//               <div
//                 {...attributes}
//                 {...listeners}
//                 className="cursor-move mb-2 bg-slate-900/40 p-2 rounded-sm"
//               >
//                 <Grip />
//               </div>
//             }
//           />
//         </div>
//       )}
//     </>
//   );
// };


// export const CarouselField = ({ field }: CarouselProps) => {
//   const images = field.value;
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const onCarouselChange = useCallback((imgs: CarouselImage[]) => {
//     field.onChange(imgs);
//   }, [field.onChange]);

//   const handleImageChange = useCallback((id: string, newFile: File): void => {
//     const index = images.findIndex((i) => i.id === id);
//     if (index == images.length - 1)
//       images.push({
//         id: uuid(),
//         display_order: images.length,
//         src: undefined,
//         alt_text: "",
//       });
//     images[index].src = newFile;

//     onCarouselChange(images);
//   }, [onCarouselChange, images]);

//   const handleRemoveImage = useCallback((id: string): void => {
//     const imgIndex = images.findIndex(img => img.id === id)
//     images.splice(imgIndex, 1)

//     resetDisplayOrder(images)
//     onCarouselChange(images);
//   }, [onCarouselChange, images]);

//   const handleDragEnd = useCallback((event: DragEndEvent): void => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const oldIndex = images.findIndex((i) => i.id === active.id);
//       const newIndex = images.findIndex((i) => i.id === over?.id);

//       arrayMove(images, oldIndex, newIndex)
//       resetDisplayOrder(images)
//       onCarouselChange(images);
//     }
//   }, [onCarouselChange, images]);


//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//       modifiers={[restrictToHorizontalAxis]}
//     >
//       <SortableContext
//         items={images.map((v) => v.id)}
//         strategy={horizontalListSortingStrategy}
//       >
//         <ScrollArea className="w-full">
//           <div className="flex w-full items-center">
//             {images.map((image) => (
//               <SortableImage
//                 key={image.id}
//                 image={image}
//                 onRemove={handleRemoveImage}
//                 onChange={handleImageChange}
//               />
//             ))}
//           </div>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//       </SortableContext>
//     </DndContext>
//   );
// };

// const arrayMove = (arr: any[], oldIndex: number, newIndex: number) => {
//   if (newIndex > oldIndex) {
//     for (let i = oldIndex; i < newIndex; i++) {
//       const tmp = arr[i];
//       arr[i] = arr[i + 1];
//       arr[i + 1] = tmp;
//     }
//   } else if (newIndex < oldIndex) {
//     for (let i = oldIndex; i > newIndex; i--) {
//       const tmp = arr[i];
//       arr[i] = arr[i - 1];
//       arr[i - 1] = tmp;
//     }
//   }
// }

// const resetDisplayOrder = (arr: {display_order: number}[]) => {
//   let index = 0;
//   for (let item of arr) {
//     item.display_order = index
//     index++;
//   }
// }