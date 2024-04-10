import { v4 as randomUUID } from 'uuid';

interface User {
  id: string;
  name: string;
  age: number;
}

export class Database {
  private userList: User[];

  public users: {
    getAll: () => Promise<User[]>
    getByName: (name: string) => Promise<User[] | undefined>;
    add: (user: Pick<User, "name" | "age">) => Promise<User>
  };

  constructor() {
    this.userList = [
      { id: "a06e011a-1396-47cb-9313-1278709ba469", name: "Foo", age: 33 },
      { id: "27df10d7-38f9-41f9-b42a-7ffe15ddd6ff", name: "Bar", age: 28 }
    ];

    this.users = {
      getAll: this.getAll.bind(this),
      getByName: this.getByName.bind(this),
      add: this.add.bind(this)
    };
  }

  private async getAll(): Promise<User[]> {
    return this.userList
  }

  private async getByName(searchTerm: string): Promise<User[] | undefined> {
    const user = this.userList.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return user;
  }

  public async add(user: Pick<User, "name" | "age">): Promise<User> {
    const newUser = { ...user, id: randomUUID() }
    this.userList = [...this.userList, newUser]
    return newUser;
  }
}
