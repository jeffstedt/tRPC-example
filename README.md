# tRPC example (backend + cli interface)

## Setup

Installation
```sh
npm i
```

Start server
```
npm run server
```

Usage (cli)
```sh
npm run client -- --getAllUsers
npm run client -- --getUsersByName='Foo'
npm run client -- --createUser='{ "name": "John Doe", "age": 55 }'
```

## Examples

### Add user
```sh
npm run client -- --createUser='{ "name": "John Doe", "age": 55 }'

# Response
{
  input: { name: 'John Doe', age: 55 },
  output: {
    name: 'John Doe',
    age: 55,
    id: '8624fe33-ccbb-4b00-84cc-df71acbd1606'
  }
}
```

### Get users by name
```sh
npm run client -- --getUsersByName='john'

# Response
{
  input: 'john',
  output: [
    {
      name: 'John Doe',
      age: 55,
      id: '1a1af94d-0bd0-43a0-85aa-472d1bdf8805'
    }
  ]
}
```

### Get all users
```sh
npm run client -- --getAllUsers

# Response
{
  input: null,
  output: [
    {
      id: 'a06e011a-1396-47cb-9313-1278709ba469',
      name: 'Foo',
      age: 33
    },
    {
      id: '27df10d7-38f9-41f9-b42a-7ffe15ddd6ff',
      name: 'Bar',
      age: 28
    },
    {
      name: 'John Doe',
      age: 55,
      id: '1a1af94d-0bd0-43a0-85aa-472d1bdf8805'
    }
  ]
}
```