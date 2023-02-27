export interface RepositoryInterface<
  T extends { id: string; [key: string | symbol]: any },
> {
  selectById(id: T["id"]): Promise<T | T[]>;
  selectAll?(): Promise<T[]>;
  insert(data: T): Promise<T | T[]>;
  upsert(data: T): Promise<T | T[]>;
  remove(id: T["id"]): Promise<void>;
}
