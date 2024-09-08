import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: [],
        users: []
    },
    mutations: {
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        UPDATE_TASK(state, updatedTask) {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                Vue.set(state.tasks, index, updatedTask);
            }
        },
        DELETE_TASK(state, taskId) {
            state.tasks = state.tasks.filter(t => t.id !== taskId);
        },
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        SET_USERS(state, users) {
            state.users = users;
        }
    },
    actions: {
        addTask({ commit }, task) {
            return axios.post('api/tasks', task)
                .then(response => {
                    commit('ADD_TASK', response.data);
                })
                .catch(error => {
                    console.error("Error adding task:", error);
                });
        },
        completeTask({ commit }, taskId) {
            return axios.patch(`api/tasks/${taskId}/complete`)
                .then(response => {
                    commit('UPDATE_TASK', response.data);
                })
                .catch(error => {
                    console.error("Error completing task:", error);
                });
        },
        deleteTask({ commit }, taskId) {
            return axios.delete(`api/tasks/${taskId}`)
                .then(() => {
                    commit('DELETE_TASK', taskId);
                })
                .catch(error => {
                    console.error("Error deleting task:", error);
                });
        },
        fetchUsers({ commit }) {
            return axios.get('api/users')
                .then(response => {
                    commit('SET_USERS', response.data);
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                });
        },
        fetchTasks({ commit }) {
            return axios.get('api/tasks')
                .then(response => {
                    commit('SET_TASKS', response.data);
                })
                .catch(error => {
                    console.error("Error fetching tasks:", error);
                });
        }
    },
    getters: {
        tasks: state => state.tasks
    }
});
