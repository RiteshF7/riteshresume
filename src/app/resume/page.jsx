'use client'
import {useState} from 'react';
import {Mail, Phone, Github, Linkedin, MapPin, Briefcase, GraduationCap, Award, Trophy, Check} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {resumeInfo} from './resume_info';

const ResumeHeader = ({ userData }) => (
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">{userData.name}
            </h1>
        <h2 className="text-xl text-blue-600  flex items-center">
            {userData.title}

            </h2>
        <p className="text-gray-600 mt-3 max-w-2xl">{userData.about}</p>

        <div className="flex flex-wrap gap-4 mt-4">
            <ContactItem icon={<MapPin className="h-4 w-4 mr-2" />} text={userData.location} />
            <ContactItem icon={<Mail className="h-4 w-4 mr-2" />} text={userData.email} />
            <ContactItem icon={<Phone className="h-4 w-4 mr-2" />} text={userData.phone} />
            <ContactItem icon={<Github className="h-4 w-4 mr-2" />} text={userData.github} />
            <ContactItem icon={<Linkedin className="h-4 w-4 mr-2" />} text={userData.linkedin} />
            <ContactItem icon={<MapPin className="h-4 w-4 mr-2" />} text={userData.portfolio} />
        </div>
    </div>
);

// Contact Item Component
const ContactItem = ({icon, text}) => (
    <div className="flex items-center text-gray-600">
        {icon}
        <span>{text}</span>
    </div>
);

// Experience Item Component
const ExperienceItem = ({job}) => (
    <Card className="border border-gray-200">
        <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg font-medium">{job.title}</CardTitle>
                    <CardDescription className="text-gray-600">{job.company}</CardDescription>
                </div>
                <Badge variant="outline" className="text-gray-600 bg-gray-50">
                    {job.duration}
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <ul className="list-disc ml-5 space-y-1 text-gray-600">
                {job.points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

// Education Item Component
const EducationItem = ({edu}) => (
    <Card className="border border-gray-200">
        <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg font-medium">{edu.degree}</CardTitle>
                    <CardDescription className="text-gray-600">{edu.school}</CardDescription>
                </div>
                <Badge variant="outline" className="text-gray-600 bg-gray-50">
                    {edu.duration}
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">{edu.description}</p>
        </CardContent>
    </Card>
);
// Certification Item Component
const CertificationItem = ({cert}) => (
    <div className="flex overflow-hidden bg-gray-100">
        <div className="w-1 bg-blue-600"></div>
        <div className="flex items-center p-4">
            <div className="ml-2">
                <h3 className="text-lg font-medium text-gray-800">{cert.title}</h3>
                <p className="text-gray-600">{cert.organization}</p>
            </div>
        </div>
    </div>
);

const AchivementItems = ({ cert }) => (
    <li className="flex items-center mb-4">
        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
        <div className="p-2 bg-gray-50 ">
            <h3 className="text-base text-gray-700">{cert.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{cert.organization}</p>
        </div>
    </li>
);

// Section Header Component
const SectionHeader = ({icon, title}) => (
    <div className="flex items-center mb-6">
        {icon}
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
);

// Main Component
export default function ResumeApp() {
    const [userData] = useState(resumeInfo);

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Main content */}
            <main className="max-w-5xl mx-auto p-6">
                <div className="resume-content bg-white rounded-lg shadow-md p-8">
                    {/* Resume Header */}
                    <ResumeHeader userData={userData}/>

                    <Separator className="my-8"/>

                    {/* Skills Section */}
                    <section className="mb-10">
                        <SectionHeader
                            icon={<Check className="h-5 w-5 mr-2 text-blue-600"/>}
                            title="Skills"
                        />

                        <div className="flex flex-wrap gap-2">
                            {userData.skills.map((skill, index) => (
                                <Badge key={index}
                                       className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section className="mb-10">
                        <SectionHeader
                            icon={<Briefcase className="h-5 w-5 mr-2 text-blue-600"/>}
                            title="Experience"
                        />

                        <div className="space-y-6">
                            {userData.experience.map(job => (
                                 <div key={job.id} className={job.id === 2 ? "pt-5" : ""}>
                                                  <ExperienceItem job={job}/>
                                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="mb-10 mt-40">
                        <SectionHeader
                            icon={<GraduationCap className="h-5 w-5 mr-2 text-blue-600"/>}
                            title="Education"
                        />

                        <div className="space-y-6">
                            {userData.education.map(edu => (
                                <EducationItem key={edu.id} edu={edu}/>
                            ))}
                        </div>
                    </section>

                    {/* Certifications Section */}
                    <section className="mb-10">
                        <SectionHeader
                            icon={<Award className="h-5 w-5 mr-2 text-blue-600"/>}
                            title="Certifications"
                        />

                        <div className="space-y-4">
                            {userData.certifications.map(cert => (
                                <CertificationItem key={cert.id} cert={cert}/>
                            ))}
                        </div>
                    </section>

                    {/* Achievements Section */}
                    <section className="mb-10">
                        <SectionHeader
                            icon={<Trophy className="h-5 w-5 mr-2 text-blue-600"/>}
                            title="Achievements"
                        />

                        <ul className="list-none">
                            {userData.achievements.map((achievement) => (
                                <AchivementItems key={achievement.id} cert={achievement}/>
                            ))}
                        </ul>
                         <div className="h-[32px] "></div>
                    </section>
                </div>
            </main>
        </div>
    );
}