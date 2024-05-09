<template>
  <n-modal :show="show">
    <n-card closable @close="handleClose" style="width: 900px">
      <template #header>用户信息</template>
      <n-form
        ref="editFormRef"
        :model="userModelInfo"
        :rules="userModelInfoRules"
      >
        <n-grid :cols="24" :x-gap="12">
          <!-- 表单内容，例如： -->
          <n-form-item-gi label="用户名" path="username" :span="12">
            <n-input
              v-model:value="userModelInfo.username"
              placeholder="请输入用户名"
              :disabled="userModelInfo.id != null"
            />
          </n-form-item-gi>
          <!--<n-form-item-gi :span="12" path="userType" label="用户类型:">-->
          <!--  <n-radio-group-->
          <!--    v-model:value="userModelInfo.userType"-->
          <!--    name="sexGroup"-->
          <!--  >-->
          <!--    <n-flex>-->
          <!--      <n-radio value="student">男</n-radio>-->
          <!--      <n-radio value="student">女</n-radio>-->
          <!--    </n-flex>-->
          <!--  </n-radio-group>-->
          <!--</n-form-item-gi>-->
          <n-form-item-gi :span="12" path="name" label="姓名:">
            <n-input
              v-model:value="userModelInfo.name"
              placeholder="请输入姓名"
            />
          </n-form-item-gi>
          <n-form-item-gi label="用户角色" :span="12">
            <n-tree-select
              multiple
              v-model:value="userModelInfo.roleIds"
              label-field="roleName"
              key-field="id"
              :options="options"
              @update:value="handleUpdateValue"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="12" path="account" label="学号:">
            <n-input
              placeholder="请输入学号"
              v-model:value="userModelInfo.account"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="email" label="邮箱:">
            <n-input
              v-model:value="userModelInfo.email"
              placeholder="请输入邮箱"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="phone" label="手机号:">
            <n-input
              v-model:value="userModelInfo.phone"
              placeholder="请输入手机号"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="24" path="sex" label="性别:">
            <n-radio-group v-model:value="userModelInfo.sex" name="sexGroup">
              <n-flex>
                <n-radio :value="Number(1)">男</n-radio>
                <n-radio :value="Number(0)">女</n-radio>
              </n-flex>
            </n-radio-group>
          </n-form-item-gi>

          <n-form-item-gi :span="12" path="department" label="学院:">
            <n-input
              v-model:value="userModelInfo.department"
              placeholder="请输入学院"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="profession" label="专业:">
            <n-input
              v-model:value="userModelInfo.profession"
              placeholder="请输入专业"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="grade" label="年级:">
            <n-input-number
              v-model:value="userModelInfo.grade"
              placeholder="请输入年级"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="userClass" label="班级:">
            <n-input-number
              v-model:value="userModelInfo.userClass"
              placeholder="请输入班级"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>

      <template #action>
        <n-flex justify="end">
          <n-button @click="handleCancel">取消</n-button>
          <n-button @click="handleSubmit" type="primary">提交</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { TreeSelectOption } from "naive-ui";
import { useRolesStore } from "@/stores/modules/role";
import { computed, ref } from "vue";
import { Role } from "@/views/system/role/roleApi.ts";

const editFormRef = ref();

export interface User {
  id?: Number | null;
  username?: String | null;
  email?: String | null;
  avatarUrl?: String | null;
  phone?: String | null;
  account?: String | null;
  name?: String | null;
  sex?: number | null;
  grade?: String | null;
  department?: String | null;
  profession?: String | null;
  userClass?: String | null;
  userType?: String | null;
  roleIds?: any;
  roles?: Array<Role> | undefined;
}

export interface Props {
  show?: boolean;
  userModelInfo: User;
}

const userModelInfoRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: ["blur", "input"] },
  ],
  account: [
    { required: true, message: "请输入学号", trigger: ["blur", "input"] },
  ],
  name: [{ required: true, message: "请输入姓名", trigger: ["blur", "input"] }],
  email: [
    { required: true, message: "请输入邮箱", trigger: ["blur", "input"] },
  ],
};
const rolesStore = useRolesStore();
rolesStore.fetchAllRoles();
const options = computed(() => rolesStore.roles);

//const options = [
//  {
//    roleName: "管理员",
//    id: 1,
//  },
//  {
//    roleName: "访客",
//    id: 2,
//  },
//];

function handleUpdateValue(
  value: string | number | Array<string | number> | null,
  option: TreeSelectOption | null | Array<TreeSelectOption | null>,
) {
  console.log(value, option);
}

// 定义组件属性
const props = defineProps<Props>();

// 定义发送事件
const emit = defineEmits(["update:show", "edit", "create"]);

function handleSubmit() {
  editFormRef.value.validate(async (error) => {
    if (!error) {
      console.log(
        "[Modal子组件] 触发表单提交, 发送给父组件[edit事件、更新show属性的事件]",
      );
      console.log("props.value", props);
      if (props.userModelInfo.id) {
        emit("edit", { ...props.userModelInfo });
      } else {
        emit("create", { ...props.userModelInfo });
      }

      emit("update:show", false);
    }
  });
}

function handleCancel() {
  console.log(
    "[Modal子组件] 触发了 handleCancel ，发送给父组件 更新show属性的事件",
  );
  emit("update:show", false);
}

function handleClose() {
  console.log(
    "[Modal子组件] 触发了 handleClose ，发送给父组件 更新show属性的事件",
  );
  emit("update:show", false);
}
</script>
