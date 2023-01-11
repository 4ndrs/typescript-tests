export interface Store {
  status: "stopped" | "running";
  seconds: number;
  fileSize: number;
}
