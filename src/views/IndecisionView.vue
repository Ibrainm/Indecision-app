<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<script lang="ts" setup>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import { useChat } from '@/composables/useChat';

const {messages, onMessage} = useChat();

</script>

<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Zhifeng</span>
    </div>

    <!-- Chat messages -->
    <ChatMessages :messages="messages" />

    <!-- Message box -->
    <MessageBox @send-message="onMessage($event)"/>
  </div>
</template>