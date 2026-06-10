export const personalData = {
  name: "Choong Ti Huai",
  title: "AI & Full-Stack Developer | System Architect | Computer Science Student",
  tagline: "Bridging sophisticated AI models with robust, production-grade backends.",
  bio: "Solid foundation in Distributed Systems and Backend Architecture, specializing in high-concurrency systems and AI Agent orchestration. Extensive experience in implementing SAGA patterns for distributed consistency and optimizing high-performance data pipelines. Passionate about deconstructing complex systems to their root concepts, bridging the gap between sophisticated AI models and robust, production-grade backends.",
  email: "tihuaichoong@gmail.com",
  github: "https://github.com/choongth",
  linkedin: "https://linkedin.com/in/choong-ti-huai-41a2b3227",
  resumeUrl: "/resume.pdf",
}

export const personalInfo = {
  ...personalData,
  stats: [
    { label: "CGPA", value: "3.84" },
    { label: "Projects", value: "8+" },
    { label: "Status", value: "Intern" },
  ],
}

export const experiences: Array<{
  company: string
  role: string
  period: string
  description: string
  highlights?: string[]
  link?: string
}> = [
  {
    company: "AIT Systems (with Daikin Malaysia)",
    role: "Technical Lead — AI-Driven Enterprise Management Platform",
    period: "Sep 2025 - Present",
    description: "Built a full-stack AI-driven enterprise management platform using React 19, TypeScript, Django, and a locally-hosted LLM (Ollama/LLaMA 3.1:8b) — integrating ticketing, predictive maintenance, knowledge management, and an AI assistant into a unified system.",
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
    role: "Solo Developer — APICTA 2025 National Finalist",
    period: "Jun 2025 - Oct 2025",
    description: "Vertex AI Gemini 2.5 Flash fine-tuned Malaysia travel agent built with LangChain/LangGraph and n8n.",
    highlights: [
      "Designed a four-stage dialogue engine with multimodal interaction built on FastAPI and Streamlit",
      "Presented to the category judging panel on 21 Oct 2025 at PIKOM, the National Tech Association of Malaysia",
    ],
    link: "https://github.com/choongth/SynTour",
  },
]

export const currentlyBuilding: Array<{
  title: string
  role: string
  status: string
  description: string
  highlights?: string[]
  technologies?: string[]
  collaborator?: { name: string; url: string }
}> = [
  {
    title: "Decypher AI",
    role: "System Architect, Backend & AI Pipeline — Collaboration",
    status: "Planning Phase",
    description: "An AI-driven intelligence platform for tech founders and researchers that continuously monitors 15+ fragmented signal sources (GitHub, Hacker News, arXiv, Product Hunt, SEC EDGAR) across five modules — business, academic research, startups, stock market, and jobs — scoring and structuring signals via LLMs into actionable opportunity cards on a Bento Grid dashboard, paired with a context-aware AI Analyst.",
    highlights: [
      "Architecting the closed-loop pipeline: scheduled multi-source ingestion → LLM-based cleaning & scoring → opportunity cards → user feedback → preference-aware re-ranking",
      "Building the FastAPI + async SQLAlchemy backend on PostgreSQL, with Redis-backed APScheduler jobs handling scheduled collection across all five modules",
      "Designing a provider-agnostic LLM layer (OpenAI gpt-4o-mini primary, DeepSeek fallback, switchable via env var) for signal scoring and the AI Analyst assistant",
    ],
    technologies: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "Redis", "OpenAI API", "DeepSeek API", "APScheduler"],
    collaborator: { name: "KinguYume-G", url: "https://github.com/KinguYume-G" },
  },
]

