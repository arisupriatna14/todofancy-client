Vue.component("form-signin", {
  template: `
    <div>
      <form @submit.prevent="signin">
        <div class="form-group">
          <input type="text" class="form-control" v-model="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
      </form>
    </div>
  `,
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signin: function() {
      axios({
        method: "POST",
        url: "http://todofancy-api.arisupriatna.com/api/signin",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data.token);
          swal('Signin Success', '', 'success');
          setTimeout(() => {
            window.location = "http://localhost:8080/index.html";
          }, 2000);
        })
        .catch(err => {
          swal('Email or password wrong', '', 'error');
        });
    }
  }
});
