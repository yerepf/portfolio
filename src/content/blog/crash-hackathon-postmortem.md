---
title:
  en: "C.R.A.S.H.: Building a NASA Asteroid Impact Simulator in 32 Hours"
  es: "C.R.A.S.H.: Construyendo un Simulador de Impacto de Asteroides de la NASA en 32 Horas"
description:
  en: "Postmortem of the NSAC2025 hackathon project where we built a 3D asteroid impact simulator using real NASA data, CesiumJS, and Three.js in just 32 hours."
  es: "Postmortem del proyecto del hackathon NSAC2025 donde construimos un simulador 3D de impacto de asteroides usando datos reales de la NASA, CesiumJS y Three.js en solo 32 horas."
content:
  en: |
    ## The Challenge

    **NSAC2025** (NASA Space Apps Challenge) - 32 hours to build something meaningful with NASA's open data. Our team chose the "Asteroid Impact Simulation" challenge.

    ## The Stack (Chosen for Speed)

    - **CesiumJS** - 3D globe visualization (NASA's choice for geospatial)
    - **Three.js** - Custom asteroid/impact visualizations
    - **React + TypeScript** - Frontend framework
    - **FastAPI + Python** - Backend for NASA API integration
    - **MapBox** - Base maps and terrain
    - **TailwindCSS** - Rapid UI development

    ## Architecture Decisions

    ### 1. Split Rendering: Cesium for Globe, Three.js for Effects
    Cesium handles the Earth, terrain, and satellite imagery. Three.js overlays custom asteroid trajectories, impact effects, and particle systems.

    ```typescript
    // Cesium viewer setup
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain(),
      imageryProvider: new Cesium.IonImageryProvider({ assetId: 3954 })
    });

    // Three.js overlay for custom effects
    const threeScene = new THREE.Scene();
    const asteroidMesh = createAsteroidMesh(data.diameter);
    ```

    ### 2. NASA Data Pipeline
    Real-time data from:
    - **NASA CNEOS API** - Near Earth Object data
    - **JPL Small Body Database** - Orbital parameters
    - **SENTRY Risk List** - Impact probabilities

    ```python
    # FastAPI endpoint
    @app.get("/api/asteroids")
    async def get_asteroids():
        neo_data = await fetch_nasa_neo()
        sentry_data = await fetch_sentry_risk()
        return combine_and_enrich(neo_data, sentry_data)
    ```

    ### 3. Impact Physics Simulation
    Simplified but visually accurate:
    - Kinetic energy calculation: `E = 0.5 * m * v²`
    - Crater diameter scaling (based on published models)
    - Ejecta particle system with Three.js Points

    ## What Went Well

    1. **Pre-hackathon prep** - We set up the Cesium + Three.js integration the week before
    2. **Clear data contracts** - TypeScript interfaces matched Python Pydantic models
    3. **Parallel workstreams** - One person on data, one on 3D, one on UI
    4. **Scope discipline** - Cut features ruthlessly (no user accounts, no saving)

    ## What We'd Do Differently

    1. **Better state management** - React Context got messy with 3D scene state
    2. **Automated deployment** - Manual Vercel + Railway deploys wasted time
    3. **More NASA data caching** - API rate limits hit during demo

    ## The Result

    - **Functional simulator** with real asteroid data
    - **Interactive 3D globe** with impact visualization
    - **Risk assessment panel** showing probability, energy, crater size
    - **Live at**: [crashnasa.earth](https://crashnasa.earth)

    ## Key Takeaways for Hackathons

    - **Pick boring tech you know well** - Now is not the time to learn a new framework
    - **Design the data flow first** - Frontend/Backend contract saves hours
    - **Deploy early, deploy often** - Catch integration issues immediately
    - **Demo > Code quality** - Judges see the demo, not the Git history

    ## Links

    - Live: [crashnasa.earth](https://crashnasa.earth)
    - GitHub: [C.R.A.S.H.](https://github.com/yerepf)
  es: |
    ## El Desafío

    **NSAC2025** (NASA Space Apps Challenge) - 32 horas para construir algo significativo con los datos abiertos de la NASA. Nuestro equipo eligió el desafío de "Simulación de Impacto de Asteroides".

    ## El Stack (Elegido por Velocidad)

    - **CesiumJS** - Visualización de globo 3D (la elección de NASA para geoespacial)
    - **Three.js** - Visualizaciones personalizadas de asteroides/impactos
    - **React + TypeScript** - Framework frontend
    - **FastAPI + Python** - Backend para integración con APIs de NASA
    - **MapBox** - Mapas base y terreno
    - **TailwindCSS** - Desarrollo rápido de UI

    ## Decisiones de Arquitectura

    ### 1. Renderizado Dividido: Cesium para Globo, Three.js para Efectos
    Cesium maneja la Tierra, terreno e imágenes satelitales. Three.js superpone trayectorias de asteroides, efectos de impacto y sistemas de partículas.

    ### 2. Pipeline de Datos de NASA
    Datos en tiempo real de:
    - **API NASA CNEOS** - Datos de Objetos Cercanos a la Tierra
    - **Base de Datos de Cuerpos Pequeños JPL** - Parámetros orbitales
    - **Lista de Riesgo SENTRY** - Probabilidades de impacto

    ### 3. Simulación de Física de Impacto
    Simplificada pero visualmente precisa:
    - Cálculo de energía cinética: `E = 0.5 * m * v²`
    - Escalado de diámetro de cráter (basado en modelos publicados)
    - Sistema de partículas de eyección con Three.js Points

    ## Qué Salió Bien

    1. **Preparación pre-hackathon** - Configuramos la integración Cesium + Three.js la semana anterior
    2. **Contratos de datos claros** - Interfaces TypeScript coincidían con modelos Pydantic de Python
    3. **Flujos de trabajo paralelos** - Una persona en datos, una en 3D, una en UI
    4. **Disciplina de alcance** - Recortamos características sin piedad (sin cuentas de usuario, sin guardado)

    ## Qué Haríamos Distinto

    1. **Mejor gestión de estado** - React Context se volvió caótico con el estado de la escena 3D
    2. **Despliegue automatizado** - Despliegues manuales Vercel + Railway perdieron tiempo
    3. **Más caché de datos NASA** - Límites de rate de API durante la demo

    ## El Resultado

    - **Simulador funcional** con datos reales de asteroides
    - **Globo 3D interactivo** con visualización de impacto
    - **Panel de evaluación de riesgo** mostrando probabilidad, energía, tamaño de cráter
    - **En vivo en**: [crashnasa.earth](https://crashnasa.earth)

    ## Conclusiones Clave para Hackathons

    - **Elige tecnología aburrida que conozcas bien** - No es momento de aprender un framework nuevo
    - **Diseña el flujo de datos primero** - Contrato Frontend/Backend ahorra horas
    - **Despliega temprano, despliega seguido** - Detecta problemas de integración inmediato
    - **Demo > Calidad de código** - Los jueces ven la demo, no el historial de Git

    ## Enlaces

    - Demo: [crashnasa.earth](https://crashnasa.earth)
    - GitHub: [C.R.A.S.H.](https://github.com/yerepf)
image: "/CRASHReference.png"
tags: ["React", "TypeScript", "CesiumJS", "Three.js", "FastAPI", "Python", "NASA", "Hackathon", "3D"]
category: "project-deep-dive"
relatedProjects: ["crash"]
date: 2025-10-10
author: "Yeremy Pujols"
readingTime: 10
---