
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import StudentList, { Student } from '@/components/students/StudentList';
import StudentDetails from '@/components/students/StudentDetails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Mock student data
  const students: Student[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      grade: '10',
      section: 'A',
      attendanceRate: 98,
      averageGrade: 92,
      status: 'excellent',
    },
    {
      id: '2',
      name: 'Liam Peterson',
      grade: '10',
      section: 'A',
      attendanceRate: 95,
      averageGrade: 88,
      status: 'good',
    },
    {
      id: '3',
      name: 'Olivia Martinez',
      grade: '10',
      section: 'B',
      attendanceRate: 92,
      averageGrade: 85,
      status: 'good',
    },
    {
      id: '4',
      name: 'Noah Wilson',
      grade: '10',
      section: 'B',
      attendanceRate: 85,
      averageGrade: 78,
      status: 'average',
    },
    {
      id: '5',
      name: 'Sophia Johnson',
      grade: '10',
      section: 'C',
      attendanceRate: 90,
      averageGrade: 82,
      status: 'good',
    },
    {
      id: '6',
      name: 'Mason Brown',
      grade: '10',
      section: 'C',
      attendanceRate: 75,
      averageGrade: 65,
      status: 'poor',
    },
    {
      id: '7',
      name: 'Isabella Taylor',
      grade: '9',
      section: 'A',
      attendanceRate: 97,
      averageGrade: 90,
      status: 'excellent',
    },
    {
      id: '8',
      name: 'James Garcia',
      grade: '9',
      section: 'A',
      attendanceRate: 88,
      averageGrade: 75,
      status: 'average',
    },
  ];

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  return (
    <Layout title="Students">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search students..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        <div className="rounded-md border bg-white p-4">
          <h2 className="mb-4 text-lg font-medium">Student Records</h2>
          <StudentList students={filteredStudents} onViewStudent={handleViewStudent} />
        </div>

        <StudentDetails
          student={selectedStudent}
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
        />
      </div>
    </Layout>
  );
};

export default Students;
