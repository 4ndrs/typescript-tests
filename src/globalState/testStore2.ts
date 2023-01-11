import { StoreEmitter } from "./store";

const registerKakeru = () =>
  StoreEmitter.on("store_update", () => console.log("K A K E R U N O M I C S"));

export { registerKakeru };
