## GASDI

Este repositorio alberga el desarrollo de una aplicación web Full-Stack diseñada para resolver la división de gastos en juntadas.

El objetivo principal es automatizar el cálculo de saldos y optimizar las transferencias necesarias para liquidar las deudas.

---

## Arquitectura y Stack Tecnológico

Para garantizar un entorno de desarrollo moderno, ágil y escalable, el proyecto se construye sobre los siguientes pilares tecnológicos:

* **Frontend:** [React](https://react.dev/) (JavaScript) + [Vite](https://vitejs.dev/)
  * Utilizado para la construcción de una interfaz de usuario modular, declarativa y basada en componentes de grano fino (pantalla pasiva). Se prioriza el manejo eficiente del estado y la reactividad. Vite proporciona un entorno de desarrollo local ultra rápido con *Hot Module Replacement* (HMR).
* **Backend:** [Python](https://www.python.org/) + [Flask](https://flask.palletsprojects.com/)
  * API REST robusta que actúa como el cerebro de la aplicación. Maneja el algoritmo matemático de división de gastos y se comunica de forma centralizada con la base de datos mediante el SDK de Administración, asegurando la integridad de las transacciones. El código está preparado para ser estandarizado mediante herramientas de calidad configurables vía `pyproject.toml`.
* **Persistencia en la Nube:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
  * Base de datos NoSQL jerárquica (arquitectura de subcolecciones) que almacena de forma segura los registros de grupos, gastos y participantes.
* **Contenerización:** [Docker](https://www.docker.com/)
  * Toda la aplicación se encuentra contenerizada para abstraer el entorno de ejecución. Esto garantiza la paridad entre entornos (desarrollo, *staging* y producción).

---

## Principios de Diseño y Arquitectura de Software

El desarrollo de esta solución aplica rigurosas buenas prácticas de diseño de software:

1.  **Arquitectura Orientada a Servicios (SOA):** La lógica de negocio está 100% aislada en el servidor backend. El frontend de React opera como un cliente "tonto" que consume los *endpoints* REST, lo que previene manipulaciones de datos en el navegador y prepara el terreno para futuras aplicaciones móviles.
2.  **Principios SOLID y Responsabilidad Única:** Diseñado bajo una estructura donde cada componente de React y cada módulo de Python tiene una única responsabilidad. Esto permite que nuevas funcionalidades se puedan extender sin modificar el núcleo del código existente.
3.  **Seguridad de Acceso:** El backend opera con credenciales privadas (Service Account), aislando la capa de datos críticos de la exposición pública del cliente web.

---

## Funcionalidades Planificadas e Implementadas

* **Gestión de Participantes:** Alta y baja de los miembros que integran el grupo.
* **Registro de Gastos:** Formulario dinámico para ingresar el concepto del gasto, el monto total y especificar de forma unívoca quién realizó el pago y quiénes consumieron.
* **Algoritmo de Compensación Óptima:** Motor matemático estructurado en Programación Orientada a Objetos (Python) que reduce al mínimo el número de transacciones necesarias.
* **Resumen de Balances:** Tablero visual claro con el saldo de cada participante y las instrucciones exactas de transferencia (Ej: *"Luciano le tiene que transferir $1,500.50 a Nahuel"*).

---

## Instalación y Ejecución Local

### Fase 1: Configuración del Backend (API REST)

1. **Ubicarse en el directorio del servidor y crear el entorno virtual:**
   ```bash
   cd backend
   py -m venv venv
   ```
2. **Activar el entorno virtual:**
   * En Windows: `.\venv\Scripts\activate`
   * En macOS/Linux: `source venv/bin/activate`
3. **Instalar dependencias:**
   ```bash
   py -m pip install Flask flask-cors firebase-admin
   ```
4. **Credenciales Privadas:**
   Colocá tu archivo `firebase-key.json` (generado desde la consola de cuentas de servicio de Google Cloud) en la raíz de la carpeta `backend/`. **Asegurate de que este archivo esté incluido en tu `.gitignore`.**
5. **Levantar el motor backend:** (si se usa docker, no hace falta esta parte)
   ```bash
   py main.py
   ```
   *El servidor quedará escuchando en `http://127.0.0.1:8080/`.*

### Fase 2: Configuración del Frontend (React + Vite)

1. **Abrir una nueva terminal y ubicarse en el cliente:**
   ```bash
   cd frontend
   ```
2. **Instalar dependencias de Node:**
   ```bash
   npm install
   ```
3. **Configuración de Variables de Entorno:**
   Creá un archivo `.env` en la raíz de la carpeta `frontend/` y agregá tus credenciales públicas de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```
4. **Levantar la interfaz web:**  (si se usa docker, no hace falta esta parte)
   ```bash
   npm run dev
   ```

---

## Ejecución con Docker (Opcional)

Si preferís levantar ambos servicios simultáneamente mediante contenedores, asegurate de tener instalados [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) y ejecutá:
```bash
docker compose up --build
```
