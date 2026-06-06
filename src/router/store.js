// Ini Codenya buat sndiri, bukan template dari vuex.
// Buat store data login
import { createStore } from "vuex";

function getCurrentUser(){
    try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch (error) {
        localStorage.removeItem('currentUser');
        return null;
    }
}

const store = createStore({
    state: {
        // isLoggedIn: false,
        token: localStorage.getItem('token') || null,
        currentUser: getCurrentUser()
    },
    mutations: {
        setLoggedIn(state, payload){
            if(!payload || payload === false){
                state.token = null;
                state.currentUser = null;
                localStorage.removeItem('token');
                localStorage.removeItem('currentUser');
                return;
            }

            const token = typeof payload === 'string' ? payload : payload.token;
            const user = typeof payload === 'string' ? null : payload.user;

            state.token = token;
            state.currentUser = user;
            localStorage.setItem('token', token);

            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }
    }
});

export default store;
