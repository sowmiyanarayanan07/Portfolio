// Projects data for SOWMIYA NARAYANAN S's portfolio
export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  logo?: string;
  color: string;
  featured: boolean;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "customer-segmentation",
    title: "Customer Segmentation Model",
    year: "2025",
    category: "Machine Learning | Data Science",
    description:
      "Developed a customer segmentation system using clustering algorithms in Python. Performed exploratory data analysis and extracted actionable insights for targeted marketing strategies.",
    tags: ["K-Means", "Python", "Scikit-Learn", "EDA"],
    logo: "/images/project-segmentation.svg",
    color: "#f0ece4",
    featured: true,
  },
  {
    id: "text-privacy-masker",
    title: "AI-Powered Real-Time Text Privacy Masker",
    year: "2025",
    category: "NLP | Real-Time OCR",
    description:
      "Created a real-time OCR and NLP system to automatically redact sensitive information during Zoom and Microsoft Teams screen sharing sessions.",
    tags: ["NLP", "OCR", "Python", "Hugging Face"],
    logo: "/images/project-privacy.svg",
    color: "#f0ece4",
    featured: true,
  },
  {
    id: "sleep-health-study",
    title: "Sleep & Health Research Study",
    year: "2024",
    category: "Data Analysis | Visualization",
    description:
      "Analyzed the relationship between sleep duration and stress levels using data-driven research methodologies, statistical correlation analysis, and insightful data visualization.",
    tags: ["Pandas", "Matplotlib", "Seaborn", "Statistics"],
    logo: "/images/project-sleep.svg",
    color: "#f0ece4",
    featured: true,
  },
  {
    id: "civic-resolve-ai",
    title: "Civic Resolve AI",
    year: "2025",
    category: "Generative AI | Full Stack",
    description:
      "Developed Civic Resolve AI using Supabase and Gemini AI with AI duplicate complaint detection, real-time complaint reporting, disaster response features, and smart civic issue management.",
    tags: ["Gemini AI", "Supabase", "React", "Full Stack"],
    logo: "/images/project-civic.svg",
    image: "/civic-resolve-preview.png",
    link: "https://sowmiyanarayanan07.github.io/civicresolve-ai/#/",
    color: "#f0ece4",
    featured: false,
  },
  {
    id: "prism-internship",
    title: "Software Intern @ Prism Software",
    year: "2024",
    category: "APIs | NLP | Hugging Face",
    description:
      "Enhanced backend functionality with Python-based APIs and implemented NLP and Hugging Face models for advanced AI capabilities at Prism Software Solutions, Atlanta, GA (Remote).",
    tags: ["Python", "APIs", "NLP", "Hugging Face"],
    logo: "/images/project-prism.svg",
    color: "#f0ece4",
    featured: false,
  },
  {
    id: "genuine-it-internship",
    title: "Data Science Intern @ Genuine IT",
    year: "2024",
    category: "Data Collection | EDA",
    description:
      "Performed comprehensive data collection, cleaning, and exploratory analysis. Identified significant trends and correlations between sleep patterns and stress indicators.",
    tags: ["Python", "EDA", "Data Cleaning", "Visualization"],
    logo: "/images/project-genuine.svg",
    color: "#f0ece4",
    featured: false,
  },
];
