
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RequestType = 'leave' | 'material' | 'query';

const RequestForm = () => {
  const { user } = useAuth();
  const { addRequest } = useData();
  const [type, setType] = useState<RequestType>('leave');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !title || !description) return;
    
    addRequest({
      employeeId: user.id,
      employeeName: user.name,
      type,
      title,
      description
    });
    
    // Reset form
    setTitle('');
    setDescription('');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Request Type</Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as RequestType)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leave">Leave Request</SelectItem>
                <SelectItem value="material">Material Request</SelectItem>
                <SelectItem value="query">General Query</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief title for your request"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about your request"
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestForm;
