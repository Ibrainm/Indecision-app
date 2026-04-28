# Indecision App 🤔

## Descripción general

Indecision App es una aplicación de chat interactiva construida con Vue 3 para practicar los conceptos fundamentales del framework. El chat está conectado a la API pública [yes-no-wtf](https://yes-no-wtf.vercel.app/api): cada vez que el usuario envía un mensaje que termina con `?`, la app consulta la API y muestra una respuesta visual (imagen + texto) de "yes", "no" o "maybe".

---

## Tecnologías

| Tecnología       | Versión   | Uso                                      |
|------------------|-----------|------------------------------------------|
| HTML5            | —         | Estructura semántica de la aplicación    |
| TypeScript       | ^5.x      | Tipado estático en componentes y lógica  |
| Vue 3            | ^3.x      | Framework principal (Composition API)    |
| Vue Router       | ^4.x      | Navegación entre vistas                  |
| Tailwind CSS     | ^3.x      | Estilos y utilidades CSS                 |
| Vite             | ^5.x      | Servidor de desarrollo y bundler         |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior

---

## Guía de inicio rápido

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/indecision-app.git
cd indecision-app

# 2. Instala las dependencias
npm install

# 3. Levanta el servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:5173` y comienza a chatear. Escribe cualquier mensaje y termínalo con `?` para obtener una respuesta de la API.

---

## Conceptos practicados

### 1. Single File Components (SFC)

Un SFC es un archivo `.vue` que encapsula en un solo lugar las tres partes de un componente: la lógica (`<script>`), la plantilla HTML (`<template>`) y los estilos (`<style>`). Esto facilita la organización, el mantenimiento y la reutilización del código.

En este proyecto cada pieza visual es un SFC independiente, por ejemplo `ChatBubble.vue` solo se encarga de renderizar una burbuja de mensaje, mientras que `MessageBox.vue` gestiona el input del usuario.

```vue
<!-- src/components/chat/ChatBubble.vue -->
<script lang="ts" setup>
  // lógica del componente
</script>

<template>
  <!-- estructura HTML -->
</template>

<style scoped>
  /* estilos aislados */
</style>
```

---

### 2. Props

Las Props son la forma en que un componente padre le pasa datos a un componente hijo. Son de **solo lectura** desde el hijo, lo que mantiene un flujo de datos unidireccional y predecible.

En este proyecto, `MyCounter.vue` recibe una prop opcional `value` de tipo `number` para inicializar el contador:

```typescript
// src/components/MyCounter.vue
interface Props {
  value?: number;
}
const props = defineProps<Props>();
```

---

### 3. Computed

Una propiedad `computed` es un valor derivado que Vue recalcula **automáticamente** solo cuando alguna de sus dependencias reactivas cambia. Es ideal para transformar o combinar datos sin ensuciar la plantilla.

En el composable `useCounter`, `squareCounter` se recalcula cada vez que `counter` cambia:

```typescript
// src/composables/useCounter.ts
const counter = ref(initialValue);
const squareCounter = computed(() => counter.value * counter.value);
```

---

### 4. Emits

Los Emits son el mecanismo para que un componente hijo notifique eventos al padre. El hijo emite un evento con `defineEmits` y el padre lo escucha con `@nombre-del-evento`.

En `MessageBox.vue`, cuando el usuario presiona Enter o el botón de enviar, el componente emite el evento `sendMessage` con el texto escrito:

```typescript
// src/components/chat/MessageBox.vue
const emit = defineEmits<{ sendMessage: [text: string] }>();

const sendMessage = () => {
  emit('sendMessage', message.value);
};
```

---

### 5. Composables

Un Composable es una función reutilizable que encapsula **estado reactivo y lógica** relacionada, siguiendo el patrón de la Composition API de Vue. Permiten compartir lógica entre componentes sin necesidad de herencia ni mixins.

Este proyecto tiene dos composables:

- **`useCounter`** — Maneja el estado del contador y su cuadrado.
- **`useChat`** — Administra la lista de mensajes, el envío del mensaje del usuario y la consulta a la API.

```typescript
// src/composables/useChat.ts
export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);

  const onMessage = async (text: string) => {
    messages.value.push({ id: Date.now(), itsMine: true, message: text });

    if (!text.endsWith('?')) return;

    const { answer, image } = await getHisResponse();
    messages.value.push({ id: Date.now(), itsMine: false, message: answer, image });
  };

  return { messages, onMessage };
};
```

---

### 6. API REST

Una API REST es un servicio web que expone datos a través de peticiones HTTP estándar (`GET`, `POST`, etc.). En este proyecto se consume la API [yes-no-wtf](https://yes-no-wtf.vercel.app/api) mediante `fetch`.

Cuando un mensaje termina con `?`, el composable `useChat` hace una petición `GET` y mapea la respuesta a la interfaz `YesNoResponse`:

```typescript
// src/composables/useChat.ts
const getHisResponse = async () => {
  const resp = await fetch('https://yes-no-wtf.vercel.app/api');
  const data = await resp.json() as YesNoResponse;
  return data;
};
```

```typescript
// src/interfaces/yes-no.interface.ts
interface YesNoResponse {
  answer: string;  // "yes" | "no" | "maybe"
  image: string;   // URL del GIF
}
```

---

## Estructura del proyecto

```
indecision-app/
├── public/                     # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatBubble.vue      # Burbuja individual de mensaje
│   │   │   ├── ChatMessages.vue    # Lista de mensajes del chat
│   │   │   └── MessageBox.vue      # Input y botón de envío
│   │   ├── my-counter-screen/
│   │   │   ├── MyCounterScript2.ts
│   │   │   └── MyCounterScript2.vue
│   │   ├── MyCounter.vue           # Componente contador con props
│   │   └── MyCounterScript.vue
│   ├── composables/
│   │   ├── useChat.ts              # Lógica del chat + llamada a la API
│   │   └── useCounter.ts           # Lógica del contador con computed
│   ├── helpers/
│   │   └── sleep.ts                # Utilidad para simular delay
│   ├── interfaces/
│   │   ├── char-message.interface.ts   # Tipado de mensajes del chat
│   │   └── yes-no.interface.ts         # Tipado de respuesta de la API
│   ├── views/
│   │   └── IndecisionView.vue      # Vista principal del chat
│   ├── App.vue                     # Componente raíz
│   ├── main.ts                     # Punto de entrada
│   └── style.css                   # Estilos globales
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```
