"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = exports.InMemoryTaskRepository = void 0;
class InMemoryTaskRepository {
    tasks = new Map();
    save(task) {
        this.tasks.set(task.id, task);
    }
    findById(id) {
        return this.tasks.get(id);
    }
    findAll() {
        return Array.from(this.tasks.values());
    }
}
exports.InMemoryTaskRepository = InMemoryTaskRepository;
class TaskService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    createTask(id, title) {
        if (!title.trim()) {
            throw new Error("ชื่องานห้ามว่าง");
        }
        const newTask = { id, title: title.trim(), completed: false };
        this.repo.save(newTask);
        return newTask;
    }
    completeTask(id) {
        const task = this.repo.findById(id);
        if (!task) {
            throw new Error("ไม่พบงานที่ระบุ");
        }
        const updated = { ...task, completed: true };
        this.repo.save(updated);
        return updated;
    }
}
exports.TaskService = TaskService;
