<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary" prepend-icon="mdi-regex">
        سازنده Regex
      </v-btn>
    </template>

    <v-card >
      <v-card-title class="text-center bg-primary text-white">
        سازنده Regex
      </v-card-title>

      <v-card-text>
        <div v-for="(url, index) in urls" :key="index" class="d-flex align-center mb-3">
          <v-text-field
            v-model="urls[index]"
            :label="'URL ' + (index + 1)"
            variant="outlined"
            color="primary"
            density="compact"
            hide-details
            class="custom-text-field"
            clearable
          />
          <v-btn
            icon="mdi-close"
            color="error"
            variant="text"
            @click="removeUrl(index)"
          />
        </div>

        <v-btn
          prepend-icon="mdi-plus"
          color="primary"
          variant="outlined"
          class="mb-4"
          @click="addUrl"
        >
          افزودن URL
        </v-btn>

        <v-divider class="my-4" />

        <v-text-field
          v-model="result"
          label="Regex:"
          variant="outlined"
          density="compact"
          hide-details
          readonly
          append-inner-icon="mdi-content-copy"
          class="custom-text-field"
          @click:append-inner="copyRegex"
        />
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="dialog = false">بستن</v-btn>
        <v-btn color="primary" :loading="loading" @click="generateRegex">
          ساخت Regex
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue"

const dialog = ref(false)
const urls = ref([""])
const result = ref("")
const loading = ref(false)

const addUrl = () => {
  urls.value.push("")
}

const removeUrl = (index) => {
  urls.value.splice(index, 1)
}

const generateRegex = async () => {
  loading.value = true
  result.value = ""
  try {
    const res = await fetch("https://hdep.browserselect.ir/api/regex_creator/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: urls.value.filter((u) => u.trim() !== "") }),
    })
    const data = await res.json()
    result.value = data.regex || "⚠️ خطا در دریافت Regex"
  } catch (err) {
    result.value = "❌ خطا در ارتباط با API"
  } finally {
    loading.value = false
  }
}

const copyRegex = async () => {
  if (result.value) {
    await navigator.clipboard.writeText(result.value)
    alert("Regex کپی شد ✅")
  }
}
</script>


