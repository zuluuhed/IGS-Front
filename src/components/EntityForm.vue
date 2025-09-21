<template>
  <div>
    <v-btn color="primary" @click="dialog = true">
      مدیریت موجودیت‌ها
    </v-btn>

    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title
          class="white--text d-flex align-center justify-space-between"
          style="background:#1976d2; border-radius: 8px 8px 0 0;"
        >
          مدیریت موجودیت‌ها
        </v-card-title>

        <v-card-text>
          <v-alert v-if="error" type="error" class="mb-4">
            {{ error }}
          </v-alert>

          <div class="mb-4 d-flex justify-end">
            <v-btn color="success" @click="openCreateDialog" prepend-icon="mdi-plus">
              افزودن موجودیت جدید
            </v-btn>
          </div>

          <v-row>
            <v-col
              v-for="entity in entities"
              :key="entity.url"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                class="pa-3 cursor-pointer"
                @click="openEditDialog(entity)"
              >
                <v-card-title>{{ entity.source_type_name }}</v-card-title>
                <v-card-subtitle>
                  ایجاد: {{ formatDate(entity.created_date) }}
                </v-card-subtitle>
                <v-card-subtitle>
                  بروزرسانی: {{ formatDate(entity.updated_date) }}
                </v-card-subtitle>

                <v-card-actions class="justify-end">
                  <v-btn icon color="error" @click.stop="deleteEntity(entity)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="formDialog" max-width="500px">
      <v-card>
        <v-card-title
          class="white--text"
          style="background:#1976d2; border-radius: 8px 8px 0 0;"
        >
          {{ isEditing ? "ویرایش موجودیت" : "افزودن موجودیت جدید" }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="entityName"
            label="نام موجودیت"
            variant="outlined"
            density="compact"
            color="primary"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="saveEntity">ثبت</v-btn>
          <v-btn text @click="formDialog = false">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api";

interface Entity {
  url: string;
  source_type_name: string;
  created_date?: string;
  updated_date?: string;
}

const dialog = ref(false);
const formDialog = ref(false);
const entities = ref<Entity[]>([]);
const entityName = ref("");
const currentEntity = ref<Entity | null>(null);
const isEditing = ref(false);
const error = ref("");

// --- helper: حذف امن /api از ابتدای URL
const toLocalPath = (fullUrl: string) => {
  try {
    const u = new URL(fullUrl, window.location.origin);
    return u.pathname.replace(/^\/api/, "");
  } catch {
    return fullUrl.replace(/^\/api/, "");
  }
};

// دریافت لیست
const fetchEntities = async () => {
  try {
    const res = await api.get<Entity[]>("/sourcetype/");
    entities.value = res.data;
  } catch (err) {
    console.error("❌ API Error:", err);
    error.value = "خطا در دریافت موجودیت‌ها";
  }
};

// ویرایش
const openEditDialog = (entity: Entity) => {
  isEditing.value = true;
  currentEntity.value = entity;
  entityName.value = entity.source_type_name;
  formDialog.value = true;
};

// ایجاد
const openCreateDialog = () => {
  isEditing.value = false;
  currentEntity.value = null;
  entityName.value = "";
  formDialog.value = true;
};

// ذخیره
const saveEntity = async () => {
  try {
    if (isEditing.value && currentEntity.value) {
      const path = toLocalPath(currentEntity.value.url);
      console.log("PUT to:", path, "=>", api.defaults.baseURL + path);

      const res = await api.put(path, {
        source_type_name: entityName.value,
      });

      currentEntity.value.source_type_name = res.data.source_type_name;
      currentEntity.value.updated_date = res.data.updated_date;
    } else {
      console.log("POST to: /sourcetype/");
      const res = await api.post("/sourcetype/", {
        source_type_name: entityName.value,
      });
      entities.value.push(res.data);
    }
    formDialog.value = false;
    error.value = "";
  } catch (err: any) {
    console.error("❌ Save Error:", err);
    error.value = err.response?.status === 403
      ? "دسترسی شما مجاز نیست (403)"
      : "خطا در ذخیره موجودیت";
  }
};

// حذف
const deleteEntity = async (entity: Entity) => {
  if (!confirm(`آیا از حذف "${entity.source_type_name}" مطمئن هستید؟`)) return;

  try {
    const path = toLocalPath(entity.url);
    console.log("DELETE to:", path, "=>", api.defaults.baseURL + path);

    await api.delete(path);
    entities.value = entities.value.filter((e) => e.url !== entity.url);
    error.value = "";
  } catch (err: any) {
    console.error("❌ Delete Error:", err);
    error.value = err.response?.status === 403
      ? "دسترسی شما مجاز نیست (403)"
      : "خطا در حذف موجودیت";
  }
};

const formatDate = (date?: string) => {
  return date ? new Date(date).toLocaleString() : "-";
};

onMounted(fetchEntities);
</script>

<style>
.v-field.v-field--outlined .v-field__outline {
  border-color: #1976d2 !important;
}
.v-field.v-field--focused .v-field__outline {
  border-color: #1976d2 !important;
}
.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.cursor-pointer:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>
