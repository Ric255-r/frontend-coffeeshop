<template>
  <div class="flex flex-wrap">
    <div class="w-6/12">
      <button :class="`text-sm ${status_user == 'Karyawan' ? 'underline' : ''}`" @click="handleUbah('Karyawan')">Data Karyawan</button>
      <button :class="`text-sm pl-5 ${status_user == 'Customer' ? 'underline' : ''}`" @click="handleUbah('Customer')">Data Pelanggan</button>

    </div>
    <div class="w-full mt-2">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">      
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                No.
              </th>
              <th scope="col" class="px-6 py-3">
                Nama
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Status User
              </th>
              <th scope="col" class="px-6 py-3">
                Roles
              </th>
              <th scope="col" class="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody v-if="dataUser.length">
            <template v-for="(item, index) in dataUser" :key="index">
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" width="5%">
                  {{ index + 1}}
                </th>
                <td class="px-6 py-4">
                  {{ item.nama }}
                </td>
                <td class="px-6 py-4">
                  {{ item.email }}
                </td>
                <td class="px-6 py-4">
                  {{ item.status_user }}
                </td>
                <td class="px-6 py-4">
                  {{ item.roles }}
                </td>
                <td class="px-6 py-4">
                  <button @click="deleteUser(item.id_user)" type="button" class="bg-red-600 py-2 px-2 rounded-lg text-white">Delete</button>
                </td>

              </tr>
            </template>
          </tbody>

          <tbody v-else>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
              <td class="text-center py-10" colspan="7">Tidak Ada Data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ConfirmDialog></ConfirmDialog>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ConfirmDialog from 'primevue/confirmdialog';
import {toast} from 'vue3-toastify'

export default {
  name: 'daftar-user',
  data: function(){
    return {
      token : localStorage.getItem('token') || "",
      dataUser : [],
      status_user : 'Karyawan'
    }
  },
  components: {
    ConfirmDialog
  },
  mounted: function(){
    this.getData();
  },
  methods: {
    handleUbah(status_user){
      this.status_user = status_user;
      this.getData();
    },
    deleteUser(id){
      this.$confirm.require({
        message: "Anda Yakin Ingin Menghapus?",
        header: "Confirmation",
        icon: 'fas fa-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Proses',
        accept: () => {
          axios.delete(`http://localhost:5500/apiAdmin/datauser/${id}`, {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then((res) => {
            toast("Berhasil Hapus", {
              autoClose: 1500,
              type: 'success'
            });

            console.log(res);
            this.getData();
          }).catch((err) => {
            toast("Gagal Hapus ", {
              autoClose: 1500,
              type: 'error'
            });

            console.warn(err);
          });
        },
        reject: () => {
          toast("Batal Hapus", {
            autoClose: 1500,
          });
        }

      });
    },
    async getData(){
      try {
        const resOrg = await axios.get(`http://localhost:5500/apiUser/datauser/${this.status_user}`, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        });

        this.dataUser = resOrg.data;
        console.log(this.dataUser);
      } catch (err) {
        console.warn(err);
        return null
      }
    },
  }
}
</script>

<style>

</style>