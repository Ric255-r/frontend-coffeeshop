<template>
  <div class="flex flex-wrap">
    <div class="w-6/12">
      <button class="text-sm" @click="handleUbah('Karyawan')">Data Karyawan</button>
      <button class="text-sm pl-5" @click="handleUbah('Pelanggan')">Data Pelanggan</button>

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
          <tbody v-if="dataUser.length" >
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

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'daftar-user',
  data: function(){
    return {
      token : localStorage.getItem('token') || "",
      dataUser : [],
      status_user : 'Karyawan'
    }
  },
  mounted: function(){
    this.getData();
  },
  methods: {
    handleUbah(status_user){
      this.status_user = status_user;
      this.getData();
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
    }
  }
}
</script>

<style>

</style>