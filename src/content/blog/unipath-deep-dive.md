---
title:
  en: "UniPath: Building the Dominican Republic's Unified Admission Platform"
  es: "UniPath: La Plataforma de Admisión Única para la República Dominicana"
description:
  en: "We are not building an app. We are designing the digital infrastructure for access to higher education in the Dominican Republic, backed by a proposal for MESCYT to adopt it as the national admissions platform."
  es: "No estamos creando una app, estamos diseñando la infraestructura digital para el acceso a la educación superior en República Dominicana, con una propuesta para que el MESCYT lo adopte como plataforma nacional de admisiones."
content:
  en: |
    > We are not building an app. We are designing the digital infrastructure for access to higher education in the Dominican Republic.

    Most domains in the country already have a single entry point. Banking has one. Government services have one. Higher education does not.

    ## The Problem

    Today, every university in the DR runs its own admissions process with its own forms and incompatible requirements. MESCYT, Supérate and private scholarships are scattered across separate portals, so many students never apply simply because they do not know they are eligible.

    **There is no national standard.**

    Chile has DEMRE. Colombia has ICFES. The United States has the Common App. The Dominican Republic had no equivalent.

    Until now.

    ## The Four Pillars

    ### 1. One-Touch Admission

    A student fills in their profile once: grades, documents, personal data. From there they apply to multiple universities without repeating forms or scanning the same papers ten times.

    - A single centralized profile
    - Simultaneous applications to multiple universities
    - Zero document duplication

    ### 2. Integrated Scholarships and Payments

    National and international scholarships filtered automatically against the student's profile. Application, status tracking and tuition payment, all inside the same platform.

    - A scholarship matching engine
    - Automatic filtering by profile
    - Real-time application tracking
    - An integrated payment gateway

    ### 3. Smart Guidance From Zero to Admitted

    An AI assistant explains every stage: which documents are needed, when to apply, what to do after a rejection, how to write a statement of purpose. Backed by an interactive checklist and a timeline personalized per student.

    - A contextualized AI assistant
    - An interactive checklist
    - A timeline personalized per student
    - Proactive notifications

    ### 4. Real Student Reviews

    Current students and alumni rate universities, programs and scholarships: teaching quality, student environment, university life, admission response time. No institutional filtering. Information from people who actually lived the experience.

    - Peer-verified ratings
    - Analysis by program and university
    - Filtering by specific criteria
    - Real-time experience reports

    ## Core Functionality

    ### For Students

    - **Personalized Dashboard**: a clear view of applications, scholarships and progress
    - **Single Profile**: data, documents and validations in one place
    - **Search Engine**: universities, programs and scholarships filtered by criteria
    - **Application Manager**: track the state of every submission
    - **Smart Notifications**: deadline reminders and status updates
    - **Student Community**: access to real reviews and experiences

    ### For Universities

    - **Admissions Portal**: centralized receipt of applications
    - **Process Management**: review and communication workflows
    - **Reports and Analytics**: data on application trends
    - **Data Integration**: automatic synchronization of admitted students

    ### For Scholarship Providers

    MESCYT, Supérate and private programs.

    - **Automatic Matchmaking**: identifies eligible students
    - **Application Management**: receipt, review and communication
    - **Beneficiary Tracking**: reporting on scholarship usage
    - **Document Validation**: reduces fraud and errors

    ## MVP: Three-Week Sprint to the Fair

    ### Week 1: Foundations

    - Student registration with profile
    - Document upload (certificates, transcripts)
    - Database of Dominican universities
    - Basic data validation

    ### Week 2: The Smart Engine

    - Scholarship engine (filtered by profile)
    - Step-by-step guide with checklist
    - Personalized timeline
    - Search across programs and universities

    ### Week 3: Community

    - Student reviews module
    - Dashboard with visual progress
    - Notification system
    - Experience reports

    ## The Real Differentiator: A Policy Proposal

    **UniPath is not only a software project.**

    It ships alongside a formal proposal for **MESCYT to adopt it as the official national admissions platform**. That turns the project into a **public policy proposal**, not just an app.

    ## Projected Impact

    These figures are projections from the current model, not measured results.

    - **Students**: a 90% reduction in application time
    - **Universities**: 80% automation of the admissions process
    - **Scholarships**: a 300% increase in correctly completed applications
    - **The country**: standardization of access to higher education

    ## Solution Architecture

    ```
    UniPath
    |-- Frontend (React + TypeScript + TailwindCSS)
    |   |-- Student Dashboard
    |   |-- Admissions Portal
    |   |-- Search Engine
    |   `-- Reviews Community
    |-- Backend (Supabase / PostgreSQL + Edge Functions)
    |   |-- Profile Management
    |   |-- Matching Engine
    |   |-- Document Processing
    |   `-- Notifications
    `-- Integrations
        |-- MESCYT
        |-- Universities
        |-- Payment Gateways
        `-- Storage Services
    ```

    ### Stack Notes

    **Frontend**: React for its ecosystem, TypeScript for type safety across a complex domain model, TailwindCSS for the interface layer.

    ```typescript
    interface StudentProfile {
      personalInfo: PersonalInfo;
      academicHistory: AcademicRecord[];
      preferences: UniversityPreferences;
      documents: Document[];
    }
    ```

    **Backend**: Supabase provided real-time subscriptions for application status, row-level security for sensitive student data, built-in authentication, and Edge Functions for AI integration.

    **AI**: Google's Gemini API powers the guidance assistant and the eligibility and matching logic.

    ## Stakeholders

    - Dominican students, applicants and current undergraduates
    - Universities, domestic and international
    - Scholarship programs: MESCYT, Supérate and private ones
    - MESCYT, the Ministry of Education
    - Tech partners: hosting, payments and storage

    ## Long-Term Vision

    - **Phase 1 (MVP)**: a functional platform covering Dominican universities
    - **Phase 2**: official adoption as a national standard
    - **Phase 3**: a comprehensive education platform covering graduate studies, courses and training

    ## Team

    - [Aram Musset](https://github.com/RamCodeZ3)
    - [Yeremy Pujols](https://github.com/yerepf)
    - [Rusber Batista](https://github.com/Rusber-B)
    - [Liz Constanzo](https://github.com/lizmconstanzo)

    > UniPath: From your profile to your future. Once, and for good.

    - Live: [unipath.page](https://unipath.page)
    - GitHub: [UniPath-Frontend](https://github.com/RamCodeZ3/UniPath-Frontend)
  es: |
    > No estamos creando una app, estamos diseñando la infraestructura digital para el acceso a la educación superior en República Dominicana.

    Casi todos los dominios del país ya tienen un punto de entrada único. La banca lo tiene. Los servicios del gobierno lo tienen. La educación superior no.

    ## El Problema

    Hoy en RD cada universidad tiene su propio proceso de admisión, formularios únicos y requisitos incompatibles. Las becas del MESCYT, Supérate y privadas están dispersas en distintos portales, muchas sin solicitar por puro desconocimiento.

    **No existe un estándar nacional.**

    Chile tiene DEMRE, Colombia tiene ICFES, Estados Unidos tiene Common App. República Dominicana no tenía nada equivalente.

    Hasta ahora.

    ## Los 4 Pilares de UniPath

    ### 1. Admisión de un Toque

    El estudiante llena su perfil **una sola vez**: notas, documentos, datos personales. Desde ahí aplica a múltiples universidades sin repetir formularios ni escanear los mismos papeles diez veces.

    - Registro único y centralizado
    - Aplicaciones simultáneas a universidades
    - Cero duplicación de documentos

    ### 2. Becas y Pagos Integrados

    Becas nacionales e internacionales filtradas automáticamente según el perfil del estudiante. Solicitud, seguimiento de estatus y pago de aranceles universitarios en la misma plataforma.

    - Motor de becas inteligente
    - Filtrado automático por perfil
    - Seguimiento de solicitudes en tiempo real
    - Pasarela de pagos integrada

    ### 3. Guía Inteligente de Cero a Admitido

    Un asistente con IA explica cada etapa: qué documentos necesitas, cuándo aplicar, qué hacer si te rechazan, cómo escribir una carta de motivación. Con checklist interactivo y línea de tiempo personalizada.

    - Asistente IA contextualizado
    - Checklist interactivo
    - Timeline personalizado por estudiante
    - Notificaciones proactivas

    ### 4. Reseñas Reales de Estudiantes

    Estudiantes actuales y egresados califican universidades, carreras y becas: calidad docente, ambiente estudiantil, vida universitaria, tiempo de respuesta de admisión. Sin filtros institucionales. Información auténtica de quien vive la experiencia.

    - Calificaciones verificadas por pares
    - Análisis por carrera y universidad
    - Filtros por criterios específicos
    - Reportes de experiencia en tiempo real

    ## Funcionalidades Clave

    ### Para Estudiantes

    - **Dashboard Personalizado**: visión clara de aplicaciones, becas y progreso
    - **Perfil Único**: datos, documentos y validaciones en un solo lugar
    - **Motor de Búsqueda**: universidades, carreras y becas filtradas por criterios
    - **Gestor de Aplicaciones**: seguimiento del estado de cada solicitud
    - **Notificaciones Inteligentes**: recordatorios de plazos y actualizaciones
    - **Comunidad de Estudiantes**: acceso a reseñas y experiencias reales

    ### Para Universidades

    - **Portal de Admisiones**: recepción centralizada de aplicaciones
    - **Gestión de Procesos**: flujos de revisión y comunicación
    - **Reportes y Analítica**: datos sobre tendencias de aplicación
    - **Integración de Datos**: sincronización automática de admitidos

    ### Para Becas (MESCYT, Supérate, Privadas)

    - **Matchmaking Automático**: identifica estudiantes elegibles
    - **Gestión de Solicitudes**: recepción, revisión y comunicación
    - **Seguimiento de Beneficiarios**: reportes sobre uso de becas
    - **Validación de Documentos**: reducción de fraude y errores

    ## MVP: Feria en 3 Semanas

    ### Semana 1: Cimientos

    - Registro de estudiante con perfil
    - Carga de documentos (certificados, notas)
    - Base de datos de universidades dominicanas
    - Validación básica de datos

    ### Semana 2: Motor Inteligente

    - Motor de becas (filtrado por perfil)
    - Guía paso a paso con checklist
    - Línea de tiempo personalizada
    - Búsqueda de carreras y universidades

    ### Semana 3: Comunidad

    - Módulo de reseñas de estudiantes
    - Dashboard con progreso visual
    - Sistema de notificaciones
    - Reportes de experiencia

    ## El Diferenciador Real: Una Propuesta de Ley

    **UniPath no es solo un proyecto de software.**

    Viene acompañado de una propuesta para que el **MESCYT lo adopte como plataforma oficial nacional de admisiones**. Esto convierte el proyecto en una **propuesta de política pública**, no solo en una app.

    ## Impacto Proyectado

    Estas cifras son proyecciones derivadas del modelo actual, no resultados medidos.

    - **Estudiantes**: reducción del 90% en tiempo de aplicación
    - **Universidades**: automatización del 80% del proceso de admisión
    - **Becas**: aumento del 300% en solicitudes correctamente completadas
    - **Nación**: estandarización del acceso a educación superior

    ## Arquitectura de Solución

    ```
    UniPath
    |-- Frontend (React + TypeScript + TailwindCSS)
    |   |-- Dashboard del Estudiante
    |   |-- Portal de Admisiones
    |   |-- Motor de Búsqueda
    |   `-- Comunidad de Reseñas
    |-- Backend (Supabase / PostgreSQL + Edge Functions)
    |   |-- Gestión de Perfiles
    |   |-- Motor de Matching
    |   |-- Procesamiento de Documentos
    |   `-- Notificaciones
    `-- Integraciones
        |-- MESCYT
        |-- Universidades
        |-- Pasarelas de Pago
        `-- Servicios de Almacenamiento
    ```

    ### Notas del Stack

    **Frontend**: React por su ecosistema, TypeScript para seguridad de tipos en un modelo de dominio complejo, TailwindCSS para la capa de interfaz.

    ```typescript
    interface StudentProfile {
      personalInfo: PersonalInfo;
      academicHistory: AcademicRecord[];
      preferences: UniversityPreferences;
      documents: Document[];
    }
    ```

    **Backend**: Supabase proporcionó suscripciones en tiempo real para el estado de aplicaciones, seguridad a nivel de fila para datos sensibles, autenticación integrada y Edge Functions para la integración con IA.

    **IA**: La API Gemini de Google alimenta el asistente de guía y la lógica de elegibilidad y matching.

    ## Stakeholders

    - Estudiantes dominicanos, solicitantes y undergraduates actuales
    - Universidades, nacionales e internacionales
    - Programas de becas: MESCYT, Supérate y privados
    - MESCYT, el Ministerio de Educación
    - Tech partners: hosting, pagos y almacenamiento

    ## Visión de Largo Plazo

    - **Fase 1 (MVP)**: plataforma funcional con universidades dominicanas
    - **Fase 2**: adopción oficial como estándar nacional
    - **Fase 3**: plataforma de educación integral (postgrados, cursos, capacitación)

    ## Equipo

    - [Aram Musset](https://github.com/RamCodeZ3)
    - [Yeremy Pujols](https://github.com/yerepf)
    - [Rusber Batista](https://github.com/Rusber-B)
    - [Liz Constanzo](https://github.com/lizmconstanzo)

    > UniPath: Desde tu perfil hasta tu futuro. Una vez, para siempre.

    - Demo: [unipath.page](https://unipath.page)
    - GitHub: [UniPath-Frontend](https://github.com/RamCodeZ3/UniPath-Frontend)
image: "/ITLA2026Win.webp"
tags: ["React", "TypeScript", "Supabase", "PostgreSQL", "Gemini API", "AI", "EdTech"]
category: "project-deep-dive"
relatedProjects: ["unipath"]
date: 2026-04-15
updatedDate: 2026-09-30
shortId: "unipath"
author: "Yeremy Pujols"
readingTime: 15
---
