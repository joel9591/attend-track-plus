
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

// Mock data for salary records
const initialSalaryRecords = [
  { 
    id: 1, 
    employee: "John Doe", 
    month: "April 2025", 
    baseSalary: 35000, 
    allowances: 2000, 
    deductions: 1500, 
    netSalary: 35500 
  },
  { 
    id: 2, 
    employee: "Jane Smith", 
    month: "April 2025", 
    baseSalary: 45000, 
    allowances: 2500, 
    deductions: 2000, 
    netSalary: 45500 
  },
  { 
    id: 3, 
    employee: "Mike Johnson", 
    month: "April 2025", 
    baseSalary: 30000, 
    allowances: 1800, 
    deductions: 1200, 
    netSalary: 30600 
  },
];

const SalaryPage = () => {
  const { user } = useAuth();
  const [salaryRecords, setSalaryRecords] = useState(initialSalaryRecords);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = salaryRecords.filter(record =>
    record.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          {isAdmin ? "Salary Management" : "My Salary"}
        </h2>
        {isAdmin && <Button>Generate Monthly Salaries</Button>}
      </div>

      {isAdmin && (
        <div className="flex items-center justify-between">
          <div className="max-w-sm">
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{isAdmin ? "Salary Records" : "Salary History"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {isAdmin && <TableHead>Employee</TableHead>}
                <TableHead>Month</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isAdmin ? filteredRecords : filteredRecords.filter(record => 
                record.employee === user?.name
              )).map((record) => (
                <TableRow key={record.id}>
                  {isAdmin && (
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={record.employee} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {record.employee.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {record.employee}
                      </div>
                    </TableCell>
                  )}
                  <TableCell>{record.month}</TableCell>
                  <TableCell>₹{record.baseSalary.toLocaleString()}</TableCell>
                  <TableCell>₹{record.allowances.toLocaleString()}</TableCell>
                  <TableCell>₹{record.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">₹{record.netSalary.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                    {isAdmin && <Button variant="ghost" size="sm">Edit</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryPage;
