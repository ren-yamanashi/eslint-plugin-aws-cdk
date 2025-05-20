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
      🔧 このルールによってエラーになるコードは
      <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
        ESLint の --fix コマンド
      </a>
      で自動修正できます。
    </div>
  </template>
  <template v-else>
    <div class="info-item">
      🔧 Some problems reported by this rule are automatically fixable by the
      <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
        --fix ESLint command line option
      </a>
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
