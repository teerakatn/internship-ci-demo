export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskRepository {
  save(task: Task): void;
  findById(id: string): Task | undefined;
  findAll(): Task[];
}

export class InMemoryTaskRepository implements TaskRepository {
  private tasks = new Map<string, Task>();

  save(task: Task): void {
    this.tasks.set(task.id, task);
  }

  findById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  findAll(): Task[] {
    return Array.from(this.tasks.values());
  }
}

export class TaskService {
  constructor(private repo: TaskRepository) {}
  createTask(id: string, title: string): Task {
    if (!title.trim()) {
      throw new Error("ชื่องานห้ามว่าง");
    }
    const newTask: Task = { id, title: title.trim(), completed: false };
    this.repo.save(newTask);
    return newTask;
  }

  completeTask(id: string): Task {
    const task = this.repo.findById(id);
    if (!task) {
      throw new Error("ไม่พบงานที่ระบุ");
    }
    const updated: Task = { ...task, completed: true };
    this.repo.save(updated);
    return updated;
  }

  deleteTask(id: string): boolean {
    

}