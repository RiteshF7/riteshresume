import {useState} from 'react';
import {Mail, Phone, Github, Linkedin, MapPin, Briefcase, GraduationCap, Award, Trophy, Check} from 'lucide-react';

// Mock UI Components
const Card = ({children, className}) => (
  <div className={`border border-gray-200 rounded-lg overflow-hidden mb-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({children, className}) => (
  <div className={`p-4 pb-2 ${className}`}>
    {children}
  </div>
);

const CardContent = ({children, className}) => (
  <div className={`p-4 pt-2 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({children, className}) => (
  <h3 className={`text-lg font-medium ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({children, className}) => (
  <p className={`text-gray-600 ${className}`}>
    {children}
  </p>
);

const Badge = ({children, className}) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Separator = ({className}) => (
  <hr className={`border-t border-gray-200 ${className}`} />
);

// Resume data
const resumeInfo = {
  "name": "Ritesh Singh",
  "title": "Android & Flutter Developer",
  "about": "Enthusiastic technology professional with over 6 years of experience seeking to leverage my expertise in innovative solutions. I am passionate about integrating new technologies to enhance efficiency and drive success. My goal is to contribute to a dynamic team where I can grow my skills and make a meaningful impact.",
  "location": "Gurgaon, Haryana- 122004, India",
  "email": "riteshf7@gmail.com",
  "phone": "(+91) 991-000-0163",
  "github": "github.com/riteshf7",
  "linkedin": "www.linkedin.com/in/sohlot163",
  "portfolio": "https://riteshf7.github.io/riteshportfolio/",
  "experience": [
    {
      "id": 1,
      "title": "Co-Founder & Lead Developer",
      "company": "App for EMI Enforcement & Device Management",
      "duration": "AUG 2023 – MAR 2025",
      "points": [
        "Developed an Android application for device management upon EMI non-payment, utilizing Device Policy Manager API with MVVM architecture.",
        "Ensured maintainable and scalable code.",
        "Designed and implemented key features: offline/online device locking, live location tracking, Factory Reset Protection (FRP), and audio/video payment reminders.",
        "Integrated backend with Firebase (Firestore for data handling, FCM for notifications).",
        "Automated APK deployment via CI/CD pipelines for seamless app delivery.",
        "Bridged technical expertise with product vision, optimizing user experience and aligning features with market needs."
      ]
    },
    {
      "id": 2,
      "title": "SDE-2",
      "company": "Cashify.in",
      "duration": "MAY 2021 – AUG 2023",
      "points": [
        "Designed Android hardware tests for camera, speaker, mic, and display.",
        "Developed an app to detect front and back panel cracks.",
        "Built a Flutter macOS application for unrecoverable phone data wiping.",
        "Created SDKs for runtime localization of Android apps.",
        "Managed multi-module app development and CI/CD build automation.",
        "Optimized Android build time and project version management."
      ]
    },
    {
      "id": 3,
      "title": "Android Developer",
      "company": "99Roomz.LLP",
      "duration": "MAR 2019 – MAR 2021",
      "points": [
        "Improved app speed by 40% through optimization efforts.",
        "Redesigned the UI for the company app, enhancing usability and aesthetics.",
        "Developed 99Tripz, a new feature section for the company.",
        "Enhanced app architecture for better performance and scalability.",
        "Managed both frontend and backend development.",
        "Implemented exclusive features like live videos for better user engagement.",
        "Contributed to the design and development of the Phunk App."
      ]
    },
    {
      "id": 4,
      "title": "Android Developer",
      "company": "Corpzone Pvt. Ltd.",
      "duration": "JAN 2018 – MAR 2019",
      "points": [
        "Developed an app for reposting Instagram feed posts.",
        "Enhanced the company app with new features and tutorial sections.",
        "Created DIY IoT projects for the company website to showcase innovation.",
        "Trained students on various technology topics, fostering skill development."
      ]
    }
  ],
  "education": [
    {
      "id": 1,
      "degree": "Bachelor in Computer Applications (BCA)",
      "school": "World college of technology and management",
      "duration": "2014 - 2017",
      "description": "Gurgaon, India"
    }
  ],
  "certifications": [
    {
      "id": 1,
      "title": "Android",
      "organization": "Codec Networks, CP"
    },
    {
      "id": 2,
      "title": "IOT",
      "organization": "Ducat India, Gurgaon"
    },
    {
      "id": 3,
      "title": "C++",
      "organization": "WCTM, Gurgaon"
    }
  ],
  "achievements": [
    {
      "id": 1,
      "title": "Developed core code for controlling React UI from block code",
      "organization": "Technical Achievement"
    },
    {
      "id": 2,
      "title": "Implemented live code generation from block programming to JavaScript",
      "organization": "Technical Achievement"
    },
    {
      "id": 3,
      "title": "Sole Developer for the Phunk App",
      "organization": "Project Achievement"
    },
    {
      "id": 4,
      "title": "Speaker at the \"Internet of Things\" seminar, WCTM, Gurgaon",
      "organization": "Speaking Engagement"
    },
    {
      "id": 5,
      "title": "Organizer for the Annual Technical/Coding Fest at WCTM",
      "organization": "Leadership"
    }
  ],
  "skills": [
    "MVVM", "MVC", "Android SDK", "Coroutines", "Retrofit", "Compose",
    "LiveData", "Stateflow", "Bloc pattern", "Flutter widget",
    "Java", "Kotlin", "Dart", "Javascript", "Typescript",
    "Amplify", "Appsync", "Cloud Formation", "Cognito", "Media Package",
    "Linux", "Windows", "Mac OS", "Android", "IntelliJ Idea", "Android Studio", "VS Code",
    "Github", "Docker", "Jenkins", "Gradle", "Kotlin DSL", "Micropython", "Arduino", "NodeMCU"
  ]
};

// Header Component
const ResumeHeader = ({userData}) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
    <h2 className="text-xl text-blue-600 mt-1">{userData.title}</h2>
    <p className="text-gray-600 mt-3 max-w-2xl">{userData.about}</p>

    <div className="flex flex-wrap gap-4 mt-4">
      <ContactItem icon={<MapPin className="h-4 w-4 mr-2"/>} text={userData.location}/>
      <ContactItem icon={<Mail className="h-4 w-4 mr-2"/>} text={userData.email}/>
      <ContactItem icon={<Phone className="h-4 w-4 mr-2"/>} text={userData.phone}/>
      <ContactItem icon={<Github className="h-4 w-4 mr-2"/>} text={userData.github}/>
      <ContactItem icon={<Linkedin className="h-4 w-4 mr-2"/>} text={userData.linkedin}/>
      <ContactItem icon={<MapPin className="h-4 w-4 mr-2"/>} text="Portfolio" link={userData.portfolio}/>
    </div>
  </div>
);

// Contact Item Component
const ContactItem = ({icon, text, link}) => (
  <div className="flex items-center text-gray-600">
    {icon}
    <span>{text}</span>
  </div>
);

// Experience Item Component
const ExperienceItem = ({job}) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.company}</CardDescription>
        </div>
        <Badge className="text-gray-600 bg-gray-50 border border-gray-200">
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
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{edu.degree}</CardTitle>
          <CardDescription>{edu.school}</CardDescription>
        </div>
        {edu.duration && (
          <Badge className="text-gray-600 bg-gray-50 border border-gray-200">
            {edu.duration}
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{edu.description}</p>
    </CardContent>
  </Card>
);

// Certification Item Component
const CertificationItem = ({cert}) => (
  <div className="flex overflow-hidden bg-gray-100 rounded-md">
    <div className="w-1 bg-blue-600"></div>
    <div className="flex items-center p-4">
      <div className="ml-2">
        <h3 className="text-lg font-medium text-gray-800">{cert.title}</h3>
        <p className="text-gray-600">{cert.organization}</p>
      </div>
    </div>
  </div>
);

const AchievementItem = ({cert}) => (
  <li className="flex items-center mb-4">
    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
    <div className="p-2 bg-gray-50 rounded-md">
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
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Main content */}
      <main className="max-w-5xl mx-auto p-6">
        <div className="resume-content bg-white rounded-lg shadow-md p-8">
          {/* Resume Header */}
          <ResumeHeader userData={resumeInfo}/>

          <Separator className="my-8"/>

          {/* Skills Section */}
          <section className="mb-10">
            <SectionHeader
              icon={<Check className="h-5 w-5 mr-2 text-blue-600"/>}
              title="Skills"
            />

            <div className="flex flex-wrap gap-2">
              {resumeInfo.skills.map((skill, index) => (
                <Badge key={index}
                   className="bg-blue-50 text-blue-700 border border-blue-100">
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
              {resumeInfo.experience.map(job => (
                <div key={job.id} className={job.id === 2 ? "pt-10" : ""}>
                  <ExperienceItem job={job}/>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="mb-10 pt-20">
            <SectionHeader
              icon={<GraduationCap className="h-5 w-5 mr-2 text-blue-600"/>}
              title="Education"
            />

            <div className="space-y-6">
              {resumeInfo.education.map(edu => (
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
              {resumeInfo.certifications.map(cert => (
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
              {resumeInfo.achievements.map((achievement) => (
                <AchievementItem key={achievement.id} cert={achievement}/>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}