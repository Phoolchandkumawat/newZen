
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Inbox, 
  Filter, 
  Plus, 
  ChevronDown, 
  ChevronRight,
  Star,
  Clock,
  CheckSquare,
  Users,
  Tag,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Project } from "@/components/TodoList";

interface ProjectSidebarProps {
  projects: Project[];
  selectedProject: string;
  onProjectSelect: (projectId: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
}

const ProjectSidebar = ({ 
  projects, 
  selectedProject, 
  onProjectSelect, 
  viewMode, 
  onViewModeChange 
}: ProjectSidebarProps) => {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  const views = [
    { id: 'today', name: 'Today', icon: Calendar, count: 0 },
    { id: 'upcoming', name: 'Upcoming', icon: Clock, count: 0 },
    { id: 'filters', name: 'Filters & Labels', icon: Filter, count: 0 },
  ];

  const filterViews = [
    { id: 'important', name: 'Important', icon: Star, count: 0, color: 'text-yellow-500' },
    { id: 'assigned', name: 'Assigned to me', icon: Users, count: 0, color: 'text-blue-500' },
    { id: 'no-label', name: 'No label', icon: Tag, count: 0, color: 'text-gray-500' },
  ];

  return (
    <div className="w-80 bg-background border-r flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="font-semibold text-lg">TodoFlow</h2>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {/* Main Views */}
          {views.map((view) => (
            <motion.button
              key={view.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewModeChange(view.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                viewMode === view.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
              }`}
            >
              <view.icon className="w-4 h-4" />
              <span className="flex-1">{view.name}</span>
              {view.count > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {view.count}
                </Badge>
              )}
            </motion.button>
          ))}
        </div>

        <div className="border-t">
          {/* Projects Section */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {isProjectsExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Projects
              </button>
              
              <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-6 w-6">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Project name"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        // Add project logic here
                        setShowNewProjectDialog(false);
                        setNewProjectName("");
                      }}>
                        Create
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {isProjectsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-1"
              >
                {projects.map((project) => (
                  <motion.button
                    key={project.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onProjectSelect(project.id);
                      onViewModeChange('project');
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      viewMode === 'project' && selectedProject === project.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg">{project.icon}</span>
                    <span className="flex-1 text-sm">{project.name}</span>
                    {project.taskCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {project.taskCount}
                      </Badge>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Labels & Filters */}
        <div className="border-t p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Filters</h3>
          <div className="space-y-1">
            {filterViews.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewModeChange(filter.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  viewMode === filter.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
              >
                <filter.icon className={`w-4 h-4 ${filter.color}`} />
                <span className="text-sm">{filter.name}</span>
                {filter.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filter.count}
                  </Badge>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-medium">U</span>
          </div>
          <span>Your workspace</span>
          <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSidebar;
