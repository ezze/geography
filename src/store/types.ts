export interface Store {
  init(): Promise<void>;
  dispose(): Promise<void>;
}
