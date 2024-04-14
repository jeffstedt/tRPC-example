import { v4 as randomUUID } from 'uuid';

interface User {
  id: string;
  name: string;
  age: number;
}

const initialFakeUsers = [
  { id: "a06e011a-1396-47cb-9313-1278709ba469", name: "Foo", age: 33 },
  { id: "27df10d7-38f9-41f9-b42a-7ffe15ddd6ff", name: "Bar", age: 28 }
]

export class Database {
  public users: {
    all: User[]
    getById: (name: string) => Promise<User | undefined>;
    getByName: (name: string) => Promise<User[] | undefined>;
    add: (user: Pick<User, "name" | "age">) => Promise<User>
  };

  constructor() {
    this.users = {
      all: initialFakeUsers,
      getById: this.getById.bind(this),
      getByName: this.getByName.bind(this),
      add: this.add.bind(this)
    };
  }

  private async getById(searchTerm: string): Promise<User | undefined> {
    const user = this.users.all.find(user => user.id.toLowerCase().includes(searchTerm.toLowerCase()));
    return user;
  }

  private async getByName(searchTerm: string): Promise<User[] | undefined> {
    const user = this.users.all.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return user;
  }

  public async add(user: Pick<User, "name" | "age">): Promise<User> {
    const newUser = { ...user, id: randomUUID() }
    this.users.all.push(newUser)
    return newUser;
  }
}
