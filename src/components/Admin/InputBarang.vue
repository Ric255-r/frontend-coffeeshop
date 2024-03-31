<template>
  <div class="bg-white px-5 rounded-md shadow-md">
    <div class="flex flex-wrap pt-5">
      <!-- Ini Lebih Baik Pakai Modal -->
      <div class="w-6/12">
        <button @click="handleMode('showAll')" :class="`pr-2 ${modeCrud == 'showAll' ? ' underline': ''}`">Data Utama</button>
        <button @click="handleMode('insert')"  :class="`pr-2 ${modeCrud == 'insert' ? ' underline': ''}`">Insert Data</button>
        <button @click="handleMode('update')" :class="`pr-2 ${modeCrud == 'update' ? ' underline': ''}`">Update Data</button>

      </div>
      <div class="w-6/12 text-right">
        <label>
            <a @click="visibleDialog = true" class="py-2 px-2 rounded bg-blue-600">Import Via Excel ? </a>
        </label>
        <!-- Ini klo mw buat button tanpa "choose file"
        <label for="excel">
            <a class="py-2 px-2 rounded bg-blue-600">Import Via Excel ? </a>
        </label>
        <input type="file" name="" id="excel" class="hidden"> -->
      </div>
    </div>

    <div class="pt-5 animate-fade-left flex flex-wrap" v-if="modeCrud == 'showAll'">
      <div class="w-full mt-2">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">      
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No.
                </th>
                <th scope="col" class="px-6 py-3">
                  Nama Barang
                </th>
                <th scope="col" class="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" class="px-6 py-3">
                  Harga
                </th>
                <th scope="col" class="px-6 py-3">
                  Gambar 
                </th>
                <th colspan="2" scope="col" class="text-center px-6 py-3">
                  Aksi 
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in dataBarang" :key="index">
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" width="5%">
                    {{ index + 1 }}
                  </th>
                  <td class="px-6 py-4">
                    {{ item.nama_barang }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.deskripsi }}
                  </td>
                  <td class="px-6 py-4">
                    Rp. {{ item.harga }}
                  </td>
                  <td class="px-6 py-4 text-center items-center justify-center">
                    <img 
                      :src="getImg(item.gambar[0], item.source_data)" 
                      :alt="``"
                      height="50" width="50" />
                  </td>
                  <td class="px-6 py-4">
                    <button @click="handleMode('update', item.id)" type="button" class="bg-blue-600 py-2 px-2 rounded-lg text-white">Update</button>
                  </td>
                  <td class="px-6 py-4">
                    <button @click="deleteBarang(item.id)" type="button" class="bg-red-600 py-2 px-2 rounded-lg text-white">Delete</button>
                  </td>

                </tr>
                
              </template>

            </tbody>
          </table>
        </div>

        <ConfirmDialog></ConfirmDialog>
      </div>
    </div>

    <form class="pt-5 animate-fade-left" action="" method="post" @submit.prevent="postBarang" v-if="modeCrud == 'insert'">
      <div class="flex flex-wrap">
        <div class="w-full">
          <label for="" style="font-size: 20px;">Input Data Menu</label>
        </div>

        <div class="w-full mt-3">
          <label for="">Nama Barang</label>
          <input type="text" name="" id="" v-model="nama_barang" class="w-full">
        </div>

        <div class="w-full mt-3">
          <label for="">Harga</label>
          <input type="number" name="" id="" v-model="harga" class="w-full">
        </div>

        <div class="w-full mt-3">
          <label for="">Deskripsi</label>
          <textarea name="" id="" cols="30" rows="10" v-model="deskripsi" class="w-full"></textarea>
        </div>

        <div class="w-full">
          <label for="">Input Gambar</label>
          <input type="file" name="" id="" @change="changeGambar($event)" class="w-full" multiple>
        </div>

        <div class="w-full mt-3">
          <input type="submit" value="Simpan" class="w-full bg-blue-600 py-3 rounded-md">
        </div>
      </div>
    </form>

    <form class="pt-5 animate-fade-left" action="" method="post" @submit.prevent="postBarang" v-if="modeCrud == 'update'">
      <div class="flex flex-wrap">
        <div class="w-full">
          <label for="" style="font-size: 20px;">Update Data Menu</label>
        </div>

        <div class="w-full mt-3">
          <label for="">Pilih Yang Mau Diedit</label>
          <select name="" id="" class="w-full" v-model="selectedId" @change="handleChangeBrg">
            <option value="">-Pilih-</option>
            <option v-for="(items, index) in dataBarang" :key="index" :value="items.id">
              {{ items.id }}. {{ items.nama_barang }}
            </option>
          </select>
        </div>

        <div class="w-full mt-3">
          <label for="">Edit Nama Barang</label>
          <input type="text" name="" id="" v-model="nama_barang" class="w-full">
        </div>

        <div class="w-full mt-3">
          <label for="">Harga</label>
          <input type="number" name="" id="" v-model="harga" class="w-full">
        </div>

        <div class="w-full mt-3">
          <label for="">Deskripsi</label>
          <textarea name="" id="" cols="30" rows="10" v-model="deskripsi" class="w-full"></textarea>
        </div>

        <div class="w-full">
          <label for="">Input Gambar</label>
          <input type="file" name="" id="" @change="changeGambar($event)" class="w-full" multiple>
        </div>

        <div class="w-full mt-3">
          <input type="submit" value="Simpan" class="w-full bg-blue-600 py-3 rounded-md">
        </div>
      </div>
    </form>

    <Dialog v-model:visible="visibleDialog" modal header="Input File Excel" :style="{ width: '25rem' }">
      <div class="flex flex-wrap">
        <div class="w-full">Import File Anda</div>
        <div class="w-full mt-2">
          <input type="file" name="" id="" @change="handleFileChange">
        </div>
        <div class="w-full mt-2">
          <button @click="submitExcel" class="w-full bg-green-600 rounded px-2 py-2">Submit</button>
        </div>
      </div>
    </Dialog>
  </div>

