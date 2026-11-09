export const profile = {
  name: "Choong Ti Huai",
  role: "AI & Full-Stack Developer",
  summary:
    "AI & Full-Stack Developer and CS student, specializing in high-concurrency systems and AI agent orchestration.",
  status: "Intern at OneEmpower",
  email: "tihuaichoong@gmail.com",
  github: "https://github.com/choongth",
  linkedin: "https://linkedin.com/in/choong-ti-huai-41a2b3227",
}

export const education = {
  degree: "BSc Computer Science (dual degree)",
  school: "Asia Pacific University & De Montfort University",
  cgpa: "3.82",
}

type Project = {
  title: string
  description: string
  technologies: string[]
  link: string
  demo?: string
  /** Omit to render a placeholder in the image container. */
  image?: { src: string; alt: string }
}

export const featuredProjects: Project[] = [
  {
    title: "Parallel Customer Service Agent",
    description:
      "Serverless multi-agent system on AWS, 9.3× faster than sequential processing using SQS and Lambda.",
    technologies: ["Python", "AWS Lambda", "SQS", "DynamoDB", "Bedrock"],
    link: "https://github.com/choongth/parallel-customer-service-agent",
    image: {
      src: "/images/projects/parallel_customer_service_agent.png",
      alt: "Load test output showing a 9.3× speedup over sequential processing",
    },
  },
  {
    title: "Smart Doc Agent",
    description:
      "RAG document assistant with hybrid BM25 and semantic search, cross-encoder reranking and streamed answers.",
    technologies: ["Python", "FastAPI", "ChromaDB", "DeepSeek", "Docker"],
    link: "https://github.com/choongth/agent-rag-app",
    image: {
      src: "/images/projects/smartdoc_assistant.jpeg",
      alt: "Smart Doc Agent answering a question from an indexed document",
    },
  },
  {
    title: "Sift",
    description:
      "Autonomous research agent using MCP and Claude, with a human-in-the-loop workflow that produces structured reports.",
    technologies: ["Python", "FastAPI", "MCP", "Claude", "AWS S3"],
    link: "https://github.com/choongth/sift",
    image: {
      src: "/images/projects/sift.png",
      alt: "Sift chat interface ready for a research question",
    },
  },
  {
    title: "Devil Learn Language",
    description:
      "No-login web app for memorising the 46 basic Hiragana characters, with audio pronunciation and local progress tracking.",
    technologies: ["React", "Vite", "Web Speech API"],
    link: "https://github.com/choongth/devil_learn_language",
    demo: "https://devil-learn-language.vercel.app/",
    image: {
      src: "/images/projects/devil_learn_language.png",
      alt: "Hiragana quiz showing the character あ with four answer choices and a score panel",
    },
  },
]

export const otherProjects: Project[] = [
  {
    title: "Ice Cream Box Guessing Game",
    description:
      "Real-time two-player guessing game with live scoring synced through a shared room code.",
    technologies: ["JavaScript", "Firebase Realtime Database"],
    link: "https://github.com/choongth/ice-cream-box-guessing-game",
    demo: "https://ice-cream-box-guessing-game.netlify.app/",
  },
]

export const experiences: Array<{
  company: string
  role: string
  period: string
  description: string
  metrics?: Array<{ value: string; label: string }>
  highlights?: string[]
  link?: string
}> = [
  {
    company: "OneEmpower (M) Sdn Bhd, KL",
    role: "Product Development Intern",
    period: "August 2026 - Present",
    description: "Singapore-based Bank-Tech SaaS company.",
  },
  {
    company: "AIT Systems with Daikin Malaysia",
    role: "Technical Lead",
    period: "Sep 2025 – Jul 2026",
    description:
      "AI-driven enterprise platform uniting ticketing, predictive maintenance, knowledge management and an AI assistant on a locally hosted LLM.",
    metrics: [
      { value: "~92%", label: "accuracy detecting equipment failures 7–14 days ahead" },
      { value: "<30 s", label: "per knowledge query, down from 30 minutes" },
      { value: "3 days", label: "for purchase approvals, down from 21" },
    ],
    highlights: [
      "ML-powered predictive maintenance engine detecting equipment failures 7–14 days in advance with ~92% accuracy, reducing maintenance costs by 25–30% and cutting emergency fault resolution from 4–6 hours to ~15 minutes",
      "RAG-based AI assistant over the company's internal knowledge base with role-gated access control, cutting knowledge query time from 30 minutes to under 30 seconds",
      "Intelligent ticketing system with AI-driven auto-categorization, smart assignee recommendation (skill matrix, workload, historical success rate), and automated workflow routing — improving operational efficiency by 30%",
      "Automated equipment purchase approval workflow, reducing cycle time from 21 days to 3 days with AI-assisted form auto-population and multi-level real-time tracking — eliminating data-entry errors entirely",
      "Multi-role user architecture (CEO, Manager, Technician, Engineer, etc.) with differentiated AI responses and permission-scoped data access across all platform modules",
    ],
  },
  {
    company: "SynTour",
    role: "Solo Developer",
    period: "Jun 2025 – Oct 2025",
    description:
      "Fine-tuned Malaysia travel agent on Vertex AI, built with LangGraph and n8n. APICTA 2025 national finalist.",
    link: "https://github.com/choongth/SynTour",
  },
]

