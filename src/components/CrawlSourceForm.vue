<template>
  <div>
    <!-- دکمه باز کردن فرم -->
    <v-btn color="primary" @click="dialog = true">
      ساخت فرم منبع خزش
    </v-btn>

    <!-- دیالوگ -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <!-- هدر -->
        <v-card-title
          class="white--text"
          style="background:#1976d2; border-radius: 8px 8px 0 0;"
        >
          ساخت فرم منبع خزش
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- نام -->
            <v-text-field
              v-model="form.name"
              label="نام"
              variant="outlined"
              density="compact"
              color="primary"
              prepend-inner-icon="mdi-account"
            />

            <!-- آدرس صفحه اول -->
            <v-text-field
              v-model="form.firstPage"
              label="آدرس صفحه اول"
              variant="outlined"
              density="compact"
              color="primary"
              prepend-inner-icon="mdi-web"
            />

            <!-- Regex -->
            <v-text-field
              v-model="form.regex"
              label="Regex"
              variant="outlined"
              density="compact"
              color="primary"
              prepend-inner-icon="mdi-regex"
            />

            <!-- دکمه سه‌نقطه -->
            <v-btn icon class="my-2" color="primary">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>

            <!-- نام پروژه -->
            <v-text-field
              v-model="form.projectName"
              label="نام پروژه"
              variant="outlined"
              density="compact"
              color="primary"
              prepend-inner-icon="mdi-folder"
            />

            <!-- وضعیت + دوره زمانی -->
            <div class="d-flex align-center justify-space-between my-2">
              <v-switch v-model="form.status" label="وضعیت" inset color="primary" />
              <v-text-field
                v-model="form.interval"
                type="number"
                label="دوره زمانی"
                variant="outlined"
                density="compact"
                color="primary"
                style="max-width: 150px;"
              />
            </div>

            <!-- زبان -->
            <v-select
              v-model="form.language"
              :items="['English','فارسی','العربية']"
              label="زبان"
              variant="outlined"
              density="compact"
              color="primary"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="submitForm">ثبت</v-btn>
          <v-btn text @click="dialog = false">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);

const form = ref({
  name: "",
  firstPage: "",
  regex: "",
  projectName: "",
  status: true,
  interval: 0,
  language: "English",
});

const submitForm = () => {
  console.log("فرم ارسال شد:", form.value);
  dialog.value = false;
};
</script>
<style>
/* 👇 همیشه آبی، حتی در حالت focus */
.v-field.v-field--outlined .v-field__outline {
  border-color: #1976d2 !important;
}

.v-field.v-field--focused .v-field__outline {
  border-color: #1976d2 !important;
}

</style>