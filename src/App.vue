<template>
  <v-app>
    <v-main class="d-flex justify-center align-center" style="height:100vh; background: #f5f5f5;">
      <div class="d-flex flex-column gap-4">
        <!-- دکمه باز کردن Regex -->
        <RegexBuilder />

        <!-- دکمه باز کردن فرم موجودیت -->
        <EntityForm />
        <!-- دکمه باز کردن فرم منبع خزش -->
        <CrawlSourceForm />
        <!-- Xpathدکمه باز کردن فرم -->
        <XpathForm />

      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import RegexBuilder from "./components/RegexBuilder.vue";
import EntityForm from "./components/EntityForm.vue";
import CrawlSourceForm from "./components/CrawlSourceForm.vue";
import XpathForm from "./components/XpathForm.vue";

</script>

<style>
.gap-4 > * {
  margin-bottom: 1rem;
}
</style>
