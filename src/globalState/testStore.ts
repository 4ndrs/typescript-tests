import { getStore, setStore, StoreEmitter } from "./store";
import { registerKakeru } from "./testStore2";

const main = () => {
  StoreEmitter.on("store_update", onUpdate);
  registerKakeru();

  console.log(`Current store: ${JSON.stringify(getStore())}`);

  setStore(() => ({ seconds: 1, fileSize: 23, status: "running" }));
};

const onUpdate = () =>
  console.log(`Store Updated: ${JSON.stringify(getStore())}`);

main();