export const projects: Array<{
  title: string
  category: string
  date: string
  description: string
  technologies: string[]
  tags: string[]
  image: string
  link: string
  demo?: string
  dossier?: string
  visual?: "semantic-search"
}> = [
  {
    title: "My Portfolio",
    category: "Web",
    date: "2025",
    description: "My personal portfolio showcasing my experiences, projects, translations & publications.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "GitHub.io"],
    tags: ["rag", "ai-agent", "hybrid-search"],
    image: "",
    link: "https://github.com/choongth/choongth.github.io",
    dossier: "The pipeline runs in two stages: a DeepSeek agent uses tool-calling to decide retrieval actions, then synthesises streamed responses. Under the hood, retrieval combines SentenceTransformer HNSW vectors with BM25 keyword search, followed by cross-encoder reranking — all containerised with Docker and deployed on Railway.",
  },
  {
    title: "Smart Doc Agent",
    category: "AI/Agent",
    date: "2026",
    description: "Production-grade RAG document assistant with hybrid BM25 + semantic search, cross-encoder reranking, and streamed token-by-token answers via a DeepSeek agent.",
    technologies: ["Python", "FastAPI", "ChromaDB", "RAG", "DeepSeek", "Streamlit", "Docker"],
    tags: ["rag", "ai-agent", "hybrid-search"],
    image: "/images/projects/smartdoc_assistant.jpeg",
    link: "https://github.com/choongth/agent-rag-app",
    dossier: "The pipeline runs in two stages: a DeepSeek agent uses tool-calling to decide retrieval actions, then synthesises streamed responses. Under the hood, retrieval combines SentenceTransformer HNSW vectors with BM25 keyword search, followed by cross-encoder reranking — all containerised with Docker and deployed on Railway.",
  },
  {
    title: "Parallel Customer Service Agent",
    category: "AWS",
    date: "2026",
    description: "Serverless multi-agent system on AWS achieving 9.3× speedup over sequential processing via SQS + Lambda parallelisation and a two-layer DynamoDB memory system.",
    technologies: ["Python", "AWS Lambda", "Amazon SQS", "DynamoDB", "Bedrock", "SAM"],
    tags: ["aws", "serverless", "multi-agent"],
    image: "/images/projects/parallel_customer_service_agent.png",
    link: "https://github.com/choongth/parallel-customer-service-agent",
    dossier: "Multiple Lambda workers process customer messages simultaneously through SQS, handling 10 concurrent customers in ~1 second instead of 9. Memory is split into a short-term DynamoDB Conversations table (1-day TTL) and a shared FAQCache for permanent common-answer caching. A dead-letter queue captures any messages failing 3+ times.",
  },
  {
    title: "Sift — Autonomous Research Agent",
    category: "AI/Agent",
    date: "2026",
    description: "Autonomous AI research agent using MCP, Claude Sonnet, and a human-in-the-loop workflow to search the web, process PDFs, and generate structured Markdown reports.",
    technologies: ["Python", "FastAPI", "Chainlit", "MCP", "Claude", "AWS S3", "Docker", "Nginx"],
    tags: ["mcp", "ai-agent", "human-in-the-loop"],
    image: "/images/projects/sift.png",
    link: "https://github.com/choongth/sift",
    dossier: "Sift operates in three phases: planning (generates a structured research plan for user approval), execution (ReAct loop — web search via Tavily, PDF retrieval via PyMuPDF, synthesis), and delivery (user approves the report before it's saved locally or uploaded to S3). Hosted on AWS EC2 with Nginx reverse proxy and Let's Encrypt SSL.",
  },
  {
    title: "FridgeLedger",
    category: "Full-Stack",
    date: "2026",
    description: "AI-powered receipt scanner and pantry tracker that detects grocery price inflation and shrinkflation over time. AWS CendekiAwan Hackathon submission.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Supabase", "Amazon Bedrock", "Tailwind CSS"],
    tags: ["full-stack", "ai", "hackathon"],
    image: "/images/projects/fridgeledger.jpg",
    link: "https://github.com/choongth/FridgeLedger",
    dossier: "Users upload grocery receipts; an AI model extracts line items via OCR and the backend stores pantry records, maintains price history, and identifies price anomalies using deterministic comparison logic. Tracks monthly spending analytics, waste ratios, and shrinkflation signals across merchants.",
  },
  {
    title: "Devil Learn Language",
    category: "Web",
    date: "2026",
    description: "Clean no-login web app for memorising all 46 basic Japanese Hiragana characters, with dual-mode exercises, audio pronunciation, and local progress tracking.",
    technologies: ["React", "Vite", "Tailwind CSS", "Web Speech API"],
    tags: ["react", "education", "japanese"],
    image: "/images/projects/devil_learn_language.png",
    link: "https://github.com/choongth/devil_learn_language",
    demo: "https://devil-learn-language.vercel.app/",
  },
  {
    title: "Ice Cream Box Guessing Game",
    category: "Web",
    date: "2026",
    description: "Real-time 2-player guessing game using Firebase. One player secretly fills a box, the other guesses — live scoring synced across both sessions via a shared room code.",
    technologies: ["HTML", "CSS", "JavaScript", "Firebase Realtime Database"],
    tags: ["realtime", "firebase", "game"],
    image: "/images/projects/ice_cream_box_guessing_game.png",
    link: "https://github.com/choongth/ice-cream-box-guessing-game",
    demo: "https://ice-cream-box-guessing-game.netlify.app/",
  },
]

