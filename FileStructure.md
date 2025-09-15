# 📁 FILE STRUCTURE - LEZAIGROUP PROJECT

## 🏗️ **PROJECT OVERVIEW**
Complete directory structure and file organization guide for the LezaiGroup AI automation agency landing page project.

---

## 📂 **ROOT DIRECTORY STRUCTURE**

```
LezaiGroup/
├── 📁 Frontend/                         # Frontend Application (Next.js)
├── 📁 Backend/                          # Backend Services (Planned)
├── 📁 .claude/                          # Claude Code Configuration
├── 📁 .git/                             # Git Version Control
├── 📄 CLAUDE.md                         # Main Context Documentation
├── 📄 FileStructure.md                  # This File - Project Structure Guide
├── 📄 README.md                         # Project Overview & Setup
├── 📄 proximasimplementaciones.md       # Copy Improvements Roadmap
├── 📄 TAREAS.md                        # Completed Tasks Log
├── 📄 lighthouse-audit-report.md        # Performance Audit Report
├── 📄 CHATBOT-SETUP.md                 # ChatBot Configuration Guide
├── 📄 .gitignore                       # Git Ignore Rules
└── 📄 .mcp.json                        # MCP Configuration
```

---

## 🎨 **FRONTEND DIRECTORY** (`/Frontend/`)

### **Complete Frontend Structure**
```
Frontend/
├── 📁 src/                              # Source Code
│   ├── 📁 app/                         # Next.js App Router
│   │   ├── 📁 fonts/                   # Custom Fonts
│   │   ├── 📄 globals.css              # Global Styles & Tailwind
│   │   ├── 📄 layout.tsx               # Root Layout Component
│   │   ├── 📄 page.tsx                 # Home Page Component
│   │   ├── 📄 robots.ts                # Robots.txt Generator
│   │   └── 📄 sitemap.ts               # Sitemap Generator
│   ├── 📁 components/                  # React Components
│   │   ├── 📁 sections/                # Page Sections
│   │   │   ├── 📄 Header.tsx           # Navigation Header
│   │   │   ├── 📄 Hero.tsx             # Hero Section with Metrics
│   │   │   ├── 📄 Benefits.tsx         # Services & Benefits Section
│   │   │   ├── 📄 Process.tsx          # Process Explanation + Video
│   │   │   └── 📄 Contact.tsx          # Contact Form Section
│   │   └── 📁 ui/                      # Reusable UI Components
│   │       ├── 📄 ChatBot.tsx          # AI Assistant Floating Widget
│   │       ├── 📄 ChatMessage.tsx      # Individual Chat Message
│   │       ├── 📄 ContactForm.tsx      # Contact Form Component
│   │       ├── 📄 CustomCursor.tsx     # Custom Cursor Effect
│   │       ├── 📄 FloatingParticles.tsx # Background Particles
│   │       ├── 📄 MetricCard.tsx       # Interactive Metrics Cards
│   │       ├── 📄 ScrollIndicator.tsx  # Scroll Progress Indicator
│   │       ├── 📄 StructuredData.tsx   # SEO Schema Markup
│   │       └── 📄 TypingIndicator.tsx  # Chat Typing Animation
│   ├── 📁 hooks/                       # Custom React Hooks
│   │   └── 📄 useChatBot.ts            # ChatBot State Management
│   └── 📁 lib/                         # Utilities & Configuration
│       ├── 📄 utils.ts                 # Helper Functions
│       └── 📄 chatbot-config.ts        # ChatBot Configuration
├── 📁 .next/                           # Next.js Build Cache
├── 📁 node_modules/                    # NPM Dependencies
├── 📄 package.json                     # Dependencies & Scripts
├── 📄 package-lock.json                # Dependency Lock File
├── 📄 next.config.mjs                  # Next.js Configuration
├── 📄 next-env.d.ts                    # Next.js TypeScript Definitions
├── 📄 tailwind.config.ts               # Tailwind CSS Configuration
├── 📄 postcss.config.mjs               # PostCSS Configuration
├── 📄 tsconfig.json                    # TypeScript Configuration
├── 📄 .eslintrc.json                   # ESLint Configuration
└── 📄 claude.md                        # Frontend Documentation
```

