Vue.component('form-signup', {
  template: `
    <div>
      <form @submit.prevent="signup">
        <div class="form-group">
          <input type="text" class="form-control" v-model="fullname" placeholder="Fullname">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Sign up</button>
        <p>Have already account? <a :href="urlFormSignin">Sig in</a></p>
      </form>
    </div>
  `,
  data: function() {
    return {
      urlFormSignin: 'http://localhost:8080/signin.html',
      fullname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup: function() {
      axios({
        method: 'POST',
        url: 'http://todofancy-api.arisupriatna.com/api/signup',
        data: {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data.token);
          swal('Signup Success', '', 'success');
          setTimeout(() => {
            window.location = "http://localhost:8080/index.html";
          }, 2000);
        })
        .catch(err => {
          swal('Email already exists', '', 'error');
        })
    }
  }
})