export const publications: Array<{
  title: string
  description: string
  tags: string[]
  link: string
}> = [
  {
    title: "Cloud Architecture Patterns",
    description: "Chinese translation of the essential cloud design patterns guide — covering scalability, availability, and resilience.",
    tags: ["cloud architecture", "system design", "open-source"],
    link: "https://github.com/choongth/Cloud_Architecture_Patterns_Chinese_Translated",
  },
  {
    title: "Software Architecture Patterns",
    description: "Chinese translation of the classic technical guide covering fundamental software architecture patterns.",
    tags: ["software architecture", "system design", "open-source"],
    link: "https://github.com/choongth/Software_Architecture_Patterns_Chinese_Translated",
  },
  {
    title: "Designing Event-Driven Systems",
    description: "Chinese translation exploring the fundamental principles of events as the core unit of communication in distributed systems.",
    tags: ["distributed-systems", "event-driven architecture", "open-source"],
    link: "https://github.com/choongth/Designing_Event-Driven_Systems_Chinese_Translated",
  },
  {
    title: "The Case for Shared Nothing",
    description: "Chinese translation .",
    tags: ["research paper", "database", "open-source"],
    link: "https://github.com/choongth/Research-Paper-Chinese-Translated/blob/main/%E8%AE%BA%E6%97%A0%E5%85%B1%E4%BA%AB.md",
  },
  {
    title: "Towards HPC through Parallel Programming",
    description: "Chinese translation.",
    tags: ["research paper", "high performance computing", "open-source"],
    link: "https://github.com/choongth/Research-Paper-Chinese-Translated/blob/main/%E9%80%9A%E8%BF%87%E5%B9%B6%E8%A1%8C%E7%BC%96%E7%A8%8B%E8%8C%83%E5%BC%8F%E5%8F%8A%E5%85%B6%E5%8E%9F%E7%90%86%E8%BF%88%E5%90%91%E9%AB%98%E6%80%A7%E8%83%BD%E8%AE%A1%E7%AE%97_(HPC).md",
  },
  {
    title: "Immutability Changes Everything",
    description: "Chinese translation ",
    tags: ["research paper", "event-sourcing", "open-source"],
    link: "https://github.com/choongth/Research-Paper-Chinese-Translated/blob/main/%E4%B8%8D%E5%8F%98%E6%80%A7%E6%94%B9%E5%8F%98%E4%B8%80%E5%88%87.md",
  },
]

export const awards: Array<{
  title: string
  project?: string
  description: string
  date: string
  scope: "National" | "International" | "University"
  link: string
}> = [
  {
    title: "APICTA Awards (Malaysia Digital) 2025 — Tertiary Student Project Finalist",
    project: "SynTour",
    description: "Vertex AI Gemini fine-tuned Malaysia travel agent built with LangChain/LangGraph and n8n. Presented to the category judging panel on 21 Oct 2025 at PIKOM, the National Tech Association of Malaysia.",
    date: "Oct 2025",
    scope: "National",
    link: "https://github.com/choongth/SynTour",
  },
  {
    title: "AWS CendekiAwan Hackathon 2026 — Top 20 Finalists",
    project: "FridgeLedger",
    description: "AI-powered receipt scanner and pantry tracker that detects grocery price inflation and shrinkflation over time. Certificate of achievement issued May 2026 by Asia Pacific University of Technology and Innovation (APU/APIIT).",
    date: "May 2026",
    scope: "National",
    link: "https://github.com/choongth/FridgeLedger",
  },
  {
    title: "Micron X Esum Case Study Competition",
    project: "Reliability Sentinel",
    description: "Packaging Reliability Sentinel Dashboard for Semiconductor Industry.",
    date: "May 2026",
    scope: "National",
    link: "https://choongth.github.io/packaging-reliability-sentinel-dashboard.github.io/",
  },
  {
    title: "APU Vice-Chancellor's List",
    description: "Excellent Academic Achievement, Academic Year 2024/25. Signed by Vice Chancellor Prof Dr Ho Chin Kuan.",
    date: "AY 2024/25",
    scope: "University",
    link: "/images/awards/vc-certificate.jpg",
  },
]

