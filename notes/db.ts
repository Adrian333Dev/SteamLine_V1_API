// SteamLine V1 Database Schema

/**
 * @description
 * SteamLine App is a advanced kanban board app with ABAC and RBAC support. It's similar to apps like Trello, Jira, etc.
 */

interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}

interface Workspace extends BaseEntity {
  name: string;
  description: string;
  users: User[];
  boards: Board[];
}

interface Board extends BaseEntity {
  name: string;
  description: string;
  workspace: Workspace;
  columns: Column[];
}

interface Column extends BaseEntity {
  name: string;
  description: string;
  board: Board;
  cards: Card[];
}

interface Card extends BaseEntity {
  name: string;
  description: string;
  column: Column;
}
