<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">ساخت فرم موجودیت</v-btn>
    </template>

    <v-card class="pa-4">
      <!-- هدر -->
      <v-card-title class="d-flex justify-center bg-primary text-white rounded-lg">
        ساخت فرم موجودیت
      </v-card-title>

      <v-card-text>
        <!-- نام موجودیت -->
        <v-text-field
          v-model="entityName"
          label="نام موجودیت"
          outlined
          dense
          hide-details
          class="mb-3"
        />

        <!-- فیلدها -->
        <div v-for="(field, index) in fields" :key="index" class="d-flex align-center mb-2">
          <v-text-field
            v-model="fields[index]"
            label="نام فیلد"
            outlined
            dense
            hide-details
            class="flex-grow-1"
          />
          <v-btn icon color="error" @click="removeField(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>

        <!-- دکمه افزودن فیلد -->
        <v-btn icon color="primary" @click="addField">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-text>

      <!-- دکمه ثبت -->
      <v-card-actions class="d-flex justify-end">
        <v-btn color="success" @click="submitForm">ثبت</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const entityName = ref("");
const fields = ref([""]);

const addField = () => {
  fields.value.push("");
};

const removeField = (index) => {
  fields.value.splice(index, 1);
};

const submitForm = () => {
  console.log("Entity:", entityName.value);
  console.log("Fields:", fields.value);
  dialog.value = false;
};
</script>