export const nowBuilding = {
  title: "Decypher AI",
  status: "Planning phase",
  description:
    "AI-driven intelligence platform for tech founders and researchers, monitoring 15+ signal sources and structuring them into actionable opportunity cards.",
  collaborator: { name: "KinguYume-G", url: "https://github.com/KinguYume-G" },
}

export const books = [
  {
    title: "Designing Event-Driven Systems",
    chapters: 15,
    link: "https://github.com/choongth/Designing_Event-Driven_Systems_Chinese_Translated",
  },
  {
    title: "Cloud Architecture Patterns",
    chapters: 15,
    link: "https://github.com/choongth/Cloud_Architecture_Patterns_Chinese_Translated",
  },
  {
    title: "Software Architecture Patterns",
    chapters: 5,
    link: "https://github.com/choongth/Software_Architecture_Patterns_Chinese_Translated",
  },
]

export const papers = [
  {
    title: "The Case for Shared Nothing",
    link: "https://github.com/choongth/Research-Paper-Chinese-Translated/blob/main/%E8%AE%BA%E6%97%A0%E5%85%B1%E4%BA%AB.md",
  },
  {
    title: "Towards HPC through Parallel Programming",
    link: "https://github.com/choongth/Research-Paper-Chinese-Translated/blob/main/%E9%80%9A%E8%BF%87%E5%B9%B6%E8%A1%8C%E7%BC%96%E7%A8%8B%E8%8C%83%E5%BC%8F%E5%8F%8A%E5%85%B6%E5%8E%9F%E7%90%86%E8%BF%88%E5%90%91%E9%AB%98%E6%80%A7%E8%83%BD%E8%AE%A1%E7%AE%97_(HPC).md",
  },
  {
    title: "Immutability Changes Everything",
    link: "https://github.com/choongth/Research-Paper-Chinese-Translated/blob/main/%E4%B8%8D%E5%8F%98%E6%80%A7%E6%94%B9%E5%8F%98%E4%B8%80%E5%88%87.md",
  },
]

export const awards = [
  {
    title: "APICTA Awards (Malaysia Digital) 2025, Tertiary Student Project Finalist",
    date: "Oct 2025",
    link: "https://github.com/choongth/SynTour",
  },
  {
    title: "APU Vice-Chancellor's List",
    date: "AY 2024/25",
    link: "/images/awards/vc-certificate.jpg",
  },
]

export const stack: Array<{ category: string; items: string[] }> = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C#", "C++", "SQL"],
  },
  {
    category: "Backend",
    items: ["NestJS", "FastAPI", "Django", "Django REST Framework", "Flask", "Spring", "SpringBoot", "Node.js", "Nginx", ".NET Framework", "Microservices"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React.js", "HTML5", "CSS", "Tailwind CSS", "Streamlit", "Chainlit"],
  },
  {
    category: "AI & Agents",
    items: ["LangGraph", "LangChain", "Spring AI", "RAG Pipeline", "Hybrid RAG", "Multi-Agent Systems", "Agentic AI Development", "LLM Fine-Tuning", "Model Context Protocol (MCP)", "Sentence-Transformers", "Reciprocal Rank Fusion (RRF)", "Amazon Bedrock"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Pinecone", "ChromaDB", "SQLite", "Microsoft SQL Server", "Elasticsearch", "Amazon DynamoDB", "Amazon Aurora", "Snowflake Cloud"],
  },
  {
    category: "Amazon Cloud Services (AWS)",
    items: ["AWS Lambda", "Amazon S3", "Amazon API Gateway", "Amazon EC2", "Amazon SAM", "Amazon CloudWatch", "AWS CloudFormation", "AWS IAM", "Amazon SQS"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["Google Cloud Platform (GCP)", "Docker", "Netlify", "Apache Kafka", "RabbitMQ"],
  },
  {
    category: "Architecture",
    items: ["Distributed Systems", "System Design", "Event-Sourcing", "Object-Oriented Programming (OOP)", "Data-Oriented Programming (DOP)", "High Performance Computing (HPC)", "Cloud Computing"],
  },
  {
    category: "Workflow & Tooling",
    items: ["n8n", "Git"],
  },
]
