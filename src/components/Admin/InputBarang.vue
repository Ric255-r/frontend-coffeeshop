<template>
  <div class="bg-white px-5 rounded-md shadow-md">
    <div class="flex flex-wrap pt-5">
      <!-- Ini Lebih Baik Pakai Modal -->
      <div class="w-6/12">
        <button @click="handleMode('insert')" class="pr-2" :class="`${modeCrud == 'insert' ? ' underline': ''}`">Insert Data</button>
        <button @click="handleMode('update')" :class="`${modeCrud == 'update' ? ' underline': ''}`">Update Data</button>

      </div>
      <div class="w-6/12 text-right">
        <label for="excel">
            <a class="py-2 px-2 rounded bg-blue-600">Import Via Excel ? </a>
        </label>
        <input type="file" name="" id="excel" class="hidden">
      </div>
    </div>

    <form action="" method="post" @submit.prevent="postBarang" v-if="modeCrud == 'insert'">
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

    <form action="" method="post" @submit.prevent="postBarang" v-if="modeCrud == 'update'">
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
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'input-barang',
  data: function(){
      return {
        nama_barang: '',
        harga: 0,
        deskripsi: '',
        gambar: [],
        token: localStorage.getItem("token") || "",
        modeCrud: 'insert',
        dataBarang : [],
        selectedId: ''
      }
  },
  components: {

  },
  mounted: function(){
    this.getDataBrg();
  },
  methods: {
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
      }else{
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
      }).catch((err) => {
        alert("Gagal");
        console.warn(err);

      });

      console.log(...formData.entries());
    },
    changeGambar: function(event){
      this.gambar = event.target.files;
    },
    handleMode: function(mode){
      if(mode === 'insert'){
        this.modeCrud = 'insert';
      }else{
        this.modeCrud = 'update'
      }

      this.nama_barang = '';
      this.harga = 0;
      this.deskripsi = '';
      this.gambar = [];
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
    }
  },

}
</script>

<style scoped>
div {
  font-size: 13px;
}
</style>




