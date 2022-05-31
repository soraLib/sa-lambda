<template>
  <header class="home-hero">
    <h1 class="tagline">
      The
      <span class="accent">Functional</span>
      <br />Programming library
    </h1>

    <p class="text-lg description">
      A library for typed functional programming in TypeScript.
    </p>

    <div class="mt-10 mb-20">
      <NavLink :item="{ link: '/guide/', text: 'Get Started' }" class="action mx-2" />
    </div>
  </header>
</template>

<style scoped lang="postcss">
.home-hero {
  margin: 0 0 1rem;
  padding: 96px 32px;
  text-align: center;
  .hero-img {
    text-align: center;
    img {
      object-fit: scale-down;
    }
  }
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 420px) {
  .home-hero {
    margin: 0 0;
  }
  .version-img {
    margin-bottom: 0;
  }
}

.figure {
  padding: 0 1.5rem;
}

.image {
  display: block;
  margin: 0 auto;
  width: auto;
  max-width: 100%;
  max-height: 280px;
}

.title {
  margin-top: 1.5rem;
  font-size: 2rem;
}

@media (min-width: 420px) {
  .title {
    font-size: 3rem;
  }
}

@media (min-width: 720px) {
  .title {
    margin-top: 2rem;
  }
}

.description {
  max-width: 960px;
  color: var(--c-text-light);
  line-height: 1.5;
  transition: color .5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.action {
  margin-top: 1rem;
  display: inline-block;
}

.action.alt {
  margin-left: 1.5rem;
}

@media (min-width: 420px) {
  .action {
    margin-top: 2rem;
    display: inline-block;
  }
}

.action :deep(.item) {
  display: inline-block;
  border-radius: 6px;
  padding: 0 18px;
  line-height: 40px;
  font-size: 1.1rem;
  font-weight: 500;
  border: 0;
  color: var(--c-bg);
  background-color: var(--c-brand);
  transition: background-color 0.1s ease;
}

.action :deep(.item:hover) {
  text-decoration: none;
  color: var(--c-bg);
  background-color: var(--c-brand-light);
}

.action.alt :deep(.item) {
  background-color: #476582;
}

.action.alt :deep(.item:hover) {
  background-color: #304a64;
}
</style>
