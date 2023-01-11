import EventEmitter from "events";

import type { Store } from "./types";

const store: Store = {
  seconds: 0,
  fileSize: 0,
  status: "stopped",
};

const StoreEmitter = new EventEmitter();

const getStore = () => ({ ...store });

const setStore = (updater: (previousStore: Store) => Store) => {
  const { seconds, fileSize, status } = updater({ ...store });

  if (
    seconds !== store.seconds ||
    fileSize !== store.fileSize ||
    status !== store.status
  ) {
    store.seconds = seconds;
    store.fileSize = fileSize;
    store.status = status;

    StoreEmitter.emit("store_update");
  }
};

export { getStore, setStore, StoreEmitter };
