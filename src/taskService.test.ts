import { describe, it, expect } from "vitest";
import { InMemoryTaskRepository, TaskService } from "./taskService";
describe("TaskService", () => {
  it("ควรสร้างงานใหม่และค้นหาเจอด้วย ID ได้", () => {
    const repo = new InMemoryTaskRepository();
    const service = new TaskService(repo);

    const created = service.createTask("T-01", "เรียนทำ CI/CD");
    expect(created.title).toBe("เรียนทำ CI/CD");
    expect(created.completed).toBe(false);
  });

  it("ควรโยน Error หากตั้งชื่องานเป็นค่าว่าง", () => {
    const service = new TaskService(new InMemoryTaskRepository());
    expect(() => service.createTask("T-02", "   ")).toThrow("ชื่องานห้ามว่าง");
  });

  it("ควรเปลี่ยนสถานะงานเป็นเสร็จสมบูรณ์ได้", () => {
    const service = new TaskService(new InMemoryTaskRepository());
    service.createTask("T-03", "เขียน Dockerfile");

    const updated = service.completeTask("T-03");
    expect(updated.completed).toBe(true);
  });
});