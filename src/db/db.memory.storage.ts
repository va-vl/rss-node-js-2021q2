import {
  DataCorruptedError,
  EntityNotFoundError,
  InvalidOperationError,
} from '../errors';

interface EntityType {
  id: string;
}

interface PropType {
  id?: string;
}

class DBStorage<T extends EntityType, P extends PropType> {
  private entityName: string;
  store: T[] = [];

  constructor(name: string) {
    this.entityName = name;
  }

  getAll(): T[] {
    return [...this.store];
  }

  getAllById(id: string): T[] {
    const items = this.store.filter((item) => item.id === id);

    if (items.length > 1) {
      throw new DataCorruptedError(this.entityName, id);
    }

    return items;
  }

  getById(id: string): T {
    const items = this.getAllById(id);

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

  // TODO: fix props type to Props of some sort
  update(id: string, props: P): T {
    const existingEntities = this.getAllById(id);

    if (existingEntities[0] === undefined) {
      throw new InvalidOperationError(this.entityName, id, 'Update');
    }

    return Object.assign(existingEntities[0], { ...props });
  }

  remove(id: string): void {
    const existingEntities = this.getAllById(id);

    if (existingEntities[0] === undefined) {
      throw new InvalidOperationError(this.entityName, id, 'Remove');
    }

    this.store = this.store.filter((item) => item !== existingEntities[0]);
  }
}

export default DBStorage;
