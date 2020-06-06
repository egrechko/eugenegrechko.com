<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-size-2">Contact Info</h1>
      <p>
        You can reach out to me regarding question on the site or potential work
        through my email or discord.
      </p>
      <p class="contact-link">
        <a
          class="display-email"
          href="mailto:fakey@gmail.com"
          @click.prevent="showEmail"
          >Display Email</a
        >
      </p>
      <p class="contact-link">
        <a @click.prevent="showDiscord">Display Discord</a>
      </p>
    </div>
  </div>
</template>

<script>
const email = {}
email.user = 'eugene.grechko'
email.domain = 'gmail.com'

const discord = {}
discord.user = 'Eugene Grechko'
discord.id = '#8456'

export default {
  methods: {
    showEmail(e) {
      e.target.innerHTML = `${email.user}@${email.domain}`
      e.target.href = `mailto:${email.user}@${email.domain}`
    },
    showDiscord(e) {
      e.target.innerHTML = `${discord.user}${discord.id}`
    }
  },
  head: {
    title: 'My Work | Eugene Grechko Freelance Web Developer'
  }
}
</script>