---

## ⚙️ **BACKEND DIRECTORY** (`/Backend/`)

### **Planned Backend Structure**
```
Backend/                                 # 🚧 PLANNED - Not Yet Implemented
├── 📁 src/                             # Source Code (Planned)
│   ├── 📁 controllers/                 # API Route Controllers
│   ├── 📁 services/                    # Business Logic Services
│   ├── 📁 models/                      # Data Models & Schemas
│   ├── 📁 middleware/                  # Custom Middleware
│   ├── 📁 routes/                      # API Route Definitions
│   ├── 📁 utils/                       # Shared Utilities
│   ├── 📁 config/                      # Configuration Files
│   └── 📁 types/                       # TypeScript Type Definitions
├── 📁 tests/                           # Test Files (Planned)
├── 📁 migrations/                      # Database Migrations (Planned)
├── 📁 scripts/                         # Deployment Scripts (Planned)
├── 📁 docs/                            # API Documentation (Planned)
├── 📄 package.json                     # Dependencies & Scripts (Planned)
├── 📄 tsconfig.json                    # TypeScript Config (Planned)
├── 📄 docker-compose.yml               # Docker Configuration (Planned)
└── 📄 claude.md                        # Backend Roadmap & Documentation
```

---

## 📋 **FILE TYPES & PURPOSES**

### **Configuration Files**
| File | Purpose | Location |
|------|---------|----------|
| `package.json` | NPM dependencies and scripts | `/Frontend/` |
| `next.config.mjs` | Next.js framework configuration | `/Frontend/` |
| `tailwind.config.ts` | Custom design system & colors | `/Frontend/` |
| `tsconfig.json` | TypeScript compiler settings | `/Frontend/` |
| `.eslintrc.json` | Code linting rules | `/Frontend/` |
| `.gitignore` | Git ignore patterns | `/` (root) |
| `.mcp.json` | MCP configuration | `/` (root) |

### **Documentation Files**
| File | Purpose | Audience |
|------|---------|----------|
| `CLAUDE.md` | Main project context for Claude | AI Assistant |
| `claude.md` (Frontend) | Technical frontend documentation | Developers |
| `claude.md` (Backend) | Backend roadmap & architecture | Developers |
| `FileStructure.md` | This file - project organization | Team Members |
| `README.md` | Project overview & setup guide | External Users |
| `proximasimplementaciones.md` | Copy improvement roadmap | Marketing/Content |
| `TAREAS.md` | Completed tasks historical log | Project Management |

### **Source Code Organization**
| Directory | Contains | Purpose |
|-----------|----------|---------|
| `/src/app/` | Next.js pages & layouts | Application structure |
| `/src/components/sections/` | Page section components | Main landing page sections |
| `/src/components/ui/` | Reusable UI components | Shared interface elements |
| `/src/hooks/` | Custom React hooks | Stateful logic |
| `/src/lib/` | Utilities & configurations | Helper functions |

---

## 🎯 **NAMING CONVENTIONS**

