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
      <form
        @submit="saveAddress"
        class="d-flex flex-column justify-content-between h-100"
      >
        <div class="pt-6 pb-2 px-3 px-md-4">
          <p class="my-4 h2 font-weight-bold">Add address details</p>
          <!-- <pre>My address details: {{ addressData }}</pre> -->
          <p>Please enter location details and label them</p>
          <!-- <pre>My saved addresses:</pre> -->
          <p class="mt-3">
            <small><strong>Location details</strong></small>
          </p>
          <BaseInput
            placeholder="House no. / Flat no. / Floor / Building name"
            variant="md"
            v-model="address.details"
            required
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
          <!-- If a user has saved addresses -->
          <div v-show="savedAddresses.length > 0">
            <p class="mt-4">Or choose an already saved address</p>
            <div
              v-for="add in savedAddresses"
              :key="add.id"
              class="mb-3 pointer"
              @click="chooseSavedAddress(add)"
            >
              <div class="row">
                <div class="col address-details">
                  <div class="row no-gutters align-items-center suggestion">
                    <div class="col-auto mr-3">
                      <img
                        src="~/assets/images/icon-location.svg"
                        height="24"
                      />
                    </div>
                    <div class="col pr-md-4">
                      <h6 class="font-weight-bold">
                        {{ add.locationName }}
                      </h6>
                      <p class="text-muted m-0">
                        <small
                          >{{ add.additionalDetails }} &mdash;
                          {{ add.poi }}</small
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <h6>{{ add.locationName }}</h6>
              <p class="mb-2 text-muted">{{ add.additionalDetails }}</p>
              <p class="m-0">{{ add.poi }}</p> -->
            </div>
          </div>
        </div>
        <div class="px-3 pb-4">
          <BaseButton :disabled="isAttemptingSave" isButton type="primary" full
            ><b-spinner v-show="isAttemptingSave" class="mr-1" small></b-spinner
            ><span>Save address details</span></BaseButton
          >
        </div>
      </form>
    </template>
  </b-sidebar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      savedAddresses: [],
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
      isAttemptingSave: false,
    };
  },
  computed: {
    ...mapState({
      location: (state) => state.locationObj,
    }),
    addressData() {
      return {
        additionalDetails: this.address.details,
        poi: this.location.poi,
        locationName: this.address.label,
        serviceAreaId: this.location.service_area,
        latitude: this.location.lat,
        longitude: this.location.lng,
        address: this.location.address,
        addressType: this.labelOption,
      };
    },
  },
  async mounted() {
    try {
      const res = await this.$axios({
        mode: "cors",
        method: "get",
        url: `/qa/v1/api/addresses`,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });
      this.savedAddresses = res.data.data;
      console.log("SAVED ADDRESSES ===", res.data.data);
    } catch (error) {
      this.$store.dispatch("toast", {
        title: "Error",
        message: error.response.data.message,
        variant: "danger",
      });
    }
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
    async saveAddress(e) {
      e.preventDefault();

      if (this.labelOption == undefined) {
        this.$store.dispatch("toast", {
          title: "Error!",
          message: "Please choose a label for you address.",
          variant: "danger",
        });
        document
          .getElementById("sidebar-address")
          .querySelector(".b-sidebar-body")
          .scrollTo(0, 0);
        return;
      }

      this.isAttemptingSave = true;

      try {
        const res = await this.$axios({
          mode: "cors",
          method: "post",
          url: `/qa/v1/api/addresses`,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
          data: {
            ...this.addressData,
            addressType: this.labelOption.toUpperCase(),
          },
        });

        // enable save button
        this.isAttemptingSave = false;

        // choose new address
        this.chooseSavedAddress(res.data);
      } catch (error) {
        this.$store.dispatch("toast", {
          title: "Error",
          message: error.response.data.message,
          variant: "danger",
        });
        this.isAttemptingSave = false;
      }
    },
    chooseSavedAddress(address) {
      // this.$emit("update", address);
      this.$store.commit("setAddressId", address.id);
      this.$store.commit("setServiceArea", address.serviceArea.id);
      this.$store.commit("setUserLocation", address.locationName);
      this.$store.commit("setUserLocationAddress", address);
      this.$root.$emit("bv::toggle::collapse", "sidebar-address");
    },
  },
};
</script>

<style lang="sass" scoped>
.labels
  display: flex

.suggestion
  padding: 1rem
  border-radius: 8px

  &:hover
    background-color: rgba(227,245,251,0.5)

  &:not(:last-child)::after
    content: ''
    display: none
    height: 1px
    width: 100%
    margin: 1rem 0
    background-color: #E0E0E0
</style>
