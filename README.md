## GASDI

Este repositorio alberga el desarrollo de una aplicación web diseñada para resolver la división de gastos en juntadas.

El objetivo principal es automatizar el cálculo de saldos y optimizar las transferencias necesarias para liquidar las deudas.

---

## Arquitectura y Stack Tecnológico

Para garantizar un entorno de desarrollo moderno, ágil y escalable, el proyecto se construye sobre los siguientes pilares tecnológicos:

* **Frontend:** [React](https://react.dev/) (JavaScript)
  * Utilizado para la construcción de una interfaz de usuario modular, declarativa y basada en componentes de grano fino. Se prioriza el manejo eficiente del estado global y la reactividad para ofrecer una experiencia fluida al usuario.
* **Herramienta de Construcción (Build Tool):** [Vite](https://vitejs.dev/)
  * Seleccionado en reemplazo de bundles tradicionales debido a su velocidad disruptiva gracias al uso de ESM nativos. Proporciona un entorno de desarrollo local ultra rápido con *Hot Module Replacement* (HMR) casi instantáneo.
* **Contenerización:** [Docker](https://www.docker.com/)
  * Toda la aplicación se encuentra contenerizada para abstraer el entorno de ejecución. Esto garantiza la paridad entre entornos (desarrollo, *staging* y producción), asegurando que cualquier desarrollador pueda clonar el repositorio y levantar el proyecto con un único comando, sin lidiar con discrepancias en las versiones de Node.js o dependencias del sistema operativo.

---

## Principios de Diseño y Arquitectura de Software

El desarrollo de esta solución no solo busca resolver el problema matemático de la división de dinero, sino también aplicar rigurosas buenas prácticas de diseño de software:

1.  **Separación de Intereses:** La lógica de negocio (el algoritmo encargado de procesar los gastos y calcular las compensaciones óptimas) se mantiene 100% aislada de la capa de presentación (componentes de React). Es un motor en JavaScript puro, fácilmente testeable de forma unitaria.
2.  **Principios SOLID:** Diseñado bajo una estructura donde cada componente y módulo tiene una única responsabilidad (SRP), permitiendo que nuevas funcionalidades (como la división no equitativa) se puedan extender sin modificar el núcleo del código existente.
3.  **Persistencia y Escalabilidad:** La persistencia de datos está integrada con **Firebase Firestore** en la nube. Esto permite almacenar de forma segura y permanente los registros de gastos y participantes, sentando las bases arquitectónicas para la sincronización en tiempo real entre múltiples dispositivos en fases posteriores.

---

## Funcionalidades Planificadas

* **Gestión de Participantes:** Alta, baja y modificación de los miembros que integran la juntada.
* **Registro de Gastos:** Formulario dinámico para ingresar el concepto del gasto, el monto total y especificar de forma unívoca quién realizó el pago.
* **Algoritmo de Compensación Óptima:** Motor matemático que reduce al mínimo el número de transacciones necesarias entre los usuarios para saldar las deudas.
* **Resumen de Balances:** Tablero visual claro con el saldo de cada participante (quién está en positivo y quién en negativo) y las instrucciones exactas de transferencia (Ej: *"Luciano le tiene que transferir $1.500,50 a Nahuel"*).

---

## Instalación y Ejecución con Docker

Asegurate de tener instalados [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   cd nombre-del-repositorio
   ```

2. **Configuración de Variables de Entorno:**
   Para que la conexión con la base de datos funcione, es necesario crear un archivo `.env` en la raíz de la carpeta `frontend/` y agregar las credenciales de Firebase proporcionadas para el proyecto:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

3. **Despliegue con Docker:**
   Por último, ejecutá el siguiente comando en la terminal:
   ```bash
   docker compose up --build
   ```
