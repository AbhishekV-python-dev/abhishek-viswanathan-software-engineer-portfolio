export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  tech: string[];
  description: string;
  bullets: string[];
  apiEndpoints?: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string; description: string; sampleResponse: object }[];
  category: 'Backend & APIs' | 'Full-Stack Web' | 'Enterprise CRM';
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  crmModules?: string[];
  techStack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  date: string;
  description: string;
  topics: string[];
}

export interface Language {
  name: string;
  proficiency: string;
  level: number; // 1-100
}

export interface SkillCategory {
  category: string;
  skills: { name: string; highlight?: boolean; iconName?: string }[];
}

export const RESUME_DATA = {
  personalInfo: {
    name: "Abhishek Viswanathan",
    titles: [
      "Software Engineer",
      "Python Developer",
      "Application Support Engineer"
    ],
    primaryRole: "Software Engineer & Python Developer",
    location: "Dubai, United Arab Emirates",
    dob: "08 October 2002",
    phone: "+971-58-303-9288",
    email: "abhishekviswan@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhishek-v-python-dev",
    github: "https://github.com/AbhishekV-python-dev",
    portfolio: "https://abhishekviswanathan.dev",
    timezone: "Asia/Dubai (GST UTC+4)",
    availability: "Available for Full-time & Remote Roles in UAE / Worldwide"
  },

  summary: `Computer Science Engineering graduate with commercial freelance experience developing and supporting software solutions for UAE clients. Skilled in Python, Flask, RESTful API development, PostgreSQL, Supabase, SQLAlchemy ORM, authentication, Role-Based Access Control (RBAC), database design, and third-party API integration. Experienced in troubleshooting, debugging, application support, production maintenance, and delivering client-driven software solutions. Strong foundation in Object-Oriented Programming, Data Structures, SDLC, and API testing using Postman. Seeking opportunities in Software Engineering, Backend Development, Python Development, and Application Support.`,

  keyHighlights: [
    { label: "Commercial Experience", value: "UAE Client Solutions", icon: "Briefcase" },
    { label: "Core Backend Stack", value: "Python, Flask, SQL, REST", icon: "Code2" },
    { label: "Database Expertise", value: "PostgreSQL, Supabase, SQLite", icon: "Database" },
    { label: "Security & Auth", value: "RBAC, JWT, Flask-Login", icon: "ShieldCheck" },
    { label: "Engineering Degree", value: "B.E. CSE (CGPA 7.8/10)", icon: "GraduationCap" },
    { label: "Production Support", value: "Debugging & Monitoring", icon: "Terminal" }
  ],

  experience: [
    {
      id: "prime-rides",
      role: "Freelance Software Developer",
      company: "Prime Rides Cars Trading LLC",
      location: "Al Qusais Industrial First, Dubai, United Arab Emirates",
      period: "May 2026 – Present",
      techStack: [
        "Python",
        "Supabase Auth",
        "Role-Based Access Control (RBAC)",
        "Automotive Marketplace",
        "CRM Architecture",
        "REST APIs",
        "Database Design"
      ],
      crmModules: [
        "Lead Management",
        "Vehicle Inventory",
        "Customer Management",
        "Quotations Generator",
        "EMI Calculator",
        "Document Management"
      ],
      bullets: [
        "Contributed to the development, customization, testing, and maintenance of a commercial automotive marketplace and CRM platform for Prime Rides UAE.",
        "Implemented secure Role-Based Access Control (RBAC) using Supabase Authentication to enforce user permissions across CRM modules.",
        "Developed backend business logic, authentication workflows, database structures, and API integrations supporting business operations.",
        "Built and customized CRM modules including Lead Management, Vehicle Inventory, Customer Management, Quotations, EMI Calculator, and Document Management.",
        "Performed troubleshooting, bug fixing, production support, application testing, and feature enhancements to improve system reliability and user experience.",
        "Collaborated directly with the client to gather business requirements, implement requested features, and deliver production-ready software solutions."
      ]
    }
  ] as Experience[],

  projects: [
    {
      id: "cafes-wifi-finder",
      title: "Cafes with WiFi Finder",
      role: "Backend & API Developer",
      period: "Jun 2024 – Sep 2024",
      category: "Backend & APIs",
      featured: true,
      tech: [
        "Python",
        "Flask",
        "PostgreSQL",
        "SQLAlchemy ORM",
        "Google Maps API",
        "REST APIs",
        "Postman",
        "Render"
      ],
      description: "A location-based RESTful backend service that connects remote workers and students with cafes offering reliable WiFi, complete with distance filtering and database optimization.",
      bullets: [
        "Developed a Flask-based REST API backend with full CRUD functionality using SQLAlchemy ORM and PostgreSQL.",
        "Integrated Google Maps API to enable location-based café search and distance filtering.",
        "Designed an optimized relational database schema to improve data management and query performance.",
        "Deployed the application on Render with production configuration and environment variables.",
        "Tested and validated REST API endpoints using Postman and HTTP request/response workflows."
      ],
      apiEndpoints: [
        {
          method: "GET",
          path: "/api/v1/cafes/search?lat=25.2048&lng=55.2708&has_wifi=true",
          description: "Search nearby cafes with active WiFi connection within specified radius",
          sampleResponse: {
            status: "success",
            count: 4,
            cafes: [
              { id: 101, name: "Artisan Brew Cafe", distance_km: 0.8, wifi_speed_mbps: 120, socket_available: true, location: "Downtown Dubai" },
              { id: 104, name: "Code & Coffee Hub", distance_km: 1.4, wifi_speed_mbps: 250, socket_available: true, location: "Business Bay" }
            ]
          }
        },
        {
          method: "POST",
          path: "/api/v1/cafes/add",
          description: "Add new verified cafe entry with seating, sockets, and WiFi benchmarks",
          sampleResponse: {
            status: "created",
            cafe_id: 108,
            message: "Cafe listing submitted and database updated successfully."
          }
        }
      ]
    },
    {
      id: "shg-portal",
      title: "Women’s Self-Help Group (SHG) Empowerment Portal",
      role: "Full-Stack Web Developer",
      period: "Oct 2024 – Feb 2025",
      category: "Full-Stack Web",
      featured: true,
      tech: [
        "Python",
        "Flask",
        "SQLite",
        "Flask-Login",
        "SQLAlchemy ORM",
        "RBAC",
        "HTML5 / CSS3",
        "Admin Dashboard"
      ],
      description: "A full-stack web platform enabling Self-Help Groups (SHGs) to manage products, buyer enquiries, loan applications, and government scheme updates seamlessly.",
      bullets: [
        "Developed a full-stack web platform enabling SHGs to manage products, buyer enquiries, loan applications, and government scheme updates.",
        "Implemented secure authentication and Role-Based Access Control (RBAC) using Flask-Login and SQLAlchemy ORM.",
        "Built CRUD modules for products, loans, schemes, training programs, and notifications.",
        "Designed an administrative dashboard for user verification, product approvals, and loan management workflows."
      ],
      apiEndpoints: [
        {
          method: "GET",
          path: "/api/v1/shg/schemes/active",
          description: "Fetch eligible government empowerment schemes and subsidy parameters",
          sampleResponse: {
            status: "success",
            total_schemes: 3,
            schemes: [
              { scheme_id: "GOV-2025-09", title: "Micro-Enterprise Startup Grant", max_grant_aed: 15000, eligibility: "Registered Women SHG" },
              { scheme_id: "GOV-2025-14", title: "Digital Craft Skills Subsidy", max_grant_aed: 8000, eligibility: "All Members" }
            ]
          }
        },
        {
          method: "POST",
          path: "/api/v1/shg/loan-application",
          description: "Submit digital loan request with document verification payload",
          sampleResponse: {
            status: "under_review",
            application_ref: "LOAN-2025-8841",
            message: "Application routed to admin verification panel."
          }
        }
      ]
    }
  ] as Project[],

  skillCategories: [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", highlight: true },
        { name: "SQL", highlight: true },
        { name: "JavaScript", highlight: true },
        { name: "HTML5" },
        { name: "CSS3" }
      ]
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Flask", highlight: true },
        { name: "SQLAlchemy ORM", highlight: true },
        { name: "REST APIs", highlight: true },
        { name: "CRUD APIs" },
        { name: "JSON APIs" },
        { name: "JWT Authentication", highlight: true },
        { name: "Session Authentication" },
        { name: "Role-Based Access Control (RBAC)", highlight: true },
        { name: "API Integration" }
      ]
    },
    {
      category: "Databases",
      skills: [
        { name: "PostgreSQL", highlight: true },
        { name: "Supabase", highlight: true },
        { name: "SQLite" },
        { name: "SQL Queries" },
        { name: "Relational Database Design", highlight: true },
        { name: "Database Schema Design" },
        { name: "ORM Mapping" }
      ]
    },
    {
      category: "Application Support & Ops",
      skills: [
        { name: "Troubleshooting", highlight: true },
        { name: "Debugging", highlight: true },
        { name: "Root Cause Analysis", highlight: true },
        { name: "Technical Support" },
        { name: "Production Support", highlight: true },
        { name: "Log Analysis" },
        { name: "System Monitoring" }
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git", highlight: true },
        { name: "GitHub" },
        { name: "Postman", highlight: true },
        { name: "Docker (Basic)" },
        { name: "VS Code" },
        { name: "Cursor" },
        { name: "Render" },
        { name: "GitHub Pages" }
      ]
    },
    {
      category: "Software Engineering & CS",
      skills: [
        { name: "Object-Oriented Programming (OOP)", highlight: true },
        { name: "Data Structures & Algorithms", highlight: true },
        { name: "SDLC" },
        { name: "Version Control" },
        { name: "API Testing" },
        { name: "Backend Deployment" },
        { name: "Environment Variables" },
        { name: "Agile Methodology" }
      ]
    }
  ] as SkillCategory[],

  education: {
    institution: "Nehru Institute of Technology",
    degree: "Bachelor of Engineering (B.E.) in Computer Science and Engineering",
    period: "Aug 2020 – May 2024",
    cgpa: "7.8 / 10",
    highlights: [
      "Graduated with 7.8/10 CGPA in Computer Science & Engineering.",
      "In-depth coursework in Data Structures, Algorithms, Database Systems, Software Architecture, and Computer Networks.",
      "Spearheaded software development projects and group engineering initiatives."
    ]
  } as Education,

  certifications: [
    {
      id: "python-100days",
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      provider: "Udemy",
      date: "Sep 2024",
      description: "Completed hands-on training covering Python, Flask, REST APIs, automation, data processing, and backend application development through 100+ practical projects.",
      topics: [
        "Python 3 Advanced Concepts",
        "Flask Framework",
        "RESTful API Architecture",
        "Automation & Web Scraping",
        "Data Processing",
        "100+ Practical Projects"
      ]
    },
    {
      id: "genai-llm",
      title: "Generative AI & LLM Engineering",
      provider: "Udemy",
      date: "Mar 2025",
      description: "Studied prompt engineering, transformer architecture, Retrieval-Augmented Generation (RAG), and Large Language Model (LLM) fundamentals.",
      topics: [
        "Prompt Engineering",
        "Transformer Architecture",
        "Retrieval-Augmented Generation (RAG)",
        "LLM Integration Fundamentals",
        "Vector Embeddings"
      ]
    },
    {
      id: "python-dsa",
      title: "Python Data Structures & Algorithms + LeetCode Practice",
      provider: "Udemy",
      date: "Jun 2025",
      description: "Strengthened problem-solving skills by implementing data structures and algorithms and solving coding challenges using Python.",
      topics: [
        "Arrays & Strings Optimization",
        "Linked Lists & Trees",
        "Graph Traversal & Algorithms",
        "Dynamic Programming",
        "Time & Space Complexity Analysis"
      ]
    }
  ] as Certification[],

  languages: [
    { name: "English", proficiency: "Professional", level: 95 },
    { name: "Malayalam", proficiency: "Native", level: 100 },
    { name: "Hindi", proficiency: "Intermediate", level: 75 },
    { name: "Tamil", proficiency: "Beginner", level: 45 }
  ] as Language[]
};
