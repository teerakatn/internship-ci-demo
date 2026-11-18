import { InMemoryTaskRepository, TaskService } from "./taskService";

const service = new TaskService(new InMemoryTaskRepository());
const task = service.createTask("T-101", "Deploy แอปผ่าน Docker และ GitHub Actions");
const completed = service.completeTask(task.id);

console.log("✅ Application Running inside Container:", completed);