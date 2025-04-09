
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const allowanceOptions = [
  { type: 'breakfast', label: 'Breakfast', amount: 50 },
  { type: 'tea', label: 'Tea', amount: 15 },
  { type: 'lunch', label: 'Lunch', amount: 70 },
  { type: 'event', label: 'Event Participation', amount: 200 },
] as const;

const AllowanceForm = () => {
  const { user } = useAuth();
  const { addAllowance, allowances } = useData();
  
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Track which allowances have been submitted today
  const submittedTypes = user?.id 
    ? allowances
        .filter(a => a.employeeId === user.id && a.date === today)
        .map(a => a.type)
    : [];
  
  const handleSubmitAllowance = (type: typeof allowanceOptions[number]['type']) => {
    if (!user?.id) return;
    
    const allowanceOption = allowanceOptions.find(opt => opt.type === type);
    if (!allowanceOption) return;
    
    addAllowance({
      employeeId: user.id,
      date: today,
      type: type,
      amount: allowanceOption.amount
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Daily Allowances</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-2">
          Select the allowances you want to claim for today:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allowanceOptions.map((option) => {
            const isSubmitted = submittedTypes.includes(option.type);
            
            return (
              <Button
                key={option.type}
                variant={isSubmitted ? 'default' : 'outline'}
                className={isSubmitted ? 'bg-green-600' : ''}
                onClick={() => handleSubmitAllowance(option.type)}
                disabled={isSubmitted}
              >
                {isSubmitted && <CheckCircle className="mr-2 h-4 w-4" />}
                {option.label} - ₹{option.amount}
              </Button>
            );
          })}
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          Note: Each allowance can only be claimed once per day.
        </p>
      </CardContent>
    </Card>
  );
};

export default AllowanceForm;
