<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="playground-link">
    <a :href="props.link" target="_blank" rel="noopener">
      <strong>View on Playground</strong>
      <svg
        class="_icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M14 3h7v7"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
        />
        <path
          d="M21 3l-12 12"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
        />
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="2"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.playground-link {
  margin-top: 4em;
}

._icon {
  display: inline;
  vertical-align: middle;
  margin-left: 0.3em;
}
</style>
