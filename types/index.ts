import React from "react";

export interface childrenProps {
  children: React.ReactNode;
}
export type mode = "light" | "dark";
type Shades = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorShades = {
  [key in Shades]: string;
};

export interface TokenColors {
  background: string;
  surface: string;
  foreground: string;
  secondary: string;
  lightBlue: string;
  skyblue: string;
  cream: string;
  borderColor: string;
  active: string;
  white: string;
  indigo: ColorShades;
  green: ColorShades;
  red: ColorShades;
  text: string;
  textSecondary: string;
  card: string;
  black: string;
}
export interface IOpen {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface menuType {
  name: string;
  links: {
    name: string;
    icon: React.JSX.Element;
    info?: string;
    link: string;
  }[];
}

interface Fetched {
  _id: string;
  createdAt: string;
}
export interface UserBase {
  displayName: string;
  photoURL?: string;
  email: string;
  uid: string;
  admin: boolean;
  sessionCode?: string;
}

export interface User extends UserBase {}
export interface Worker extends UserBase {
  location: string;
}
export interface IWorkerFetched extends UserBase, Fetched {
  location: ILocationFetched;
}
export interface UserFetched extends User, Fetched {}
export interface Location {
  name: string;
}
export interface ILocationFetched extends Location, Fetched {}
export interface Admin {
  displayName: string;
  email: string;
  uid: string;
}
export type IGoogleLocation = {
  type: string;
  coordinates: number[];
};
export interface IBinBase {
  googleLocation: IGoogleLocation;
  level: number;
}
export interface IBin extends IBinBase {
  location: string;
}
export interface IBinFetched extends IBinBase, Fetched {
  name: string;
  location: ILocationFetched;
}
