"use client";

import { useId } from "react";
import { BikeArt, type BikeArtProps } from "./BikeArt";

/** The ride's bike, with Sahil on it (and the visitor, from ignition). See BikeArt for the drawing. */
export function Bike(props: Omit<BikeArtProps, "idPrefix">) {
  return <BikeArt idPrefix={useId().replace(/:/g, "")} {...props} />;
}
