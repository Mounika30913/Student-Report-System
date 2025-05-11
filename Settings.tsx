import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "@/components/ui/use-toast";
import { FileExport } from 'lucide-react';

const Settings = () => {
  const [schoolInfo, setSchoolInfo] = useState({
    name: "Westview High School",
    principal: "Dr. Richard Johnson",
    email: "admin@westview.edu",
    phone: "(555) 123-4567",
    address: "123 Education Blvd, Knowledge City, KS 12345"
  });

  const [academicCalendar, setAcademicCalendar] = useState({
    academicYear: "2024-2025",
    term: "term2",
    startDate: "2025-01-05",
    endDate: "2025-05-25"
  });

  const [gradingScale, setGradingScale] = useState([
    { grade: 'A', range: '90-100', gpa: '4.0' },
    { grade: 'B', range: '80-89', gpa: '3.0' },
    { grade: 'C', range: '70-79', gpa: '2.0' },
    { grade: 'D', range: '60-69', gpa: '1.0' },
    { grade: 'F', range: '0-59', gpa: '0.0' },
  ]);

  const [assessmentWeights, setAssessmentWeights] = useState([
    { type: 'Exams', weight: '40' },
    { type: 'Quizzes', weight: '20' },
    { type: 'Assignments', weight: '25' },
    { type: 'Participation', weight: '15' },
  ]);

  const [emailNotifications, setEmailNotifications] = useState({
    'New grade entry': true,
    'Student attendance updates': true,
    'Report generation completion': true,
    'System announcements': false,
    'Parent communication': true
  });

  const [dashboardAlerts, setDashboardAlerts] = useState({
    'Low attendance warnings': true,
    'Grade updates': true,
    'Upcoming events': false,
    'Due report reminders': true
  });

  const handleExportSettings = () => {
    const settingsData = {
      schoolInfo,
      academicCalendar,
      gradingScale,
      assessmentWeights,
      notifications: {
        email: emailNotifications,
        dashboard: dashboardAlerts
      }
    };

    // Create a blob with the settings data
    const blob = new Blob([JSON.stringify(settingsData, null, 2)], { type: 'application/json' });
    
    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${schoolInfo.name.replace(/\s+/g, '_')}_Settings_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Settings Exported",
      description: "Your settings have been exported successfully.",
    });
  };

  return (
    <Layout title="Settings">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">System Settings</h1>
          <Button onClick={handleExportSettings} className="flex items-center gap-2">
            <FileExport size={18} />
            <span>Export Settings</span>
          </Button>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="grading">Grading</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>School Information</CardTitle>
                <CardDescription>
                  Update your school's basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="school-name">School Name</Label>
                    <Input 
                      id="school-name" 
                      value={schoolInfo.name}
                      onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="principal">Principal</Label>
                    <Input 
                      id="principal" 
                      value={schoolInfo.principal}
                      onChange={(e) => setSchoolInfo({...schoolInfo, principal: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={schoolInfo.email}
                      onChange={(e) => setSchoolInfo({...schoolInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={schoolInfo.phone}
                      onChange={(e) => setSchoolInfo({...schoolInfo, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={schoolInfo.address}
                      onChange={(e) => setSchoolInfo({...schoolInfo, address: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
                <CardDescription>
                  Configure the current academic year
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="academic-year">Current Academic Year</Label>
                    <Input 
                      id="academic-year" 
                      value={academicCalendar.academicYear}
                      onChange={(e) => setAcademicCalendar({...academicCalendar, academicYear: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term">Current Term</Label>
                    <Select 
                      value={academicCalendar.term}
                      onValueChange={(value) => setAcademicCalendar({...academicCalendar, term: value})}
                    >
                      <SelectTrigger id="term">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term1">Term 1</SelectItem>
                        <SelectItem value="term2">Term 2</SelectItem>
                        <SelectItem value="term3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Term Start Date</Label>
                    <Input 
                      id="start-date" 
                      type="date" 
                      value={academicCalendar.startDate}
                      onChange={(e) => setAcademicCalendar({...academicCalendar, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Term End Date</Label>
                    <Input 
                      id="end-date" 
                      type="date" 
                      value={academicCalendar.endDate}
                      onChange={(e) => setAcademicCalendar({...academicCalendar, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Calendar</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="grading" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Grading System</CardTitle>
                <CardDescription>
                  Configure the grading scale and assessment weights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium">Grading Scale</h3>
                  <div className="space-y-2">
                    {gradingScale.map((item, index) => (
                      <div key={index} className="grid grid-cols-6 items-center gap-2">
                        <div className="col-span-1">
                          <Input 
                            value={item.grade}
                            onChange={(e) => {
                              const newScale = [...gradingScale];
                              newScale[index].grade = e.target.value;
                              setGradingScale(newScale);
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input 
                            value={item.range}
                            onChange={(e) => {
                              const newScale = [...gradingScale];
                              newScale[index].range = e.target.value;
                              setGradingScale(newScale);
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input 
                            value={item.gpa}
                            onChange={(e) => {
                              const newScale = [...gradingScale];
                              newScale[index].gpa = e.target.value;
                              setGradingScale(newScale);
                            }}
                          />
                        </div>
                        {index > 4 && (
                          <div className="col-span-1">
                            <button 
                              className="text-sm text-red-500"
                              onClick={() => {
                                setGradingScale(gradingScale.filter((_, i) => i !== index));
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setGradingScale([...gradingScale, { grade: '', range: '', gpa: '' }]);
                    }}
                  >
                    Add Grade Level
                  </Button>
                </div>
                
                <div>
                  <h3 className="mb-3 text-sm font-medium">Assessment Weights</h3>
                  <div className="space-y-2">
                    {assessmentWeights.map((item, index) => (
                      <div key={index} className="grid grid-cols-6 items-center gap-2">
                        <div className="col-span-3">
                          <Input 
                            value={item.type}
                            onChange={(e) => {
                              const newWeights = [...assessmentWeights];
                              newWeights[index].type = e.target.value;
                              setAssessmentWeights(newWeights);
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center">
                            <Input 
                              value={item.weight}
                              onChange={(e) => {
                                const newWeights = [...assessmentWeights];
                                newWeights[index].weight = e.target.value;
                                setAssessmentWeights(newWeights);
                              }}
                            />
                            <span className="ml-2">%</span>
                          </div>
                        </div>
                        {index > 3 && (
                          <div className="col-span-1">
                            <button 
                              className="text-sm text-red-500"
                              onClick={() => {
                                setAssessmentWeights(assessmentWeights.filter((_, i) => i !== index));
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setAssessmentWeights([...assessmentWeights, { type: '', weight: '' }]);
                    }}
                  >
                    Add Assessment Type
                  </Button>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Grading Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  {Object.keys(emailNotifications).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item}</span>
                      <Switch 
                        checked={emailNotifications[item as keyof typeof emailNotifications]}
                        onCheckedChange={(checked) => {
                          setEmailNotifications({
                            ...emailNotifications,
                            [item]: checked
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Dashboard Alerts</h3>
                  {Object.keys(dashboardAlerts).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item}</span>
                      <Switch 
                        checked={dashboardAlerts[item as keyof typeof dashboardAlerts]}
                        onCheckedChange={(checked) => {
                          setDashboardAlerts({
                            ...dashboardAlerts,
                            [item]: checked
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button>Save Notification Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
