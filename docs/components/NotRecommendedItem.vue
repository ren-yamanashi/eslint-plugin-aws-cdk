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
      ℹ️ このルールは
      <a href="/ja/rules/#recommended-rules"> recommended </a>
      ルールには含まれていません。
    </div>
  </template>
  <template v-else>
    <div class="info-item">
      ℹ️ This rule is not included in the
      <a href="/rules/#recommended-rules"> recommended </a>
      rule.
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
