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
3.  **Persistencia y Escalabilidad:** En una primera fase, la persistencia se gestionará de manera local (*LocalStorage*). Sin embargo, la arquitectura está pensada de forma desacoplada para permitir, en fases avanzadas, la transición hacia una arquitectura de microservicios o la integración con bases de datos en la nube para habilitar la sincronización en tiempo real entre múltiples dispositivos.

---

## Funcionalidades Planificadas

* **Gestión de Participantes:** Alta, baja y modificación de los miembros que integran la juntada.
* **Registro de Gastos:** Formulario dinámico para ingresar el concepto del gasto, el monto total y especificar de forma unívoca quién realizó el pago.
* **Algoritmo de Compensación Óptima:** Motor matemático que reduce al mínimo el número de transacciones necesarias entre los amigos para saldar las deudas.
* **Resumen de Balances:** Tablero visual claro con el saldo de cada participante (quién está en positivo y quién en negativo) y las instrucciones exactas de transferencia (Ej: *"Tizi le tiene que transferir $1.500,50 al pajero del Enzo"*).

---

## Instalación y Ejecución con Docker

Asegurate de tener instalados [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/nombre-del-repositorio.git](https://github.com/tu-usuario/nombre-del-repositorio.git)
   cd nombre-del-repositorio
2. **Docker**
     ```bash
   docker compose up --build
   
