import { ImageLoaderProps } from "next/image";

export const PRELOADED_IMAGE_ID_LIST: string[] = [
  "1652449823136-b279fbe5dfd3",
  "1700750368493-c8068fe41241",
  "1704419278774-fa691a032632",
  "1706556947331-fdf601952996",
  "1706634078435-04c2d59b068d",
  "1706818033048-a580b4c11bf8",
  "1707070530153-900edd663877",
  "1707377459990-c22b7f14a06a",
  "1707575107081-3e98617da25d",
  "1707833558984-3293e794031c",
];

export const imageLoader = (props: ImageLoaderProps) => {
  return `https://images.unsplash.com/photo-${props.src}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzE4OTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDg5NTc0Mzl8&ixlib=rb-4.0.3&q=${props.quality}&w=${props.width}`;
};
