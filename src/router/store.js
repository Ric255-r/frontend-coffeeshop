// Ini Codenya buat sndiri, bukan template dari vuex.
// Buat store data login
import { createStore } from "vuex";

const store = createStore({
    state: {
        // isLoggedIn: false,
        token: localStorage.getItem('token') || null
    },
    mutations: {
        setLoggedIn(state, value){
            state.token = value;
            // Update LS Value
            localStorage.setItem('token', value);
        }
    }
});

export default store;