export const techStack = [
  // Languages
  { name: "Python", category: "Languages", level: 85 },
  { name: "TypeScript", category: "Languages", level: 80 },
  { name: "JavaScript", category: "Languages", level: 78 },
  { name: "Java", category: "Languages", level: 72 },
  { name: "C#", category: "Languages", level: 65 },
  { name: "C++", category: "Languages", level: 62 },
  { name: "SQL", category: "Languages", level: 75 },
  // Backend
  { name: "NestJS", category: "Backend", level: 76 },
  { name: "FastAPI", category: "Backend", level: 74 },
  { name: "Django", category: "Backend", level: 70 },
  { name: "Django REST Framework", category: "Backend", level: 68 },
  { name: "Flask", category: "Backend", level: 65 },
  { name: "Node.js", category: "Backend", level: 72 },
  { name: "Nginx", category: "Backend", level: 62 },
  { name: ".NET Framework", category: "Backend", level: 55 },
  { name: "Microservices", category: "Backend", level: 74 },
  // Frontend
  { name: "Next.js", category: "Frontend", level: 76 },
  { name: "React.js", category: "Frontend", level: 74 },
  { name: "HTML5", category: "Frontend", level: 72 },
  { name: "CSS", category: "Frontend", level: 70 },
  { name: "Tailwind CSS", category: "Frontend", level: 70 },
  { name: "Streamlit", category: "Frontend", level: 70 },
  { name: "Chainlit", category: "Frontend", level: 65 },
  // AI/Agent
  { name: "LangGraph", category: "AI/Agent", level: 76 },
  { name: "LangChain", category: "AI/Agent", level: 74 },
  { name: "RAG Pipeline", category: "AI/Agent", level: 75 },
  { name: "Hybrid RAG", category: "AI/Agent", level: 70 },
  { name: "Multi-Agent Systems", category: "AI/Agent", level: 74 },
  { name: "Agentic AI Development", category: "AI/Agent", level: 76 },
  { name: "LLM Fine-Tuning", category: "AI/Agent", level: 70 },
  { name: "Model Context Protocol", category: "AI/Agent", level: 68 },
  { name: "Sentence-Transformers", category: "AI/Agent", level: 68 },
  { name: "Reciprocal Rank Fusion", category: "AI/Agent", level: 65 },
  { name: "ChromaDB", category: "AI/Agent", level: 68 },
  { name: "Amazon Bedrock", category: "AI/Agent", level: 65 },
  // Databases
  { name: "PostgreSQL", category: "Databases", level: 72 },
  { name: "MySQL", category: "Databases", level: 70 },
  { name: "MongoDB", category: "Databases", level: 68 },
  { name: "Redis", category: "Databases", level: 68 },
  { name: "Pinecone", category: "Databases", level: 72 },
  { name: "ChromaDB", category: "Databases", level: 80 },
  { name: "SQLite", category: "Databases", level: 65 },
  { name: "Microsoft SQL Server", category: "Databases", level: 62 },
  { name: "Elasticsearch", category: "Databases", level: 62 },
  { name: "Amazon DynamoDB", category: "Databases", level: 65 },
  { name: "Amazon Aurora", category: "Databases", level: 62 },
  { name: "Snowflake Cloud", category: "Databases", level: 55 },
  // AWS
  { name: "AWS Lambda", category: "AWS", level: 68 },
  { name: "Amazon S3", category: "AWS", level: 70 },
  { name: "Amazon API Gateway", category: "AWS", level: 65 },
  { name: "Amazon EC2", category: "AWS", level: 65 },
  { name: "Amazon SAM", category: "AWS", level: 60 },
  { name: "Amazon CloudWatch", category: "AWS", level: 62 },
  { name: "AWS CloudFormation", category: "AWS", level: 60 },
  { name: "AWS IAM", category: "AWS", level: 65 },
  { name: "Amazon SQS", category: "AWS", level: 62 },
  // Cloud/Infra
  { name: "Google Cloud Platform", category: "Cloud/Infra", level: 70 },
  { name: "Docker", category: "Cloud/Infra", level: 68 },
  { name: "Netlify", category: "Cloud/Infra", level: 65 },
  { name: "Apache Kafka", category: "Cloud/Infra", level: 62 },
  { name: "RabbitMQ", category: "Cloud/Infra", level: 60 },
  // Architecture
  { name: "Distributed Systems", category: "Architecture", level: 72 },
  { name: "System Architecture", category: "Architecture", level: 70 },
  { name: "System Architecture Design", category: "Architecture", level: 70 },
  { name: "Event-Sourcing", category: "Architecture", level: 65 },
  { name: "OOP", category: "Architecture", level: 75 },
  { name: "High Performance Computing", category: "Architecture", level: 60 },
  { name: "Git", category: "Architecture", level: 82 },
  { name: "Cloud Computing", category: "Architecture", level: 72 },
  // Workflow/Automation
  { name: "n8n", category: "Workflow/Automation", level: 70 },
]

export const skills = techStack
