<template>
  <Layout>
    <div class="container">
      <h1>Contact Info</h1>
      
      <p>You can reach out to me regarding question on the site or potential work through my email or discord.</p>

      <p><i>Note: to display my email you must have javascript enabled. Actually you know what.. this is a vue site. You need javascript enabled period!</i></p>

      <p class="contact-link"><font-awesome-icon class="contact-icon" :icon="['fas', 'envelope']" /><a href="mailto:fakey@gmail.com" v-on:click.prevent="showEmail" class="display-email">Display Email</a></p>
      <p class="contact-link"><font-awesome-icon class="contact-icon" :icon="['fab', 'discord']" /><a v-on:click.prevent="showDiscord" >Display Discord</a></p>
      
    </div>
  </Layout>
</template>

<script>

const email = new Object();
email.user = 'eugene.grechko';
email.domain = 'gmail.com';

const discord = new Object();
discord.user = 'Eugene Grechko';
discord.id = '#8456';

export default {
  metaInfo: {
    title: 'Contact Info'
  },
  methods: {
    showEmail (e) {
      e.target.innerHTML = `${email.user}@${email.domain}`;
      e.target.href = `mailto:${email.user}@${email.domain}`;
    },
    showDiscord (e) {
      e.target.innerHTML = `${discord.user}${discord.id}`;
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: $dark;
}

.contact-icon {
  font-size: 1.8rem;
  color: $primary;
  margin-right: 0.5rem;
}

.contact-link {
  cursor: pointer;
}

.display-email {
  text-decoration: none;
  color: $dark;
}
</style>

