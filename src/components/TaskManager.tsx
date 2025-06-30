
import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={addTask} size="icon" className="button-gradient">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No tasks yet. Add one above!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-2 p-2 rounded-lg glass ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <Button
                onClick={() => toggleTask(task.id)}
                size="icon"
                variant="ghost"
                className="h-6 w-6"
              >
                <Check className={`w-4 h-4 ${task.completed ? 'text-primary' : 'text-muted-foreground'}`} />
              </Button>
              <span
                className={`flex-1 text-sm ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {task.text}
              </span>
              <Button
                onClick={() => deleteTask(task.id)}
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))
        )}
      </div>

      {tasks.length > 0 && (
        <div className="text-xs text-muted-foreground text-center">
          {tasks.filter(t => !t.completed).length} of {tasks.length} tasks remaining
        </div>
      )}
    </div>
  );
};

export default TaskManager;
