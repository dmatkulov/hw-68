export interface Todo {
  id: string;
  title: string;
  status: boolean;
}

export type TodoApi = Omit<Todo, 'id'>;


export interface Todos {
  [id: string]: TodoApi;
}