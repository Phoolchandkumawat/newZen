import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, Flag, Tag, Search, Filter, MoreHorizontal, CheckCircle2, Circle, Star, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import TaskItem from "@/components/TaskItem";
import ProjectSidebar from "@/components/ProjectSidebar";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  projectId: string;
  labels: string[];
  description?: string;
  createdAt: Date;
  assignee?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  icon: string;
  taskCount: number;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    { id: 'inbox', name: 'Inbox', color: '#3b82f6', icon: '📥', taskCount: 0 },
    { id: 'personal', name: 'Personal', color: '#10b981', icon: '👤', taskCount: 0 },
    { id: 'work', name: 'Work', color: '#f59e0b', icon: '💼', taskCount: 0 },
    { id: 'fitness', name: 'Fitness', color: '#ef4444', icon: '💪', taskCount: 0 },
  ]);
  const [newTask, setNewTask] = useState("");
  const [selectedProject, setSelectedProject] = useState("inbox");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("today");
  const [availableLabels, setAvailableLabels] = useState<string[]>(['urgent', 'work', 'personal', 'shopping']);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Update project task counts
    const updatedProjects = projects.map(project => ({
      ...project,
      taskCount: tasks.filter(task => task.projectId === project.id && !task.completed).length
    }));
    setProjects(updatedProjects);
  }, [tasks]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      tasks.forEach(task => {
        if (task.dueDate && !task.completed) {
          const timeDiff = task.dueDate.getTime() - now.getTime();
          const hoursDiff = timeDiff / (1000 * 3600);

          // Notify for tasks due today or overdue
          if (hoursDiff <= 24 && hoursDiff > 0) {
            if (Notification.permission === 'granted') {
              new Notification(`Task Due Soon: ${task.text}`, {
                body: `Due: ${format(task.dueDate, 'MMM d, h:mm a')}`,
                icon: '/favicon.ico'
              });
            }
            toast({
              title: "Task Due Soon",
              description: `${task.text} is due ${format(task.dueDate, 'MMM d, h:mm a')}`,
            });
          }
        }
      });
    };

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Check reminders when component mounts and every hour
    checkReminders();
    const interval = setInterval(checkReminders, 3600000); // Check every hour

    return () => clearInterval(interval);
  }, [tasks, toast]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        priority: selectedPriority,
        dueDate: selectedDate,
        projectId: selectedProject,
        labels: selectedLabels,
        createdAt: new Date(),
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setSelectedDate(undefined);
      setSelectedPriority('medium');
      setSelectedLabels([]);
    }
  };

  const addLabel = () => {
    if (newLabel.trim() && !availableLabels.includes(newLabel.trim())) {
      setAvailableLabels([...availableLabels, newLabel.trim()]);
      setNewLabel("");
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

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    switch (viewMode) {
      case 'today':
        return task.dueDate && format(task.dueDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
      case 'upcoming':
        return task.dueDate && task.dueDate > new Date();
      case 'important':
        return task.priority === 'high' || task.labels.includes('urgent');
      case 'assigned':
        return task.assignee === 'me'; // You can expand this logic
      case 'no-label':
        return task.labels.length === 0;
      case 'filters':
        // Show all tasks for filters view
        return true;
      case 'project':
        return task.projectId === selectedProject;
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <ProjectSidebar 
        projects={projects}
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold capitalize">
                {viewMode === 'project' ? projects.find(p => p.id === selectedProject)?.name : 
                 viewMode === 'filters' ? 'Filters & Labels' : viewMode}
              </h1>
              <p className="text-muted-foreground">
                {filteredTasks.filter(t => !t.completed).length} tasks remaining
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add Task Input */}
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <Input
                placeholder="Add a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-48"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {/* Labels Selector */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className={selectedLabels.length > 0 ? 'text-primary' : ''}>
                      <Tag className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Labels</h4>
                      <div className="flex gap-2">
                        <Input
                          placeholder="New label..."
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addLabel()}
                          className="flex-1"
                        />
                        <Button size="sm" onClick={addLabel}>Add</Button>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {availableLabels.map(label => (
                          <label key={label} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLabels.includes(label)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLabels([...selectedLabels, label]);
                                } else {
                                  setSelectedLabels(selectedLabels.filter(l => l !== label));
                                }
                              }}
                            />
                            <span className="text-sm">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Date Selector */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className={selectedDate ? 'text-primary' : ''}>
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                {/* Priority Selector */}
                <Select value={selectedPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setSelectedPriority(value)}>
                  <SelectTrigger className="w-8 h-8 border-none">
                    <Flag className={`w-4 h-4 ${getPriorityColor(selectedPriority)}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Flag className="w-4 h-4 text-green-500" />
                        Low
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Flag className="w-4 h-4 text-yellow-500" />
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Flag className="w-4 h-4 text-red-500" />
                        High
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addTask} className="button-gradient">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tasks List or Filters View */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'filters' ? (
            <Tabs defaultValue="labels" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="labels">Labels</TabsTrigger>
                <TabsTrigger value="priorities">Priorities</TabsTrigger>
                <TabsTrigger value="dates">Due Dates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="labels" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableLabels.map(label => {
                    const labelTasks = tasks.filter(t => t.labels.includes(label) && !t.completed);
                    return (
                      <div key={label} className="p-4 border rounded-lg glass">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="w-4 h-4 text-primary" />
                          <h3 className="font-medium capitalize">{label}</h3>
                          <Badge variant="secondary">{labelTasks.length}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {labelTasks.length} active tasks
                        </p>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="priorities" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['high', 'medium', 'low'].map(priority => {
                    const priorityTasks = tasks.filter(t => t.priority === priority && !t.completed);
                    return (
                      <div key={priority} className="p-4 border rounded-lg glass">
                        <div className="flex items-center gap-2 mb-2">
                          <Flag className={`w-4 h-4 ${getPriorityColor(priority)}`} />
                          <h3 className="font-medium capitalize">{priority} Priority</h3>
                          <Badge variant="secondary">{priorityTasks.length}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {priorityTasks.length} active tasks
                        </p>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="dates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { key: 'overdue', name: 'Overdue', tasks: tasks.filter(t => t.dueDate && t.dueDate < new Date() && !t.completed) },
                    { key: 'today', name: 'Due Today', tasks: tasks.filter(t => t.dueDate && format(t.dueDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && !t.completed) },
                    { key: 'upcoming', name: 'Upcoming', tasks: tasks.filter(t => t.dueDate && t.dueDate > new Date() && !t.completed) },
                    { key: 'no-date', name: 'No Due Date', tasks: tasks.filter(t => !t.dueDate && !t.completed) }
                  ].map(group => (
                    <div key={group.key} className="p-4 border rounded-lg glass">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <h3 className="font-medium">{group.name}</h3>
                        <Badge variant="secondary">{group.tasks.length}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {group.tasks.length} tasks
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <AnimatePresence>
              {filteredTasks.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    You have no tasks in this view. Time to plan your next move.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  {filteredTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onUpdate={updateTask}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
