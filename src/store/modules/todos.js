import axios from 'axios';
 
const state = {
    todos: [
        {
            id: 1,
            title: "One Todo"
        },
        {
            id: 2,
            title: "Two Todo"
        }
    ]
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    fetchTodos({commit}) {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                // eslint-disable-next-line no-debugger
                debugger;
                commit('setTodos', response.data);
            })
            .catch(error => {
                alert(error);
            }) 
       
    },
    async addTodo({commit}, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos',
            {title: title, completed: false});
        commit('newTodo', response.data)
    },
    async deleteTodo( {commit}, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id);
    },
    async filterTodos ({commit}, e) {
        const limit = parseInt(e.target.value);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos', response.data);
    },
    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
        commit('modifyTodo', response.data)
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.push(todo),
   
    removeTodo: (state, id) => {
        state.todos = state.todos.filter(todo => todo.id !== id);
    },
    modifyTodo: (state, updatedTodo) => {
        const modifiedTodo = state.todos.find(todo => todo.id === updatedTodo.id);
        modifiedTodo.completed = updatedTodo.completed;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}