<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary">فرم XPath</v-btn>
    </template>

    <v-card>
      <!-- هدر -->
      <v-card-title
        class="d-flex justify-center"
        style="background:#1976d2; color:white; border-top-left-radius:8px; border-top-right-radius:8px;"
      >
        ساخت فرم برای عناصر xpath
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row v-for="(field, index) in fields" :key="index" align="center" class="mb-4">
            
            <!-- سوییچ -->
            <v-col cols="2">
              <v-switch
                v-model="field.multi"
                inset
                color="primary"
                hide-details
                label="چند مقداری:"
              />
            </v-col>

            <!-- سلکت نوع -->
            <v-col cols="3">
              <v-select
                v-model="field.type"
                :items="['متن', 'عکس']"
                label="نوع"
                variant="outlined"
                density="compact"
              />
            </v-col>

            <!-- اینپوت نام -->
            <v-col cols="7">
              <v-text-field
                v-model="field.value"
                :label="field.label"
                variant="outlined"
                density="compact"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-start">
        <v-btn color="success" variant="flat">ثبت</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue"

const dialog = ref(false)

const fields = ref([
  { label: "تیتر خبر", value: "", type: "متن", multi: true },
  { label: "سر تیتر خبر", value: "", type: "متن", multi: true },
  { label: "تاریخ", value: "", type: "متن", multi: false },
  { label: "نویسنده", value: "", type: "متن", multi: true },
])
</script>

<style scoped>
.v-field.v-field--outlined .v-field__outline {
  border-color: #1976d2 !important;
}
.v-field.v-field--focused .v-field__outline {
  border-color: #1976d2 !important;
}
</style>
