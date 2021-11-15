
<template>
  <form-wizard @onComplete="onComplete">
    <tab-content title="Personal Information" :selected="true">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
            type="text"
            class="form-control"
            :class="hasError('firstName') ? 'is-invalid' : ''"
            placeholder="Enter your first name"
            v-model="formData.firstName"
            @input="updateStore"
        >
        <div v-if="hasError('firstName')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.firstName.required">Please provide a valid first name.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
            type="text"
            class="form-control"
            :class="hasError('lastName') ? 'is-invalid' : ''"
            placeholder="Enter your last name"
            v-model="formData.lastName"
            @input="updateStore"
        >
        <div v-if="hasError('lastName')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.lastName.required">Please provide a valid last name.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="email">Your Email</label>
        <input
            type="email"
            class="form-control"
            :class="hasError('email') ? 'is-invalid' : ''"
            placeholder="Enter your email"
            v-model="formData.email"
        >
        <div v-if="hasError('email')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.email.required">Email field is required</div>
          <div class="error" v-if="!$v.formData.email.email">Should be in email format</div>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            class="form-control"
            :class="hasError('password') ? 'is-invalid' : ''"
            placeholder="Enter your password"
            v-model="formData.password"
            @input="updateStore"
        >
        <div v-if="hasError('password')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.password.required">Password field is required</div>
          <div class="error" v-if="!$v.formData.password.minLength">Password field should be 8 characters</div>
        </div>
      </div>
    </tab-content>
    <tab-content title="Address Details">
      <div class="form-group">
        <label for="address">Address</label>
        <input
            type="text"
            class="form-control"
            :class="hasError('address') ? 'is-invalid' : ''"
            placeholder="Enter your address"
            v-model="formData.address"
            @input="updateStore"
        >
        <div v-if="hasError('address')" class="invalid-feedback">
          <div
              class="error"
              v-if="!$v.formData.address.required"
          >Please provide a valid address.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="mobile">Mobile</label>
        <input
            type="text"
            class="form-control"
            :class="hasError('mobile') ? 'is-invalid' : ''"
            placeholder="Enter your mobile"
            v-model="formData.mobile"
            @input="updateStore"
        >
        <div v-if="hasError('mobile')" class="invalid-feedback">
          <div
              class="error"
              v-if="!$v.formData.mobile.required"
          >Please provide mobile number.</div>
          <div class="error" v-if="!$v.formData.mobile.numeric">Should be a valid value.</div>
          <div class="error" v-if="!$v.formData.mobile.minLength">Should be a 10 digits.</div>
        </div>
      </div>
    </tab-content>
    <tab-content title="Finishing Up">
      <div class="form-group form-check">
        <input
            type="checkbox"
            :class="hasError('terms') ? 'is-invalid' : ''"
            class="form-check-input"
            v-model="formData.terms"
            @input="updateStore"
            @change="checkTerms"
        >
        <label class="form-check-label">I accpet terms & conditions</label>
        <div v-if="hasTermsError" class="invalid-feedback">
          <div class="error">Please select terms and conditions.</div>
        </div>
      </div>
    </tab-content>
  </form-wizard>
</template>

<script>
import { mapGetters } from 'vuex'
import { FormWizard, TabContent, ValidationHelper } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
import { required, email, numeric, minLength } from "vuelidate/lib/validators";

export default {
  name: "MultiStepFormWithValidation",
  components: {
    FormWizard,
    TabContent
  },
  mixins: [ValidationHelper],
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        password: "",
        email: null,
        address: "",
        mobile: "",
        terms: false,
      },
      hasTermsError: false,
      validationRules: [
        { firstName: { required }, lastName: { required }, email: { required, email }, password: { required, minLength: minLength(8) } },
        { address: { required }, mobile: { required, numeric, minLength: minLength(10) } },
        { terms: { required } }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'userDetails',
    ])
  },
  methods: {
    updateStore() {
      this.$store.dispatch('updateStoreValues', this.formData)
    },
    onComplete() {
      if (this.formData.terms) {
        alert(JSON.stringify(this.userDetails));
      } else {
        this.hasTermsError = true
      }
    },
    checkTerms() {
      if (this.formData.terms) {
        this.hasTermsError = false
      }else {
        this.hasTermsError = true
      }
    }
  }
};
</script>
