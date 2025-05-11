
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { ArrowDown, Download, FileText, Printer } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  
  // Mock data for report types
  const reportTypes = [
    { id: "academic", name: "Academic Reports" },
    { id: "attendance", name: "Attendance Reports" },
    { id: "conduct", name: "Conduct Reports" },
    { id: "progress", name: "Progress Reports" }
  ];

  // Mock data for reports
  const reports = [
    { 
      id: 1, 
      title: "End of Term Report", 
      class: "10-A", 
      generatedDate: "2025-05-01", 
      type: "academic",
      status: "published"
    },
    { 
      id: 2, 
      title: "Mid-Term Assessment", 
      class: "9-B", 
      generatedDate: "2025-04-15", 
      type: "progress",
      status: "published" 
    },
    { 
      id: 3, 
      title: "Monthly Attendance Report", 
      class: "10-A", 
      generatedDate: "2025-05-08", 
      type: "attendance",
      status: "draft" 
    },
    { 
      id: 4, 
      title: "Behavioral Analysis", 
      class: "8-C", 
      generatedDate: "2025-04-22", 
      type: "conduct",
      status: "published" 
    },
    { 
      id: 5, 
      title: "End of Year Report", 
      class: "10-B", 
      generatedDate: "2025-05-05", 
      type: "academic",
      status: "draft" 
    },
    { 
      id: 6, 
      title: "Quarterly Assessment", 
      class: "9-A", 
      generatedDate: "2025-04-10", 
      type: "progress",
      status: "published" 
    },
  ];
  
  // Filter reports based on selected criteria
  const filteredReports = reports.filter(report => 
    (selectedReport === "all" || report.type === selectedReport) &&
    (selectedClass === "all" || report.class === selectedClass)
  );

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Reports">
      <div className="space-y-6">
        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="manage">Manage Reports</TabsTrigger>
            <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Report Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reports</SelectItem>
                      {reportTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="10-A">Grade 10-A</SelectItem>
                      <SelectItem value="10-B">Grade 10-B</SelectItem>
                      <SelectItem value="9-A">Grade 9-A</SelectItem>
                      <SelectItem value="9-B">Grade 9-B</SelectItem>
                      <SelectItem value="8-C">Grade 8-C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Title</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Generated On</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-edu-gray" />
                              {report.title}
                            </div>
                          </TableCell>
                          <TableCell>Grade {report.class}</TableCell>
                          <TableCell>{report.generatedDate}</TableCell>
                          <TableCell>
                            {reportTypes.find(type => type.id === report.type)?.name || report.type}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(report.status)}`}>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="generate" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Class</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-A">Grade 10-A</SelectItem>
                        <SelectItem value="10-B">Grade 10-B</SelectItem>
                        <SelectItem value="9-A">Grade 9-A</SelectItem>
                        <SelectItem value="9-B">Grade 9-B</SelectItem>
                        <SelectItem value="8-C">Grade 8-C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Title</label>
                    <input
                      type="text"
                      placeholder="Enter report title"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-edu-primary focus:outline-none focus:ring-1 focus:ring-edu-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term1">Term 1</SelectItem>
                        <SelectItem value="term2">Term 2</SelectItem>
                        <SelectItem value="term3">Term 3</SelectItem>
                        <SelectItem value="midterm">Mid-Term</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Include Sections</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {['Academic Performance', 'Attendance Records', 'Behavioral Notes', 'Teacher Comments', 'Extracurricular Activities'].map((section) => (
                      <div key={section} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`section-${section}`}
                          className="h-4 w-4 rounded border-gray-300 text-edu-primary focus:ring-edu-primary"
                        />
                        <label htmlFor={`section-${section}`} className="text-sm">
                          {section}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