</template>

<script>
import axios from 'axios'
import ConfirmDialog from 'primevue/confirmdialog';
import { toast } from 'vue3-toastify'
import Dialog from 'primevue/dialog';

export default {
  name: 'input-barang',
  data: function(){
      return {
        nama_barang: '',
        harga: 0,
        deskripsi: '',
        gambar: [],
        token: localStorage.getItem("token") || "",
        modeCrud: 'showAll',
        dataBarang : [],
        selectedId: '',
        visibleDialog: false,
        fileExcel: null
      }
  },
  components: {
    ConfirmDialog,
    Dialog
  },
  mounted: function(){
    this.getDataBrg();
  },
  methods: {
    getImg: function(img, srcData){
      if(srcData == 'import'){
        return img;
      }
      return`http://localhost:5500/apiBrg/images/${img}`;
    },
    postBarang: function(){
      let formData = new FormData();
      formData.append('nama_barang', this.nama_barang);
      formData.append('harga', this.harga);
      formData.append('deskripsi', this.deskripsi);
      for (let i = 0; i < this.gambar.length; i++) {
        formData.append('gambar', this.gambar[i]);
      }

      let url = "";
      if(this.modeCrud == "insert"){
        url = `http://localhost:5500/apiBrg/barang`
      }else if(this.modeCrud == "update"){
        url = `http://localhost:5500/apiBrg/barang/${this.selectedId}`
      }

      axios.post(url, formData, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        alert("Berhasil");
        console.log(res.data);

        this.nama_barang = '';
        this.harga = 0;
        this.deskripsi = '';
        this.gambar = [];
        this.selectedId = '';

        this.getDataBrg();
      }).catch((err) => {
        alert("Gagal");
        console.warn(err);

      });

      console.log(...formData.entries());
    },
    changeGambar: function(event){
      this.gambar = event.target.files;
    },
    handleMode: function(mode, idUpdate = null){
      this.modeCrud = mode
      this.nama_barang = '';
      this.harga = 0;
      this.deskripsi = '';
      this.gambar = [];

      if(idUpdate && mode == "update"){
        this.selectedId = idUpdate;
        this.handleChangeBrg();
        window.scrollTo(0,0); //bikin dia di scroll paling awall
      }
    },
    getDataBrg: async function(){
      try {
        const resBrg = await axios.get(`http://localhost:5500/apiBrg/barang`, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        });
        
        this.dataBarang = resBrg.data

      } catch (error) {
        console.warn(error);
        return null
      }
    },
    handleChangeBrg: function(){
      let selectedId = this.selectedId;
      let dataBrg = this.dataBarang;

      if(selectedId == ''){
        this.nama_barang = '';
        this.harga = 0;
        this.deskripsi = '';
        this.gambar = [];
      }else{
        dataBrg.map((items) => {
          if(selectedId == items.id){
            this.nama_barang = items.nama_barang;
            this.harga = items.harga;
            this.deskripsi = items.deskripsi;
            this.gambar = items.gambar;
          }
        });
      }
    },
    deleteBarang: function(id){
      console.log(id);
      // Ini Confirm pakai confirm primevue
      this.$confirm.require({
        message: "Anda Yakin Ingin Menghapus?",
        header: "Confirmation",
        icon: 'fas fa-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Proses',
        accept: () => {
          axios.delete(`http://localhost:5500/apiBrg/barang/${id}`, {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then((res) => {
            toast("Berhasil Hapus", {
              autoClose: 1500,
              type: 'success'
            });

            console.log(res);

            this.getDataBrg();
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
    handleFileChange: function(event){
      this.fileExcel = event.target.files[0];
    },
    submitExcel: function(){
      let formData = new FormData();
      formData.append('fileExcel', this.fileExcel)

      axios.post(`http://localhost:5500/apiBrg/importDataBarang`, formData, {
        headers : {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        toast("Berhasil Upload Data", {
          autoClose: 1800,
          type: 'success'
        });
        console.log(res);
        this.visibleDialog = false;
        this.getDataBrg();

      }).catch((err) => {
        toast("Gagal Upload File", {
          autoClose: 1500,
          type: 'error'
        });
        
        console.warn(err);
      });

    }
  },

}
</script>

<style scoped>
div {
  font-size: 13px;
}
</style>




