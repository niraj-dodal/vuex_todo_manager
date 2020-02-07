<template>
    <div>
        <h3>Todos</h3>
        <div class="todos">
            <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo" @dblclick="onDblClickTodo(todo)"
                v-bind:class="{'is-complete': todo.completed}">
                {{todo.title}}
                <i class="fa fa-trash" aria-hidden="true" @click="deleteSpecificTodo(todo.id)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "Todos",
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
        deleteSpecificTodo(id) {
            this.deleteTodo(id);
        },
        onDblClickTodo(todo) {
            const updatedTodo = {
                id: todo.id,
                title: todo.title,
                completed: !todo.completed
            }
            this.updateTodo(updatedTodo);
        }
    },
    computed: mapGetters(['allTodos']),
    created() {
        this.fetchTodos();
    }
}
</script>

<style scoped>
    .todos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .todo {
        border: 1px solid #ccc;
        background: #41b883;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }
    i {
        position:absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
    }
    .is-complete {
        color:#ccc;
        background: blue;
    }
</style>