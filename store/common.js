export const state = () => ({
    loader: false,
    panelOpen: false,
    burgerActive: false,
});

export const mutations = {
    setLoader(state, payload) {
        state.loader = payload;
    },
    setPanel(state, payload) {
        state.panelOpen = payload;
    },
    setBurger(state, payload) {
        state.burgerActive = payload;
    },
};

export const actions = {};

export const getters = {
    isLoading(state) {
        return state.loader;
    },
    isPanelOpen(state) {
        return state.panelOpen;
    },
    isBurgerActive(state) {
        return state.burgerActive;
    },
};