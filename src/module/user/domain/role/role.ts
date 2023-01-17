import { AggregateRoot, WatchedList } from '@thomasbouasli/ddd-utils';

import { Permission } from './permission';

interface RoleProps {
  name: string;
  permissions: WatchedPermissionList;
}

interface CreateRoleProps {
  name: string;
  permissions: Permission[];
}

class WatchedPermissionList extends WatchedList<Permission> {
  public static create(initial: Permission[]): WatchedList<Permission> {
    return new WatchedPermissionList(initial);
  }

  compareItems(a: Permission, b: Permission): boolean {
    return a.equals(b);
  }
}

export class Role extends AggregateRoot<RoleProps> {
  get name(): string {
    return this.props.name;
  }

  get permissions(): Permission[] {
    return this.props.permissions.currentItems;
  }

  public addPermission(permission: Permission): void {
    this.props.permissions.add(permission);
  }

  public removePermission(permission: Permission): void {
    this.props.permissions.remove(permission);
  }

  public getPermissionsList(): WatchedPermissionList {
    return this.props.permissions;
  }

  public static create(name: string): Role;
  public static create(props: CreateRoleProps, id: string): Role;
  public static create(
    nameOrProps: string | CreateRoleProps,
    id?: string,
  ): Role {
    if (typeof nameOrProps === 'string') {
      return new Role({
        name: nameOrProps,
        permissions: WatchedPermissionList.create([]),
      });
    }

    return new Role(
      {
        name: nameOrProps.name,
        permissions: WatchedPermissionList.create(nameOrProps.permissions),
      },
      id,
    );
  }
}
