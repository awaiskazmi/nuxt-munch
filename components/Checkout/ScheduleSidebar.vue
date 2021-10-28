<template>
  <b-sidebar
    id="sidebar-schedule"
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
        <div class="pt-6 px-3 px-md-4">
          <p class="my-4 h2 font-weight-bold">Schedule Order</p>
          <pre>Selected option: {{ selected }}</pre>
          <p>Select your delivery date & schedule</p>
          <div class="radio-group">
            <div class="radio-group-input">
              <input id="slot-one" v-model="slot" value="one" type="radio" />
              <label for="slot-one">
                <span>Today</span>
                <span
                  >{{ today.toLocaleString("default", { month: "long" }) }}
                  {{ today.getDate() }}</span
                >
              </label>
            </div>
            <div class="radio-group-input">
              <input id="slot-two" v-model="slot" value="two" type="radio" />
              <label for="slot-two">
                <span>Tomorrow</span>
                <span
                  >{{ tomorrow.toLocaleString("default", { month: "long" }) }}
                  {{ tomorrow.getDate() }}</span
                >
              </label>
            </div>
            <div class="radio-group-input">
              <input
                id="slot-three"
                v-model="slot"
                value="three"
                type="radio"
              />
              <label for="slot-three">
                <span>{{
                  dayAfter.toLocaleString("default", { weekday: "long" })
                }}</span>
                <span
                  >{{ dayAfter.toLocaleString("default", { month: "long" }) }}
                  {{ dayAfter.getDate() }}</span
                >
              </label>
            </div>
          </div>
          <hr class="mt-4 d-none d-md-block" />
          <p class="h4 font-weight-bold d-none d-md-block">Delivery Slot</p>
          <ul class="radio-list mt-4 mt-md-0">
            <li
              v-for="s in slots"
              :key="s.id"
              :class="
                isPastTime(s.startTime) && slot == 'one' ? 'disabled' : ''
              "
            >
              <input name="time-slots" :id="`time-slot-${s.id}`" type="radio" />
              <label :for="`time-slot-${s.id}`"
                >{{ s.startTime }} -
                {{
                  calculateSlotEndTime(s.startTime, s.deliverySlotTimeInMinutes)
                }}
              </label>
            </li>
          </ul>
        </div>
        <div class="px-3 pb-4">
          <BaseButton @click="saveTimeSchedule" isButton type="primary" full
            >Select delivery time</BaseButton
          >
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
export default {
  props: ["selected"],
  data() {
    return {
      slot: "one",
      today: new Date(),
      tomorrow: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      dayAfter: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      slots: [],
    };
  },
  async fetch() {
    const res = await this.$axios({
      mode: "cors",
      method: "get",
      url: `/qa/v1/api/delivery/slots?sortProperties=startTime&descending=false&status=true`,
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      },
    });
    this.slots = res.data.data;
  },
  methods: {
    isPastTime(time) {
      let nowHours = this.today.getHours();
      let slotTime = parseInt(time.split(":")[0]);
      if (slotTime < nowHours) {
        return true;
      } else {
        return false;
      }
    },
    calculateSlotEndTime(start, interval) {
      let startTime = start.split(":");
      let startHours = startTime[0];
      let startMinutes = startTime[1];
      let totalMinutes = startHours * 60;
      totalMinutes += interval;
      let finalHours = totalMinutes / 60;
      let finalMinutes = Math.round((finalHours - Math.floor(finalHours)) * 60);
      if (finalMinutes < 10) {
        finalMinutes = "0" + finalMinutes;
      }
      // console.log(start, interval, Math.floor(finalHours), finalMinutes);
      return Math.floor(finalHours) + ":" + finalMinutes + ":" + startTime[2];
    },
    saveTimeSchedule() {
      this.$emit("select", code);
      return;
      this.$root.$emit("bv::toggle::collapse", "sidebar-schedule");
    },
  },
};
</script>

<style lang="sass" scoped>
.radio-list
  padding: 0
.radio-list li
  display: block
  &.disabled
    cursor: not-allowed
    pointer-events: none
    user-select: none
    opacity: 0.5
  label
    cursor: pointer
    font-weight: normal
    height: 40px
    display: flex
    align-items: center
    justify-content: space-between
    &::after
      content: ''
      height: 20px
      width: 20px
      border-radius: 100px
      border: 2px solid #000
  input
    display: none
  input:checked ~ label
    &::after
      border-color: #F95050
      background-color: #F95050
      box-shadow: inset 0 0 0 4px #fff

.radio-group
  display: flex
  height: 48px
  border-radius: 4px
  border: 1px solid #e0e0e0
  @media(max-width: 768px)
    border-radius: 0
    border-top: none
    border-right: none
    border-left: none

.radio-group-input
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  position: relative

  input
    display: none

  input:checked ~ label
    background-color: #F9505026
    border-color: #F95050
    @media(max-width: 768px)
      background-color: transparent

  input:checked ~ label,
  input:checked ~ label span,
    color: #F95050
  label
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    height: 100%
    width: 100%
    cursor: pointer
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    border: 1px solid #e0e0e0
    @media(max-width: 768px)
      border-top: none
      border-left: none
      border-right: none

    &:hover
      background-color: #fcfcfc

    span:nth-child(1)
      font-size: 12px
      color: #757575
      font-weight: normal
    span:nth-child(2)
      font-weight: 500
</style>
