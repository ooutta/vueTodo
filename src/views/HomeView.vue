<script setup>
import AppHeader from '../components/AppHeader.vue';
import AppSection from '../components/AppSection.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { useTodoStore } from '../stores/todo';
import { storeToRefs } from 'pinia';

// pinia의 stroe를 사용하려면 해당 store를 import
const todoStore = useTodoStore();

// 디스트럭처링할 경우, 반응성이 깨짐
// const { todos } = todoStroe;
// console.log(todos);

const { filteredTodosByCategory } = storeToRefs(todoStore);

const dummyTodos = filteredTodosByCategory;


const newTodoId = dummyTodos.value.length;
const addTodo = (newTodo) => {
    dummyTodos.value.push({id: newTodoId + 1, title: newTodo.title, summary: newTodo.summary, category: newTodo.category});
    // dummyTodos.value.push({id: newTodoId + 1, title: newTodo.title.value, summary: newTodo.summary.value, category: newTodo.category.value});
    // console.log(dummyTodos.value);
}

const removeTodo = (todo) => {
    console.log(todo);
    dummyTodos.value = dummyTodos.value.filter((t) => t.id !== todo);
    // dummyTodos.value.find(todo);
}
</script>

<template>
    <DefaultLayout>
        <AppHeader />
        <AppSection :todos="dummyTodos" @add-todo="addTodo" @remove-todo="removeTodo"/>
    </DefaultLayout>
</template>