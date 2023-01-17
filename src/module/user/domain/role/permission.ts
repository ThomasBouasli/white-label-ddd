import { Entity } from '@thomasbouasli/ddd-utils';

type PermissionMethod = 'READ' | 'UPDATE' | 'CREATE' | 'DELETE' | 'ALL';

interface PermissionProps {
  method: PermissionMethod;
  resource: string;
}

export class Permission extends Entity<PermissionProps> {
  private static validate(permission: string) {
    const [method, resource] = permission.split(':');
    if (!method || !resource) {
      throw new Error('Invalid permission');
    }

    if (!['READ', 'UPDATE', 'CREATE', 'DELETE', 'ALL'].includes(method)) {
      throw new Error('Invalid permission');
    }

    return { method, resource } as PermissionProps;
  }

  public static create(props: PermissionProps): Permission;
  public static create(props: string, id: string): Permission;
  public static create(
    props: PermissionProps | string,
    id?: string,
  ): Permission {
    if (typeof props === 'string') {
      if (!id) {
        throw new Error('Permission id is required');
      }

      const permission = this.validate(props);

      return new Permission(permission, id);
    }

    return new Permission(props);
  }

  get method(): PermissionMethod {
    return this.props.method;
  }

  get resource(): string {
    return this.props.resource;
  }

  get value(): string {
    return `${this.props.method}:${this.props.resource}`;
  }
}
