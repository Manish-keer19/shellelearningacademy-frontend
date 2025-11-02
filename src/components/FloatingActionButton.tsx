import { useState } from 'react';
import { Plus, BookOpen, Users, Award, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      icon: BookOpen,
      label: 'Create Course',
      action: () => navigate('/create-course'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Users,
      label: 'Manage Students',
      action: () => navigate('/manage-students'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Award,
      label: 'Add Category',
      action: () => navigate('/add-category'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-3">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                {action.label}
              </span>
              <Button
                size="icon"
                className={`w-12 h-12 rounded-full shadow-lg ${action.color}`}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
              >
                <action.icon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingActionButton;