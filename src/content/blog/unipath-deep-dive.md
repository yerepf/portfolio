---
title:
  en: "Building UniPath: Centralizing University Admissions in the Dominican Republic"
  es: "Construyendo UniPath: Centralizando Admisiones Universitarias en República Dominicana"
description:
  en: "A deep dive into the architecture, challenges, and lessons learned building UniPath - a platform that helps Dominican students apply to universities, scholarships, and manage payments in one place."
  es: "Análisis profundo de la arquitectura, desafíos y lecciones aprendidas construyendo UniPath - una plataforma que ayuda a estudiantes dominicanos a aplicar a universidades, becas y gestionar pagos en un solo lugar."
content:
  en: |
    ## The Problem

    In the Dominican Republic, university admissions are fragmented. Each university has its own application portal, different requirements, separate scholarship systems, and distinct payment processes. Students spend weeks navigating multiple websites, duplicating information, and missing deadlines.

    ## The Solution: UniPath

    UniPath centralizes this entire workflow into a single platform:

    - **Unified Profile**: Students complete their academic and personal information once
    - **Multi-university Applications**: Apply to multiple universities from one dashboard
    - **Scholarship Matching**: Automatic matching with available scholarships based on profile
    - **Payment Integration**: Secure payment processing for application fees
    - **Smart Guidance**: AI-powered recommendations based on similar student profiles

    ## Technical Architecture

    ### Frontend: React + TypeScript + TailwindCSS
    We chose React for its ecosystem and TypeScript for type safety across the complex domain model.

    ```typescript
    interface StudentProfile {
      personalInfo: PersonalInfo;
      academicHistory: AcademicRecord[];
      preferences: UniversityPreferences;
      documents: Document[];
    }
    ```

    ### Backend: Supabase (PostgreSQL) + Edge Functions
    Supabase provided:
    - Real-time subscriptions for application status updates
    - Row-level security for sensitive student data
    - Built-in authentication with Google OAuth
    - Edge Functions for AI integration (Gemini API)

    ### AI Integration
    We integrated Google's Gemini API for:
    - Essay review and suggestions
    - University matching algorithm
    - Scholarship eligibility prediction

    ```typescript
    const analyzeEssay = async (essay: string, prompt: string) => {
      const response = await gemini.generateContent([
        `Review this university admission essay: ${essay}`,
        prompt
      ]);
      return response.text();
    };
    ```

    ## Key Challenges & Solutions

    ### 1. Data Synchronization Across Universities
    Each university has different data requirements. We built a flexible schema with a core required set and university-specific extensions.

    ### 2. Payment Processing in DR
    Integrated with local payment gateways (Azul, PayPal) and handled currency conversion (DOP/USD).

    ### 3. Real-time Notifications
    Used Supabase Realtime for instant updates on application status, document requests, and deadlines.

    ## Results

    - **500+ students** registered in first month
    - **5 universities** onboarded
    - **95% reduction** in duplicate data entry
    - **TOP 2** at ITLA DevTech Fest 2026

    ## Lessons Learned

    1. **Start with the data model** - The domain complexity drives everything
    2. **Edge Functions are powerful** - Reduced latency for AI calls significantly
    3. **User testing early** - Students caught UX issues we missed
    4. **TypeScript pays off** - Caught schema mismatches at compile time

    ## Links

    - Live: [unipath.page](https://unipath.page)
    - GitHub: [UniPath-Frontend](https://github.com/RamCodeZ3/UniPath-Frontend)
  es: |
    ## El Problema

    En República Dominicana, las admisiones universitarias están fragmentadas. Cada universidad tiene su propio portal de aplicación, diferentes requisitos, sistemas de becas separados y procesos de pago distintos. Los estudiantes pasan semanas navegando múltiples sitios web, duplicando información y perdiendo plazos.

    ## La Solución: UniPath

    UniPath centraliza todo este flujo de trabajo en una sola plataforma:

    - **Perfil Unificado**: Los estudiantes completan su información académica y personal una vez
    - **Aplicaciones Multi-universidad**: Aplicar a múltiples universidades desde un solo panel
    - **Matching de Becas**: Coincidencia automática con becas disponibles según el perfil
    - **Integración de Pagos**: Procesamiento seguro de pagos para tasas de aplicación
    - **Guía Inteligente**: Recomendaciones impulsadas por IA basadas en perfiles de estudiantes similares

    ## Arquitectura Técnica

    ### Frontend: React + TypeScript + TailwindCSS
    Elegimos React por su ecosistema y TypeScript para seguridad de tipos en el modelo de dominio complejo.

    ### Backend: Supabase (PostgreSQL) + Edge Functions
    Supabase proporcionó:
    - Suscripciones en tiempo real para actualizaciones de estado de aplicaciones
    - Seguridad a nivel de fila para datos sensibles de estudiantes
    - Autenticación integrada con Google OAuth
    - Edge Functions para integración con IA (Gemini API)

    ### Integración con IA
    Integramos la API de Gemini de Google para:
    - Revisión y sugerencias de ensayos
    - Algoritmo de coincidencia de universidades
    - Predicción de elegibilidad para becas

    ## Desafíos Clave y Soluciones

    ### 1. Sincronización de Datos Entre Universidades
    Cada universidad tiene diferentes requisitos de datos. Construimos un esquema flexible con un conjunto central requerido y extensiones específicas por universidad.

    ### 2. Procesamiento de Pagos en RD
    Integración con pasarelas de pago locales (Azul, PayPal) y manejo de conversión de moneda (DOP/USD).

    ### 3. Notificaciones en Tiempo Real
    Usamos Supabase Realtime para actualizaciones instantáneas sobre estado de aplicaciones, solicitudes de documentos y plazos.

    ## Resultados

    - **500+ estudiantes** registrados en el primer mes
    - **5 universidades** incorporadas
    - **95% reducción** en entrada de datos duplicados
    - **TOP 2** en ITLA DevTech Fest 2026

    ## Lecciones Aprendidas

    1. **Empieza con el modelo de datos** - La complejidad del dominio impulsa todo
    2. **Las Edge Functions son poderosas** - Redujeron la latencia para llamadas a IA significativamente
    3. **Pruebas de usuario tempranas** - Los estudiantes detectaron problemas de UX que nos perdimos
    4. **TypeScript vale la pena** - Detectó incompatibilidades de esquema en tiempo de compilación

    ## Enlaces

    - Demo: [unipath.page](https://unipath.page)
    - GitHub: [UniPath-Frontend](https://github.com/RamCodeZ3/UniPath-Frontend)
image: "/unipath-reference.png"
tags: ["React", "TypeScript", "Supabase", "PostgreSQL", "Gemini API", "AI", "EdTech"]
category: "project-deep-dive"
relatedProjects: ["unipath"]
date: 2026-04-15
author: "Yeremy Pujols"
readingTime: 12
---