<template>
  <div class="bg-white px-5 rounded-md shadow-md">
    <div class="flex flex-wrap pt-5">
      <!-- Ini Lebih Baik Pakai Modal -->
      <div class="w-full text-right">
        <label for="excel">
            <a class="py-2 px-2 rounded bg-blue-600">Import Via Excel ? </a>
        </label>
        <input type="file" name="" id="excel" class="hidden">
      </div>
    </div>

    <form action="" method="post" @submit.prevent="postBarang">
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
        token: localStorage.getItem("token") || ""
      }
  },
  components: {

  },
  mounted: function(){

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

      axios.post(`http://localhost:5500/apiBrg/barang`, formData, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        alert("Berhasil");
        console.log(res.data);
      }).catch((err) => {
        alert("Gagal");
        console.warn(err);

      });

      console.log(...formData.entries());

    },
    changeGambar: function(event){
      this.gambar = event.target.files;
    }
  },

}
</script>

<style scoped>
div {
  font-size: 13px;
}
</style>




