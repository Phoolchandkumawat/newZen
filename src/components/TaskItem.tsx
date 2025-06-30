
import { useState } from "react";
import { motion } from "framer-motion";
import { Circle, CheckCircle2, Flag, Calendar, Tag, MoreHorizontal, Edit, Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Task } from "@/components/TodoList";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  index: number;
}

const TaskItem = ({ task, onToggle, onDelete, onUpdate, index }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [showDescription, setShowDescription] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 border-red-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const isOverdue = task.dueDate && task.dueDate < new Date() && !task.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05 }}
      className={`group p-4 rounded-lg glass glass-hover border-l-4 ${
        task.completed ? 'opacity-60 border-l-green-500' : 
        isOverdue ? 'border-l-red-500' : 'border-l-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        <Button
          onClick={() => onToggle(task.id)}
          size="icon"
          variant="ghost"
          className="h-6 w-6 mt-1 hover:scale-110 transition-transform"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="min-h-0 resize-none"
              autoFocus
            />
          ) : (
            <div
              className={`cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
              onClick={() => setIsEditing(true)}
            >
              <p className="font-medium">{task.text}</p>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              )}
            </div>
          )}

          {/* Task metadata */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {task.dueDate && (
              <Badge variant="outline" className={isOverdue ? 'border-red-500 text-red-500' : ''}>
                <Calendar className="w-3 h-3 mr-1" />
                {format(task.dueDate, 'MMM d')}
              </Badge>
            )}
            
            {task.priority !== 'medium' && (
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                <Flag className="w-3 h-3 mr-1" />
                {task.priority}
              </Badge>
            )}

            {task.labels.map((label) => (
              <Badge key={label} variant="secondary">
                <Tag className="w-3 h-3 mr-1" />
                {label}
              </Badge>
            ))}

            {task.assignee && (
              <Badge variant="outline">
                👤 {task.assignee}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={() => setShowDescription(!showDescription)}
            size="icon"
            variant="ghost"
            className="h-6 w-6"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Description section */}
      {showDescription && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 pl-9"
        >
          <Textarea
            placeholder="Add a description..."
            value={task.description || ''}
            onChange={(e) => onUpdate(task.id, { description: e.target.value })}
            className="min-h-20"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskItem;
