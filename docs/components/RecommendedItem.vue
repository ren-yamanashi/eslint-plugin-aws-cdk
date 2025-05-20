<script setup lang="ts">
const props = defineProps({
  japanese: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <template v-if="props.japanese">
    <div class="info-item">
      ✅
      <a href="/ja/rules/#recommended-rules"> recommended </a>
      を使用した場合、このルールが有効になります。
    </div>
  </template>
  <template v-else>
    <div class="info-item">
      ✅ Using
      <a href="/rules/#recommended-rules"> recommended </a>
      in an ESLint configuration enables this rule.
    </div>
  </template>
</template>

<style scoped>
.status-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
</style>
