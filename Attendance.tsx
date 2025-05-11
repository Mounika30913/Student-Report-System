
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState("10-A");

  // Mock data for classes
  const classes = [
    "10-A", "10-B", "10-C", 
    "9-A", "9-B", "9-C", 
    "8-A", "8-B", "8-C"
  ];

  // Mock student data for attendance
  const students = [
    { id: 1, name: 'Emma Thompson', status: 'present' },
    { id: 2, name: 'Liam Peterson', status: 'present' },
    { id: 3, name: 'Olivia Martinez', status: 'absent' },
    { id: 4, name: 'Noah Wilson', status: 'present' },
    { id: 5, name: 'Sophia Johnson', status: 'late' },
    { id: 6, name: 'Mason Brown', status: 'present' },
    { id: 7, name: 'Isabella Taylor', status: 'excused' },
    { id: 8, name: 'James Garcia', status: 'present' },
    { id: 9, name: 'Charlotte Lee', status: 'present' },
    { id: 10, name: 'Benjamin Wright', status: 'absent' },
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'excused':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Attendance">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="space-y-4 md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Date & Class</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Select Date</label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>
                        Grade {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">
                  Save Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium">Total Students</span>
                  <span className="text-sm">{students.length}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium">Present</span>
                  <span className="text-sm">{students.filter(s => s.status === 'present').length}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium">Absent</span>
                  <span className="text-sm">{students.filter(s => s.status === 'absent').length}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium">Late</span>
                  <span className="text-sm">{students.filter(s => s.status === 'late').length}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium">Excused</span>
                  <span className="text-sm">{students.filter(s => s.status === 'excused').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Register - Grade {selectedClass}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox id={`student-${student.id}`} checked={student.status === 'present'} />
                      </TableCell>
                      <TableCell>
                        <label htmlFor={`student-${student.id}`} className="text-sm font-medium">
                          {student.name}
                        </label>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          placeholder="Add remarks"
                          className="w-full rounded-md border border-gray-200 p-1 text-xs"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
