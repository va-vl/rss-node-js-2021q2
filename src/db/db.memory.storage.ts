import { DataCorruptedError, EntityNotFoundError } from '../errors';

class DBStorage<T extends { id: string }> {
  store: T[] = [];
  private entityName: string;

  constructor(name: string) {
    this.entityName = name;
  }

  getAll(): T[] {
    return [...this.store];
  }

  getById(id: string): T {
    const items = this.getAllById(id);

    if (items.length > 1) {
      throw new DataCorruptedError(this.entityName, id);
    }

    if (items[0] === undefined) {
      throw new EntityNotFoundError(this.entityName, id);
    }

    return items[0];
  }

  add(entity: T): T {
    if (entity.id !== undefined && typeof entity.id === 'string') {
      const existingEntities = this.getAllById(entity.id);

      if (existingEntities.length > 0) {
        throw new DataCorruptedError(this.entityName, entity.id);
      }
    }

    this.store.push(entity);
    return this.getById(entity.id);
  }

  remove(entity: T): void {
    this.store = this.store.filter((item) => item !== entity);
  }

  private getAllById(id: string): T[] {
    return this.store.filter((item) => item.id === id);
  }
}

export default DBStorage;
