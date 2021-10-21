export const namespaced = false;

export const state = () => ({
  otp: null,
  phone: null,
});

export const getters = {

};

export const actions = {

};

export const mutations = {
  setVerificationData(state, phone) {
    localStorage.setItem('m_verificationPhone', phone);
    state.phone = phone;
  },
};
