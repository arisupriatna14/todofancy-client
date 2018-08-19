Vue.component('navbar-home', {
  template: `
    <div>
      <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-primary">
        <a class="navbar-brand text-white" href="#">TODOFANCY</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
          <a v-if="isLogin" class="btn btn-outline-light btn-sm space text-white" @click="event">Event</a>
          <a v-if="!isLogin" class="btn btn-outline-light btn-sm space text-white" @click="formSignup">Sign Up</a>
          <a v-else class="btn btn-outline-light btn-sm space text-white" @click="signOut">Logout</a>
        </div>
      </nav>
    </div>
  `,
  data: function() {
    return {
      isLogin: false
    }
  },
  methods: {
    formSignup: function() {
      window.location = 'http://todofancy.arisupriatna.com/signup.html'
    },

    checkLogin: function() {
      const token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
      } 
    },

    signOut: function() {
      localStorage.removeItem('token')
      swal('Sign out success', '', 'success')
      setTimeout(() => {
        window.location = 'http://todofancy.arisupriatna.com/signin.html'
      }, 2000)
    },

    event: function() {
      window.location = 'http://todofancy.arisupriatna.com/event.html'
    }
  },
  mounted() {
    this.checkLogin()
  },
})