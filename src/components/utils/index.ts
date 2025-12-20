import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertInputDate(date: string) {
  const [ano, mes, dia] = date.split("-");
  return `${dia}/${mes}/${ano}`;
}
