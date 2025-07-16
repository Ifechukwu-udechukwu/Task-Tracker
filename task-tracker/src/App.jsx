import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Filter, Calendar, Clock, CheckCircle2, Circle, Star, Trash2, Edit3, Save, X, Target, TrendingUp, BarChart3, Zap, Moon, Sun } from 'lucide-react';

const styles = {
  app: (darkMode) => ({
    minHeight: '100vh',
    background: darkMode ? '#181a23' : '#f7f8fa',
    color: darkMode ? '#f7f8fa' : '#22223b',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    transition: 'all 0.3s',
  }),
  container: {
    maxWidth: 700,
    margin: '0 auto',
    padding: '2rem 1rem 3rem 1rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerIcon: {
    background: 'linear-gradient(90deg, #4f8cff 0%, #a259ff 100%)',
    padding: 12,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: (darkMode) => ({
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #4f8cff 0%, #a259ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    color: darkMode ? '#fff' : undefined,
  }),
  headerDesc: (darkMode) => ({
    color: darkMode ? '#bfc6e0' : '#6c6f80',
    fontSize: '1rem',
    marginTop: 3,
    marginBottom: 0,
  }),
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: (darkMode) => ({
    padding: 8,
    borderRadius: 12,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s',
    color: darkMode ? '#fff' : '#22223b',
  }),
  statsDashboard: (darkMode) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1.2rem',
    marginBottom: '2rem',
    color: darkMode ? '#fff' : '#22223b',
  }),
  statCard: (darkMode) => ({
    background: darkMode ? '#23263a' : '#fff',
    borderRadius: 16,
    boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(80, 80, 120, 0.07)',
    padding: '1.2rem 0.5rem',
    textAlign: 'center',
  }),
  statValue: (color) => ({
    fontSize: '2rem',
    fontWeight: 700,
    color,
    marginBottom: 3,
  }),
  statLabel: (darkMode) => ({
    color: darkMode ? '#bfc6e0' : '#8a8fa3',
    fontSize: '0.95rem',
  }),
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  searchInput: (darkMode) => ({
    padding: '0.7rem 1.2rem',
    borderRadius: '0.7rem',
    border: darkMode ? '1px solid #44475a' : '1px solid #e0e3ef',
    background: darkMode ? '#23263a' : '#f7f8fa',
    color: darkMode ? '#fff' : '#22223b',
    fontSize: '1rem',
    transition: 'border 0.2s',
    outline: 'none',
  }),
  select: (darkMode) => ({
    padding: '0.7rem 1.1rem',
    borderRadius: '0.7rem',
    border: darkMode ? '1px solid #44475a' : '1px solid #e0e3ef',
    background: darkMode ? '#23263a' : '#fff',
    color: darkMode ? '#fff' : '#22223b',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.2s, border 0.2s',
    outline: 'none',
  }),
  filterBtn: (active, darkMode) => ({
    padding: '0.7rem 1.1rem',
    borderRadius: '0.7rem',
    border: darkMode ? '1px solid #44475a' : '1px solid #e0e3ef',
    background: active ? '#4f8cff' : darkMode ? '#23263a' : '#fff',
    color: active ? '#fff' : darkMode ? '#fff' : '#22223b',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    transition: 'background 0.2s, border 0.2s',
    outline: 'none',
  }),
  addTaskBtn: (darkMode) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '1.2rem 0',
    border: darkMode ? '2px dashed #44475a' : '2px dashed #bfc6e0',
    borderRadius: 16,
    background: darkMode ? '#23263a' : '#fff',
    color: darkMode ? '#bfc6e0' : '#8a8fa3',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginBottom: 24,
    transition: 'border 0.2s, background 0.2s',
  }),
  addTaskBtnHover: {
    border: '2px solid #4f8cff',
    background: '#eaf1ff',
  },
  addTaskForm: (darkMode) => ({
    background: darkMode ? '#23263a' : '#fff',
    borderRadius: 16,
    boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(80, 80, 120, 0.07)',
    padding: '1.5rem 1rem',
    marginBottom: '1.5rem',
  }),
  input: (darkMode) => ({
    width: '100%',
    marginBottom: '0.8rem',
    padding: '0.8rem 1rem',
    borderRadius: '0.7rem',
    border: darkMode ? '1px solid #44475a' : '1px solid #e0e3ef',
    background: darkMode ? '#181a23' : '#f7f8fa',
    color: darkMode ? '#fff' : '#22223b',
    fontSize: '1rem',
    transition: 'border 0.2s',
    outline: 'none',
  }),
  textarea: (darkMode) => ({
    width: '100%',
    marginBottom: '0.8rem',
    padding: '0.8rem 1rem',
    borderRadius: '0.7rem',
    border: darkMode ? '1px solid #44475a' : '1px solid #e0e3ef',
    background: darkMode ? '#181a23' : '#f7f8fa',
    color: darkMode ? '#fff' : '#22223b',
    fontSize: '1rem',
    transition: 'border 0.2s',
    outline: 'none',
  }),
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.7rem',
  },
  cancelBtn: (darkMode) => ({
    background: 'none',
    color: darkMode ? '#bfc6e0' : '#8a8fa3',
    border: 'none',
    padding: '0.7rem 1.3rem',
    borderRadius: '0.7rem',
    fontSize: '1rem',
    cursor: 'pointer',
  }),
  addBtn: (disabled, darkMode) => ({
    background: disabled ? (darkMode ? '#44475a' : '#bfc6e0') : '#4f8cff',
    color: '#fff',
    fontWeight: 600,
    border: 'none',
    padding: '0.7rem 1.3rem',
    borderRadius: '0.7rem',
    fontSize: '1rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.2s, color 0.2s',
  }),
  taskCard: (completed, darkMode) => ({
    background: darkMode ? '#23263a' : '#fff',
    borderRadius: 16,
    boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(80, 80, 120, 0.07)',
    padding: '1.3rem 1rem',
    marginBottom: '1.1rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.1rem',
    opacity: completed ? 0.7 : 1,
    textDecoration: completed ? 'line-through' : 'none',
    transition: 'box-shadow 0.2s, transform 0.2s',
    color: darkMode ? '#fff' : '#22223b',
  }),
  taskTitle: (darkMode) => ({
    fontSize: '1.15rem',
    fontWeight: 600,
    marginBottom: 3,
    color: darkMode ? '#fff' : '#22223b',
  }),
  taskDesc: (darkMode) => ({
    color: darkMode ? '#bfc6e0' : '#6c6f80',
    fontSize: '0.98rem',
    marginBottom: 8,
  }),
  taskMeta: {
    display: 'flex',
    gap: '0.7rem',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  priority: (priority, darkMode) => {
    let bg = '#fff4f4', color = '#e74c3c', border = '#ffeaea';
    if (priority === 'medium') { bg = '#fffbe6'; color = '#f1c40f'; border = '#fff6cc'; }
    if (priority === 'low') { bg = '#eafff3'; color = '#27ae60'; border = '#c6ffe0'; }
    if (darkMode) {
      if (priority === 'high') { bg = '#3a2323'; color = '#ff7675'; border = '#5e2323'; }
      if (priority === 'medium') { bg = '#3a3923'; color = '#ffe066'; border = '#5e5e23'; }
      if (priority === 'low') { bg = '#233a2a'; color = '#55efc4'; border = '#235e4a'; }
    }
    return {
      padding: '0.2rem 0.7rem',
      borderRadius: '1rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      background: bg,
      color,
      border: `1px solid ${border}`,
    };
  },
  category: (category, darkMode) => {
    let bg = '#eaf1ff', color = '#4f8cff';
    if (category === 'personal') { bg = '#f3eaff'; color = '#a259ff'; }
    if (category === 'learning') { bg = '#eaf6ff'; color = '#00b4d8'; }
    if (darkMode) {
      if (category === 'work') { bg = '#23263a'; color = '#4f8cff'; }
      if (category === 'personal') { bg = '#2a2340'; color = '#a259ff'; }
      if (category === 'learning') { bg = '#233a3a'; color = '#00b4d8'; }
    }
    return {
      padding: '0.2rem 0.7rem',
      borderRadius: '1rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      background: bg,
      color,
    };
  },
  due: (darkMode) => ({
    color: darkMode ? '#ff7675' : '#e74c3c',
    fontWeight: 500,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  }),
  created: (darkMode) => ({
    color: darkMode ? '#bfc6e0' : '#8a8fa3',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  }),
  taskActions: {
    display: 'flex',
    gap: 8,
    marginLeft: 'auto',
  },
  actionBtn: (darkMode) => ({
    background: 'none',
    border: 'none',
    color: darkMode ? '#bfc6e0' : '#8a8fa3',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    padding: 0,
  }),
  actionBtnHover: {
    color: '#4f8cff',
  },
  footer: (darkMode) => ({
    textAlign: 'center',
    color: darkMode ? '#bfc6e0' : '#8a8fa3',
    fontSize: '1rem',
    marginTop: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  }),
};

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [sortBy, setSortBy] = useState('created');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'personal'
  });

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  // Initialize with sample data
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: 'Complete React project',
        description: 'Finish the task tracker app with all features',
        completed: false,
        priority: 'high',
        dueDate: '2025-07-20',
        category: 'work',
        createdAt: new Date('2025-07-16T10:00:00'),
        completedAt: null
      },
      {
        id: 2,
        title: 'Review AI coding tools',
        description: 'Research and test various AI coding assistants',
        completed: true,
        priority: 'medium',
        dueDate: '2025-07-18',
        category: 'learning',
        createdAt: new Date('2025-07-15T14:30:00'),
        completedAt: new Date('2025-07-16T09:15:00')
      },
      {
        id: 3,
        title: 'Buy groceries',
        description: 'Milk, bread, fruits, vegetables',
        completed: false,
        priority: 'low',
        dueDate: '2025-07-17',
        category: 'personal',
        createdAt: new Date('2025-07-16T08:00:00'),
        completedAt: null
      }
    ];
    setTasks(sampleTasks);
  }, []);

  // Focus input when adding task
  useEffect(() => {
    if (isAddingTask && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingTask]);

  // Focus edit input when editing
  useEffect(() => {
    if (editingTask && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTask]);

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        createdAt: new Date(),
        completedAt: null
      };
      setTasks([task, ...tasks]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: 'personal'
      });
      setIsAddingTask(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : null
          }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
    setEditingTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'text-blue-500 bg-blue-50';
      case 'personal': return 'text-purple-500 bg-purple-50';
      case 'learning': return 'text-indigo-500 bg-indigo-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      if (filter === 'overdue') return isOverdue(task.dueDate) && !task.completed;
      return true;
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'created':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => isOverdue(t.dueDate) && !t.completed).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const themeClasses = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  return (
    <div style={styles.app(darkMode)}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 style={styles.headerTitle(darkMode)}>
              Ifechukwu Task Tracker
            </h1>
            <p style={styles.headerDesc(darkMode)}>
              Stay organized and productive
            </p>
          </div>
          <div style={styles.headerRight}>
            <button
              onClick={() => setShowStats(!showStats)}
              style={styles.iconBtn(darkMode)}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={styles.iconBtn(darkMode)}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        {showStats && (
          <div style={styles.statsDashboard(darkMode)}>
            <div style={styles.statCard(darkMode)}>
              <div style={styles.statValue(stats.total)}>
                {stats.total}
              </div>
              <div style={styles.statLabel(darkMode)}>
                Total Tasks
              </div>
            </div>
            <div style={styles.statCard(darkMode)}>
              <div style={styles.statValue(stats.completed)}>
                {stats.completed}
              </div>
              <div style={styles.statLabel(darkMode)}>
                Completed
              </div>
            </div>
            <div style={styles.statCard(darkMode)}>
              <div style={styles.statValue(stats.pending)}>
                {stats.pending}
              </div>
              <div style={styles.statLabel(darkMode)}>
                Pending
              </div>
            </div>
            <div style={styles.statCard(darkMode)}>
              <div style={styles.statValue(stats.overdue)}>
                {stats.overdue}
              </div>
              <div style={styles.statLabel(darkMode)}>
                Overdue
              </div>
            </div>
            <div style={styles.statCard(darkMode)}>
              <div style={styles.statValue(stats.completionRate)}>
                {stats.completionRate}%
              </div>
              <div style={styles.statLabel(darkMode)}>
                Completion
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={styles.controls}>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput(darkMode)}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.select(darkMode)}
            >
              <option value="created">Sort by Created</option>
              <option value="priority">Sort by Priority</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            {['all', 'pending', 'completed', 'overdue'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                style={styles.filterBtn(filter === filterType, darkMode)}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Add Task Form */}
        <div style={styles.addTaskForm(darkMode)}>
          {!isAddingTask ? (
            <button
              onClick={() => setIsAddingTask(true)}
              style={styles.addTaskBtn(darkMode)}
            >
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Add new task</span>
            </button>
          ) : (
            <div className="space-y-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Task title..."
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                style={styles.input(darkMode)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTask();
                  if (e.key === 'Escape') setIsAddingTask(false);
                }}
              />
              <textarea
                placeholder="Description (optional)..."
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                style={styles.textarea(darkMode)}
                rows="2"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  style={styles.select(darkMode)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  style={styles.select(darkMode)}
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="learning">Learning</option>
                </select>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  style={styles.select(darkMode)}
                />
              </div>
              <div style={styles.formActions}>
                <button
                  onClick={() => setIsAddingTask(false)}
                  style={styles.cancelBtn(darkMode)}
                >
                  Cancel
                </button>
                <button
                  onClick={addTask}
                  style={styles.addBtn(false, darkMode)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div style={styles.taskCard(false, darkMode)}>
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No tasks found</p>
              <p className="text-gray-400 text-sm">Add a new task to get started!</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                style={styles.taskCard(task.completed, darkMode)}
              >
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    style={{
                      marginTop: 4,
                      transition: 'all 0.2s',
                      ...(task.completed ? { color: '#27ae60' } : { color: '#8a8fa3', hover: { color: '#27ae60' } }),
                    }}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        {editingTask === task.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              ref={editInputRef}
                              type="text"
                              value={task.title}
                              onChange={(e) => setTasks(tasks.map(t => 
                                t.id === task.id ? {...t, title: e.target.value} : t
                              ))}
                              style={{
                                flex: 1,
                                padding: '0.3rem 0.8rem',
                                borderRadius: '0.7rem',
                                border: '1px solid #e0e3ef',
                                background: darkMode ? '#23263a' : '#f7f8fa',
                                fontSize: '1rem',
                                transition: 'border 0.2s',
                                outline: 'none',
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') editTask(task.id, task.title);
                                if (e.key === 'Escape') setEditingTask(null);
                              }}
                            />
                            <button
                              onClick={() => editTask(task.id, task.title)}
                              style={{
                                color: '#27ae60',
                                transition: 'color 0.2s',
                              }}
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingTask(null)}
                              style={{
                                color: '#8a8fa3',
                                transition: 'color 0.2s',
                              }}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <h3
                            style={styles.taskTitle(darkMode)}
                          >
                            {task.title}
                          </h3>
                        )}
                        {task.description && (
                          <p style={styles.taskDesc(darkMode)}>{task.description}</p>
                        )}
                        <div style={styles.taskMeta}>
                          <span style={styles.priority(task.priority, darkMode)}>
                            {task.priority}
                          </span>
                          <span style={styles.category(task.category, darkMode)}>
                            {task.category}
                          </span>
                          {task.dueDate && (
                            <span style={styles.due(darkMode)}>
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(task.dueDate)}</span>
                            </span>
                          )}
                          <span style={styles.created(darkMode)}>
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(task.createdAt)}</span>
                          </span>
                        </div>
                      </div>
                      <div style={styles.taskActions}>
                        <button
                          onClick={() => setEditingTask(task.id)}
                          style={{
                            color: '#8a8fa3',
                            transition: 'color 0.2s',
                          }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          style={{
                            color: '#8a8fa3',
                            transition: 'color 0.2s',
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer(darkMode)}>
          <Zap className="w-4 h-4" />
          <span>My task-tracker App</span>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;