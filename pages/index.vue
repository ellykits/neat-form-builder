<template>
  <div class="container">
    <div>
      <h3 class="title">
        Neat Form Builder
      </h3>
      <h4 class="subtitle">
        Generate JSON Forms for Android Apps
      </h4>
      <div class="links">
        <Button type="primary" to="/form-builder">
          Sign In
        </Button>
        <Button to="#">
          Sign up
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import FormFields from "../components/FormFields";
    import NavBar from "../components/NavBar";

    export default {
        components: {
            NavBar,
            FormFields,
            Logo
        }
    }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 60px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 16px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
