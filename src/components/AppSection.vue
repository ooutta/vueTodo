<template>
    <div>
        <TodoHeadere @add-todo="addTodo"/>
        <TodoListVue :todos="todos" @remove-todo="removeTodo"/>
    </div>
</template>

<script setup>
import TodoListVue from './todos/TodoList.vue';
import TodoHeadere from './todos/TodoHeadere.vue';

defineProps({
    todos: {
        type: Array,
    }
});

const emit = defineEmits(['add-todo', 'remove-todo']);

const addTodo = (newTodo) => {
    emit('add-todo', newTodo);
}

const removeTodo = (todo) => {
    emit('remove-todo', todo);
}
</script>

<style lang="scss" scoped>

</style>