### **File Naming Rules**
- **React Components**: PascalCase (e.g., `ChatBot.tsx`, `MetricCard.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `useChatBot.ts`, `utils.ts`)
- **Configuration**: lowercase with extensions (e.g., `next.config.mjs`)
- **Documentation**: UPPERCASE or lowercase (e.g., `README.md`, `claude.md`)
- **Directories**: lowercase (e.g., `components/`, `hooks/`)

### **Component Organization**
- **Sections**: Large page sections in `/components/sections/`
- **UI**: Reusable components in `/components/ui/`
- **Hooks**: Custom hooks in `/hooks/`
- **Utils**: Helper functions in `/lib/`

---

## 🚀 **DEVELOPMENT WORKFLOW**

### **Adding New Features**

#### **Frontend Components**
1. **Page Sections**: Add to `/src/components/sections/`
2. **Reusable UI**: Add to `/src/components/ui/`
3. **Custom Logic**: Add hooks to `/src/hooks/`
4. **Utilities**: Add helpers to `/src/lib/`

#### **Styling & Design**
1. **Global Styles**: Modify `/src/app/globals.css`
2. **Color System**: Update `/Frontend/tailwind.config.ts`
3. **Component Styles**: Use Tailwind classes in components

#### **Configuration Changes**
1. **Next.js Settings**: Modify `/Frontend/next.config.mjs`
2. **TypeScript**: Update `/Frontend/tsconfig.json`
3. **Dependencies**: Update `/Frontend/package.json`

### **Backend Development (Future)**
1. **APIs**: Add controllers to `/Backend/src/controllers/`
2. **Business Logic**: Add services to `/Backend/src/services/`
3. **Database**: Add models to `/Backend/src/models/`
4. **Routes**: Define in `/Backend/src/routes/`

---

## 📚 **DOCUMENTATION HIERARCHY**

### **Primary Documentation (Start Here)**
1. **`README.md`** - Project overview & quick start
2. **`CLAUDE.md`** - Complete project context
3. **`FileStructure.md`** - This file (project organization)

### **Specialized Documentation**
4. **`Frontend/claude.md`** - Technical frontend details
5. **`Backend/claude.md`** - Backend architecture & roadmap
6. **`proximasimplementaciones.md`** - Copy improvement plans

### **Historical & Audit Documentation**
7. **`TAREAS.md`** - Completed tasks log
8. **`lighthouse-audit-report.md`** - Performance analysis
9. **`CHATBOT-SETUP.md`** - ChatBot configuration guide

---

## 🔧 **DEVELOPMENT COMMANDS**

### **Frontend Development**
```bash
cd Frontend/
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### **Project Management**
```bash
git status           # Check git status
git add .            # Stage changes
git commit -m "..."  # Commit changes
```

---

## 🚨 **IMPORTANT NOTES**

### **Current State (September 2024)**
- ✅ **Frontend**: Fully operational in `/Frontend/` directory
- 🚧 **Backend**: Planned structure, not yet implemented
- 📊 **Performance**: Lighthouse score 95/100
- 🔄 **Active Development**: Copy improvements in progress

### **Key Decisions**
- **Monorepo Structure**: Frontend/Backend separated but in same repo
- **Next.js 14**: Using App Router (not Pages Router)
- **TypeScript**: Strict typing throughout the project
- **Tailwind CSS**: Custom design system with gold/black theme
- **Component Architecture**: Atomic design principles

### **Migration Notes**
- **Recent Change**: Project reorganized from flat structure to Frontend/Backend
- **Server Port**: Now runs on localhost:3002 from Frontend directory
- **Dependencies**: All moved to Frontend/package.json

---

## 📞 **FOR NEW TEAM MEMBERS**

### **Quick Start Guide**
1. **Read**: `README.md` for project overview
2. **Context**: Review `CLAUDE.md` for current state
3. **Structure**: This file for organization understanding
4. **Development**: `cd Frontend && npm run dev`
5. **Documentation**: Check respective `claude.md` files

### **Where to Find Things**
- **Landing Page Code**: `/Frontend/src/components/sections/`
- **UI Components**: `/Frontend/src/components/ui/`
- **Styling**: `/Frontend/src/app/globals.css` + Tailwind config
- **Configuration**: Various `.config` files in Frontend
- **Documentation**: Multiple `.md` files (see hierarchy above)

---

## 🎯 **FUTURE EXPANSION**

### **Planned Directories**
- `/Backend/src/` - Backend application code
- `/tests/` - Integration tests (might be added at root)
- `/docs/` - Additional documentation (if needed)
- `/assets/` - Shared assets between Frontend/Backend
- `/scripts/` - Deployment and utility scripts

### **Scalability Considerations**
- **Microservices**: Backend designed to split into services if needed
- **Monorepo Tools**: Structure ready for tools like Nx or Turborepo
- **CI/CD**: Directory structure supports pipeline automation
- **Docker**: Backend prepared for containerization

---

*This file is updated when significant structural changes are made to the project*  
*Last Updated: September 13, 2024 - After Frontend/Backend reorganization*