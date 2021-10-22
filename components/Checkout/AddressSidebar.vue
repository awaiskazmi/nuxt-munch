<template>
  <b-sidebar
    id="sidebar-address"
    width="460px"
    title="Sidebar"
    right
    backdrop
    shadow
    bg-variant="white"
    no-header
  >
    <template #default="{ hide }">
      <BaseButton isButton type="m-btn-action m-sidebar-close" @click="hide">
        <span class="material-icons">close</span>
      </BaseButton>
      <div class="d-flex flex-column justify-content-between h-100">
        <div class="py-6 px-3 px-md-4">
          <p class="my-4 h2 font-weight-bold">Add address details</p>
          <p>Please enter location details and label them</p>
          <p class="mt-3">
            <small><strong>Location details</strong></small>
          </p>
          <BaseInput
            placeholder="House no. / Flat no. / Floor / Building name"
            variant="md"
            v-model="address.details"
          />
          <p class="mt-3">
            <small><strong>Label</strong></small>
          </p>
          <div class="labels">
            <BaseRadio
              v-for="label in labels"
              :key="label.id"
              :id="label.id"
              :label="label.name"
              :value="label.name"
              :icon="label.icon"
              :checked="labelOption == label.name"
              v-model="labelOption"
              name="label"
              @change="updateLabelOption(label.name)"
            />
          </div>
          <div class="mt-3" v-if="labelOption == 'Other'">
            <BaseInput
              placeholder="Enter your custom label here"
              variant="md"
              v-model="address.label"
            />
          </div>
        </div>
        <div class="px-3 pb-4">
          <BaseButton @click="saveAddress" isButton type="primary" full
            >Save address details</BaseButton
          >
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      labels: [
        {
          id: 1,
          name: "Home",
          icon: "home",
        },
        {
          id: 2,
          name: "Work",
          icon: "work",
        },
        {
          id: 3,
          name: "Other",
          icon: "flag",
        },
      ],
      address: {
        details: this.$store.state.locationObj.details,
        label: this.$store.state.locationObj.label,
      },
      labelOption: this.$store.state.locationObj.labelOption,
    };
  },
  methods: {
    updateLabelOption(option) {
      this.labelOption = option;
      this.$store.commit("setUserLabelOption", option);
      if (option != "Other") {
        this.address.label = option;
      } else {
        this.address.label = null;
      }
    },
    saveAddress() {
      this.$emit("update", { ...this.address });
      this.$root.$emit("bv::toggle::collapse", "sidebar-address");
    },
  },
};
</script>

<style lang="css" scoped>
.labels {
  display: flex;
}
</style>
