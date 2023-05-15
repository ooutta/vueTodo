<template>
    <ul class="text-white px-0 my-8">

        <TodoItem 
            v-for="item in todos" 
            :key="item.id"
            :todo="item" 
            @remove-todo="removeTodo"/>
    </ul>
</template>

<script setup>
import TodoItem from './TodoItem.vue';

defineProps({
    todos: {
        type: Array,
    }
});

const emit = defineEmits(['remove-todo']);

const removeTodo = (todo) => {
    emit('remove-todo', todo);
}

</script>

<style lang="scss" scoped>

</style>