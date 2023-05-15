<template>
    <!-- submit.prevent : form 태그의 기본 동작 비활성화 -->
    <form @submit.prevent="addTodo" class="my-2">
      <p>
        <label class="block mb-2 text-xl text-white" htmlFor="title">Title</label>
        <input 
            v-model="title" 
            class="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded" type="text" id="title"/>
      </p>
      <p>
        <label class="block mb-2 text-xl text-white" htmlFor="summary">Summary</label>
        <textarea 
            v-model="summary" 
            class="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded" id="summary" rows="5" />
      </p>
      <p>
        <label class="block mb-2 text-xl text-white" htmlFor="category">Category</label>
        <select 
            v-model="category"
            class="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded" id="category" defaultValue="moderate">
            <option value="todo">📑 To do</option>
            <option value="progress">👀 On progress</option>
            <option value="done">😀 Done</option>
        </select>
      </p>
        <p v-if="isFormInValid" class="mt-2 text-red-500">
          Please fill out all forms!
        </p>
      <p class="flex justify-end gap-4">
        <button 
            @click="emit('close-modal')"
            class="text-xl text-white" type="button">  
            Cancel
        </button>
        <button 
            class="px-6 py-3 text-xl text-red-200" type="submit">
            Add
        </button>
      </p>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../../stores/todo';
const title = ref(''); // Todo 제목
const summary = ref(''); // Todo 내용
const category = ref('todo'); // Todo 카테고리, 기본값(초기값)은 todo

// close-modal : 부모에서 내려준 핸들러 이름
const emit = defineEmits(['close-modal', 'add-todo']);

const todoStore = useTodoStore();


const isFormInValid = ref(false); // form이 유효한지

const addTodo = () => {
    console.log('called');
    // 입력값 유효성 처리(검사) - Form Validation
    if(title.value.trim().length === 0 || summary.value.trim().length === 0) {
        isFormInValid.value = true;
        return;
    }
    
    // HomeView가 가지고 있는 dummyTodos 배열에 새로운 Todo 객체 추가
    // const newTodo = {
    //     title,
    //     summary,
    //     category
    // }
    const newTodo = {
        title: title.value,
        summary: summary.value,
        category: category.value
    }

    // emit('add-todo', newTodo); // emit 방식
    todoStore.addTodo(newTodo); // store 방식
    
    emit('close-modal');
}

</script>

<style lang="scss" scoped>

</style>